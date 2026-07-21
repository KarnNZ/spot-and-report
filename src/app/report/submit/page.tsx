import { PageContainer } from "@/shared/ui/page-container";
import { Button } from "@/shared/ui/button";
import { BrandMark } from "@/shared/ui/brand/brand-mark";
import { MadLabzAttribution } from "@/shared/ui/madlabz-attribution";

interface SubmitPageProps {
  searchParams: Promise<{
    reference?: string;
    submittedAt?: string;
  }>;
}

export default async function SubmitPage({ searchParams }: SubmitPageProps) {
  const { reference, submittedAt } = await searchParams;
  const submissionDate = submittedAt ? new Date(submittedAt) : null;
  const submissionTime =
    submissionDate && !Number.isNaN(submissionDate.getTime())
      ? new Intl.DateTimeFormat("en-NZ", {
          dateStyle: "long",
          timeStyle: "short",
        }).format(submissionDate)
      : "Unavailable";

  return (
    <PageContainer>
      <div className="my-auto w-full max-w-xl self-center py-4 text-center sm:py-8">
        <header className="mx-auto max-w-md">
          <BrandMark />
          <h1 className="mt-6 text-3xl leading-tight font-semibold tracking-tight sm:text-4xl">
            Thank you
          </h1>
          <p className="text-foreground-muted mt-3 text-lg leading-8">
            Report submitted
          </p>
        </header>

        <dl className="border-foreground/15 bg-selection/50 mt-8 rounded-2xl border p-5 text-left">
          <div>
            <dt className="text-foreground-muted text-sm leading-6">
              Temporary report reference
            </dt>
            <dd className="mt-1 text-lg leading-7 font-semibold tracking-wide break-all">
              {reference || "Unavailable"}
            </dd>
          </div>
          <div className="border-foreground/15 mt-4 border-t pt-4">
            <dt className="text-foreground-muted text-sm leading-6">
              Submission time
            </dt>
            <dd className="mt-1 font-semibold">{submissionTime}</dd>
          </div>
        </dl>

        <div className="border-foreground/15 mt-6 rounded-xl border px-4 py-3">
          <p className="text-foreground-muted text-sm leading-6">
            This Build Week MVP simulates successful submission. Future
            versions will securely deliver reports to participating agencies.
          </p>
        </div>

        <form action="/" method="get" className="mt-8">
          <Button type="submit">Start another report</Button>
        </form>

        <div className="mt-6">
          <MadLabzAttribution />
        </div>
      </div>
    </PageContainer>
  );
}
