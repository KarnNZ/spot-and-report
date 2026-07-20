import Image from "next/image";

export function BrandMark() {
  return (
    <span className="inline-flex items-center">
      <Image
        src="/branding/spot-and-report-logo.png"
        alt="Spot & Report"
        width={1228}
        height={136}
        priority
        className="h-8 w-auto max-w-full"
      />
    </span>
  );
}
