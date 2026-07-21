import OpenAI from "openai";

import {
  DEFAULT_REPORT_IMAGE_ANALYSIS_MODEL,
  REPORT_IMAGE_ANALYSIS_JSON_SCHEMA,
  REPORT_IMAGE_ANALYSIS_SCHEMA_VERSION,
  parseReportImageAnalysis,
  type GeneratedReportImageAnalysis,
} from "./report-image-analysis.ts";

const REPORT_IMAGE_ANALYSIS_INSTRUCTIONS = `Analyse one bird-report image and return only the required structured observations.

Describe only visible evidence. Never diagnose disease or claim a cause of death. Treat a bird type as a possibility, never a confirmation. Count only visibly distinguishable birds. Never invent injuries. Use uncertainty or null when evidence is weak. Never infer an exact location. Ignore unrelated people, faces, number plates, house numbers, and personal details.

Visible concerns must describe only what the image supports. Never say an animal is healthy, uninjured, or free of injury.

Bad: The bird died from avian influenza.
Good: The bird appears motionless; cause cannot be determined from the image.
Bad: This is definitely a mallard.
Good: Possible mallard-like duck, medium confidence.
Bad: The bird has no injuries.
Good: No obvious external concern is visible in this image.`;

const REPORT_IMAGE_ANALYSIS_CONTEXT =
  "This image was supplied for a public report concerning a sick or deceased bird. Describe only what is visibly supported.";

interface OpenAIResponsesClient {
  responses: {
    create: (request: unknown) => Promise<{ output_text: string }>;
  };
}

interface ReportImageAnalysisServiceOptions {
  apiKey?: string;
  model?: string;
  client?: OpenAIResponsesClient;
  now?: () => Date;
}

export class ReportImageAnalysisConfigurationError extends Error {}

export class ReportImageAnalysisGenerationError extends Error {}

export class ReportImageAnalysisRateLimitError extends Error {}

function isRateLimitError(error: unknown): boolean {
  if (!error || typeof error !== "object") {
    return false;
  }

  const errorRecord = error as Record<string, unknown>;
  return errorRecord.status === 429 || errorRecord.code === "rate_limit_exceeded";
}

export class ReportImageAnalysisService {
  private readonly client: OpenAIResponsesClient;
  private readonly model: string;
  private readonly now: () => Date;

  constructor(options: ReportImageAnalysisServiceOptions = {}) {
    const { apiKey } = options;

    if (!apiKey && !options.client) {
      throw new ReportImageAnalysisConfigurationError(
        "The OpenAI API key is not configured.",
      );
    }

    this.client =
      options.client ??
      (new OpenAI({
        apiKey,
        maxRetries: 0,
        timeout: 20_000,
      }) as unknown as OpenAIResponsesClient);
    this.model = options.model ?? DEFAULT_REPORT_IMAGE_ANALYSIS_MODEL;
    this.now = options.now ?? (() => new Date());
  }

  async analyze(photo: File): Promise<GeneratedReportImageAnalysis> {
    const photoBytes = Buffer.from(await photo.arrayBuffer());
    const imageUrl = `data:${photo.type.toLowerCase()};base64,${photoBytes.toString("base64")}`;
    let response: { output_text: string };

    try {
      response = await this.client.responses.create({
        model: this.model,
        instructions: REPORT_IMAGE_ANALYSIS_INSTRUCTIONS,
        input: [
          {
            role: "user",
            content: [
              { type: "input_text", text: REPORT_IMAGE_ANALYSIS_CONTEXT },
              { type: "input_image", image_url: imageUrl, detail: "high" },
            ],
          },
        ],
        store: false,
        reasoning: { effort: "low" },
        text: {
          format: {
            type: "json_schema",
            name: "report_image_analysis",
            strict: true,
            schema: REPORT_IMAGE_ANALYSIS_JSON_SCHEMA,
          },
        },
        max_output_tokens: 800,
      });
    } catch (error) {
      if (isRateLimitError(error)) {
        throw new ReportImageAnalysisRateLimitError(
          "The image-analysis rate limit was reached.",
        );
      }

      throw new ReportImageAnalysisGenerationError(
        "The image-analysis provider request failed.",
      );
    }

    let parsedOutput: unknown;

    try {
      parsedOutput = JSON.parse(response.output_text);
    } catch {
      throw new ReportImageAnalysisGenerationError(
        "The image-analysis response was not valid JSON.",
      );
    }

    const analysis = parseReportImageAnalysis(parsedOutput);

    if (!analysis) {
      throw new ReportImageAnalysisGenerationError(
        "The image-analysis response did not match the required schema.",
      );
    }

    return {
      analysis,
      metadata: {
        model: this.model,
        generatedAt: this.now().toISOString(),
        schemaVersion: REPORT_IMAGE_ANALYSIS_SCHEMA_VERSION,
      },
    };
  }
}
