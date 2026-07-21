"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  type FormEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import { useReportSession } from "@/features/report/session/use-report-session";
import {
  createReportSummaryInput,
  MAX_REPORT_SUMMARY_LENGTH,
} from "@/features/report/summary/report-summary";
import { Button } from "@/shared/ui/button";

interface SummaryApiResponse {
  summary?: string;
  error?: string;
}

export function ReportSummaryEditor() {
  const router = useRouter();
  const { session, setSummary } = useReportSession();
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationError, setGenerationError] = useState<string | null>(null);
  const generationAttempted = useRef(false);
  const generationInProgress = useRef(false);
  const userEditedSummary = useRef(false);
  const canContinue = session.summary.trim().length > 0;

  const generateSummary = useCallback(async () => {
    if (generationInProgress.current) {
      return;
    }

    generationInProgress.current = true;
    setIsGenerating(true);
    setGenerationError(null);

    try {
      const response = await fetch("/api/report/summary", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(createReportSummaryInput(session)),
      });
      const result = (await response.json()) as SummaryApiResponse;

      if (!response.ok || !result.summary) {
        throw new Error(
          result.error || "AI assistance is temporarily unavailable.",
        );
      }

      if (!userEditedSummary.current) {
        setSummary(result.summary);
      }
    } catch (error) {
      setGenerationError(
        error instanceof Error
          ? error.message
          : "AI assistance is temporarily unavailable.",
      );
    } finally {
      generationInProgress.current = false;
      setIsGenerating(false);
    }
  }, [session, setSummary]);

  useEffect(() => {
    if (session.summary.trim() || generationAttempted.current) {
      return;
    }

    generationAttempted.current = true;
    void generateSummary();
  }, [generateSummary, session.summary]);

  function handleContinue(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (canContinue) {
      router.push("/report/review");
    }
  }

  return (
    <form className="mt-8" onSubmit={handleContinue}>
      <div className="border-foreground/15 rounded-2xl border p-5">
        <label htmlFor="report-summary" className="block text-lg font-semibold">
          Report summary
        </label>
        <p
          id="report-summary-help"
          className="text-foreground-muted mt-2 text-sm leading-6"
        >
          You can edit or completely replace the suggested wording.
        </p>

        {isGenerating ? (
          <p
            id="report-summary-status"
            role="status"
            className="text-foreground-muted mt-4 text-sm font-semibold leading-6"
          >
            Generating your summary…
          </p>
        ) : null}

        {generationError ? (
          <div className="border-foreground/15 bg-selection/40 mt-4 rounded-xl border p-4">
            <p role="alert" className="text-sm font-semibold leading-6">
              {generationError}
            </p>
            <button
              type="button"
              className="text-primary hover:text-primary-hover active:text-primary-active focus-visible:outline-focus mt-2 inline-flex min-h-12 items-center rounded-lg px-2 text-sm font-semibold underline underline-offset-4 focus-visible:outline-[3px] focus-visible:outline-offset-2"
              onClick={() => {
                generationAttempted.current = true;
                void generateSummary();
              }}
            >
              Try again
            </button>
          </div>
        ) : null}

        <textarea
          id="report-summary"
          value={session.summary}
          maxLength={MAX_REPORT_SUMMARY_LENGTH}
          rows={7}
          aria-describedby="report-summary-help report-summary-disclaimer"
          placeholder="Your generated summary will appear here. You can also write your own."
          className="border-foreground/30 bg-background placeholder:text-foreground-muted/70 focus:border-primary focus:outline-focus mt-4 min-h-40 w-full resize-y rounded-xl border px-4 py-3 text-base leading-7 focus:outline-[3px] focus:outline-offset-[3px]"
          onChange={(event) => {
            userEditedSummary.current = true;
            setGenerationError(null);
            setSummary(event.currentTarget.value);
          }}
          onBlur={(event) => setSummary(event.currentTarget.value.trim())}
        />

        <p
          id="report-summary-disclaimer"
          className="text-foreground-muted mt-3 text-sm leading-6"
        >
          Generated with AI assistance. Please review before submitting.
        </p>
      </div>

      <div className="mt-8 space-y-3">
        <Button type="submit" disabled={!canContinue}>
          Continue
        </Button>
        <Link
          href="/report/questions"
          className="text-primary hover:text-primary-hover active:text-primary-active flex min-h-12 w-full items-center justify-center rounded-xl px-5 py-3 text-center font-semibold underline-offset-4 hover:underline"
        >
          Back
        </Link>
      </div>
    </form>
  );
}
