import type { ReactNode } from "react";

import { BrandMark } from "@/shared/ui/brand/brand-mark";
import { PageContainer } from "@/shared/ui/page-container";

interface ReportStepPageProps {
  children: ReactNode;
}

export function ReportStepPage({ children }: ReportStepPageProps) {
  return (
    <PageContainer>
      <div className="my-auto w-full max-w-xl self-center py-4 sm:py-8">
        <div className="mb-6">
          <BrandMark />
        </div>
        {children}
      </div>
    </PageContainer>
  );
}
