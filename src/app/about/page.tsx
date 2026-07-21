import Link from "next/link";

import { BrandHeader } from "@/shared/ui/brand/brand-header";
import { PageContainer } from "@/shared/ui/page-container";
import { ScreenHeader } from "@/shared/ui/screen-header";

export default function AboutPage() {
  return (
    <PageContainer>
      <div className="w-full max-w-xl self-center py-4 sm:py-8">
        <BrandHeader />

        <ScreenHeader
          title="About Spot & Report"
          description="Spot & Report is a mobile-first service that guides people through preparing a clear report about a sick or dead wild bird."
        />

        <div className="border-foreground/15 mt-8 space-y-6 border-t pt-6">
          <section aria-labelledby="created-by-title">
            <h2 id="created-by-title" className="text-lg font-semibold">
              Created by MadLabz
            </h2>
            <p className="text-foreground-muted mt-2 leading-7">
              Spot & Report was created by MadLabz during OpenAI Build Week.
            </p>
          </section>

          <section aria-labelledby="project-purpose-title">
            <h2 id="project-purpose-title" className="text-lg font-semibold">
              Project purpose
            </h2>
            <p className="text-foreground-muted mt-2 leading-7">
              The project explores how calm, accessible software can make
              public wildlife reporting faster, clearer and safer.
            </p>
          </section>
        </div>

        <Link
          href="/"
          className="text-primary hover:text-primary-hover active:text-primary-active mt-8 inline-flex min-h-12 items-center rounded-xl px-3 font-semibold underline underline-offset-4"
        >
          Back to home
        </Link>
      </div>
    </PageContainer>
  );
}
