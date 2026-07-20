"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import type { FormEvent } from "react";

import type { ObservationType } from "@/features/report/session/report-session";
import { useReportSession } from "@/features/report/session/use-report-session";
import { Button } from "@/shared/ui/button";

const OBSERVATION_OPTIONS: ReadonlyArray<{
  label: string;
  value: ObservationType;
}> = [
  { label: "Dead bird", value: "dead" },
  { label: "Sick or injured bird", value: "sick" },
  { label: "Multiple birds", value: "multiple" },
];

const MAX_SPECIES_LENGTH = 100;
const MAX_NOTES_LENGTH = 500;

export function ReportQuestionsForm() {
  const router = useRouter();
  const {
    session,
    setObservationType,
    setBirdCount,
    setSpecies,
    setNotes,
  } = useReportSession();
  const { observationType, birdCount, species, notes } = session.questions;
  const isBirdCountValid =
    Number.isInteger(birdCount) && birdCount >= 1 && birdCount <= 999;
  const canContinue = observationType !== null && isBirdCountValid;

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (canContinue) {
      router.push("/report/review");
    }
  }

  return (
    <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
      <fieldset className="border-foreground/15 rounded-2xl border p-5">
        <legend className="text-lg font-semibold">What did you observe?</legend>
        <div className="mt-3 space-y-3">
          {OBSERVATION_OPTIONS.map((option) => (
            <label
              key={option.value}
              className="border-foreground/30 bg-background hover:border-primary/60 has-checked:border-primary has-checked:bg-selection flex min-h-12 cursor-pointer items-center gap-3 rounded-xl border px-4 py-3"
            >
              <input
                type="radio"
                name="observation-type"
                value={option.value}
                checked={observationType === option.value}
                required
                className="accent-primary h-5 w-5 shrink-0"
                onChange={() => setObservationType(option.value)}
              />
              <span className="font-medium">{option.label}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <div className="border-foreground/15 rounded-2xl border p-5">
        <label htmlFor="bird-count" className="block text-lg font-semibold">
          Approximately how many birds?
        </label>
        <input
          id="bird-count"
          type="number"
          inputMode="numeric"
          min={1}
          max={999}
          step={1}
          required
          value={birdCount === 0 ? "" : birdCount}
          className="border-foreground/30 bg-background focus:border-primary focus:outline-focus mt-3 min-h-12 w-full rounded-xl border px-4 py-3 text-base leading-6 focus:outline-[3px] focus:outline-offset-[3px]"
          onChange={(event) => {
            const nextBirdCount = event.currentTarget.valueAsNumber;
            setBirdCount(Number.isNaN(nextBirdCount) ? 0 : nextBirdCount);
          }}
        />
      </div>

      <div className="border-foreground/15 rounded-2xl border p-5">
        <label htmlFor="bird-species" className="block text-lg font-semibold">
          Do you know the species?{" "}
          <span className="text-foreground-muted text-sm font-normal">
            (optional)
          </span>
        </label>
        <input
          id="bird-species"
          type="text"
          value={species}
          maxLength={MAX_SPECIES_LENGTH}
          placeholder="For example: duck, gull, swan"
          className="border-foreground/30 bg-background placeholder:text-foreground-muted/70 focus:border-primary focus:outline-focus mt-3 min-h-12 w-full rounded-xl border px-4 py-3 text-base leading-6 focus:outline-[3px] focus:outline-offset-[3px]"
          onChange={(event) => setSpecies(event.currentTarget.value)}
          onBlur={(event) => setSpecies(event.currentTarget.value.trim())}
        />
      </div>

      <div className="border-foreground/15 rounded-2xl border p-5">
        <label
          htmlFor="observation-notes"
          className="block text-lg font-semibold"
        >
          Anything else you noticed?{" "}
          <span className="text-foreground-muted text-sm font-normal">
            (optional)
          </span>
        </label>
        <textarea
          id="observation-notes"
          value={notes}
          maxLength={MAX_NOTES_LENGTH}
          rows={4}
          placeholder="For example: difficulty walking, unusual behaviour, visible injuries"
          className="border-foreground/30 bg-background placeholder:text-foreground-muted/70 focus:border-primary focus:outline-focus mt-3 min-h-28 w-full resize-y rounded-xl border px-4 py-3 text-base leading-6 focus:outline-[3px] focus:outline-offset-[3px]"
          onChange={(event) => setNotes(event.currentTarget.value)}
          onBlur={(event) => setNotes(event.currentTarget.value.trim())}
        />
      </div>

      <div className="space-y-3 pt-4">
        <Button type="submit" disabled={!canContinue}>
          Continue
        </Button>
        <Link
          href="/report/location"
          className="text-primary hover:text-primary-hover active:text-primary-active flex min-h-12 w-full items-center justify-center rounded-xl px-5 py-3 text-center font-semibold underline-offset-4 hover:underline"
        >
          Back
        </Link>
      </div>
    </form>
  );
}
