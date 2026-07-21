import { NextResponse } from "next/server";

import { parseReportSummaryInput } from "@/features/report/summary/report-summary";
import {
  ReportSummaryConfigurationError,
  ReportSummaryService,
} from "@/features/report/summary/report-summary-service";

const reportSummaryService = new ReportSummaryService();

export async function POST(request: Request) {
  let requestBody: unknown;

  try {
    requestBody = await request.json();
  } catch {
    return NextResponse.json(
      { error: "The report details could not be read." },
      { status: 400 },
    );
  }

  const input = parseReportSummaryInput(requestBody);

  if (!input) {
    return NextResponse.json(
      { error: "The report details are invalid." },
      { status: 400 },
    );
  }

  try {
    const summary = await reportSummaryService.generate(input);

    return NextResponse.json({ summary });
  } catch (error) {
    const status = error instanceof ReportSummaryConfigurationError ? 503 : 502;

    return NextResponse.json(
      {
        error:
          "AI assistance is temporarily unavailable. You can write your own summary or try again.",
      },
      { status },
    );
  }
}
