interface ScreenHeaderProps {
  title: string;
  description?: string;
}

export function ScreenHeader({ title, description }: ScreenHeaderProps) {
  return (
    <header>
      <h1 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
        {title}
      </h1>
      {description ? (
        <p className="text-foreground-muted mt-4 max-w-xl text-base leading-7 sm:text-lg sm:leading-8">
          {description}
        </p>
      ) : null}
    </header>
  );
}
