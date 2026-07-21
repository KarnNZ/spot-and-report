import {
  REPORT_IMAGE_ANALYSIS_SCHEMA_VERSION,
  parseReportImageAnalysis,
  type GeneratedReportImageAnalysis,
} from "./report-image-analysis";

export class ReportImageAnalysisClientError extends Error {
  constructor(
    message: string,
    public readonly retryable: boolean,
  ) {
    super(message);
    this.name = "ReportImageAnalysisClientError";
  }
}

function parseGeneratedAnalysis(value: unknown): GeneratedReportImageAnalysis | null {
  if (!value || typeof value !== "object") {
    return null;
  }

  const result = value as Record<string, unknown>;
  const analysis = parseReportImageAnalysis(result.analysis);

  if (!analysis || !result.metadata || typeof result.metadata !== "object") {
    return null;
  }

  const metadata = result.metadata as Record<string, unknown>;

  if (
    typeof metadata.model !== "string" ||
    !metadata.model ||
    typeof metadata.generatedAt !== "string" ||
    Number.isNaN(Date.parse(metadata.generatedAt)) ||
    metadata.schemaVersion !== REPORT_IMAGE_ANALYSIS_SCHEMA_VERSION
  ) {
    return null;
  }

  return {
    analysis,
    metadata: {
      model: metadata.model,
      generatedAt: metadata.generatedAt,
      schemaVersion: REPORT_IMAGE_ANALYSIS_SCHEMA_VERSION,
    },
  };
}

export async function analyzeReportPhoto(
  photo: File,
  request: typeof fetch = fetch,
): Promise<GeneratedReportImageAnalysis> {
  const formData = new FormData();
  formData.append("photo", photo);
  let response: Response;

  try {
    response = await request("/api/report/image-analysis", {
      method: "POST",
      body: formData,
    });
  } catch {
    throw new ReportImageAnalysisClientError(
      "We couldn't analyse this image. You can try again or continue without AI assistance.",
      true,
    );
  }

  let responseBody: unknown;

  try {
    responseBody = await response.json();
  } catch {
    throw new ReportImageAnalysisClientError(
      "We couldn't analyse this image. You can try again or continue without AI assistance.",
      true,
    );
  }

  if (response.ok) {
    const result = parseGeneratedAnalysis(responseBody);

    if (result) {
      return result;
    }
  }

  if (responseBody && typeof responseBody === "object") {
    const error = (responseBody as Record<string, unknown>).error;

    if (error && typeof error === "object") {
      const errorRecord = error as Record<string, unknown>;

      if (
        typeof errorRecord.message === "string" &&
        typeof errorRecord.retryable === "boolean"
      ) {
        throw new ReportImageAnalysisClientError(
          errorRecord.message,
          errorRecord.retryable,
        );
      }
    }
  }

  throw new ReportImageAnalysisClientError(
    "We couldn't analyse this image. You can try again or continue without AI assistance.",
    true,
  );
}
