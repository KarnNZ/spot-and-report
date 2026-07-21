import type { GeneratedReportImageAnalysis } from "./report-image-analysis.ts";
import {
  ReportImageAnalysisConfigurationError,
  ReportImageAnalysisGenerationError,
  ReportImageAnalysisRateLimitError,
} from "./report-image-analysis-service.ts";
import {
  MAX_REPORT_PHOTO_SIZE_BYTES,
  isReportPhotoMimeType,
} from "../submission/report-submission.ts";

export type ReportImageAnalysisErrorCode =
  | "INVALID_IMAGE"
  | "IMAGE_TOO_LARGE"
  | "UNSUPPORTED_IMAGE"
  | "AI_NOT_CONFIGURED"
  | "ANALYSIS_FAILED"
  | "RATE_LIMITED";

export type ReportImageAnalysisEndpointResult =
  | {
      status: 200;
      body: { ok: true } & GeneratedReportImageAnalysis;
    }
  | {
      status: 400 | 413 | 415 | 429 | 502 | 503;
      body: {
        ok: false;
        error: {
          code: ReportImageAnalysisErrorCode;
          message: string;
          retryable: boolean;
        };
      };
    };

export interface ReportImageAnalyzer {
  analyze(photo: File): Promise<GeneratedReportImageAnalysis>;
}

type ReportImageAnalysisFailureStatus = 400 | 413 | 415 | 429 | 502 | 503;

const OPENAI_IMAGE_MIME_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
] as const;

function failure(
  status: ReportImageAnalysisFailureStatus,
  code: ReportImageAnalysisErrorCode,
  message: string,
  retryable: boolean,
): ReportImageAnalysisEndpointResult {
  return { status, body: { ok: false, error: { code, message, retryable } } };
}

export async function analyzeReportImageRequest(
  formData: FormData,
  analyzer: ReportImageAnalyzer,
): Promise<ReportImageAnalysisEndpointResult> {
  const fieldNames = Array.from(formData.keys());
  const photoValues = formData.getAll("photo");

  if (
    fieldNames.some((fieldName) => fieldName !== "photo") ||
    photoValues.length !== 1 ||
    !(photoValues[0] instanceof File) ||
    photoValues[0].size === 0
  ) {
    return failure(400, "INVALID_IMAGE", "Choose one photo to analyse.", false);
  }

  const photo = photoValues[0];
  const contentType = photo.type.toLowerCase();

  if (photo.size > MAX_REPORT_PHOTO_SIZE_BYTES) {
    return failure(
      413,
      "IMAGE_TOO_LARGE",
      "Choose an image no larger than 4 MB.",
      false,
    );
  }

  if (
    !isReportPhotoMimeType(contentType) ||
    !OPENAI_IMAGE_MIME_TYPES.includes(
      contentType as (typeof OPENAI_IMAGE_MIME_TYPES)[number],
    )
  ) {
    return failure(
      415,
      "UNSUPPORTED_IMAGE",
      "This photo format cannot be analysed. You can continue without AI assistance.",
      false,
    );
  }

  try {
    const result = await analyzer.analyze(photo);
    return { status: 200, body: { ok: true, ...result } };
  } catch (error) {
    if (error instanceof ReportImageAnalysisConfigurationError) {
      return failure(
        503,
        "AI_NOT_CONFIGURED",
        "AI assistance is temporarily unavailable. You can continue without it.",
        true,
      );
    }

    if (error instanceof ReportImageAnalysisRateLimitError) {
      return failure(
        429,
        "RATE_LIMITED",
        "AI assistance is busy right now. You can try again or continue without it.",
        true,
      );
    }

    if (error instanceof ReportImageAnalysisGenerationError) {
      return failure(
        502,
        "ANALYSIS_FAILED",
        "We couldn't analyse this image. You can try again or continue without AI assistance.",
        true,
      );
    }

    return failure(
      502,
      "ANALYSIS_FAILED",
      "We couldn't analyse this image. You can try again or continue without AI assistance.",
      true,
    );
  }
}
