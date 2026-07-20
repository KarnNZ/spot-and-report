import { Button } from "@/shared/ui/button";
import { BrandMark } from "@/shared/ui/brand/brand-mark";
import { PageContainer } from "@/shared/ui/page-container";
import { ScreenHeader } from "@/shared/ui/screen-header";

export default function HomePage() {
  return (
    <PageContainer>
      <div className="my-auto w-full max-w-xl self-center py-4 sm:py-8">
        <div className="mb-3">
          <BrandMark />
        </div>
        <ScreenHeader
          title="Report a sick or dead bird in under 60 seconds"
          description="Take a photo, confirm the location, and answer a few simple questions. We’ll help prepare a clear report."
        />

        <div className="mt-8">
          <form action="/report/safety" method="get">
            <Button type="submit">Start report</Button>
          </form>
          <p className="text-foreground-muted mt-3 text-center text-sm leading-6">
            You do not need to identify the bird yourself.
          </p>
        </div>

        <section
          aria-labelledby="safety-notice-title"
          className="border-foreground/15 mt-8 border-t pt-5"
        >
          <h2 id="safety-notice-title" className="text-sm font-semibold">
            Safety first
          </h2>
          <p className="text-foreground-muted mt-1 text-sm leading-6">
            Do not touch or move the bird.
          </p>
        </section>
      </div>
    </PageContainer>
  );
}
