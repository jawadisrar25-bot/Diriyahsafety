import * as React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, Bookmark, ArrowRight, Star } from "lucide-react";
import { useI18n } from "@/i18n";
import { useAppStore } from "@/store/app-store";
import { canViewScreen } from "@/lib/roles";
import { SCREENS, MODULE_META } from "@/data/screens";
import type { ModuleId, ScreenDef } from "@/types";
import { PageHeader } from "@/components/layout/page-header";
import { Panel, EmptyState } from "@/components/common/panel";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export function GlobalSearchScreen() {
  const { t, locale } = useI18n();
  const navigate = useNavigate();
  const role = useAppStore((s) => s.role);
  const [q, setQ] = React.useState("");

  const results = React.useMemo(() => {
    const pool = SCREENS.filter((s) => canViewScreen(role, s));
    const term = q.trim().toLowerCase();
    if (!term) return pool.slice(0, 24);
    return pool
      .filter((s) =>
        `${s.title} ${s.titleAr} ${s.path} ${s.kind} ${MODULE_META[s.module].name}`.toLowerCase().includes(term)
      )
      .slice(0, 40);
  }, [q, role]);

  const byModule = React.useMemo(() => {
    const m = new Map<ModuleId, ScreenDef[]>();
    for (const s of results) {
      const arr = m.get(s.module) ?? [];
      arr.push(s);
      m.set(s.module, arr);
    }
    return Array.from(m.entries());
  }, [results]);

  const fakeScreen: ScreenDef = {
    id: 0,
    path: "/dashboard/search",
    module: "dashboard",
    title: "Global Search",
    titleAr: "البحث الشامل",
    kind: "workspace",
    entity: "none",
    icon: "search",
    features: ["search", "filters"],
    companion: "none",
  };

  return (
    <div className="space-y-5">
      <PageHeader screen={fakeScreen} />

      <div className="relative">
        <Search className="pointer-events-none absolute inset-y-0 start-3 my-auto h-4 w-4 text-muted-foreground" />
        <Input
          autoFocus
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder={t("nav.searchPlaceholder")}
          className="h-12 ps-10 text-[15px]"
          aria-label={t("action.search")}
        />
      </div>

      {byModule.length === 0 ? (
        <EmptyState title={t("table.noResults")} description={t("table.noResultsHint")} icon={<Search className="h-5 w-5" />} />
      ) : (
        byModule.map(([mod, items]) => (
          <Panel
            key={mod}
            title={locale === "ar" ? MODULE_META[mod].nameAr : MODULE_META[mod].name}
            description={`${items.length} ${t("nav.screens")}`}
            bodyClassName="p-5"
          >
            <ul className="grid gap-2 sm:grid-cols-2 xl:grid-cols-3">
              {items.map((s) => (
                <li key={s.path}>
                  <Link
                    to={s.path}
                    className="group flex items-center gap-3 rounded-lg border bg-card px-3 py-2.5 transition-colors hover:border-copper-300 hover:bg-copper-50/40"
                  >
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded bg-secondary text-[10px] font-bold text-muted-foreground">
                      {String(s.id).padStart(3, "0")}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-[12.5px] font-semibold">{locale === "ar" ? s.titleAr : s.title}</span>
                      <span className="block truncate text-[11px] text-muted-foreground">{s.kind}</span>
                    </span>
                    <ArrowRight className="h-3.5 w-3.5 shrink-0 opacity-0 transition-opacity group-hover:opacity-100 rtl:rotate-180" />
                  </Link>
                </li>
              ))}
            </ul>
          </Panel>
        ))
      )}
    </div>
  );
}

export function SavedScreensScreen() {
  const { t, locale } = useI18n();
  const navigate = useNavigate();
  const role = useAppStore((s) => s.role);
  const savedPaths = useAppStore((s) => s.savedPaths);
  const toggleSaved = useAppStore((s) => s.toggleSaved);

  const screens = React.useMemo(
    () => savedPaths.map((p) => SCREENS.find((s) => s.path === p)).filter((s): s is ScreenDef => !!s && canViewScreen(role, s)),
    [savedPaths, role]
  );

  const fakeScreen: ScreenDef = {
    id: 0,
    path: "/dashboard/workspace",
    module: "dashboard",
    title: "Saved screens",
    titleAr: "الشاشات المحفوظة",
    kind: "workspace",
    entity: "none",
    icon: "bookmark",
    features: ["search"],
    companion: "none",
  };

  return (
    <div className="space-y-5">
      <PageHeader screen={fakeScreen} />

      {screens.length === 0 ? (
        <EmptyState
          title={t("empty.saved")}
          description={t("empty.savedDesc")}
          icon={<Bookmark className="h-5 w-5" />}
          action={
            <Button variant="outline" size="sm" onClick={() => navigate("/dashboard/executive")}>
              {t("nav.allScreens")}
            </Button>
          }
        />
      ) : (
        <ul className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {screens.map((s) => (
            <li key={s.path} className="rounded-lg border bg-card p-4">
              <div className="flex items-start justify-between gap-2">
                <Badge variant="secondary">{s.kind}</Badge>
                <Button variant="ghost" size="icon-sm" onClick={() => toggleSaved(s.path)} aria-label={t("action.saved")}>
                  <Star className="h-4 w-4 fill-copper-500 text-copper-500" />
                </Button>
              </div>
              <p className="mt-2 text-[13.5px] font-bold">{locale === "ar" ? s.titleAr : s.title}</p>
              <p className="text-[11.5px] text-muted-foreground">
                {locale === "ar" ? MODULE_META[s.module].nameAr : MODULE_META[s.module].name}
              </p>
              <Button size="sm" className="mt-3" onClick={() => navigate(s.path)}>
                {t("action.view")}
                <ArrowRight className="h-3.5 w-3.5 rtl:rotate-180" />
              </Button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
