import type { ReactNode } from "react";

import {
  ReportProgress,
  type ReportStep,
} from "@/features/report/progress/report-progress";
import { BrandHeader } from "@/shared/ui/brand/brand-header";
import { PageContainer } from "@/shared/ui/page-container";
import { ScreenHeader } from "@/shared/ui/screen-header";

interface ReportPageLayoutProps {
  currentStep: ReportStep;
  title: string;
  description: string;
  children: ReactNode;
}

export function ReportPageLayout({
  currentStep,
  title,
  description,
  children,
}: ReportPageLayoutProps) {
  return (
    <PageContainer>
      <div className="w-full max-w-xl self-center py-4 sm:py-8">
        <BrandHeader />
        <ReportProgress currentStep={currentStep} />
        <ScreenHeader title={title} description={description} />
        {children}
      </div>
    </PageContainer>
  );
}
