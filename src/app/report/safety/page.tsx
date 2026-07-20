import { Button } from "@/shared/ui/button";
import { PageContainer } from "@/shared/ui/page-container";
import { ScreenHeader } from "@/shared/ui/screen-header";

export default function SafetyPage() {
  return (
    <PageContainer>
      <div className="my-auto w-full max-w-xl self-center py-4 sm:py-8">
        <ScreenHeader
          title="Stay safe first"
          description="Avoid touching or moving the bird. If possible, keep children and pets away from the area while you complete your report."
        />

        <ul className="mt-8 list-disc space-y-3 pl-6 text-base leading-6 marker:text-primary">
          <li>Do not touch the bird.</li>
          <li>Keep a safe distance.</li>
          <li>Photograph the bird from where you are.</li>
          <li>Report what you can safely observe.</li>
        </ul>

        <form action="/report/photo" method="get" className="mt-8">
          <Button type="submit">Continue</Button>
        </form>
      </div>
    </PageContainer>
  );
}
