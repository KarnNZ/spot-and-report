import assert from "node:assert/strict";
import test from "node:test";

import {
  buildReportSummaryEvidence,
  isAcceptableGeneratedSummary,
  parseReportSummaryInput,
} from "./report-summary.ts";

test("normalizes empty report answers without inventing evidence", () => {
  const input = parseReportSummaryInput({
    observationType: null,
    birdCount: null,
    species: "",
    notes: "",
    hasCoordinates: false,
    hasManualLocation: false,
  });

  assert.ok(input);
  assert.deepEqual(JSON.parse(buildReportSummaryEvidence(input)), {
    observation: null,
    species: null,
    additionalObservations: null,
    location: {
      deviceCoordinatesCaptured: false,
      manualDescriptionProvided: false,
    },
  });
});

test("normalizes partial report answers", () => {
  const input = parseReportSummaryInput({
    observationType: "dead",
    birdCount: 1,
    species: "",
    notes: "",
    hasCoordinates: true,
    hasManualLocation: false,
  });

  assert.ok(input);
  assert.deepEqual(JSON.parse(buildReportSummaryEvidence(input)), {
    observation: { type: "dead bird", count: 1 },
    species: null,
    additionalObservations: null,
    location: {
      deviceCoordinatesCaptured: true,
      manualDescriptionProvided: false,
    },
  });
});

test("normalizes complete report answers and trims free text", () => {
  const input = parseReportSummaryInput({
    observationType: "multiple",
    birdCount: 3,
    species: "  gull  ",
    notes: "  Two birds were unable to walk.  ",
    hasCoordinates: true,
    hasManualLocation: true,
  });

  assert.ok(input);
  assert.deepEqual(JSON.parse(buildReportSummaryEvidence(input)), {
    observation: { type: "multiple birds", count: 3 },
    species: "gull",
    additionalObservations: "Two birds were unable to walk.",
    location: {
      deviceCoordinatesCaptured: true,
      manualDescriptionProvided: true,
    },
  });
});

test("rejects explicit diagnostic certainty", () => {
  assert.equal(
    isAcceptableGeneratedSummary("The bird has bird flu."),
    false,
  );
  assert.equal(
    isAcceptableGeneratedSummary(
      "One deceased bird was observed. No diagnosis has been made.",
    ),
    true,
  );
});
