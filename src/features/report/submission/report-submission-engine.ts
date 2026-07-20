import type { ReportSession } from "@/features/report/session/report-session";
import type {
  ReportSubmissionPayload,
  SubmissionResult,
} from "@/features/report/submission/report-submission";

export class ReportSubmissionEngine {
  build(session: ReportSession): SubmissionResult {
    const errors: string[] = [];
    const { photo, location, questions } = session;
    const { coordinates } = location;

    if (!photo) {
      errors.push("A photo is required.");
    }

    if (!coordinates) {
      errors.push("Device coordinates are required.");
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

    if (
      errors.length > 0 ||
      !photo ||
      !coordinates ||
      !questions.observationType
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
      photo,
      location: {
        latitude: coordinates.latitude,
        longitude: coordinates.longitude,
        accuracy: coordinates.accuracy,
        manualDescription: manualDescription || null,
      },
    };

    return {
      success: true,
      payload,
    };
  }
}
