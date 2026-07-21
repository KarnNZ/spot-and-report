import { BrandMark } from "@/shared/ui/brand/brand-mark";

export function BrandHeader() {
  return (
    <div className="flex w-full justify-center pt-[env(safe-area-inset-top)] pb-6">
      <div className="flex w-full max-w-72 justify-center">
        <BrandMark />
      </div>
    </div>
  );
}
