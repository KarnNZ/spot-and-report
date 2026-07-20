import type { ReportSession } from "@/features/report/session/report-session";
import { ReportSubmissionEngine } from "@/features/report/submission/report-submission-engine";

export interface SuccessfulSubmission {
  reference: string;
  submittedAt: Date;
}

const SIMULATED_SUBMISSION_DELAY_MS = 750;

function createTemporaryReference(submittedAt: Date): string {
  const date = submittedAt.toISOString().slice(0, 10).replaceAll("-", "");
  const randomBytes = crypto.getRandomValues(new Uint8Array(3));
  const suffix = Array.from(randomBytes, (byte) =>
    byte.toString(16).padStart(2, "0"),
  )
    .join("")
    .toUpperCase();

  return `REP-${date}-${suffix}`;
}

export class ReportSubmissionService {
  private readonly submissionEngine = new ReportSubmissionEngine();

  async submit(session: ReportSession): Promise<SuccessfulSubmission> {
    const result = this.submissionEngine.build(session);

    if (!result.success) {
      throw new Error(`Report validation failed: ${result.errors.join(" ")}`);
    }

    await new Promise((resolve) =>
      setTimeout(resolve, SIMULATED_SUBMISSION_DELAY_MS),
    );

    const submittedAt = new Date();

    return {
      reference: createTemporaryReference(submittedAt),
      submittedAt,
    };
  }
}
