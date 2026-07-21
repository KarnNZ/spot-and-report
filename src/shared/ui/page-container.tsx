import type { ReactNode } from "react";

interface PageContainerProps {
  children: ReactNode;
}

export function PageContainer({ children }: PageContainerProps) {
  return (
    <main className="mx-auto flex min-h-dvh w-full max-w-3xl flex-col px-5 pt-6 pb-[calc(1.5rem+env(safe-area-inset-bottom))] sm:px-8 sm:pt-8 sm:pb-[calc(2rem+env(safe-area-inset-bottom))]">
      {children}
    </main>
  );
}
