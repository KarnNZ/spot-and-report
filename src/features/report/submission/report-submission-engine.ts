import {
  hasReportLocation,
  type ReportSession,
} from "../session/report-session.ts";
import type {
  ReportSubmissionPayload,
  SubmissionResult,
} from "./report-submission.ts";
import {
  MAX_MANUAL_LOCATION_LENGTH,
  MAX_REPORT_NOTES_LENGTH,
  MAX_REPORT_PHOTO_SIZE_BYTES,
  MAX_REPORT_SPECIES_LENGTH,
  isReportPhotoMimeType,
} from "./report-submission.ts";
import { MAX_REPORT_SUMMARY_LENGTH } from "../summary/report-summary.ts";

export class ReportSubmissionEngine {
  build(session: ReportSession): SubmissionResult {
    const errors: string[] = [];
    const { photo, location, questions } = session;
    const { coordinates } = location;
    const hasLocation = hasReportLocation(location);

    if (!photo) {
      errors.push("A photo is required.");
    } else {
      if (photo.size === 0) {
        errors.push("A photo is required.");
      } else if (photo.size > MAX_REPORT_PHOTO_SIZE_BYTES) {
        errors.push("Photo must be 4 MB or smaller.");
      }

      if (!isReportPhotoMimeType(photo.type.toLowerCase())) {
        errors.push("Photo type is not supported.");
      }
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
    const species = questions.species.trim();
    const notes = questions.notes.trim();
    const manualDescription = location.manualDescription.trim();

    if (species.length > MAX_REPORT_SPECIES_LENGTH) {
      errors.push(
        `Species must be ${MAX_REPORT_SPECIES_LENGTH} characters or fewer.`,
      );
    }

    if (notes.length > MAX_REPORT_NOTES_LENGTH) {
      errors.push(
        `Notes must be ${MAX_REPORT_NOTES_LENGTH} characters or fewer.`,
      );
    }

    if (manualDescription.length > MAX_MANUAL_LOCATION_LENGTH) {
      errors.push(
        `Location description must be ${MAX_MANUAL_LOCATION_LENGTH} characters or fewer.`,
      );
    }

    if (coordinates) {
      if (
        !Number.isFinite(coordinates.latitude) ||
        coordinates.latitude < -90 ||
        coordinates.latitude > 90
      ) {
        errors.push("Latitude must be between -90 and 90.");
      }

      if (
        !Number.isFinite(coordinates.longitude) ||
        coordinates.longitude < -180 ||
        coordinates.longitude > 180
      ) {
        errors.push("Longitude must be between -180 and 180.");
      }

      if (!Number.isFinite(coordinates.accuracy) || coordinates.accuracy <= 0) {
        errors.push("Location accuracy must be greater than zero.");
      }
    }

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
