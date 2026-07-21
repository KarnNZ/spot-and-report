import Link from "next/link";

export function MadLabzAttribution() {
  return (
    <p className="text-center">
      <Link
        href="/about"
        className="text-foreground-muted hover:text-foreground active:text-foreground inline-flex min-h-12 items-center rounded-md px-3 text-xs leading-5 focus-visible:outline-offset-2"
      >
        Built by&nbsp;
        <span className="underline decoration-current/50 underline-offset-4">
          MadLabz
        </span>
      </Link>
    </p>
  );
}
