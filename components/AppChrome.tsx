"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { PageShell } from "@/components/layout/PageShell";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export function AppChrome({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isAuthRoute = pathname.startsWith("/auth");

  if (isAuthRoute) {
    return <PageShell bare>{children}</PageShell>;
  }

  return (
    <PageShell header={<Header />} footer={<Footer />}>
      {children}
    </PageShell>
  );
}
