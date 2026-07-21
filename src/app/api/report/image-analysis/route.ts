import { NextResponse } from "next/server";

import { analyzeReportImageRequest } from "@/features/report/image-analysis/report-image-analysis-endpoint";
import { ReportImageAnalysisService } from "@/features/report/image-analysis/report-image-analysis-service";
import {
  getOpenAIApiKey,
  getReportImageAnalysisModel,
} from "@/server/openai/models";

export const runtime = "nodejs";

export async function POST(request: Request): Promise<NextResponse> {
  let formData: FormData;

  try {
    formData = await request.formData();
  } catch {
    return NextResponse.json(
      {
        ok: false,
        error: {
          code: "INVALID_IMAGE",
          message: "Choose one photo to analyse.",
          retryable: false,
        },
      },
      { status: 400 },
    );
  }

  try {
    const result = await analyzeReportImageRequest(
      formData,
      new ReportImageAnalysisService({
        apiKey: getOpenAIApiKey(),
        model: getReportImageAnalysisModel(),
      }),
    );
    return NextResponse.json(result.body, { status: result.status });
  } catch {
    console.error("Image analysis could not be initialized.", {
      category: "configuration",
      operation: "image-analysis",
    });
    return NextResponse.json(
      {
        ok: false,
        error: {
          code: "AI_NOT_CONFIGURED",
          message:
            "AI assistance is temporarily unavailable. You can continue without it.",
          retryable: true,
        },
      },
      { status: 503 },
    );
  }
}
