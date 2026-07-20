import { ReportProgress } from "@/features/report/progress/report-progress";
import { ReportReviewSummary } from "@/features/report/review/report-review-summary";
import { PageContainer } from "@/shared/ui/page-container";
import { ScreenHeader } from "@/shared/ui/screen-header";

export default function ReviewPage() {
  return (
    <PageContainer>
      <div className="my-auto w-full max-w-xl self-center py-4 sm:py-8">
        <ReportProgress currentStep="review" />

        <ScreenHeader
          title="Review your report"
          description="Check the details below before submitting your report."
        />

        <ReportReviewSummary />
      </div>
    </PageContainer>
  );
}
