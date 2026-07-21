import { PageContainer } from "@/shared/ui/page-container";
import { Button } from "@/shared/ui/button";
import { BrandHeader } from "@/shared/ui/brand/brand-header";
import { MadLabzAttribution } from "@/shared/ui/madlabz-attribution";
import { ReportReference } from "@/features/report/submission/report-reference";

interface SubmitPageProps {
  searchParams: Promise<{
    reference?: string;
    submittedAt?: string;
    status?: string;
  }>;
}

export default async function SubmitPage({ searchParams }: SubmitPageProps) {
  const { reference, submittedAt, status } = await searchParams;
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
      <div className="w-full max-w-xl self-center py-4 text-center sm:py-8">
        <header className="mx-auto max-w-md">
          <BrandHeader />
          <h1 className="text-3xl leading-tight font-semibold tracking-tight sm:text-4xl">
            Thank you
          </h1>
          <p className="text-foreground-muted mt-3 text-lg leading-8">
            Report submitted
          </p>
        </header>

        <dl className="border-foreground/15 bg-selection/50 mt-8 rounded-2xl border p-5 text-left">
          <ReportReference reference={reference} />
          <div className="border-foreground/15 mt-4 border-t pt-4">
            <dt className="text-foreground-muted text-sm leading-6">Status</dt>
            <dd className="mt-1 font-semibold">
              {status === "submitted" ? "Submitted" : "Unavailable"}
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
            Your report has been securely recorded. It has not yet been
            automatically delivered to an external agency.
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
