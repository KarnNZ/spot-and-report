import assert from "node:assert/strict";
import test from "node:test";

import {
  persistReport,
  REPORT_PHOTO_BUCKET,
} from "./report-persistence.ts";
import {
  completeReportSubmission,
  createReportSubmissionFormData,
  ReportSubmissionService,
} from "./report-submission-service.ts";
import { MAX_REPORT_PHOTO_SIZE_BYTES } from "./report-submission.ts";
import { parseReportSubmissionFormData } from "./report-submission-validation.ts";
import { getSafeErrorDiagnostic } from "../../../server/diagnostics/safe-error-diagnostic.ts";

const REPORT_ID = "7ee06b9e-1111-4222-8333-123456789abc";
const SUBMITTED_AT = "2026-07-21T02:03:04.000Z";
const APPROVED_IMAGE_ANALYSIS = {
  analysis: {
    schemaVersion: "1.0",
    possibleBirdType: { value: "Possible gull", confidence: "medium" },
    estimatedVisibleBirdCount: { value: 1, confidence: "high" },
    apparentCondition: { value: "unclear", confidence: "low" },
    visibleConcerns: {
      value: ["Image does not allow assessment"],
      confidence: "low",
    },
    environment: { value: "Park", confidence: "medium" },
  },
  model: "gpt-5.6-terra",
  schemaVersion: "1.0",
  generatedAt: "2026-07-21T02:00:00.000Z",
  approvedAt: "2026-07-21T02:01:00.000Z",
};

function createPhoto({
  name = "bird photo.jpg",
  type = "image/jpeg",
  size = 12,
} = {}) {
  return new File([new Uint8Array(size)], name, { type });
}

function createValidFormData({
  photo = createPhoto(),
  incidentType = "dead",
  birdCount = "1",
  species = "",
  notes = "",
  latitude = "-43.5321",
  longitude = "172.6362",
  accuracy = "12.5",
  manualLocation = "",
  summary = "One deceased bird was observed at the reported location.",
  imageAnalysis = null,
} = {}) {
  const formData = new FormData();
  formData.append("photo", photo);
  formData.append("incidentType", incidentType);
  formData.append("birdCount", birdCount);
  formData.append("reporterSpecies", species);
  formData.append("reporterNotes", notes);
  formData.append("manualLocationDescription", manualLocation);
  formData.append("aiSummary", summary);
  if (imageAnalysis !== null) {
    formData.append("imageAnalysis", JSON.stringify(imageAnalysis));
  }

  if (latitude !== null) formData.append("latitude", latitude);
  if (longitude !== null) formData.append("longitude", longitude);
  if (accuracy !== null) formData.append("locationAccuracyMeters", accuracy);

  return formData;
}

function createSession() {
  return {
    photo: createPhoto(),
    approvedImageAnalysis: null,
    location: {
      coordinates: {
        latitude: -43.5321,
        longitude: 172.6362,
        accuracy: 12.5,
      },
      manualDescription: "",
    },
    questions: {
      observationType: "dead",
      birdCount: 1,
      species: "",
      notes: "",
    },
    summary: "One deceased bird was observed at the reported location.",
  };
}

function createGateway(overrides = {}) {
  const calls = { uploads: [], inserts: [], removals: [] };
  const confirmation = {
    reference: "REP-20260721-7EE06B9E1111",
    submittedAt: SUBMITTED_AT,
    status: "submitted",
  };
  const gateway = {
    async uploadPhoto(input) {
      calls.uploads.push(input);
      return overrides.uploadResult ?? { ok: true };
    },
    async insertReport(input) {
      calls.inserts.push(input);
      return overrides.insertResult ?? { ok: true, report: confirmation };
    },
    async removePhoto(input) {
      calls.removals.push(input);
      return overrides.removeResult ?? { ok: true };
    },
  };
  return { gateway, calls, confirmation };
}

const deterministicOptions = {
  createReportId: () => REPORT_ID,
  now: () => new Date(SUBMITTED_AT),
};

test("accepts a complete valid report", () => {
  const result = parseReportSubmissionFormData(
    createValidFormData({
      species: "  gull  ",
      notes: "  Unable to walk.  ",
      manualLocation: "  Near the park entrance.  ",
    }),
  );

  assert.equal(result.success, true);
  assert.equal(result.payload.species, "gull");
  assert.equal(result.payload.notes, "Unable to walk.");
  assert.equal(
    result.payload.location.manualDescription,
    "Near the park entrance.",
  );
});

test("accepts GPS-only location", () => {
  assert.equal(parseReportSubmissionFormData(createValidFormData()).success, true);
});

test("accepts manual-only location", () => {
  const result = parseReportSubmissionFormData(
    createValidFormData({
      latitude: null,
      longitude: null,
      accuracy: null,
      manualLocation: "Beside the northern entrance.",
    }),
  );
  assert.equal(result.success, true);
  assert.equal(result.payload.location.coordinates, null);
});

test("accepts both GPS and manual location", () => {
  const result = parseReportSubmissionFormData(
    createValidFormData({ manualLocation: "Beside the northern entrance." }),
  );
  assert.equal(result.success, true);
});

test("rejects a report with no location", () => {
  const result = parseReportSubmissionFormData(
    createValidFormData({
      latitude: null,
      longitude: null,
      accuracy: null,
    }),
  );
  assert.equal(result.success, false);
  assert.ok(result.errors.includes("A location is required."));
});

test("rejects invalid latitude", () => {
  const result = parseReportSubmissionFormData(
    createValidFormData({ latitude: "91" }),
  );
  assert.equal(result.success, false);
  assert.ok(result.errors.includes("Latitude must be between -90 and 90."));
});

test("rejects invalid longitude", () => {
  const result = parseReportSubmissionFormData(
    createValidFormData({ longitude: "181" }),
  );
  assert.equal(result.success, false);
  assert.ok(result.errors.includes("Longitude must be between -180 and 180."));
});

test("rejects a zero bird count", () => {
  const result = parseReportSubmissionFormData(
    createValidFormData({ birdCount: "0" }),
  );
  assert.equal(result.success, false);
});

test("rejects an oversized image", () => {
  const result = parseReportSubmissionFormData(
    createValidFormData({
      photo: createPhoto({ size: MAX_REPORT_PHOTO_SIZE_BYTES + 1 }),
    }),
  );
  assert.equal(result.success, false);
  assert.ok(result.errors.includes("Photo must be 4 MB or smaller."));
});

test("rejects an unsupported image type", () => {
  const result = parseReportSubmissionFormData(
    createValidFormData({ photo: createPhoto({ type: "image/gif" }) }),
  );
  assert.equal(result.success, false);
  assert.ok(result.errors.includes("Photo type is not supported."));
});

test("rejects a missing summary", () => {
  const result = parseReportSubmissionFormData(
    createValidFormData({ summary: "   " }),
  );
  assert.equal(result.success, false);
  assert.ok(result.errors.includes("A report summary is required."));
});

test("accepts and normalizes an approved image analysis", () => {
  const result = parseReportSubmissionFormData(
    createValidFormData({ imageAnalysis: APPROVED_IMAGE_ANALYSIS }),
  );

  assert.equal(result.success, true);
  assert.deepEqual(result.payload.imageAnalysis, APPROVED_IMAGE_ANALYSIS);
});

test("rejects invalid or extended image analysis data", () => {
  const result = parseReportSubmissionFormData(
    createValidFormData({
      imageAnalysis: { ...APPROVED_IMAGE_ANALYSIS, unexpected: true },
    }),
  );

  assert.equal(result.success, false);
  assert.ok(result.errors.includes("Image analysis is invalid."));
});

test("uploads the photo before inserting one report", async () => {
  const { gateway, calls, confirmation } = createGateway();
  const result = await persistReport(
    createValidFormData(),
    gateway,
    deterministicOptions,
  );

  assert.deepEqual(result, { ok: true, report: confirmation });
  assert.equal(calls.uploads.length, 1);
  assert.equal(calls.inserts.length, 1);
  assert.equal(calls.removals.length, 0);
  assert.equal(calls.uploads[0].bucket, REPORT_PHOTO_BUCKET);
  assert.equal(calls.inserts[0].photoPath, calls.uploads[0].path);
  assert.equal(calls.inserts[0].imageAnalysis, null);
  assert.deepEqual(Object.keys(result.report).sort(), [
    "reference",
    "status",
    "submittedAt",
  ]);
});

test("stores only approved image-analysis fields", async () => {
  const { gateway, calls } = createGateway();
  const result = await persistReport(
    createValidFormData({ imageAnalysis: APPROVED_IMAGE_ANALYSIS }),
    gateway,
    deterministicOptions,
  );

  assert.equal(result.ok, true);
  assert.deepEqual(calls.inserts[0].imageAnalysis, APPROVED_IMAGE_ANALYSIS.analysis);
  assert.equal(calls.inserts[0].imageAnalysisModel, APPROVED_IMAGE_ANALYSIS.model);
  assert.equal(
    calls.inserts[0].imageAnalysisApprovedAt,
    APPROVED_IMAGE_ANALYSIS.approvedAt,
  );
});

test("does not submit discarded image analysis", () => {
  const engineResult = parseReportSubmissionFormData(createValidFormData());
  assert.equal(engineResult.success, true);
  const formData = createReportSubmissionFormData(engineResult.payload);
  assert.equal(formData.has("imageAnalysis"), false);
});

test("upload failure prevents database insertion", async () => {
  const { gateway, calls } = createGateway({
    uploadResult: { ok: false, reason: "operation-failed", errorCode: "UPLOAD" },
  });
  const result = await persistReport(
    createValidFormData(),
    gateway,
    deterministicOptions,
  );

  assert.equal(result.ok, false);
  assert.equal(result.error.code, "PHOTO_UPLOAD_FAILED");
  assert.equal(calls.inserts.length, 0);
  assert.equal(calls.removals.length, 0);
});

test("missing bucket returns a controlled configuration error", async () => {
  const { gateway } = createGateway({
    uploadResult: { ok: false, reason: "missing-bucket", errorCode: "404" },
  });
  const result = await persistReport(
    createValidFormData(),
    gateway,
    deterministicOptions,
  );

  assert.equal(result.ok, false);
  assert.equal(result.error.code, "BACKEND_NOT_CONFIGURED");
  assert.equal(result.error.message.includes("Supabase"), false);
});

test("insert failure removes the uploaded photo", async () => {
  const { gateway, calls } = createGateway({
    insertResult: { ok: false, reason: "operation-failed", errorCode: "INSERT" },
  });
  const result = await persistReport(
    createValidFormData(),
    gateway,
    deterministicOptions,
  );

  assert.equal(result.ok, false);
  assert.equal(result.error.code, "REPORT_SAVE_FAILED");
  assert.equal(calls.removals.length, 1);
  assert.equal(calls.removals[0].path, calls.uploads[0].path);
});

test("cleanup failure never produces false success", async () => {
  const diagnostics = [];
  const { gateway } = createGateway({
    insertResult: { ok: false, reason: "operation-failed", errorCode: "INSERT" },
    removeResult: { ok: false, reason: "operation-failed", errorCode: "REMOVE" },
  });
  const result = await persistReport(createValidFormData(), gateway, {
    ...deterministicOptions,
    onDiagnostic: (diagnostic) => diagnostics.push(diagnostic),
  });

  assert.equal(result.ok, false);
  assert.equal(result.error.code, "REPORT_SAVE_FAILED");
  assert.deepEqual(
    diagnostics.map((diagnostic) => diagnostic.category),
    ["report-insert", "photo-cleanup"],
  );
});

test("generated storage path excludes original name and location", async () => {
  const { gateway, calls } = createGateway();
  await persistReport(
    createValidFormData({
      photo: createPhoto({ name: "precise place bird.jpg" }),
      manualLocation: "Sensitive exact description",
    }),
    gateway,
    deterministicOptions,
  );

  const path = calls.uploads[0].path;
  assert.equal(path, `reports/${REPORT_ID}/photo.jpg`);
  assert.equal(path.includes("precise"), false);
  assert.equal(path.includes("Sensitive"), false);
  assert.equal(path.includes("-43"), false);
});

test("repeated client submission shares one pending request", async () => {
  let resolveRequest;
  let requestCount = 0;
  const request = new Promise((resolve) => {
    resolveRequest = resolve;
  });
  const service = new ReportSubmissionService(async () => {
    requestCount += 1;
    return request;
  });

  const firstSubmission = service.submit(createSession());
  const secondSubmission = service.submit(createSession());
  assert.equal(firstSubmission, secondSubmission);
  assert.equal(requestCount, 1);

  resolveRequest(
    Response.json(
      {
        ok: true,
        report: {
          reference: "REP-STORED",
          submittedAt: SUBMITTED_AT,
          status: "submitted",
        },
      },
      { status: 201 },
    ),
  );
  await firstSubmission;
});

test("failed submission preserves the current report session", async () => {
  let clearCount = 0;
  const service = new ReportSubmissionService(async () =>
    Response.json(
      {
        ok: false,
        error: {
          code: "REPORT_SAVE_FAILED",
          message: "Please try again.",
        },
      },
      { status: 502 },
    ),
  );

  await assert.rejects(
    completeReportSubmission(createSession(), () => {
      clearCount += 1;
    }, service),
  );
  assert.equal(clearCount, 0);
});

test("non-JSON submission responses identify an unavailable web address", async (t) => {
  t.mock.method(console, "error", () => {});
  const service = new ReportSubmissionService(async () =>
    new Response("Redirecting...", {
      status: 302,
      headers: { "Content-Type": "text/plain" },
    }),
  );

  await assert.rejects(
    service.submit(createSession()),
    /unavailable at this web address/,
  );
});

test("safe diagnostics omit messages and retain error classifications", () => {
  const certificateError = Object.assign(new Error("sensitive provider text"), {
    code: "UNABLE_TO_VERIFY_LEAF_SIGNATURE",
  });
  const transportError = Object.assign(new TypeError("fetch failed"), {
    cause: certificateError,
  });
  const storageError = Object.assign(new Error("fetch failed"), {
    name: "StorageUnknownError",
    originalError: transportError,
  });

  const diagnostic = getSafeErrorDiagnostic(storageError);

  assert.deepEqual(diagnostic, {
    errorName: "StorageUnknownError",
    errorCode: undefined,
    statusCode: undefined,
    underlyingErrorName: "TypeError",
    underlyingErrorCode: "UNABLE_TO_VERIFY_LEAF_SIGNATURE",
  });
  assert.equal("message" in diagnostic, false);
});

test("successful submission clears the draft and uses backend values", async () => {
  let clearCount = 0;
  const storedReport = {
    reference: "REP-BACKEND-VALUE",
    submittedAt: SUBMITTED_AT,
    status: "submitted",
  };
  const service = new ReportSubmissionService(async () =>
    Response.json({ ok: true, report: storedReport }, { status: 201 }),
  );
  const result = await completeReportSubmission(
    createSession(),
    () => {
      clearCount += 1;
    },
    service,
  );

  assert.deepEqual(result, storedReport);
  assert.equal(clearCount, 1);
});
