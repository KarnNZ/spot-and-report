import type { ReactNode } from "react";

import { ReportSessionProvider } from "@/features/report/session/report-session-provider";

interface ReportLayoutProps {
  children: ReactNode;
}

export default function ReportLayout({ children }: ReportLayoutProps) {
  return <ReportSessionProvider>{children}</ReportSessionProvider>;
}
