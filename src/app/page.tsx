import { Button } from "@/shared/ui/button";
import { BrandMark } from "@/shared/ui/brand/brand-mark";
import { MadLabzAttribution } from "@/shared/ui/madlabz-attribution";
import { PageContainer } from "@/shared/ui/page-container";
import { ScreenHeader } from "@/shared/ui/screen-header";

export default function HomePage() {
  return (
    <PageContainer>
      <div className="my-auto w-full max-w-xl self-center py-4 sm:py-8">
        <div className="mb-6">
          <BrandMark />
        </div>
        <div className="max-w-lg">
          <ScreenHeader
            title="Report a sick or dead bird in under 60 seconds"
            description="Take a photo, confirm the location, and answer a few simple questions. We’ll help prepare a clear report."
          />
        </div>

        <div className="mt-8">
          <form action="/report/safety" method="get">
            <Button type="submit">Start report</Button>
          </form>
        </div>

        <div className="border-foreground/15 bg-selection/50 mt-6 rounded-2xl border p-4">
          <p className="text-foreground-muted text-sm leading-6">
            You do not need to identify the bird yourself.
          </p>
          <section
            aria-labelledby="safety-notice-title"
            className="border-foreground/15 mt-4 border-t pt-4"
          >
            <h2 id="safety-notice-title" className="text-sm font-semibold">
              Safety first
            </h2>
            <p className="text-foreground-muted mt-1 text-sm leading-6">
              Do not touch or move the bird.
            </p>
          </section>
        </div>

        <div className="mt-6">
          <MadLabzAttribution />
        </div>
      </div>
    </PageContainer>
  );
}
