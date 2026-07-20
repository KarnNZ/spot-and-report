import { PageContainer } from "@/shared/ui/page-container";
import { StepPlaceholder } from "@/shared/ui/step-placeholder";

export default function ReviewPage() {
  return (
    <PageContainer>
      <div className="my-auto">
        <StepPlaceholder
          title="Review your report"
          description="This step will let you check your report before continuing."
        />
      </div>
    </PageContainer>
  );
}
