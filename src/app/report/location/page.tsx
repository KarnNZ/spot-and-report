import { PageContainer } from "@/shared/ui/page-container";
import { StepPlaceholder } from "@/shared/ui/step-placeholder";

export default function LocationPage() {
  return (
    <PageContainer>
      <div className="my-auto">
        <StepPlaceholder
          title="Confirm the location"
          description="This step will let you confirm where you found the bird."
        />
      </div>
    </PageContainer>
  );
}
