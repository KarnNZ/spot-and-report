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
      className="bg-primary text-primary-foreground hover:bg-primary-hover active:bg-primary-active disabled:bg-disabled-background disabled:text-foreground-muted min-h-12 w-full rounded-xl px-5 py-3 text-base leading-6 font-semibold disabled:cursor-not-allowed disabled:hover:bg-disabled-background disabled:active:bg-disabled-background"
    >
      {children}
    </button>
  );
}
