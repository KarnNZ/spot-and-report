import { ReportPageLayout } from "@/features/report/layout/report-page-layout";
import { PhotoPicker } from "@/features/report/photo/photo-picker";

export default function PhotoPage() {
  return (
    <ReportPageLayout
      currentStep="photo"
      title="Add a photo"
      description="Take a clear photo from a safe distance. The photo helps provide useful evidence with your report."
    >

      <aside
        aria-label="Safety reminder"
        className="border-foreground/15 bg-selection/40 mt-6 rounded-xl border px-4 py-3"
      >
        <p className="text-foreground-muted text-sm leading-6">
          Do not move closer or touch the bird to get a better photo.
        </p>
      </aside>

      <PhotoPicker />
    </ReportPageLayout>
  );
}
