import assert from "node:assert/strict";
import test from "node:test";

import {
  createApprovedImageAnalysis,
  parseReportImageAnalysis,
} from "./report-image-analysis.ts";
import { analyzeReportImageRequest } from "./report-image-analysis-endpoint.ts";
import {
  ReportImageAnalysisConfigurationError,
  ReportImageAnalysisGenerationError,
  ReportImageAnalysisRateLimitError,
  ReportImageAnalysisService,
} from "./report-image-analysis-service.ts";
import {
  withApprovedImageAnalysis,
  withReportPhoto,
  withoutApprovedImageAnalysis,
} from "../session/report-session.ts";
import { MAX_REPORT_PHOTO_SIZE_BYTES } from "../submission/report-submission.ts";

const ANALYSIS = {
  schemaVersion: "1.0",
  possibleBirdType: { value: "Mallard-like duck", confidence: "medium" },
  estimatedVisibleBirdCount: { value: 1, confidence: "high" },
  apparentCondition: { value: "possibly_deceased", confidence: "low" },
  visibleConcerns: {
    value: ["No obvious external concern is visible in this image"],
    confidence: "medium",
  },
  environment: { value: "Grass verge", confidence: "medium" },
};
const GENERATED_AT = "2026-07-21T03:00:00.000Z";

function createPhoto({ type = "image/jpeg", size = 12 } = {}) {
  return new File([new Uint8Array(size)], "bird.jpg", { type });
}

function createGeneratedAnalysis() {
  return {
    analysis: ANALYSIS,
    metadata: {
      model: "gpt-5.6-terra",
      generatedAt: GENERATED_AT,
      schemaVersion: "1.0",
    },
  };
}

function createFormData(photo = createPhoto()) {
  const formData = new FormData();
  formData.append("photo", photo);
  return formData;
}

function createSession(photo = createPhoto()) {
  return {
    photo,
    approvedImageAnalysis: null,
    location: { coordinates: null, manualDescription: "Park entrance" },
    questions: {
      observationType: "dead",
      birdCount: 1,
      species: "",
      notes: "",
    },
    summary: "One bird was observed.",
  };
}

test("parses the exact structured image-analysis schema", () => {
  assert.deepEqual(parseReportImageAnalysis(ANALYSIS), ANALYSIS);
  assert.equal(
    parseReportImageAnalysis({ ...ANALYSIS, diagnosis: "bird flu" }),
    null,
  );
});

test("rejects diagnostic or certainty language in structured observations", () => {
  assert.equal(
    parseReportImageAnalysis({
      ...ANALYSIS,
      visibleConcerns: {
        value: ["The bird died from avian influenza"],
        confidence: "high",
      },
    }),
    null,
  );
  assert.equal(
    parseReportImageAnalysis({
      ...ANALYSIS,
      possibleBirdType: { value: "Definitely a mallard", confidence: "high" },
    }),
    null,
  );
});

test("sends only one image and minimal context with strict structured output", async () => {
  let capturedRequest;
  const service = new ReportImageAnalysisService({
    apiKey: "test-only",
    model: "gpt-5.6-terra",
    now: () => new Date(GENERATED_AT),
    client: {
      responses: {
        async create(request) {
          capturedRequest = request;
          return { output_text: JSON.stringify(ANALYSIS) };
        },
      },
    },
  });

  const result = await service.analyze(createPhoto());

  assert.deepEqual(result, createGeneratedAnalysis());
  assert.equal(capturedRequest.store, false);
  assert.equal(capturedRequest.text.format.strict, true);
  assert.equal(capturedRequest.input.length, 1);
  assert.equal(capturedRequest.input[0].content.length, 2);
  assert.match(
    capturedRequest.input[0].content[1].image_url,
    /^data:image\/jpeg;base64,/,
  );
  const requestJson = JSON.stringify(capturedRequest);
  assert.equal(requestJson.includes("latitude"), false);
  assert.equal(requestJson.includes("longitude"), false);
  assert.equal(requestJson.includes("manualLocation"), false);
  assert.equal(requestJson.includes("reporter"), false);
  assert.equal("tools" in capturedRequest, false);
});

test("fails clearly when the OpenAI API key is missing", () => {
  assert.throws(
    () => new ReportImageAnalysisService({ apiKey: "" }),
    ReportImageAnalysisConfigurationError,
  );
});

test("rejects malformed structured model output", async () => {
  const service = new ReportImageAnalysisService({
    apiKey: "test-only",
    client: {
      responses: {
        async create() {
          return { output_text: '{"schemaVersion":"1.0"}' };
        },
      },
    },
  });

  await assert.rejects(
    service.analyze(createPhoto()),
    ReportImageAnalysisGenerationError,
  );
});

test("normalizes provider and rate-limit failures", async () => {
  const providerFailure = new ReportImageAnalysisService({
    apiKey: "test-only",
    client: {
      responses: {
        async create() {
          throw new Error("raw provider secret");
        },
      },
    },
  });
  const rateLimit = new ReportImageAnalysisService({
    apiKey: "test-only",
    client: {
      responses: {
        async create() {
          throw Object.assign(new Error("raw rate-limit response"), {
            status: 429,
          });
        },
      },
    },
  });

  await assert.rejects(
    providerFailure.analyze(createPhoto()),
    ReportImageAnalysisGenerationError,
  );
  await assert.rejects(
    rateLimit.analyze(createPhoto()),
    ReportImageAnalysisRateLimitError,
  );
});

test("validates missing, oversized and unsupported endpoint files", async () => {
  const analyzer = { analyze: async () => createGeneratedAnalysis() };
  const missing = await analyzeReportImageRequest(new FormData(), analyzer);
  const oversized = await analyzeReportImageRequest(
    createFormData(createPhoto({ size: MAX_REPORT_PHOTO_SIZE_BYTES + 1 })),
    analyzer,
  );
  const unsupported = await analyzeReportImageRequest(
    createFormData(createPhoto({ type: "image/heic" })),
    analyzer,
  );

  assert.equal(missing.body.error.code, "INVALID_IMAGE");
  assert.equal(oversized.body.error.code, "IMAGE_TOO_LARGE");
  assert.equal(unsupported.body.error.code, "UNSUPPORTED_IMAGE");
});

test("returns a valid endpoint result without leaking provider errors", async () => {
  const success = await analyzeReportImageRequest(createFormData(), {
    analyze: async () => createGeneratedAnalysis(),
  });
  const failure = await analyzeReportImageRequest(createFormData(), {
    analyze: async () => {
      throw new ReportImageAnalysisGenerationError("raw provider secret");
    },
  });
  const rateLimit = await analyzeReportImageRequest(createFormData(), {
    analyze: async () => {
      throw new ReportImageAnalysisRateLimitError("raw provider response");
    },
  });

  assert.equal(success.body.ok, true);
  assert.equal(failure.body.error.code, "ANALYSIS_FAILED");
  assert.equal(JSON.stringify(failure).includes("raw provider secret"), false);
  assert.equal(rateLimit.body.error.code, "RATE_LIMITED");
});

test("requires explicit approval and clears stale analysis on replacement", () => {
  const originalPhoto = createPhoto();
  const generated = createGeneratedAnalysis();
  const initialSession = createSession(originalPhoto);
  assert.equal(initialSession.approvedImageAnalysis, null);

  const approved = createApprovedImageAnalysis(
    generated,
    new Date("2026-07-21T03:01:00.000Z"),
  );
  const approvedSession = withApprovedImageAnalysis(initialSession, approved);
  assert.deepEqual(approvedSession.approvedImageAnalysis, approved);

  const discardedSession = withoutApprovedImageAnalysis(approvedSession);
  assert.equal(discardedSession.approvedImageAnalysis, null);
  assert.equal(discardedSession.photo, originalPhoto);

  const replacement = createPhoto({ type: "image/png" });
  const replacedSession = withReportPhoto(approvedSession, replacement);
  assert.equal(replacedSession.photo, replacement);
  assert.equal(replacedSession.approvedImageAnalysis, null);
});
