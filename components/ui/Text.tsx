import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";
import clsx from "clsx";

const variants = {
  lead: "font-sans text-body-lg font-normal leading-relaxed text-muted-foreground text-pretty",
  body: "font-sans text-body font-normal leading-relaxed text-foreground text-pretty",
  muted: "font-sans text-body font-normal leading-relaxed text-muted-foreground text-pretty",
  small: "font-sans text-small font-normal leading-normal text-muted-foreground",
  label:
    "font-sans text-small font-normal tracking-[0.08em] uppercase text-muted-foreground",
  code: "font-mono text-small font-normal text-foreground",
} as const;

type TextVariant = keyof typeof variants;

type TextProps<T extends ElementType = "p"> = {
  as?: T;
  variant?: TextVariant;
  className?: string;
  children: ReactNode;
} & Omit<ComponentPropsWithoutRef<T>, "as" | "children" | "className">;

/**
 * Body / supporting text — pairs with `Heading` for clear hierarchy.
 */
export function Text<T extends ElementType = "p">({
  as,
  variant = "body",
  className,
  children,
  ...rest
}: TextProps<T>) {
  const Component = as ?? "p";

  return (
    <Component className={clsx(variants[variant], className)} {...rest}>
      {children}
    </Component>
  );
}
