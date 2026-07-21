import { ReportStepPage } from "@/features/report/layout/report-step-page";
import { ReportProgress } from "@/features/report/progress/report-progress";
import { ReportSummaryEditor } from "@/features/report/summary/report-summary-editor";
import { ScreenHeader } from "@/shared/ui/screen-header";

export default function SummaryPage() {
  return (
    <ReportStepPage>
      <ReportProgress currentStep="summary" />

      <ScreenHeader
        title="AI Generated Summary"
        description="Review the suggested report wording before continuing."
      />

      <ReportSummaryEditor />
    </ReportStepPage>
  );
}
