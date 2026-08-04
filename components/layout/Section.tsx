import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";
import clsx from "clsx";
import { Container } from "@/components/layout/Container";

type SectionProps<T extends ElementType = "section"> = {
  as?: T;
  /** Wrap children in the shared content Container. Default true. */
  contained?: boolean;
  containerSize?: "content" | "article" | "prose" | "wide" | "full";
  className?: string;
  containerClassName?: string;
  children: ReactNode;
} & Omit<ComponentPropsWithoutRef<T>, "as" | "children" | "className">;

/**
 * Semantic page section with optional Container.
 * Homepage / marketing blocks should prefer this over raw div wrappers.
 */
export function Section<T extends ElementType = "section">({
  as,
  contained = true,
  containerSize = "content",
  className,
  containerClassName,
  children,
  ...rest
}: SectionProps<T>) {
  const Component = as ?? "section";

  return (
    <Component className={clsx(className)} {...rest}>
      {contained ? (
        <Container size={containerSize} className={containerClassName}>
          {children}
        </Container>
      ) : (
        children
      )}
    </Component>
  );
}
