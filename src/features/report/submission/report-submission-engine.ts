import {
  hasReportLocation,
  type ReportSession,
} from "@/features/report/session/report-session";
import type {
  ReportSubmissionPayload,
  SubmissionResult,
} from "@/features/report/submission/report-submission";
import { MAX_REPORT_SUMMARY_LENGTH } from "@/features/report/summary/report-summary";

export class ReportSubmissionEngine {
  build(session: ReportSession): SubmissionResult {
    const errors: string[] = [];
    const { photo, location, questions } = session;
    const { coordinates } = location;
    const hasLocation = hasReportLocation(location);

    if (!photo) {
      errors.push("A photo is required.");
    }

    if (!hasLocation) {
      errors.push("A location is required.");
    }

    if (!questions.observationType) {
      errors.push("An observation type is required.");
    }

    if (
      !Number.isInteger(questions.birdCount) ||
      questions.birdCount < 1 ||
      questions.birdCount > 999
    ) {
      errors.push("Bird count must be a whole number between 1 and 999.");
    }

    const summary = session.summary.trim();

    if (!summary) {
      errors.push("A report summary is required.");
    } else if (summary.length > MAX_REPORT_SUMMARY_LENGTH) {
      errors.push(
        `Report summary must be ${MAX_REPORT_SUMMARY_LENGTH} characters or fewer.`,
      );
    }

    if (
      errors.length > 0 ||
      !photo ||
      !hasLocation ||
      !questions.observationType ||
      !summary ||
      summary.length > MAX_REPORT_SUMMARY_LENGTH
    ) {
      return {
        success: false,
        errors,
      };
    }

    const species = questions.species.trim();
    const notes = questions.notes.trim();
    const manualDescription = location.manualDescription.trim();
    const payload: ReportSubmissionPayload = {
      observationType: questions.observationType,
      birdCount: questions.birdCount,
      species: species || null,
      notes: notes || null,
      summary,
      photo,
      location: {
        coordinates: coordinates
          ? {
              latitude: coordinates.latitude,
              longitude: coordinates.longitude,
              accuracy: coordinates.accuracy,
            }
          : null,
        manualDescription: manualDescription || null,
      },
    };

    return {
      success: true,
      payload,
    };
  }
}
