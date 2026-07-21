import { ReportStepPage } from "@/features/report/layout/report-step-page";
import { ReportProgress } from "@/features/report/progress/report-progress";
import { ReportQuestionsForm } from "@/features/report/questions/report-questions-form";
import { ScreenHeader } from "@/shared/ui/screen-header";

export default function QuestionsPage() {
  return (
    <ReportStepPage>
      <ReportProgress currentStep="questions" />

      <ScreenHeader
        title="Answer a few questions"
        description="Share what you safely observed. You do not need to identify the bird."
      />

      <ReportQuestionsForm />
    </ReportStepPage>
  );
}
