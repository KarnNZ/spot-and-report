"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import type { ObservationType } from "@/features/report/session/report-session";
import { useReportSession } from "@/features/report/session/use-report-session";
import { ReportSubmissionService } from "@/features/report/submission/report-submission-service";
import { Button } from "@/shared/ui/button";

const OBSERVATION_LABELS: Record<ObservationType, string> = {
  dead: "Dead bird",
  sick: "Sick or injured bird",
  multiple: "Multiple birds",
};

const reportSubmissionService = new ReportSubmissionService();

export function ReportReviewSummary() {
  const router = useRouter();
  const { session } = useReportSession();
  const submissionInProgress = useRef(false);
  const [previewObjectUrl, setPreviewObjectUrl] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionError, setSubmissionError] = useState<string | null>(null);
  const { photo, location, questions } = session;
  const hasReportData = Boolean(
    photo ||
    location.coordinates ||
    location.manualDescription.trim() ||
    questions.observationType ||
    questions.species.trim() ||
    questions.notes.trim(),
  );

  useEffect(() => {
    if (!photo) {
      return;
    }

    const objectUrl = URL.createObjectURL(photo);
    // File objects can only receive browser object URLs after hydration.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPreviewObjectUrl(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [photo]);

  if (!hasReportData) {
    return (
      <section aria-labelledby="expired-report-heading" className="mt-8">
        <h2 id="expired-report-heading" className="text-xl font-semibold">
          Your report has expired.
        </h2>
        <p className="text-foreground-muted mt-3 leading-7">
          Please begin a new report.
        </p>
        <div className="mt-8">
          <Button onClick={() => router.push("/")}>Start again</Button>
        </div>
      </section>
    );
  }

  const observationLabel = questions.observationType
    ? OBSERVATION_LABELS[questions.observationType]
    : "Not provided";
  const species = questions.species.trim() || "Not provided";
  const notes = questions.notes.trim() || "No additional observations.";

  async function handleSubmit() {
    if (submissionInProgress.current) {
      return;
    }

    submissionInProgress.current = true;
    setIsSubmitting(true);
    setSubmissionError(null);

    try {
      const submission = await reportSubmissionService.submit(session);
      const searchParams = new URLSearchParams({
        reference: submission.reference,
        submittedAt: submission.submittedAt.toISOString(),
      });

      router.push(`/report/submit?${searchParams.toString()}`);
    } catch (error) {
      submissionInProgress.current = false;
      setIsSubmitting(false);
      setSubmissionError(
        error instanceof Error
          ? error.message
          : "The report could not be submitted.",
      );
    }
  }

  return (
    <div className="mt-8">
      <div className="space-y-4">
        <section
          aria-labelledby="review-photo-heading"
          className="border-foreground/15 rounded-xl border p-4"
        >
          <h2 id="review-photo-heading" className="text-lg font-semibold">
            Photo
          </h2>
          {photo ? (
            previewObjectUrl ? (
              <div className="mt-4 flex min-h-48 items-center justify-center overflow-hidden rounded-lg">
                {/* Blob URLs are local-only and cannot use Next.js image optimization. */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={previewObjectUrl}
                  alt="The bird selected for this report."
                  className="block h-auto max-h-80 w-auto max-w-full object-contain"
                />
              </div>
            ) : (
              <p className="text-foreground-muted mt-3">
                Preparing photo preview…
              </p>
            )
          ) : (
            <p className="text-foreground-muted mt-3">No photo selected</p>
          )}
        </section>

        <section
          aria-labelledby="review-location-heading"
          className="border-foreground/15 rounded-xl border p-4"
        >
          <h2 id="review-location-heading" className="text-lg font-semibold">
            Location
          </h2>
          {location.coordinates ? (
            <dl className="mt-3 grid grid-cols-2 gap-x-4 gap-y-3 text-sm leading-6">
              <div>
                <dt className="text-foreground-muted">Latitude</dt>
                <dd className="font-semibold">
                  {location.coordinates.latitude.toFixed(5)}
                </dd>
              </div>
              <div>
                <dt className="text-foreground-muted">Longitude</dt>
                <dd className="font-semibold">
                  {location.coordinates.longitude.toFixed(5)}
                </dd>
              </div>
              <div className="col-span-2">
                <dt className="text-foreground-muted">Accuracy</dt>
                <dd className="font-semibold">
                  About {Math.round(location.coordinates.accuracy)} metres
                </dd>
              </div>
            </dl>
          ) : (
            <p className="text-foreground-muted mt-3">
              No device location captured
            </p>
          )}
          {location.manualDescription.trim() ? (
            <div className="border-foreground/15 mt-4 border-t pt-4">
              <h3 className="text-foreground-muted text-sm">Description</h3>
              <p className="mt-1 leading-7">{location.manualDescription}</p>
            </div>
          ) : null}
        </section>

        <section
          aria-labelledby="review-observation-heading"
          className="border-foreground/15 rounded-xl border p-4"
        >
          <h2
            id="review-observation-heading"
            className="text-lg font-semibold"
          >
            Observation
          </h2>
          <p className="mt-3 leading-7">{observationLabel}</p>
          <p className="mt-2 leading-7">
            <span className="font-semibold">Birds observed:</span>{" "}
            {questions.birdCount}
          </p>
          <p className="mt-2 leading-7">
            <span className="font-semibold">Species:</span> {species}
          </p>
        </section>

        <section
          aria-labelledby="review-notes-heading"
          className="border-foreground/15 rounded-xl border p-4"
        >
          <h2 id="review-notes-heading" className="text-lg font-semibold">
            Notes
          </h2>
          <p className="mt-3 whitespace-pre-wrap leading-7">{notes}</p>
        </section>
      </div>

      <div className="mt-8 space-y-3">
        <Button
          disabled={isSubmitting}
          aria-busy={isSubmitting}
          onClick={handleSubmit}
        >
          {isSubmitting ? "Submitting..." : "Submit report"}
        </Button>
        {submissionError ? (
          <p role="alert" className="text-sm font-semibold leading-6">
            {submissionError}
          </p>
        ) : null}
        <Link
          href="/report/questions"
          className="text-primary hover:text-primary-hover active:text-primary-active flex min-h-12 w-full items-center justify-center rounded-xl px-5 py-3 text-center font-semibold underline-offset-4 hover:underline"
        >
          Back
        </Link>
      </div>
    </div>
  );
}
