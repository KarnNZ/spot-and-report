"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { type ChangeEvent, useEffect, useState } from "react";

import { useReportSession } from "@/features/report/session/use-report-session";
import { PhotoAnalysisPanel } from "@/features/report/image-analysis/photo-analysis-panel";
import {
  MAX_REPORT_PHOTO_SIZE_BYTES,
  REPORT_PHOTO_MIME_TYPES,
  isReportPhotoMimeType,
} from "@/features/report/submission/report-submission";
import { Button } from "@/shared/ui/button";

function getPhotoValidationError(file: File) {
  if (file.size === 0) {
    return "Choose a photo that is not empty.";
  }

  if (!isReportPhotoMimeType(file.type.toLowerCase())) {
    return "Choose a JPEG, PNG, WebP, HEIC or HEIF image.";
  }

  if (file.size > MAX_REPORT_PHOTO_SIZE_BYTES) {
    return "Choose an image no larger than 4 MB.";
  }

  return null;
}

export function PhotoPicker() {
  const router = useRouter();
  const { session, setPhoto } = useReportSession();
  const selectedFile = session.photo;
  const [previewObjectUrl, setPreviewObjectUrl] = useState<string | null>(null);
  const [validationFeedback, setValidationFeedback] = useState<string | null>(
    null,
  );

  useEffect(() => {
    if (!selectedFile) {
      return;
    }

    const objectUrl = URL.createObjectURL(selectedFile);
    // Restored files can only receive browser object URLs after hydration.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPreviewObjectUrl(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  function handlePhotoChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.currentTarget.files?.[0];

    if (!file) {
      return;
    }

    const validationError = getPhotoValidationError(file);

    if (validationError) {
      event.currentTarget.value = "";
      setValidationFeedback(
        selectedFile
          ? `${validationError} Your previous photo remains selected.`
          : validationError,
      );
      return;
    }

    setPhoto(file);
    setValidationFeedback(null);
    event.currentTarget.value = "";
  }

  function handleContinue() {
    if (selectedFile) {
      router.push("/report/location");
    }
  }

  const inputDescription = validationFeedback
    ? "photo-picker-help photo-picker-error"
    : "photo-picker-help";

  return (
    <div className="mt-8">
      <div className="border-foreground/15 rounded-2xl border p-4 sm:p-5">
        {selectedFile && previewObjectUrl ? (
          <figure>
            <div className="border-foreground/15 bg-foreground/[0.03] flex min-h-56 items-center justify-center overflow-hidden rounded-xl border p-3">
              {/* Blob URLs are local-only and cannot use Next.js image optimization. */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={previewObjectUrl}
                alt="Preview of your selected report photo."
                className="block h-auto max-h-80 w-auto max-w-full object-contain"
              />
            </div>
            <figcaption className="mt-3 text-sm leading-6">
              <span className="font-semibold">Selected photo:</span>{" "}
              <span className="text-foreground-muted">
                {selectedFile.name}
              </span>
            </figcaption>
          </figure>
        ) : null}

        <div className={selectedFile ? "mt-4" : undefined}>
          <div>
            <input
              id="report-camera-photo"
              type="file"
              accept={REPORT_PHOTO_MIME_TYPES.join(",")}
              capture="environment"
              aria-describedby={inputDescription}
              aria-invalid={validationFeedback ? true : undefined}
              className="peer sr-only"
              onChange={handlePhotoChange}
            />
            <label
              htmlFor="report-camera-photo"
              className="bg-primary text-primary-foreground hover:bg-primary-hover active:bg-primary-active peer-focus-visible:outline-focus flex min-h-12 w-full cursor-pointer items-center justify-center rounded-xl px-6 py-3.5 text-center text-base leading-6 font-semibold peer-focus-visible:outline-[3px] peer-focus-visible:outline-offset-[3px]"
            >
              {selectedFile ? "Take a different photo" : "Take Photo"}
            </label>
          </div>

          <div
            aria-hidden="true"
            className="text-foreground-muted my-4 flex items-center gap-3 text-xs font-semibold uppercase"
          >
            <span className="border-foreground/15 h-px flex-1 border-t" />
            <span>or</span>
            <span className="border-foreground/15 h-px flex-1 border-t" />
          </div>

          <div>
            <input
              id="report-upload-photo"
              type="file"
              accept={REPORT_PHOTO_MIME_TYPES.join(",")}
              aria-describedby={inputDescription}
              aria-invalid={validationFeedback ? true : undefined}
              className="peer sr-only"
              onChange={handlePhotoChange}
            />
            <label
              htmlFor="report-upload-photo"
              className="text-primary border-primary hover:bg-primary hover:text-primary-foreground active:bg-primary-active active:text-primary-foreground peer-focus-visible:outline-focus flex min-h-12 w-full cursor-pointer items-center justify-center rounded-xl border-2 px-6 py-3.5 text-center text-base leading-6 font-semibold peer-focus-visible:outline-[3px] peer-focus-visible:outline-offset-[3px]"
            >
              {selectedFile
                ? "Choose a different image"
                : "Upload Existing Photo"}
            </label>
          </div>
        </div>

        <p
          id="photo-picker-help"
          className="text-foreground-muted mt-3 text-sm leading-6"
        >
          Choose one JPEG, PNG, WebP, HEIC or HEIF image up to 4 MB. It is
          securely stored only when you submit the report.
        </p>

        {validationFeedback ? (
          <p
            id="photo-picker-error"
            role="alert"
            className="mt-3 text-sm font-semibold leading-6"
          >
            {validationFeedback}
          </p>
        ) : null}
      </div>

      {selectedFile && previewObjectUrl ? (
        <PhotoAnalysisPanel
          key={previewObjectUrl}
          photo={selectedFile}
          onContinue={handleContinue}
        />
      ) : null}

      <div className="mt-6 space-y-3">
        <Button
          type="button"
          disabled={!selectedFile}
          onClick={handleContinue}
        >
          Continue
        </Button>
        <Link
          href="/report/safety"
          className="text-primary hover:text-primary-hover active:text-primary-active flex min-h-12 w-full items-center justify-center rounded-xl px-5 py-3 text-center font-semibold underline-offset-4 hover:underline"
        >
          Back
        </Link>
      </div>
    </div>
  );
}
