import { ReportStepPage } from "@/features/report/layout/report-step-page";
import { LocationConfirmation } from "@/features/report/location/location-confirmation";
import { ReportProgress } from "@/features/report/progress/report-progress";
import { ScreenHeader } from "@/shared/ui/screen-header";

export default function LocationPage() {
  return (
    <ReportStepPage>
      <ReportProgress currentStep="location" />

      <ScreenHeader
        title="Confirm the location"
        description="Location helps the right people understand where the bird was found."
      />

      <LocationConfirmation />
    </ReportStepPage>
  );
}
