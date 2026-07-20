import type { ButtonHTMLAttributes } from "react";

export type ButtonProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "className"
>;

export function Button({
  children,
  type = "button",
  ...buttonAttributes
}: ButtonProps) {
  return (
    <button
      {...buttonAttributes}
      type={type}
      className="bg-primary text-primary-foreground hover:bg-primary-hover active:bg-primary-active focus-visible:outline-focus disabled:bg-disabled-background disabled:text-foreground-muted min-h-12 w-full cursor-pointer rounded-xl px-6 py-3.5 text-base leading-6 font-semibold shadow-sm focus-visible:outline-[3px] focus-visible:outline-offset-[3px] active:shadow-none disabled:cursor-not-allowed disabled:shadow-none disabled:hover:bg-disabled-background disabled:active:bg-disabled-background"
    >
      {children}
    </button>
  );
}
