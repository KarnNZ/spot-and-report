import { ScreenHeader } from "@/shared/ui/screen-header";

export interface StepPlaceholderProps {
  title: string;
  description: string;
}

export function StepPlaceholder({ title, description }: StepPlaceholderProps) {
  return (
    <div className="space-y-6">
      <ScreenHeader title={title} description={description} />
      <p className="text-foreground-muted text-sm leading-6">
        This step will be implemented in a later slice.
      </p>
    </div>
  );
}
