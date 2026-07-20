import { PageContainer } from "@/shared/ui/page-container";
import { StepPlaceholder } from "@/shared/ui/step-placeholder";

export default function PhotoPage() {
  return (
    <PageContainer>
      <div className="my-auto">
        <StepPlaceholder
          title="Add a photo"
          description="This step will let you add a photo of the bird to your report."
        />
      </div>
    </PageContainer>
  );
}
