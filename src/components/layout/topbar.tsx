import * as React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Bell,
  ChevronRight,
  CircleHelp,
  Globe,
  Menu,
  Moon,
  Search,
  Settings,
  Stamp,
  Sun,
  UserRound,
  LogOut,
  ChevronDown,
} from "lucide-react";
import { useI18n, LOCALES } from "@/i18n";
import { useAppStore } from "@/store/app-store";
import { ROLES } from "@/lib/roles";
import { MODULE_META, findScreen } from "@/data/screens";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useCommandPalette } from "@/components/layout/command-palette";

export function Topbar() {
  const { t, locale, setLocale } = useI18n();
  const location = useLocation();
  const role = useAppStore((s) => s.role);
  const setRole = useAppStore((s) => s.setRole);
  const theme = useAppStore((s) => s.theme);
  const toggleTheme = useAppStore((s) => s.toggleTheme);
  const projects = useAppStore((s) => s.data.projects);
  const projectFilter = useAppStore((s) => s.projectFilter);
  const setProjectFilter = useAppStore((s) => s.setProjectFilter);
  const notifications = useAppStore((s) => s.data.notifications);
  const approvals = useAppStore((s) => s.data.approvals);
  const setSidebarCollapsed = useAppStore((s) => s.setSidebarCollapsed);
  const setMobileNav = useAppStore((s) => s.setMobileNav);
  const { openSearch } = useCommandPalette();

  const screen = findScreen(location.pathname);
  const moduleMeta = screen ? MODULE_META[screen.module] : null;
  const unread = notifications.filter((n) => !n.read).slice(0, 5);
  const pending = approvals.filter((a) => a.status === "Pending").slice(0, 5);

  return (
    <header className="sticky top-0 z-20 flex h-16 items-center gap-3 border-b bg-card/95 px-4 backdrop-blur supports-[backdrop-filter]:bg-card/80 md:px-6">
      {moduleMeta && (
        <span
          className="absolute inset-x-0 bottom-0 h-[2px] opacity-80"
          style={{ background: moduleMeta.accent }}
          aria-hidden="true"
        />
      )}
      <Button
        variant="ghost"
        size="icon-sm"
        className="lg:hidden"
        onClick={() => setMobileNav(true)}
        aria-label="Open navigation"
      >
        <Menu className="h-5 w-5" />
      </Button>

      <nav
        aria-label={t("top.breadcrumb")}
        className="hidden min-w-[160px] flex-1 items-center gap-1.5 truncate text-[12.5px] md:flex"
      >
        <Link to={role.homePath} className="text-muted-foreground hover:text-foreground">
          {t("app.name")}
        </Link>
        {moduleMeta && (
          <>
            <ChevronRight className="h-3 w-3 shrink-0 text-muted-foreground/60" />
            <span className="truncate text-muted-foreground">{locale === "ar" ? moduleMeta.nameAr : moduleMeta.name}</span>
          </>
        )}
        {screen && (
          <>
            <ChevronRight className="h-3 w-3 shrink-0 text-muted-foreground/60" />
            <span className="truncate font-semibold text-foreground">
              {locale === "ar" ? screen.titleAr : screen.title}
            </span>
          </>
        )}
      </nav>

      <button
        onClick={openSearch}
        className="hidden h-9 w-full min-w-[120px] max-w-[190px] flex-1 items-center gap-2 whitespace-nowrap rounded-md border bg-background px-2.5 text-[13px] text-muted-foreground transition-colors hover:border-primary/40 lg:flex"
      >
        <Search className="h-3.5 w-3.5" />
        <span className="min-w-0 flex-1 truncate text-start">{t("nav.searchPlaceholder")}</span>
        <kbd className="shrink-0 rounded border bg-muted px-1.5 py-0.5 text-[10px] font-semibold">⌘K</kbd>
      </button>
      <Button variant="ghost" size="icon-sm" className="lg:hidden" onClick={openSearch} aria-label="Search">
        <Search className="h-4 w-4" />
      </Button>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className="hidden max-w-[140px] gap-1.5 sm:flex">
            <span className="truncate">{projectFilter === "all" ? t("top.allProjects") : projects.find((p) => p.id === projectFilter)?.name}</span>
            <ChevronDown className="h-3.5 w-3.5 shrink-0 opacity-60" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-64">
          <DropdownMenuLabel>{t("top.project")}</DropdownMenuLabel>
          <DropdownMenuItem onClick={() => setProjectFilter("all")}>{t("top.allProjects")}</DropdownMenuItem>
          <DropdownMenuSeparator />
          {projects.map((p) => (
            <DropdownMenuItem key={p.id} onClick={() => setProjectFilter(p.id)}>
              <span className="truncate">{p.name}</span>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon-sm" className="relative" aria-label={t("top.tasks")}>
            <Stamp className="h-[18px] w-[18px]" />
            {pending.length > 0 && (
              <span className="absolute -end-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-crimson-500 px-1 text-[9px] font-bold text-white">
                {approvals.filter((a) => a.status === "Pending").length}
              </span>
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-80">
          <DropdownMenuLabel>{t("top.tasks")}</DropdownMenuLabel>
          {pending.map((a) => (
            <DropdownMenuItem key={a.id} className="flex-col items-start gap-0.5 py-2">
              <span className="line-clamp-1 text-[12.5px] font-semibold">{a.title}</span>
              <span className="text-[11px] text-muted-foreground">
                {a.stage} · {a.reference}
              </span>
            </DropdownMenuItem>
          ))}
          {!pending.length && <p className="px-2 py-3 text-[12px] text-muted-foreground">{t("empty.title")}</p>}
        </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon-sm" className="relative" aria-label={t("top.notifications")}>
            <Bell className="h-[18px] w-[18px]" />
            {unread.length > 0 && (
              <span className="absolute -end-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-copper-500 px-1 text-[9px] font-bold text-white">
                {unread.length}
              </span>
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-80">
          <DropdownMenuLabel>{t("top.notifications")}</DropdownMenuLabel>
          {unread.map((n) => (
            <DropdownMenuItem key={n.id} className="flex-col items-start gap-0.5 py-2">
              <span className="line-clamp-1 text-[12.5px] font-semibold">{n.title}</span>
              <span className="line-clamp-2 text-[11px] text-muted-foreground">{n.body}</span>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm" className="gap-1.5 px-2">
            <Globe className="h-4 w-4" />
            <span className="hidden sm:inline">{locale === "ar" ? "العربية" : "EN"}</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {LOCALES.map((l) => (
            <DropdownMenuItem key={l.id} onClick={() => setLocale(l.id)}>
              <span className={locale === l.id ? "font-bold" : ""}>{l.native}</span>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      <Button variant="ghost" size="icon-sm" onClick={toggleTheme} aria-label={t("top.theme")}>
        {theme === "dark" ? <Sun className="h-[18px] w-[18px]" /> : <Moon className="h-[18px] w-[18px]" />}
      </Button>

      <Button variant="ghost" size="icon-sm" className="hidden sm:inline-flex" aria-label={t("top.help")}>
        <CircleHelp className="h-[18px] w-[18px]" />
      </Button>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="flex items-center gap-2 rounded-lg ps-1 pe-2 py-1 transition-colors hover:bg-secondary">
            <Avatar className="h-8 w-8">
              <AvatarFallback>{role.short}</AvatarFallback>
            </Avatar>
            <span className="hidden text-start md:block">
              <span className="block max-w-[130px] truncate text-[12.5px] font-bold leading-tight">{role.name}</span>
            </span>
            <ChevronDown className="hidden h-3.5 w-3.5 opacity-60 md:block" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-72">
          <DropdownMenuLabel>{t("top.switchRole")}</DropdownMenuLabel>
          {ROLES.map((r) => (
            <DropdownMenuItem key={r.id} onClick={() => setRole(r.id)}>
              <span className="flex h-6 w-8 shrink-0 items-center justify-center rounded bg-muted text-[10px] font-bold">
                {r.short}
              </span>
              <span className="flex-1 truncate text-[12.5px]">{r.name}</span>
              {r.id === role.id && <Badge variant="accent">Current</Badge>}
            </DropdownMenuItem>
          ))}
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Settings className="h-4 w-4" /> {t("top.settings")}
          </DropdownMenuItem>
          <DropdownMenuItem>
            <UserRound className="h-4 w-4" /> {locale === "ar" ? "ملفي الشخصي" : "My profile"}
          </DropdownMenuItem>
          <DropdownMenuItem>
            <LogOut className="h-4 w-4" /> {t("top.signOut")}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}
