import * as React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ChevronRight, PanelLeftClose, PanelLeftOpen, Bookmark, LayoutGrid, X } from "lucide-react";
import { useI18n } from "@/i18n";
import { useAppStore } from "@/store/app-store";
import { canViewModule, canViewScreen } from "@/lib/roles";
import { SCREENS, MODULE_ORDER, MODULE_META } from "@/data/screens";
import type { ModuleId } from "@/types";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/common/scroll-area";

export function Sidebar() {
  const collapsed = useAppStore((s) => s.sidebarCollapsed);
  const mobileNav = useAppStore((s) => s.mobileNav);
  const setMobileNav = useAppStore((s) => s.setMobileNav);

  return (
    <>
      {mobileNav && (
        <div
          className="fixed inset-0 z-40 bg-ink-900/50 lg:hidden"
          onClick={() => setMobileNav(false)}
          aria-hidden="true"
        />
      )}
      {collapsed ? (
        <CollapsedRail className="hidden lg:flex" />
      ) : (
        <aside
          className={cn(
            "fixed inset-y-0 start-0 z-50 flex h-screen w-[272px] shrink-0 flex-col bg-sidebar text-sidebar-foreground transition-transform duration-200 lg:sticky lg:top-0 lg:z-30 lg:translate-x-0",
            mobileNav ? "translate-x-0" : "-translate-x-full rtl:translate-x-full"
          )}
        >
          <SidebarBody onClose={() => setMobileNav(false)} />
        </aside>
      )}
    </>
  );
}

function CollapsedRail({ className }: { className?: string }) {
  const navigate = useNavigate();
  const location = useLocation();
  const role = useAppStore((s) => s.role);
  const setCollapsed = useAppStore((s) => s.setSidebarCollapsed);
  const allowedModules = React.useMemo(
    () => MODULE_ORDER.filter((m) => canViewModule(role, m)),
    [role]
  );
  const currentPath = location.pathname.replace(/\/$/, "") || "/";
  const activeModule = allowedModules.find((m) =>
    SCREENS.some((s) => s.module === m && s.path === currentPath)
  );

  return (
    <aside className={cn("sticky top-0 z-30 h-screen w-16 shrink-0 flex-col border-e bg-sidebar text-sidebar-foreground", className)}>
      <div className="flex h-16 items-center justify-center border-b border-white/10">
        <BrandMark />
      </div>
      <nav className="flex flex-1 flex-col items-center gap-1 py-3">
        {allowedModules.map((m) => {
          const meta = MODULE_META[m];
          const first = SCREENS.find((s) => s.module === m && canViewScreen(role, s));
          return (
            <button
              key={m}
              title={localeSafe(meta.name)}
              disabled={!first}
              onClick={() => first && navigate(first.path)}
              className={cn(
                "flex h-10 w-10 items-center justify-center rounded-lg transition-colors",
                m === activeModule
                  ? "bg-copper-500 text-white"
                  : "text-sidebar-foreground/70 hover:bg-sidebar-muted hover:text-white"
              )}
            >
              <ModuleIcon name={meta.icon} />
            </button>
          );
        })}
      </nav>
      <div className="border-t border-white/10 p-2">
        <Button
          variant="ghost"
          size="icon-sm"
          className="w-full text-sidebar-foreground/70 hover:bg-sidebar-muted hover:text-white"
          onClick={() => setCollapsed(false)}
          aria-label="Expand sidebar"
        >
          <PanelLeftOpen className="h-4 w-4" />
        </Button>
      </div>
    </aside>
  );
}

function localeSafe(name: string) {
  return name;
}

function SidebarBody({ onClose }: { onClose: () => void }) {
  const { t, locale } = useI18n();
  const navigate = useNavigate();
  const location = useLocation();
  const role = useAppStore((s) => s.role);
  const setCollapsed = useAppStore((s) => s.setSidebarCollapsed);
  const setMobileNav = useAppStore((s) => s.setMobileNav);
  const savedPaths = useAppStore((s) => s.savedPaths);

  const allowedModules = React.useMemo(
    () => MODULE_ORDER.filter((m) => canViewModule(role, m)),
    [role]
  );
  const currentPath = location.pathname.replace(/\/$/, "") || "/";
  const activeModule = React.useMemo(
    () =>
      allowedModules.find((m) => SCREENS.some((s) => s.module === m && s.path === currentPath)) ??
      allowedModules[0],
    [allowedModules, currentPath]
  );

  const [open, setOpen] = React.useState<string | null>(activeModule ?? null);
  React.useEffect(() => {
    if (activeModule) setOpen(activeModule);
  }, [activeModule]);

  const title = (s: { title: string; titleAr: string }) => (locale === "ar" ? s.titleAr : s.title);
  const modName = (m: ModuleId) => (locale === "ar" ? MODULE_META[m].nameAr : MODULE_META[m].name);

  const go = (path: string) => {
    navigate(path);
    onClose();
  };

  return (
    <>
      <div className="flex h-16 items-center gap-3 border-b border-white/10 px-4">
        <BrandMark />
        <div className="min-w-0 flex-1">
          <div className="truncate font-display text-[13.5px] font-bold tracking-tight">
            Falcon tech <span className="font-medium text-copper-300">/ OHSS</span>
          </div>
          <div className="truncate text-[9.5px] font-semibold uppercase tracking-[0.16em] text-sidebar-foreground/50">
            {locale === "ar" ? "منصة القيادة الرقمية" : "Digital Command Platform"}
          </div>
        </div>
        <Button
          variant="ghost"
          size="icon-sm"
          className="hidden text-sidebar-foreground/60 hover:bg-sidebar-muted hover:text-white lg:inline-flex"
          onClick={() => setCollapsed(true)}
          aria-label="Collapse sidebar"
        >
          <PanelLeftClose className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon-sm"
          className="text-sidebar-foreground/60 hover:bg-sidebar-muted hover:text-white lg:hidden"
          onClick={() => setMobileNav(false)}
          aria-label="Close navigation"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>

      <ScrollArea className="flex-1 px-2.5 py-3">
        <div className="mb-2 px-2">
          <span className="text-[9.5px] font-bold uppercase tracking-[0.16em] text-sidebar-foreground/45">
            {t("nav.modules")}
          </span>
        </div>

        <div className="space-y-0.5">
          {allowedModules.map((m) => {
            const meta = MODULE_META[m];
            const screens = SCREENS.filter((s) => s.module === m && canViewScreen(role, s));
            if (!screens.length) return null;
            const isOpen = open === m;
            const hasActive = screens.some((s) => s.path === currentPath);
            return (
              <div key={m}>
                <button
                  onClick={() => setOpen(isOpen ? null : m)}
                  className={cn(
                    "group flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-[13px] font-semibold transition-colors",
                    hasActive
                      ? "bg-white/15 text-white shadow-[inset_2px_0_0_0_hsl(var(--sidebar-accent))]"
                      : "text-sidebar-foreground/80 hover:bg-sidebar-muted hover:text-white"
                  )}
                >
                  <span
                    className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md"
                    style={{
                      background: `${meta.accent}26`,
                      boxShadow: `inset 0 0 0 1px ${meta.accent}59`,
                    }}
                  >
                    <ModuleIcon name={meta.icon} size={13} color={meta.accent} />
                  </span>
                  <span className="flex-1 truncate text-start">{modName(m)}</span>
                  <ChevronRight
                    className={cn("h-3.5 w-3.5 shrink-0 opacity-50 transition-transform", isOpen && "rotate-90")}
                  />
                </button>
                {isOpen && (
                  <div className="ms-[26px] mt-0.5 space-y-px border-s border-white/10 ps-2">
                    {screens.map((s) => (
                      <Link
                        key={s.path}
                        to={s.path}
                        onClick={onClose}
                        className={cn(
                          "block truncate rounded-md px-2.5 py-[7px] text-[12.5px] leading-snug transition-colors",
                          s.path === currentPath
                            ? "bg-copper-500 font-bold text-white"
                            : "text-sidebar-foreground/65 hover:bg-sidebar-muted hover:text-white"
                        )}
                        title={title(s)}
                      >
                        {title(s)}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-4 border-t border-white/10 pt-3">
          <div className="mb-2 px-2 text-[9.5px] font-bold uppercase tracking-[0.16em] text-sidebar-foreground/45">
            {t("app.workspace")}
          </div>
          <button
            onClick={() => go("/dashboard/search")}
            className={cn(
              "flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-[13px] font-semibold transition-colors",
              currentPath === "/dashboard/search"
                ? "bg-white/10 text-white"
                : "text-sidebar-foreground/80 hover:bg-sidebar-muted hover:text-white"
            )}
          >
            <LayoutGrid className="h-4 w-4 shrink-0" />
            {t("nav.allScreens")}
          </button>
          <button
            onClick={() => go("/dashboard/workspace")}
            className={cn(
              "flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-[13px] font-semibold transition-colors",
              currentPath === "/dashboard/workspace"
                ? "bg-white/10 text-white"
                : "text-sidebar-foreground/80 hover:bg-sidebar-muted hover:text-white"
            )}
          >
            <Bookmark className="h-4 w-4 shrink-0" />
            <span className="flex-1 truncate text-start">{t("nav.saved")}</span>
            <span className="rounded bg-sidebar-muted px-1.5 text-[10px] text-sidebar-foreground/70">
              {savedPaths.length}
            </span>
          </button>
        </div>
      </ScrollArea>

      <div className="border-t border-white/10 p-3">
        <p className="px-1 text-[10.5px] leading-relaxed text-sidebar-foreground/40">
          {locale === "ar" ? "منصة إدارة الصحة والسلامة والأمن" : "Health, safety and security management"}
        </p>
      </div>
    </>
  );
}

function BrandMark() {
  return (
    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-copper-500 font-display text-[15px] font-bold text-white shadow-inset">
      د
    </div>
  );
}

const ICON_PATHS: Record<string, React.ReactNode> = {
  "layout-dashboard": (
    <>
      <rect x="3" y="3" width="7" height="9" rx="1" />
      <rect x="14" y="3" width="7" height="5" rx="1" />
      <rect x="14" y="12" width="7" height="9" rx="1" />
      <rect x="3" y="16" width="7" height="5" rx="1" />
    </>
  ),
  "heart-pulse": (
    <>
      <path d="M19 14c1.5-1.5 2-3.2 2-5A7 7 0 0 0 5 9c0 3.5 2 5.5 4 7.5L12 21l3-3" />
      <path d="M3.2 13.5A5 5 0 0 1 12 9a5 5 0 0 1 8.8 4.5" />
      <path d="M3 12h4l2-3 3 6 2-3h5" />
    </>
  ),
  "flask-conical": <path d="M9 3h6m-5 0v7l-6 9a2 2 0 0 0 2 3h12a2 2 0 0 0 2-3l-6-9V3M7 15h10" />,
  "hard-hat": (
    <>
      <path d="M2 15h20v4H2zM6 15v-2a6 6 0 0 1 12 0v2M12 6v9" />
    </>
  ),
  shield: (
    <>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />
      <path d="m9 12 2 2 4-4" />
    </>
  ),
  "triangle-alert": (
    <>
      <path d="m10.3 3.7-8.5 15A2 2 0 0 0 3.5 22h17a2 2 0 0 0 1.7-3.3l-8.5-15a2 2 0 0 0-3.4 0Z" />
      <path d="M12 9v4" />
      <path d="M12 17h.01" />
    </>
  ),
  "clipboard-check": (
    <>
      <rect x="5" y="5" width="14" height="17" rx="2" />
      <rect x="9" y="2" width="6" height="6" rx="1" />
      <path d="m9 15 2 2 4-4" />
    </>
  ),
  "building-2": (
    <>
      <rect x="3" y="3" width="12" height="18" rx="1" />
      <path d="M15 9h6v12h-6M7 7h4M7 11h4M7 15h4M9 21v-3" />
    </>
  ),
  siren: (
    <>
      <path d="M5 17h14M7 17v-5a5 5 0 0 1 10 0v5M4 21h16v-4H4zM12 2v3M3 7l3 2M21 7l-3 2" />
    </>
  ),
  workflow: (
    <>
      <rect x="2" y="3" width="7" height="6" rx="1" />
      <rect x="15" y="15" width="7" height="6" rx="1" />
      <path d="M9 6h5a4 4 0 0 1 4 4v5M12 18H8a4 4 0 0 1-4-4V9" />
    </>
  ),
  scale: (
    <>
      <path d="M12 3v18M4 7h16M7 7l-4 7h8L7 7Zm10 0-4 7h8l-4-7ZM8 21h8" />
    </>
  ),
  "clipboard-list": (
    <>
      <rect x="5" y="5" width="14" height="17" rx="2" />
      <rect x="9" y="2" width="6" height="6" rx="1" />
      <path d="M9 13h6M9 17h6" />
    </>
  ),
  "graduation-cap": (
    <>
      <path d="m2 9 10-5 10 5-10 5-10-5Z" />
      <path d="M6 12v5c4 3 8 3 12 0v-5M22 10v7" />
    </>
  ),
  leaf: (
    <>
      <path d="M20 4C10 3 4 8 4 15a5 5 0 0 0 5 5c7 0 12-6 11-16Z" />
      <path d="M4 20c3-5 7-8 13-11" />
    </>
  ),
  files: (
    <>
      <rect x="7" y="4" width="13" height="17" rx="2" />
      <path d="M4 7V4a2 2 0 0 1 2-2h10M11 10h6M11 14h6" />
    </>
  ),
  "chart-no-axes-combined": <path d="M3 21h18M5 17l5-5 4 3 6-9M5 17v4M10 12v9M15 15v6M20 6v15" />,
  "settings-2": (
    <>
      <path d="M20 7h-9M14 17H5" />
      <circle cx="17" cy="17" r="3" />
      <circle cx="7" cy="7" r="3" />
    </>
  ),
  plug: (
    <>
      <path d="M9 2v6M15 2v6M6 8h12v4a6 6 0 0 1-12 0V8ZM12 18v4" />
    </>
  ),
  headset: (
    <>
      <path d="M3 14v-2a9 9 0 0 1 18 0v2" />
      <path d="M3 14a2 2 0 0 1 2-2h1a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-3Z" />
      <path d="M21 14a2 2 0 0 0-2-2h-1a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3Z" />
    </>
  ),
};

export function ModuleIcon({
  name,
  size = 15,
  color,
}: {
  name: string;
  size?: number;
  color?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color ?? "currentColor"}
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {ICON_PATHS[name] ?? ICON_PATHS.files}
    </svg>
  );
}
