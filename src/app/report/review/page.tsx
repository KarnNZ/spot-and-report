import { ReportStepPage } from "@/features/report/layout/report-step-page";
import { ReportProgress } from "@/features/report/progress/report-progress";
import { ReportReviewSummary } from "@/features/report/review/report-review-summary";
import { ScreenHeader } from "@/shared/ui/screen-header";

export default function ReviewPage() {
  return (
    <ReportStepPage>
      <ReportProgress currentStep="review" />

      <ScreenHeader
        title="Review your report"
        description="Check the details below before submitting your report."
      />

      <ReportReviewSummary />
    </ReportStepPage>
  );
}
