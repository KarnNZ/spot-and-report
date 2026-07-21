import { ReportPageLayout } from "@/features/report/layout/report-page-layout";
import { ReportSummaryEditor } from "@/features/report/summary/report-summary-editor";

export default function SummaryPage() {
  return (
    <ReportPageLayout
      currentStep="summary"
      title="AI Generated Summary"
      description="Review the suggested report wording before continuing."
    >

      <ReportSummaryEditor />
    </ReportPageLayout>
  );
}
