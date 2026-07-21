export type ReportStep =
  | "safety"
  | "photo"
  | "location"
  | "questions"
  | "summary"
  | "review";

export interface ReportProgressProps {
  currentStep: ReportStep;
}

const REPORT_STEPS: ReadonlyArray<{
  id: ReportStep;
  label: string;
}> = [
  { id: "safety", label: "Safety" },
  { id: "photo", label: "Photo" },
  { id: "location", label: "Location" },
  { id: "questions", label: "Questions" },
  { id: "summary", label: "AI Summary" },
  { id: "review", label: "Review" },
];

export function ReportProgress({ currentStep }: ReportProgressProps) {
  const stepIndex = REPORT_STEPS.findIndex((step) => step.id === currentStep);
  const stepNumber = stepIndex + 1;
  const stepLabel = REPORT_STEPS[stepIndex].label;
  const progressText = `Step ${stepNumber} of ${REPORT_STEPS.length}: ${stepLabel}`;

  return (
    <section aria-label="Report progress" className="mb-8">
      <p className="text-foreground-muted text-xs leading-5 font-medium tracking-wide">
        Step {stepNumber} of {REPORT_STEPS.length}
      </p>
      <p className="mt-0.5 text-sm leading-5 font-semibold">{stepLabel}</p>
      <div
        role="progressbar"
        aria-valuemin={1}
        aria-valuemax={REPORT_STEPS.length}
        aria-valuenow={stepNumber}
        aria-valuetext={progressText}
        className="bg-foreground/10 mt-3 h-1.5 overflow-hidden rounded-full"
      >
        <div
          aria-hidden="true"
          className="bg-primary h-full rounded-full"
          style={{ width: `${(stepNumber / REPORT_STEPS.length) * 100}%` }}
        />
      </div>
    </section>
  );
}
