import type { ReportSession } from "@/features/report/session/report-session";

export const MAX_REPORT_SUMMARY_LENGTH = 1000;

export interface ReportSummaryInput {
  observationType: "dead" | "sick" | "multiple" | null;
  birdCount: number | null;
  species: string;
  notes: string;
  hasCoordinates: boolean;
  hasManualLocation: boolean;
}

const OBSERVATION_LABELS: Record<
  Exclude<ReportSummaryInput["observationType"], null>,
  string
> = {
  dead: "dead bird",
  sick: "sick or injured bird",
  multiple: "multiple birds",
};

const DIAGNOSTIC_CERTAINTY_PATTERNS = [
  /\bdiagnosed with\b/i,
  /\b(?:has|had|have|contracted|infected with)\s+(?:bird flu|avian influenza)\b/i,
];

export function createReportSummaryInput(
  session: ReportSession,
): ReportSummaryInput {
  const { observationType, birdCount, species, notes } = session.questions;

  return {
    observationType,
    birdCount: observationType ? birdCount : null,
    species: species.trim(),
    notes: notes.trim(),
    hasCoordinates: session.location.coordinates !== null,
    hasManualLocation: session.location.manualDescription.trim().length > 0,
  };
}

export function parseReportSummaryInput(
  value: unknown,
): ReportSummaryInput | null {
  if (!value || typeof value !== "object") {
    return null;
  }

  const input = value as Record<string, unknown>;
  const observationType = input.observationType;
  const birdCount = input.birdCount;
  const species = input.species;
  const notes = input.notes;

  if (
    observationType !== null &&
    observationType !== "dead" &&
    observationType !== "sick" &&
    observationType !== "multiple"
  ) {
    return null;
  }

  if (
    birdCount !== null &&
    (!Number.isInteger(birdCount) ||
      (birdCount as number) < 1 ||
      (birdCount as number) > 999)
  ) {
    return null;
  }

  if (observationType !== null && birdCount === null) {
    return null;
  }

  if (
    typeof species !== "string" ||
    species.length > 100 ||
    typeof notes !== "string" ||
    notes.length > 500 ||
    typeof input.hasCoordinates !== "boolean" ||
    typeof input.hasManualLocation !== "boolean"
  ) {
    return null;
  }

  return {
    observationType,
    birdCount: observationType === null ? null : (birdCount as number),
    species: species.trim(),
    notes: notes.trim(),
    hasCoordinates: input.hasCoordinates,
    hasManualLocation: input.hasManualLocation,
  };
}

export function buildReportSummaryEvidence(input: ReportSummaryInput): string {
  return JSON.stringify({
    observation: input.observationType
      ? {
          type: OBSERVATION_LABELS[input.observationType],
          count: input.birdCount,
        }
      : null,
    species: input.species || null,
    additionalObservations: input.notes || null,
    location: {
      deviceCoordinatesCaptured: input.hasCoordinates,
      manualDescriptionProvided: input.hasManualLocation,
    },
  });
}

export function isAcceptableGeneratedSummary(summary: string): boolean {
  const normalizedSummary = summary.trim();

  return (
    normalizedSummary.length > 0 &&
    normalizedSummary.length <= MAX_REPORT_SUMMARY_LENGTH &&
    !DIAGNOSTIC_CERTAINTY_PATTERNS.some((pattern) =>
      pattern.test(normalizedSummary),
    )
  );
}
