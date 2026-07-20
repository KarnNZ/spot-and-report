import { PageContainer } from "@/shared/ui/page-container";
import { StepPlaceholder } from "@/shared/ui/step-placeholder";

export default function SafetyPage() {
  return (
    <PageContainer>
      <div className="my-auto">
        <StepPlaceholder
          title="Safety guidance"
          description="This step will explain how to stay safe before you begin your report."
        />
      </div>
    </PageContainer>
  );
}
