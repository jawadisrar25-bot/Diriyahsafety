import * as React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Clock, Link2, FileText } from "lucide-react";
import { useI18n } from "@/i18n";
import { useAppStore } from "@/store/app-store";
import { canViewScreen } from "@/lib/roles";
import { SCREENS } from "@/data/screens";
import type { ScreenDef } from "@/types";
import { Panel, Timeline, EmptyState } from "@/components/common/panel";
import { StatusBadge } from "@/components/common/badges";
import { Badge } from "@/components/ui/badge";

export function Companion({ screen }: { screen: ScreenDef }) {
  const mode = screen.companion ?? "none";
  if (mode === "none") return null;
  return (
    <aside className="flex h-full flex-col gap-4">
      {mode === "activity" && <ActivityPanel screen={screen} />}
      {mode === "quicklinks" && <QuickLinks screen={screen} />}
      {mode === "related" && <RelatedPanel screen={screen} />}
    </aside>
  );
}

function ActivityPanel({ screen }: { screen: ScreenDef }) {
  const { t } = useI18n();
  const activities = useAppStore((s) => s.data.activities);
  const scoped = React.useMemo(() => {
    const slug = screen.path.split("/").pop() ?? "";
    const own = activities.filter((a) => a.ref.includes(slug));
    return (own.length ? own : activities).slice(0, 5);
  }, [activities, screen]);

  return (
    <Panel title={t("panel.timeline")} className="flex-1" bodyClassName="p-5">
      {scoped.length ? (
        <Timeline
          items={scoped.map((a) => ({
            id: a.id,
            text: a.text,
            actor: a.actor,
            at: a.at,
            kind: a.kind,
          }))}
        />
      ) : (
        <p className="text-sm text-muted-foreground">{t("empty.title")}</p>
      )}
    </Panel>
  );
}

function QuickLinks({ screen }: { screen: ScreenDef }) {
  const { t, locale } = useI18n();
  const role = useAppStore((s) => s.role);
  const links = React.useMemo(() => {
    const mine = SCREENS.filter((s) => s.module === screen.module && s.path !== screen.path && canViewScreen(role, s));
    const others = SCREENS.filter(
      (s) => s.module !== screen.module && s.kind === screen.kind && canViewScreen(role, s)
    );
    return [...mine.slice(0, 4), ...others.slice(0, 2)];
  }, [screen, role]);

  return (
    <Panel title={t("panel.quick")} className="flex-1" bodyClassName="p-5">
      <ul className="space-y-0.5">
        {links.map((s) => (
          <li key={s.path}>
            <Link
              to={s.path}
              className="group flex items-center gap-2 rounded-md px-2 py-2 text-[12.5px] font-medium transition-colors hover:bg-secondary"
            >
              <span className="min-w-0 flex-1 truncate">{locale === "ar" ? s.titleAr : s.title}</span>
              <ArrowRight className="h-3.5 w-3.5 shrink-0 opacity-0 transition-opacity group-hover:opacity-100 rtl:rotate-180" />
            </Link>
          </li>
        ))}
      </ul>
    </Panel>
  );
}

function RelatedPanel({ screen }: { screen: ScreenDef }) {
  const { t } = useI18n();
  const data = useAppStore((s) => s.data);
  const related = React.useMemo(() => {
    const pool = (data as unknown as Record<string, Array<Record<string, unknown>>>)[screen.entity];
    return (pool ?? []).slice(0, 4);
  }, [data, screen.entity]);

  const titleOf = (r: Record<string, unknown>) =>
    String(r.title ?? r.name ?? r.subject ?? r.number ?? r.id ?? "");

  return (
    <Panel title={t("panel.related")} className="flex-1" bodyClassName="p-5">
      {related.length ? (
        <ul className="divide-y">
          {related.map((r, i) => (
            <li key={i} className="flex items-center gap-2 py-2.5">
              <FileText className="h-4 w-4 shrink-0 text-muted-foreground" />
              <div className="min-w-0 flex-1">
                <p className="truncate text-[12.5px] font-semibold">{titleOf(r)}</p>
                <p className="truncate text-[11px] text-muted-foreground">{String(r.id ?? "")}</p>
              </div>
              {typeof r.status === "string" && <StatusBadge value={r.status} />}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-sm text-muted-foreground">{t("empty.title")}</p>
      )}
    </Panel>
  );
}

export function InlineClock() {
  const [now, setNow] = React.useState(new Date());
  React.useEffect(() => {
    const id = window.setInterval(() => setNow(new Date()), 60000);
    return () => window.clearInterval(id);
  }, []);
  return (
    <span className="num inline-flex items-center gap-1 text-[11.5px] text-muted-foreground">
      <Clock className="h-3 w-3" />
      {now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
    </span>
  );
}

export function LinkChip({ to, children }: { to: string; children: React.ReactNode }) {
  return (
    <Link to={to} className="inline-flex items-center gap-1 text-[12px] font-semibold text-copper-700 hover:underline">
      <Link2 className="h-3 w-3" />
      {children}
    </Link>
  );
}

export { Badge, EmptyState };
