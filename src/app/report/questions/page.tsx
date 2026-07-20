import { ReportProgress } from "@/features/report/progress/report-progress";
import { ReportQuestionsForm } from "@/features/report/questions/report-questions-form";
import { PageContainer } from "@/shared/ui/page-container";
import { ScreenHeader } from "@/shared/ui/screen-header";

export default function QuestionsPage() {
  return (
    <PageContainer>
      <div className="my-auto w-full max-w-xl self-center py-4 sm:py-8">
        <ReportProgress currentStep="questions" />

        <ScreenHeader
          title="Answer a few questions"
          description="Share what you safely observed. You do not need to identify the bird."
        />

        <ReportQuestionsForm />
      </div>
    </PageContainer>
  );
}
