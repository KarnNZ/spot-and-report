import { ReportPageLayout } from "@/features/report/layout/report-page-layout";
import { ReportQuestionsForm } from "@/features/report/questions/report-questions-form";

export default function QuestionsPage() {
  return (
    <ReportPageLayout
      currentStep="questions"
      title="Answer a few questions"
      description="Share what you safely observed. You do not need to identify the bird."
    >

      <ReportQuestionsForm />
    </ReportPageLayout>
  );
}
