import type { ReportSession } from "../session/report-session.ts";
import { ReportSubmissionEngine } from "./report-submission-engine.ts";
import type {
  ReportSubmissionPayload,
  StoredReportConfirmation,
  SubmitReportErrorCode,
  SubmitReportResult,
} from "./report-submission.ts";
import {
  prepareReportPhotoForSubmission,
  type PreparedReportPhoto,
} from "./report-photo-preparation.ts";

type ReportSubmissionFetch = (
  input: RequestInfo | URL,
  init?: RequestInit,
) => Promise<Response>;

type ReportPhotoPreparer = (photo: File) => Promise<PreparedReportPhoto>;

function sendReportWithXmlHttpRequest(
  input: RequestInfo | URL,
  init: RequestInit = {},
): Promise<Response> {
  return new Promise((resolve, reject) => {
    const body = init.body;

    if (body !== undefined && body !== null && !(body instanceof FormData)) {
      reject(new TypeError("Report request body must be multipart form data."));
      return;
    }

    const request = new XMLHttpRequest();
    request.open(init.method ?? "GET", String(input));

    request.onload = () => {
      resolve(
        new Response(request.responseText, {
          status: request.status,
          statusText: request.statusText,
          headers: {
            "content-type":
              request.getResponseHeader("content-type") ?? "",
          },
        }),
      );
    };
    request.onerror = () => reject(new TypeError("Network request failed."));
    request.onabort = () => reject(new DOMException("Aborted", "AbortError"));

    request.send(body ?? null);
  });
}

export type SubmissionDiagnosticStage =
  | "validation"
  | "photo-preparation"
  | "request"
  | "network-error"
  | "response"
  | "response-parse"
  | "server-error"
  | "complete";

export interface SubmissionDiagnostic {
  stage: SubmissionDiagnosticStage;
  requestAttempted: boolean;
  httpStatus: number | null;
  responseContentType: string | null;
  errorCode: string | null;
  photoMimeType: string;
  photoSizeBytes: number;
  includesApprovedImageAnalysis: boolean;
}

type SubmissionDiagnosticListener = (
  diagnostic: SubmissionDiagnostic,
) => void;

export class ReportSubmissionError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ReportSubmissionError";
  }
}

export function createReportSubmissionFormData(
  payload: ReportSubmissionPayload,
  preparedPhoto: PreparedReportPhoto = {
    data: payload.photo,
    filename: payload.photo.name || "report-photo.jpg",
  },
): FormData {
  const formData = new FormData();
  formData.append("photo", preparedPhoto.data, preparedPhoto.filename);
  formData.append("incidentType", payload.observationType);
  formData.append("birdCount", String(payload.birdCount));
  formData.append("reporterSpecies", payload.species ?? "");
  formData.append("reporterNotes", payload.notes ?? "");
  formData.append(
    "manualLocationDescription",
    payload.location.manualDescription ?? "",
  );
  formData.append("aiSummary", payload.summary);

  if (payload.imageAnalysis) {
    formData.append("imageAnalysis", JSON.stringify(payload.imageAnalysis));
  }

  if (payload.location.coordinates) {
    formData.append("latitude", String(payload.location.coordinates.latitude));
    formData.append(
      "longitude",
      String(payload.location.coordinates.longitude),
    );
    formData.append(
      "locationAccuracyMeters",
      String(payload.location.coordinates.accuracy),
    );
  }

  return formData;
}

function parseSubmitReportResult(value: unknown): SubmitReportResult | null {
  if (!value || typeof value !== "object") {
    return null;
  }

  const result = value as Record<string, unknown>;

  if (result.ok === true) {
    if (!result.report || typeof result.report !== "object") {
      return null;
    }

    const report = result.report as Record<string, unknown>;

    if (
      typeof report.reference !== "string" ||
      typeof report.submittedAt !== "string" ||
      report.status !== "submitted"
    ) {
      return null;
    }

    return {
      ok: true,
      report: {
        reference: report.reference,
        submittedAt: report.submittedAt,
        status: "submitted",
      },
    };
  }

  if (result.ok !== false || !result.error || typeof result.error !== "object") {
    return null;
  }

  const error = result.error as Record<string, unknown>;
  const validCodes: ReadonlyArray<SubmitReportErrorCode> = [
    "INVALID_REPORT",
    "PHOTO_UPLOAD_FAILED",
    "REPORT_SAVE_FAILED",
    "BACKEND_NOT_CONFIGURED",
  ];

  if (
    typeof error.code !== "string" ||
    !validCodes.includes(error.code as SubmitReportErrorCode) ||
    typeof error.message !== "string"
  ) {
    return null;
  }

  return {
    ok: false,
    error: {
      code: error.code as SubmitReportErrorCode,
      message: error.message,
    },
  };
}

export class ReportSubmissionService {
  private readonly submissionEngine = new ReportSubmissionEngine();
  private readonly fetchReport: ReportSubmissionFetch;
  private readonly preparePhoto: ReportPhotoPreparer;
  private submissionInProgress: Promise<StoredReportConfirmation> | null = null;

  constructor(
    fetchReport: ReportSubmissionFetch = sendReportWithXmlHttpRequest,
    preparePhoto: ReportPhotoPreparer = prepareReportPhotoForSubmission,
  ) {
    this.fetchReport = fetchReport;
    this.preparePhoto = preparePhoto;
  }

  submit(
    session: ReportSession,
    onDiagnostic?: SubmissionDiagnosticListener,
  ): Promise<StoredReportConfirmation> {
    if (this.submissionInProgress) {
      return this.submissionInProgress;
    }

    const result = this.submissionEngine.build(session);

    if (!result.success) {
      onDiagnostic?.({
        stage: "validation",
        requestAttempted: false,
        httpStatus: null,
        responseContentType: null,
        errorCode: "CLIENT_VALIDATION_FAILED",
        photoMimeType: session.photo?.type.toLowerCase() || "missing",
        photoSizeBytes: session.photo?.size ?? 0,
        includesApprovedImageAnalysis:
          session.approvedImageAnalysis !== null,
      });
      return Promise.reject(
        new ReportSubmissionError("Check the report details and try again."),
      );
    }

    const submission = this.submitPayload(result.payload, onDiagnostic);
    this.submissionInProgress = submission;

    const clearPendingSubmission = () => {
      if (this.submissionInProgress === submission) {
        this.submissionInProgress = null;
      }
    };

    void submission.then(clearPendingSubmission, clearPendingSubmission);

    return submission;
  }

  private async submitPayload(
    payload: ReportSubmissionPayload,
    onDiagnostic?: SubmissionDiagnosticListener,
  ): Promise<StoredReportConfirmation> {
    let response: Response;
    let preparedPhoto: PreparedReportPhoto = {
      data: payload.photo,
      filename: payload.photo.name || "report-photo.jpg",
    };

    onDiagnostic?.({
      stage: "photo-preparation",
      requestAttempted: false,
      httpStatus: null,
      responseContentType: null,
      errorCode: null,
      photoMimeType: payload.photo.type.toLowerCase() || "missing",
      photoSizeBytes: payload.photo.size,
      includesApprovedImageAnalysis: payload.imageAnalysis !== null,
    });

    try {
      preparedPhoto = await this.preparePhoto(payload.photo);
    } catch (error) {
      console.warn("Report photo preparation was unavailable.", {
        category: "submission-photo-preparation",
        errorName: error instanceof Error ? error.name : "UnknownError",
      });
    }

    const baseDiagnostic = {
      requestAttempted: true,
      photoMimeType: preparedPhoto.data.type.toLowerCase() || "missing",
      photoSizeBytes: preparedPhoto.data.size,
      includesApprovedImageAnalysis: payload.imageAnalysis !== null,
    };

    onDiagnostic?.({
      ...baseDiagnostic,
      stage: "request",
      httpStatus: null,
      responseContentType: null,
      errorCode: null,
    });

    try {
      response = await this.fetchReport("/api/report/submit", {
        method: "POST",
        body: createReportSubmissionFormData(payload, preparedPhoto),
      });
    } catch (error) {
      onDiagnostic?.({
        ...baseDiagnostic,
        stage: "network-error",
        httpStatus: null,
        responseContentType: null,
        errorCode: error instanceof Error ? error.name : "UnknownError",
      });
      console.error("Report submission request failed.", {
        category: "submission-network",
        errorName: error instanceof Error ? error.name : "UnknownError",
      });
      throw new ReportSubmissionError(
        "We couldn't submit your report. Your information is still on this device, so please try again.",
      );
    }

    const contentType = response.headers.get("content-type")?.toLowerCase();

    onDiagnostic?.({
      ...baseDiagnostic,
      stage: "response",
      httpStatus: response.status,
      responseContentType: contentType?.slice(0, 64) ?? null,
      errorCode: null,
    });

    if (!contentType?.includes("application/json")) {
      console.error("Report submission returned an unexpected response.", {
        category: "submission-response",
        status: response.status,
        contentType: contentType?.slice(0, 64) ?? "missing",
        redirected: response.redirected,
      });
      onDiagnostic?.({
        ...baseDiagnostic,
        stage: "response-parse",
        httpStatus: response.status,
        responseContentType: contentType?.slice(0, 64) ?? null,
        errorCode: "NON_JSON_RESPONSE",
      });
      throw new ReportSubmissionError(
        "Report submission is unavailable at this web address. Open the public Spot & Report site and try again.",
      );
    }

    let responseBody: unknown;

    try {
      responseBody = await response.json();
    } catch {
      onDiagnostic?.({
        ...baseDiagnostic,
        stage: "response-parse",
        httpStatus: response.status,
        responseContentType: contentType.slice(0, 64),
        errorCode: "INVALID_JSON_RESPONSE",
      });
      throw new ReportSubmissionError(
        "We couldn't submit your report. Your information is still on this device, so please try again.",
      );
    }

    const result = parseSubmitReportResult(responseBody);

    if (!result || !result.ok || !response.ok) {
      onDiagnostic?.({
        ...baseDiagnostic,
        stage: "server-error",
        httpStatus: response.status,
        responseContentType: contentType.slice(0, 64),
        errorCode: result && !result.ok ? result.error.code : "INVALID_RESPONSE",
      });
      throw new ReportSubmissionError(
        result && !result.ok
          ? result.error.message
          : "We couldn't submit your report. Your information is still on this device, so please try again.",
      );
    }

    onDiagnostic?.({
      ...baseDiagnostic,
      stage: "complete",
      httpStatus: response.status,
      responseContentType: contentType.slice(0, 64),
      errorCode: null,
    });

    return result.report;
  }
}

export async function completeReportSubmission(
  session: ReportSession,
  clearReport: () => void,
  service: ReportSubmissionService,
  onDiagnostic?: SubmissionDiagnosticListener,
): Promise<StoredReportConfirmation> {
  const report = await service.submit(session, onDiagnostic);
  clearReport();
  return report;
}
