import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";
import clsx from "clsx";

const levelStyles = {
  /** Hero / editorial display (DESIGN.md H1 72–120px) */
  display:
    "font-display text-display-lg font-medium tracking-tight text-balance text-foreground",
  /** Page titles */
  1: "font-display text-display font-medium tracking-tight text-balance text-foreground",
  /** Section titles */
  2: "font-display text-heading-lg font-medium tracking-tight text-pretty text-foreground",
  /** Subsection titles */
  3: "font-display text-heading font-medium tracking-tight text-pretty text-foreground",
  /** Small section / card titles */
  4: "font-sans text-body-lg font-medium tracking-tight text-foreground",
} as const;

type HeadingLevel = keyof typeof levelStyles;

const defaultTags: Record<HeadingLevel, ElementType> = {
  display: "h1",
  1: "h1",
  2: "h2",
  3: "h3",
  4: "h4",
};

type HeadingProps<T extends ElementType = "h1"> = {
  as?: T;
  level?: HeadingLevel;
  className?: string;
  children: ReactNode;
} & Omit<ComponentPropsWithoutRef<T>, "as" | "children" | "className">;

/**
 * Editorial heading — uses the design-system type scale (DESIGN.md §4).
 */
export function Heading<T extends ElementType = "h1">({
  as,
  level = 1,
  className,
  children,
  ...rest
}: HeadingProps<T>) {
  const Component = as ?? defaultTags[level];

  return (
    <Component className={clsx(levelStyles[level], className)} {...rest}>
      {children}
    </Component>
  );
}
