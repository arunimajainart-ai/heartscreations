"use client";

import { usePathname } from "next/navigation";
import { SiteHeader } from "./SiteHeader";
import { SiteFooter } from "./SiteFooter";
import { DataProvider, useGlobalData } from "@/lib/data-context";

function DataErrorBanner() {
  const { error } = useGlobalData();
  if (!error) return null;
  return (
    <div className="bg-red-50 border-b border-red-200 px-4 py-3 text-center text-sm text-red-700">
      <strong>Data load error:</strong> {error}
    </div>
  );
}

export function LayoutShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <DataProvider>
      <SiteHeader />
      <DataErrorBanner />
      <main>{children}</main>
      <SiteFooter />
    </DataProvider>
  );
}
