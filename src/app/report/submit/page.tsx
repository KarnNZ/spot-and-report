import { PageContainer } from "@/shared/ui/page-container";
import { StepPlaceholder } from "@/shared/ui/step-placeholder";

export default function SubmitPage() {
  return (
    <PageContainer>
      <div className="my-auto">
        <StepPlaceholder
          title="Submit your report"
          description="This step will handle report submission in a later slice."
        />
      </div>
    </PageContainer>
  );
}
