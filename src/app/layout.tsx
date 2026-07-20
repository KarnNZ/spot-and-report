import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";

import "./globals.css";

export const metadata: Metadata = {
  applicationName: "Spot & Report",
  title: {
    default: "Spot & Report",
    template: "%s | Spot & Report",
  },
  description:
    "Report a sick or dead wild bird quickly and safely with a clear, guided experience.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en-NZ">
      <body>{children}</body>
    </html>
  );
}
