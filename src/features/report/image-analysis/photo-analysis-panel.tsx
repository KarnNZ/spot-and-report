"use client";

import { useEffect, useRef, useState } from "react";

import {
  createApprovedImageAnalysis,
  REPORT_IMAGE_ANALYSIS_DISCLAIMER,
  type GeneratedReportImageAnalysis,
} from "./report-image-analysis";
import {
  analyzeReportPhoto,
  ReportImageAnalysisClientError,
} from "./report-image-analysis-client";
import { ReportImageAnalysisResults } from "./report-image-analysis-results";
import { useReportSession } from "../session/use-report-session";

interface PhotoAnalysisPanelProps {
  photo: File;
  onContinue: () => void;
}

const secondaryActionClassName =
  "text-primary border-primary hover:bg-primary hover:text-primary-foreground active:bg-primary-active active:text-primary-foreground focus-visible:outline-focus flex min-h-12 w-full items-center justify-center rounded-xl border-2 px-5 py-3 text-center font-semibold focus-visible:outline-[3px] focus-visible:outline-offset-[3px] disabled:cursor-wait disabled:opacity-60";
const textActionClassName =
  "text-primary hover:text-primary-hover active:text-primary-active focus-visible:outline-focus flex min-h-12 w-full items-center justify-center rounded-xl px-5 py-3 text-center font-semibold underline-offset-4 hover:underline focus-visible:outline-[3px] focus-visible:outline-offset-[3px]";

export function PhotoAnalysisPanel({
  photo,
  onContinue,
}: PhotoAnalysisPanelProps) {
  const { session, approveImageAnalysis, clearImageAnalysis } =
    useReportSession();
  const requestInProgress = useRef(false);
  const currentPhoto = useRef(photo);
  const [generatedResult, setGeneratedResult] = useState<{
    photo: File;
    result: GeneratedReportImageAnalysis;
  } | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisError, setAnalysisError] = useState<string | null>(null);
  const currentGeneratedResult =
    generatedResult?.photo === photo ? generatedResult.result : null;
  const result = currentGeneratedResult ??
    (session.approvedImageAnalysis
      ? {
          analysis: session.approvedImageAnalysis.analysis,
          metadata: {
            model: session.approvedImageAnalysis.model,
            generatedAt: session.approvedImageAnalysis.generatedAt,
            schemaVersion: session.approvedImageAnalysis.schemaVersion,
          },
        }
      : null);
  const showingUnapprovedResult = currentGeneratedResult !== null;

  useEffect(() => {
    currentPhoto.current = photo;
  }, [photo]);

  async function handleAnalyze() {
    if (requestInProgress.current) {
      return;
    }

    requestInProgress.current = true;
    setIsAnalyzing(true);
    setAnalysisError(null);
    const analyzedPhoto = photo;

    try {
      const generated = await analyzeReportPhoto(analyzedPhoto);

      if (currentPhoto.current === analyzedPhoto) {
        setGeneratedResult({ photo: analyzedPhoto, result: generated });
      }
    } catch (error) {
      if (currentPhoto.current === analyzedPhoto) {
        setAnalysisError(
          error instanceof ReportImageAnalysisClientError
            ? error.message
            : "We couldn't analyse this image. You can try again or continue without AI assistance.",
        );
      }
    } finally {
      requestInProgress.current = false;
      setIsAnalyzing(false);
    }
  }

  function handleApprove() {
    if (!currentGeneratedResult) {
      return;
    }

    approveImageAnalysis(createApprovedImageAnalysis(currentGeneratedResult));
    setGeneratedResult(null);
    setAnalysisError(null);
  }

  function handleDiscard() {
    setGeneratedResult(null);
    setAnalysisError(null);
    clearImageAnalysis();
  }

  function handleContinueWithoutAnalysis() {
    handleDiscard();
    onContinue();
  }

  return (
    <section
      aria-labelledby="image-analysis-heading"
      className="border-foreground/15 bg-selection/30 mt-5 rounded-2xl border p-4 sm:p-5"
    >
      <h2 id="image-analysis-heading" className="text-lg font-semibold">
        AI-assisted observations
      </h2>
      <p className="text-foreground-muted mt-2 text-sm leading-6">
        Use AI to describe visible details that may help complete your report.
      </p>

      {isAnalyzing ? (
        <p role="status" className="mt-4 font-semibold" aria-live="polite">
          Analysing photo…
        </p>
      ) : null}

      {analysisError ? (
        <div className="mt-4" role="alert">
          <p className="text-sm font-semibold leading-6">{analysisError}</p>
          <div className="mt-3 space-y-2">
            <button
              type="button"
              className={secondaryActionClassName}
              onClick={handleAnalyze}
            >
              Try again
            </button>
            <button
              type="button"
              className={textActionClassName}
              onClick={handleContinueWithoutAnalysis}
            >
              Continue without analysis
            </button>
          </div>
        </div>
      ) : null}

      {result ? (
        <div className="mt-4 border-t border-foreground/15 pt-4">
          {session.approvedImageAnalysis && !showingUnapprovedResult ? (
            <p className="text-sm font-semibold">Included in your report</p>
          ) : (
            <div className="space-y-2 text-sm font-semibold">
              <p>Review these observations before including them.</p>
              {session.approvedImageAnalysis ? (
                <p className="text-foreground-muted font-normal leading-6">
                  Your previously approved observations remain included until
                  you use or discard this result.
                </p>
              ) : null}
            </div>
          )}
          <ReportImageAnalysisResults analysis={result.analysis} />
          <p className="text-foreground-muted mt-4 text-sm leading-6">
            {REPORT_IMAGE_ANALYSIS_DISCLAIMER}
          </p>
          <div className="mt-4 space-y-2">
            {showingUnapprovedResult ? (
              <button
                type="button"
                className={secondaryActionClassName}
                onClick={handleApprove}
              >
                Use these observations
              </button>
            ) : null}
            <button
              type="button"
              className={textActionClassName}
              onClick={handleDiscard}
            >
              Discard
            </button>
            <button
              type="button"
              className={textActionClassName}
              disabled={isAnalyzing}
              onClick={handleAnalyze}
            >
              Analyse again
            </button>
          </div>
        </div>
      ) : analysisError ? null : (
        <button
          type="button"
          className={`${secondaryActionClassName} mt-4`}
          disabled={isAnalyzing}
          aria-busy={isAnalyzing}
          onClick={handleAnalyze}
        >
          {isAnalyzing ? "Analysing photo…" : "Analyse photo"}
        </button>
      )}
    </section>
  );
}
