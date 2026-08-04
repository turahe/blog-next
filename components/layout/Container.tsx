import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";
import clsx from "clsx";

type ContainerSize = "content" | "article" | "prose" | "wide" | "full";

const sizeClass: Record<ContainerSize, string> = {
  /** Portfolio sections — 1200–1400px (DESIGN.md §5) */
  content: "max-w-content",
  /** Blog article column — ~680–760px */
  article: "max-w-article",
  /** Index / form pages */
  prose: "max-w-3xl",
  /** Tags / medium listings */
  wide: "max-w-4xl",
  /** Full-bleed; padding still applied unless `padded={false}` */
  full: "max-w-none",
};

type ContainerProps<T extends ElementType = "div"> = {
  as?: T;
  size?: ContainerSize;
  /** Apply design-token inline padding (24 / 32 / 48px). Default true. */
  padded?: boolean;
  className?: string;
  children: ReactNode;
} & Omit<ComponentPropsWithoutRef<T>, "as" | "children" | "className">;

/**
 * Shared horizontal content container.
 * Prefer this over ad-hoc `max-w-*` + `px-*` pairs.
 */
export function Container<T extends ElementType = "div">({
  as,
  size = "content",
  padded = true,
  className,
  children,
  ...rest
}: ContainerProps<T>) {
  const Component = as ?? "div";

  return (
    <Component
      className={clsx(
        "mx-auto box-border w-full max-w-full",
        sizeClass[size],
        padded && "px-[var(--page-padding-inline)]",
        className,
      )}
      {...rest}
    >
      {children}
    </Component>
  );
}
