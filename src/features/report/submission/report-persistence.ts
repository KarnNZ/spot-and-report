import type {
  StoredReportConfirmation,
  SubmitReportResult,
} from "./report-submission.ts";
import {
  getReportPhotoExtension,
  parseReportSubmissionFormData,
} from "./report-submission-validation.ts";
import { isReportPhotoMimeType } from "./report-submission.ts";

export const REPORT_PHOTO_BUCKET = "report-photos";

export interface ReportPersistenceRecord {
  id: string;
  reference: string;
  incidentType: "dead" | "sick" | "multiple";
  birdCount: number;
  reporterSpecies: string | null;
  reporterNotes: string | null;
  latitude: number | null;
  longitude: number | null;
  locationAccuracyMeters: number | null;
  manualLocationDescription: string | null;
  aiSummary: string;
  photoBucket: typeof REPORT_PHOTO_BUCKET;
  photoPath: string;
  photoOriginalName: string | null;
  photoContentType: string;
  photoSizeBytes: number;
  status: "submitted";
}

export interface ReportPersistenceFailure {
  ok: false;
  reason: "missing-bucket" | "operation-failed";
  errorCode?: string;
}

export interface ReportPersistenceSuccess {
  ok: true;
}

export interface StoredReportInsertSuccess {
  ok: true;
  report: StoredReportConfirmation;
}

export interface ReportPersistenceGateway {
  uploadPhoto: (input: {
    bucket: typeof REPORT_PHOTO_BUCKET;
    path: string;
    photo: File;
    contentType: string;
  }) => Promise<ReportPersistenceSuccess | ReportPersistenceFailure>;
  insertReport: (
    report: ReportPersistenceRecord,
  ) => Promise<StoredReportInsertSuccess | ReportPersistenceFailure>;
  removePhoto: (input: {
    bucket: typeof REPORT_PHOTO_BUCKET;
    path: string;
  }) => Promise<ReportPersistenceSuccess | ReportPersistenceFailure>;
}

export interface ReportPersistenceDiagnostic {
  category: "photo-upload" | "report-insert" | "photo-cleanup";
  operation: "upload" | "insert" | "remove";
  reportId: string;
  errorCode?: string;
}

interface PersistReportOptions {
  createReportId?: () => string;
  now?: () => Date;
  onDiagnostic?: (diagnostic: ReportPersistenceDiagnostic) => void;
}

const INVALID_REPORT_MESSAGE =
  "Check the report details and try again.";
const PHOTO_UPLOAD_MESSAGE =
  "We couldn't upload your photo. Your report is still on this device, so please try again.";
const REPORT_SAVE_MESSAGE =
  "We couldn't submit your report. Your information is still on this device, so please try again.";
const BACKEND_NOT_CONFIGURED_MESSAGE =
  "Report submission is temporarily unavailable. Your information is still on this device, so please try again.";

export function createReportReference(
  reportId: string,
  submittedAt: Date,
): string {
  const date = submittedAt.toISOString().slice(0, 10).replaceAll("-", "");
  const suffix = reportId.replaceAll("-", "").slice(0, 12).toUpperCase();
  return `REP-${date}-${suffix}`;
}

function normalizeOriginalFilename(filename: string): string | null {
  const normalizedFilename = filename.trim().slice(0, 255);
  return normalizedFilename || null;
}

export async function persistReport(
  formData: FormData,
  gateway: ReportPersistenceGateway,
  options: PersistReportOptions = {},
): Promise<SubmitReportResult> {
  const validationResult = parseReportSubmissionFormData(formData);

  if (!validationResult.success) {
    return {
      ok: false,
      error: {
        code: "INVALID_REPORT",
        message: INVALID_REPORT_MESSAGE,
      },
    };
  }

  const reportId = (options.createReportId ?? crypto.randomUUID)();
  const submittedAt = (options.now ?? (() => new Date()))();
  const reference = createReportReference(reportId, submittedAt);
  const { payload } = validationResult;
  const contentType = payload.photo.type.toLowerCase();

  if (!isReportPhotoMimeType(contentType)) {
    return {
      ok: false,
      error: {
        code: "INVALID_REPORT",
        message: INVALID_REPORT_MESSAGE,
      },
    };
  }

  const storagePath = `reports/${reportId}/photo.${getReportPhotoExtension(contentType)}`;
  const uploadResult = await gateway.uploadPhoto({
    bucket: REPORT_PHOTO_BUCKET,
    path: storagePath,
    photo: payload.photo,
    contentType,
  });

  if (!uploadResult.ok) {
    options.onDiagnostic?.({
      category: "photo-upload",
      operation: "upload",
      reportId,
      errorCode: uploadResult.errorCode,
    });

    return {
      ok: false,
      error: {
        code:
          uploadResult.reason === "missing-bucket"
            ? "BACKEND_NOT_CONFIGURED"
            : "PHOTO_UPLOAD_FAILED",
        message:
          uploadResult.reason === "missing-bucket"
            ? BACKEND_NOT_CONFIGURED_MESSAGE
            : PHOTO_UPLOAD_MESSAGE,
      },
    };
  }

  const coordinates = payload.location.coordinates;
  const insertResult = await gateway.insertReport({
    id: reportId,
    reference,
    incidentType: payload.observationType,
    birdCount: payload.birdCount,
    reporterSpecies: payload.species,
    reporterNotes: payload.notes,
    latitude: coordinates?.latitude ?? null,
    longitude: coordinates?.longitude ?? null,
    locationAccuracyMeters: coordinates?.accuracy ?? null,
    manualLocationDescription: payload.location.manualDescription,
    aiSummary: payload.summary,
    photoBucket: REPORT_PHOTO_BUCKET,
    photoPath: storagePath,
    photoOriginalName: normalizeOriginalFilename(payload.photo.name),
    photoContentType: contentType,
    photoSizeBytes: payload.photo.size,
    status: "submitted",
  });

  if (!insertResult.ok) {
    options.onDiagnostic?.({
      category: "report-insert",
      operation: "insert",
      reportId,
      errorCode: insertResult.errorCode,
    });

    const cleanupResult = await gateway.removePhoto({
      bucket: REPORT_PHOTO_BUCKET,
      path: storagePath,
    });

    if (!cleanupResult.ok) {
      options.onDiagnostic?.({
        category: "photo-cleanup",
        operation: "remove",
        reportId,
        errorCode: cleanupResult.errorCode,
      });
    }

    return {
      ok: false,
      error: {
        code: "REPORT_SAVE_FAILED",
        message: REPORT_SAVE_MESSAGE,
      },
    };
  }

  return {
    ok: true,
    report: insertResult.report,
  };
}
