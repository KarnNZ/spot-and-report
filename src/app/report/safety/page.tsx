import Link from "next/link";

import { ReportStepPage } from "@/features/report/layout/report-step-page";
import { ReportProgress } from "@/features/report/progress/report-progress";
import { Button } from "@/shared/ui/button";
import { ScreenHeader } from "@/shared/ui/screen-header";

export default function SafetyPage() {
  return (
    <ReportStepPage>
      <ReportProgress currentStep="safety" />

      <ScreenHeader
        title="Stay safe first"
        description="Avoid touching or moving the bird. If possible, keep children and pets away from the area while you complete your report."
      />

      <div className="border-foreground/15 bg-selection/40 mt-8 rounded-2xl border p-5">
        <ul className="list-disc space-y-3 pl-5 text-base leading-7 marker:text-primary">
          <li>Do not touch the bird.</li>
          <li>Keep a safe distance.</li>
          <li>Photograph the bird from where you are.</li>
          <li>Report what you can safely observe.</li>
        </ul>
      </div>

      <div className="mt-6 space-y-3">
        <form action="/report/photo" method="get">
          <Button type="submit">Continue</Button>
        </form>
        <Link
          href="/"
          className="text-primary hover:text-primary-hover active:text-primary-active flex min-h-12 w-full items-center justify-center rounded-xl px-5 py-3 text-center font-semibold underline-offset-4 hover:underline"
        >
          Back
        </Link>
      </div>
    </ReportStepPage>
  );
}
