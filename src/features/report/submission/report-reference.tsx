"use client";

import { useEffect, useRef, useState } from "react";

interface ReportReferenceProps {
  reference?: string;
}

type CopyStatus = "idle" | "copied" | "error";

export function ReportReference({ reference }: ReportReferenceProps) {
  const displayedReference = reference || "Unavailable";
  const [copyStatus, setCopyStatus] = useState<CopyStatus>("idle");
  const resetTimer = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (resetTimer.current !== null) {
        window.clearTimeout(resetTimer.current);
      }
    };
  }, []);

  function scheduleStatusReset() {
    if (resetTimer.current !== null) {
      window.clearTimeout(resetTimer.current);
    }

    resetTimer.current = window.setTimeout(() => {
      setCopyStatus("idle");
      resetTimer.current = null;
    }, 2_000);
  }

  async function handleCopy() {
    if (!reference || !navigator.clipboard) {
      setCopyStatus("error");
      scheduleStatusReset();
      return;
    }

    try {
      await navigator.clipboard.writeText(reference);
      setCopyStatus("copied");
    } catch {
      setCopyStatus("error");
    }

    scheduleStatusReset();
  }

  const statusMessage =
    copyStatus === "copied"
      ? "Report reference copied."
      : copyStatus === "error"
        ? "The report reference could not be copied."
        : "";

  return (
    <div>
      <dt className="text-foreground-muted text-sm leading-6">
        Report reference
      </dt>
      <dd className="mt-1 flex min-w-0 items-center gap-3">
        <span className="min-w-0 flex-1 text-lg leading-7 font-semibold tracking-wide break-all">
          {displayedReference}
        </span>
        <button
          type="button"
          disabled={!reference}
          onClick={handleCopy}
          className="text-primary border-primary hover:bg-primary hover:text-primary-foreground active:bg-primary-active active:text-primary-foreground focus-visible:outline-focus inline-flex min-h-12 shrink-0 items-center justify-center rounded-xl border-2 px-4 py-2 text-sm font-semibold focus-visible:outline-[3px] focus-visible:outline-offset-[3px] disabled:cursor-not-allowed disabled:opacity-50"
        >
          {copyStatus === "copied" ? "Copied" : "Copy"}
        </button>
      </dd>
      <p role="status" aria-live="polite" className="sr-only">
        {statusMessage}
      </p>
    </div>
  );
}
