import { ReportPageLayout } from "@/features/report/layout/report-page-layout";
import { LocationConfirmation } from "@/features/report/location/location-confirmation";

export default function LocationPage() {
  return (
    <ReportPageLayout
      currentStep="location"
      title="Confirm the location"
      description="Location helps the right people understand where the bird was found."
    >

      <LocationConfirmation />
    </ReportPageLayout>
  );
}
