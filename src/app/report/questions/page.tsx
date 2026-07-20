import { PageContainer } from "@/shared/ui/page-container";
import { StepPlaceholder } from "@/shared/ui/step-placeholder";

export default function QuestionsPage() {
  return (
    <PageContainer>
      <div className="my-auto">
        <StepPlaceholder
          title="Answer a few questions"
          description="This step will ask a few simple questions about what you observed."
        />
      </div>
    </PageContainer>
  );
}
