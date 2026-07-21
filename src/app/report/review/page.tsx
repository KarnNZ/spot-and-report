import { ReportPageLayout } from "@/features/report/layout/report-page-layout";
import { ReportReviewSummary } from "@/features/report/review/report-review-summary";

export default function ReviewPage() {
  return (
    <ReportPageLayout
      currentStep="review"
      title="Review your report"
      description="Check the details below before submitting your report."
    >

      <ReportReviewSummary />
    </ReportPageLayout>
  );
}
