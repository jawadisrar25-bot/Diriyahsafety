import * as React from "react";
import { Outlet } from "react-router-dom";
import { Sidebar } from "./sidebar";
import { Topbar } from "./topbar";
import { Toaster } from "@/components/ui/toast";
import { useAppStore } from "@/store/app-store";

export function AppShell() {
  const theme = useAppStore((s) => s.theme);
  const mobileNav = useAppStore((s) => s.mobileNav);

  React.useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("dark", theme === "dark");
    root.dataset.theme = theme;
  }, [theme]);

  React.useEffect(() => {
    document.body.style.overflow = mobileNav ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileNav]);

  return (
    <div className="flex min-h-screen bg-background text-foreground">
      <Sidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar />
        <main className="flex-1 px-4 py-7 md:px-6 lg:px-8">
          <div className="mx-auto w-full max-w-[1360px] animate-fade">
            <Outlet />
          </div>
        </main>
      </div>
      <Toaster />
    </div>
  );
}
