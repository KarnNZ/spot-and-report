import type { ReportSession } from "../session/report-session.ts";
import { ReportSubmissionEngine } from "./report-submission-engine.ts";
import type {
  ReportSubmissionPayload,
  StoredReportConfirmation,
  SubmitReportErrorCode,
  SubmitReportResult,
} from "./report-submission.ts";

type ReportSubmissionFetch = (
  input: RequestInfo | URL,
  init?: RequestInit,
) => Promise<Response>;

export class ReportSubmissionError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ReportSubmissionError";
  }
}

export function createReportSubmissionFormData(
  payload: ReportSubmissionPayload,
): FormData {
  const formData = new FormData();
  formData.append("photo", payload.photo);
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
  private submissionInProgress: Promise<StoredReportConfirmation> | null = null;

  constructor(fetchReport: ReportSubmissionFetch = fetch) {
    this.fetchReport = fetchReport;
  }

  submit(session: ReportSession): Promise<StoredReportConfirmation> {
    if (this.submissionInProgress) {
      return this.submissionInProgress;
    }

    const result = this.submissionEngine.build(session);

    if (!result.success) {
      return Promise.reject(
        new ReportSubmissionError("Check the report details and try again."),
      );
    }

    const submission = this.submitPayload(result.payload);
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
  ): Promise<StoredReportConfirmation> {
    let response: Response;

    try {
      response = await this.fetchReport("/api/report/submit", {
        method: "POST",
        body: createReportSubmissionFormData(payload),
      });
    } catch (error) {
      console.error("Report submission request failed.", {
        category: "submission-network",
        errorName: error instanceof Error ? error.name : "UnknownError",
      });
      throw new ReportSubmissionError(
        "We couldn't submit your report. Your information is still on this device, so please try again.",
      );
    }

    const contentType = response.headers.get("content-type")?.toLowerCase();

    if (!contentType?.includes("application/json")) {
      console.error("Report submission returned an unexpected response.", {
        category: "submission-response",
        status: response.status,
        contentType: contentType?.slice(0, 64) ?? "missing",
        redirected: response.redirected,
      });
      throw new ReportSubmissionError(
        "Report submission is unavailable at this web address. Open the public Spot & Report site and try again.",
      );
    }

    let responseBody: unknown;

    try {
      responseBody = await response.json();
    } catch {
      throw new ReportSubmissionError(
        "We couldn't submit your report. Your information is still on this device, so please try again.",
      );
    }

    const result = parseSubmitReportResult(responseBody);

    if (!result || !result.ok || !response.ok) {
      throw new ReportSubmissionError(
        result && !result.ok
          ? result.error.message
          : "We couldn't submit your report. Your information is still on this device, so please try again.",
      );
    }

    return result.report;
  }
}

export async function completeReportSubmission(
  session: ReportSession,
  clearReport: () => void,
  service: ReportSubmissionService,
): Promise<StoredReportConfirmation> {
  const report = await service.submit(session);
  clearReport();
  return report;
}
