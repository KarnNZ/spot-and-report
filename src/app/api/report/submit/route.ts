import { NextResponse } from "next/server";

import type {
  SubmitReportErrorCode,
  SubmitReportResult,
} from "@/features/report/submission/report-submission";
import { submitReport } from "@/server/report/submit-report";
import { SupabaseConfigurationError } from "@/server/supabase/admin";
import { getSafeErrorDiagnostic } from "@/server/diagnostics/safe-error-diagnostic";

export const runtime = "nodejs";

const BACKEND_NOT_CONFIGURED_RESULT: SubmitReportResult = {
  ok: false,
  error: {
    code: "BACKEND_NOT_CONFIGURED",
    message:
      "Report submission is temporarily unavailable. Your information is still on this device, so please try again.",
  },
};

function getFailureStatus(code: SubmitReportErrorCode): number {
  switch (code) {
    case "INVALID_REPORT":
      return 400;
    case "BACKEND_NOT_CONFIGURED":
      return 503;
    case "PHOTO_UPLOAD_FAILED":
    case "REPORT_SAVE_FAILED":
      return 502;
  }
}

export async function POST(request: Request): Promise<NextResponse> {
  let formData: FormData;

  try {
    formData = await request.formData();
  } catch {
    const invalidRequest: SubmitReportResult = {
      ok: false,
      error: {
        code: "INVALID_REPORT",
        message: "Check the report details and try again.",
      },
    };
    return NextResponse.json(invalidRequest, { status: 400 });
  }

  try {
    const result = await submitReport(formData);
    return NextResponse.json(result, {
      status: result.ok ? 201 : getFailureStatus(result.error.code),
    });
  } catch (error) {
    if (error instanceof SupabaseConfigurationError) {
      console.error("Report persistence is not configured.", {
        category: "configuration",
        operation: "create-client",
      });
      return NextResponse.json(BACKEND_NOT_CONFIGURED_RESULT, { status: 503 });
    }

    console.error("Unexpected report persistence failure.", {
      category: "unexpected",
      operation: "submit",
      ...getSafeErrorDiagnostic(error),
    });
    const unexpectedFailure: SubmitReportResult = {
      ok: false,
      error: {
        code: "REPORT_SAVE_FAILED",
        message:
          "We couldn't submit your report. Your information is still on this device, so please try again.",
      },
    };
    return NextResponse.json(unexpectedFailure, { status: 500 });
  }
}
