import { hasReportLocation } from "../session/report-session.ts";
import {
  MAX_MANUAL_LOCATION_LENGTH,
  MAX_REPORT_NOTES_LENGTH,
  MAX_REPORT_PHOTO_SIZE_BYTES,
  MAX_REPORT_SPECIES_LENGTH,
  isReportPhotoMimeType,
  type ReportPhotoMimeType,
  type ReportSubmissionPayload,
} from "./report-submission.ts";
import { MAX_REPORT_SUMMARY_LENGTH } from "../summary/report-summary.ts";

export interface ReportSubmissionValidationFailure {
  success: false;
  errors: string[];
}

export interface ReportSubmissionValidationSuccess {
  success: true;
  payload: ReportSubmissionPayload;
}

export type ReportSubmissionValidationResult =
  | ReportSubmissionValidationFailure
  | ReportSubmissionValidationSuccess;

function readTextField(formData: FormData, name: string): string {
  const value = formData.get(name);
  return typeof value === "string" ? value : "";
}

function parseOptionalNumber(value: string): number | null {
  if (!value) {
    return null;
  }

  const parsedValue = Number(value);
  return Number.isFinite(parsedValue) ? parsedValue : Number.NaN;
}

export function getReportPhotoExtension(
  contentType: ReportPhotoMimeType,
): string {
  switch (contentType) {
    case "image/jpeg":
      return "jpg";
    case "image/png":
      return "png";
    case "image/webp":
      return "webp";
    case "image/heic":
      return "heic";
    case "image/heif":
      return "heif";
  }
}

export function parseReportSubmissionFormData(
  formData: FormData,
): ReportSubmissionValidationResult {
  const errors: string[] = [];
  const photoValue = formData.get("photo");
  const photo = photoValue instanceof File ? photoValue : null;
  const contentType = photo?.type.toLowerCase() ?? "";
  const incidentType = readTextField(formData, "incidentType");
  const birdCountValue = Number(readTextField(formData, "birdCount"));
  const species = readTextField(formData, "reporterSpecies").trim();
  const notes = readTextField(formData, "reporterNotes").trim();
  const manualDescription = readTextField(
    formData,
    "manualLocationDescription",
  ).trim();
  const summary = readTextField(formData, "aiSummary").trim();
  const latitude = parseOptionalNumber(readTextField(formData, "latitude"));
  const longitude = parseOptionalNumber(readTextField(formData, "longitude"));
  const accuracy = parseOptionalNumber(
    readTextField(formData, "locationAccuracyMeters"),
  );
  const hasAnyCoordinateValue =
    latitude !== null || longitude !== null || accuracy !== null;
  const hasCompleteCoordinates =
    latitude !== null &&
    longitude !== null &&
    accuracy !== null &&
    Number.isFinite(latitude) &&
    Number.isFinite(longitude) &&
    Number.isFinite(accuracy);

  if (!photo || photo.size === 0) {
    errors.push("A photo is required.");
  } else {
    if (photo.size > MAX_REPORT_PHOTO_SIZE_BYTES) {
      errors.push("Photo must be 4 MB or smaller.");
    }

    if (!isReportPhotoMimeType(contentType)) {
      errors.push("Photo type is not supported.");
    }
  }

  if (
    incidentType !== "dead" &&
    incidentType !== "sick" &&
    incidentType !== "multiple"
  ) {
    errors.push("An observation type is required.");
  }

  if (
    !Number.isInteger(birdCountValue) ||
    birdCountValue < 1 ||
    birdCountValue > 999
  ) {
    errors.push("Bird count must be a whole number between 1 and 999.");
  }

  if (species.length > MAX_REPORT_SPECIES_LENGTH) {
    errors.push(
      `Species must be ${MAX_REPORT_SPECIES_LENGTH} characters or fewer.`,
    );
  }

  if (notes.length > MAX_REPORT_NOTES_LENGTH) {
    errors.push(`Notes must be ${MAX_REPORT_NOTES_LENGTH} characters or fewer.`);
  }

  if (manualDescription.length > MAX_MANUAL_LOCATION_LENGTH) {
    errors.push(
      `Location description must be ${MAX_MANUAL_LOCATION_LENGTH} characters or fewer.`,
    );
  }

  if (hasAnyCoordinateValue && !hasCompleteCoordinates) {
    errors.push("Device location is incomplete.");
  } else if (hasCompleteCoordinates) {
    if (latitude < -90 || latitude > 90) {
      errors.push("Latitude must be between -90 and 90.");
    }

    if (longitude < -180 || longitude > 180) {
      errors.push("Longitude must be between -180 and 180.");
    }

    if (accuracy <= 0) {
      errors.push("Location accuracy must be greater than zero.");
    }
  }

  const coordinates = hasCompleteCoordinates
    ? { latitude, longitude, accuracy }
    : null;

  if (!hasReportLocation({ coordinates, manualDescription })) {
    errors.push("A location is required.");
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
    !isReportPhotoMimeType(contentType) ||
    (incidentType !== "dead" &&
      incidentType !== "sick" &&
      incidentType !== "multiple")
  ) {
    return { success: false, errors };
  }

  return {
    success: true,
    payload: {
      observationType: incidentType,
      birdCount: birdCountValue,
      species: species || null,
      notes: notes || null,
      summary,
      photo,
      location: {
        coordinates,
        manualDescription: manualDescription || null,
      },
    },
  };
}
