import { ReportPageLayout } from "@/features/report/layout/report-page-layout";
import { Button } from "@/shared/ui/button";

export default function SafetyPage() {
  return (
    <ReportPageLayout
      currentStep="safety"
      title="Stay safe first"
      description="Avoid touching or moving the bird. If possible, keep children and pets away from the area while you complete your report."
    >
      <div className="border-foreground/15 bg-selection/40 mt-8 rounded-2xl border p-5">
        <ul className="list-disc space-y-3 pl-5 text-base leading-7 marker:text-primary">
          <li>Do not touch the bird.</li>
          <li>Keep a safe distance.</li>
          <li>Photograph the bird from where you are.</li>
          <li>Report what you can safely observe.</li>
        </ul>
      </div>

      <div className="mt-6">
        <form action="/report/photo" method="get">
          <Button type="submit">Continue</Button>
        </form>
      </div>
    </ReportPageLayout>
  );
}
