import { LocationConfirmation } from "@/features/report/location/location-confirmation";
import { PageContainer } from "@/shared/ui/page-container";
import { ScreenHeader } from "@/shared/ui/screen-header";

export default function LocationPage() {
  return (
    <PageContainer>
      <div className="my-auto w-full max-w-xl self-center py-4 sm:py-8">
        <ScreenHeader
          title="Confirm the location"
          description="Location helps the right people understand where the bird was found."
        />

        <LocationConfirmation />
      </div>
    </PageContainer>
  );
}
