import { PageContainer } from "@/shared/ui/page-container";
import { ScreenHeader } from "@/shared/ui/screen-header";

export default function HomePage() {
  return (
    <PageContainer>
      <div className="my-auto">
        <p className="text-primary mb-3 text-sm font-semibold tracking-wide uppercase">
          Spot &amp; Report
        </p>
        <ScreenHeader
          title="Project foundation ready"
          description="The mobile-first bird reporting journey will be built here in small, reviewable steps."
        />
      </div>
    </PageContainer>
  );
}
