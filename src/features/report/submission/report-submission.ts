import type {
  ObservationType,
  ReportCoordinates,
} from "@/features/report/session/report-session";
import type { ApprovedImageAnalysis } from "@/features/report/image-analysis/report-image-analysis";

export interface ReportSubmissionPayload {
  observationType: ObservationType;
  birdCount: number;
  species: string | null;
  notes: string | null;
  summary: string;
  imageAnalysis: ApprovedImageAnalysis | null;
  photo: File;
  location: {
    coordinates: ReportCoordinates | null;
    manualDescription: string | null;
  };
}

export const MAX_REPORT_PHOTO_SIZE_BYTES = 4 * 1024 * 1024;
export const MAX_REPORT_SPECIES_LENGTH = 100;
export const MAX_REPORT_NOTES_LENGTH = 500;
export const MAX_MANUAL_LOCATION_LENGTH = 200;

export const REPORT_PHOTO_MIME_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/heic",
  "image/heif",
] as const;

export type ReportPhotoMimeType = (typeof REPORT_PHOTO_MIME_TYPES)[number];

export function isReportPhotoMimeType(
  value: string,
): value is ReportPhotoMimeType {
  return REPORT_PHOTO_MIME_TYPES.includes(value as ReportPhotoMimeType);
}

export interface StoredReportConfirmation {
  reference: string;
  submittedAt: string;
  status: "submitted";
}

export type SubmitReportErrorCode =
  | "INVALID_REPORT"
  | "PHOTO_UPLOAD_FAILED"
  | "REPORT_SAVE_FAILED"
  | "BACKEND_NOT_CONFIGURED";

export type SubmitReportResult =
  | {
      ok: true;
      report: StoredReportConfirmation;
    }
  | {
      ok: false;
      error: {
        code: SubmitReportErrorCode;
        message: string;
      };
    };

export type SubmissionResult =
  | {
      success: true;
      payload: ReportSubmissionPayload;
    }
  | {
      success: false;
      errors: string[];
    };
