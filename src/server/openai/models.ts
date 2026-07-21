import "server-only";

import { DEFAULT_REPORT_IMAGE_ANALYSIS_MODEL } from "@/features/report/image-analysis/report-image-analysis";

export const REPORT_SUMMARY_MODEL = "gpt-5.6";

export function getOpenAIApiKey(): string | undefined {
  return process.env.OPENAI_API_KEY;
}

export function getReportImageAnalysisModel(): string {
  return (
    process.env.OPENAI_VISION_MODEL?.trim() ||
    DEFAULT_REPORT_IMAGE_ANALYSIS_MODEL
  );
}
