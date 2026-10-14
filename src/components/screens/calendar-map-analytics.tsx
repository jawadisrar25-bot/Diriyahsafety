import * as React from "react";
import { Plus, MapPin, CalendarDays, Grid3x3, LayoutList } from "lucide-react";
import type { ScreenDef } from "@/types";
import { useI18n } from "@/i18n";
import { useRows } from "@/lib/records";
import { PageHeader } from "@/components/layout/page-header";
import { Panel, KeyValue, EmptyState, ProgressRow } from "@/components/common/panel";
import { TimeseriesChart, DonutChart, RadarChartView, ScatterChartView, CHART_PALETTE } from "@/components/common/charts";
import { StatusBadge, ToneBadge } from "@/components/common/badges";
import { KpiStrip } from "@/components/common/kpi-card";
import { screenKpis, useKpiMap } from "@/lib/records";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/toast";

export function CalendarView({ screen }: { screen: ScreenDef }) {
  const { t, locale } = useI18n();
  const rows = useRows(screen);
  const today = new Date();
  const [month, setMonth] = React.useState(new Date(today.getFullYear(), today.getMonth(), 1));

  const daysInMonth = new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate();
  const firstDow = (new Date(month.getFullYear(), month.getMonth(), 1).getDay() + 6) % 7; // Mon-first

  const eventsByDay = React.useMemo(() => {
    const m: Record<number, Array<Record<string, unknown>>> = {};
    for (const r of rows) {
      const raw = String(r.date ?? r.start ?? r.dueDate ?? r.submitted ?? "");
      if (!raw) continue;
      const d = new Date(raw);
      if (Number.isNaN(d.getTime())) continue;
      if (d.getMonth() !== month.getMonth() || d.getFullYear() !== month.getFullYear()) continue;
      const day = d.getDate();
      (m[day] ||= []).push(r);
    }
    return m;
  }, [rows, month]);

  const monthName = month.toLocaleString(locale === "ar" ? "ar-SA" : "en-GB", { month: "long", year: "numeric" });
  const shift = (n: number) => setMonth(new Date(month.getFullYear(), month.getMonth() + n, 1));

  return (
    <div className="space-y-5">
      <PageHeader screen={screen} />

      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => shift(-1)}>
            ‹
          </Button>
          <p className="font-display text-[16px] font-bold">{monthName}</p>
          <Button variant="outline" size="sm" onClick={() => shift(1)}>
            ›
          </Button>
          <Button variant="ghost" size="sm" onClick={() => setMonth(new Date(today.getFullYear(), today.getMonth(), 1))}>
            {t("calendar.today")}
          </Button>
        </div>
        <div className="flex items-center gap-1.5">
          <ToneBadge tone="info"><Grid3x3 className="h-3 w-3" /> {t("calendar.month")}</ToneBadge>
          <ToneBadge tone="neutral"><LayoutList className="h-3 w-3" /> {t("calendar.agenda")}</ToneBadge>
          <Button size="sm" onClick={() => toast.success(t("calendar.addEvent"), t("form.saved"))}>
            <Plus className="h-3.5 w-3.5" />
            {t("calendar.addEvent")}
          </Button>
        </div>
      </div>

      <div className="overflow-hidden rounded-lg border bg-card">
        <div className="grid grid-cols-7 border-b bg-muted/40">
          {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => (
            <div key={d} className="px-2 py-2 text-center text-[11px] font-bold uppercase tracking-wide text-muted-foreground">
              {d}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7">
          {Array.from({ length: firstDow }).map((_, i) => (
            <div key={`e${i}`} className="min-h-[92px] border-b border-e bg-muted/10" />
          ))}
          {Array.from({ length: daysInMonth }).map((_, i) => {
            const day = i + 1;
            const evs = eventsByDay[day] ?? [];
            const isToday =
              day === today.getDate() &&
              month.getMonth() === today.getMonth() &&
              month.getFullYear() === today.getFullYear();
            return (
              <div
                key={day}
                className={
                  "min-h-[92px] border-b border-e p-1.5 " + (isToday ? "bg-copper-50/60" : "hover:bg-muted/20")
                }
              >
                <span
                  className={
                    "num inline-flex h-6 w-6 items-center justify-center rounded-full text-[11.5px] font-bold " +
                    (isToday ? "bg-copper-500 text-white" : "text-muted-foreground")
                  }
                >
                  {day}
                </span>
                <ul className="mt-1 space-y-1">
                  {evs.slice(0, 2).map((e, j) => (
                    <li
                      key={j}
                      className="truncate rounded bg-ink-500/10 px-1.5 py-0.5 text-[10.5px] font-semibold"
                      title={String(e.title ?? e.name ?? e.id)}
                    >
                      {String(e.title ?? e.name ?? e.id)}
                    </li>
                  ))}
                  {evs.length > 2 && <li className="text-[10px] text-muted-foreground">+{evs.length - 2}</li>}
                </ul>
              </div>
            );
          })}
        </div>
      </div>

      <Panel title={t("calendar.agenda")} bodyClassName="p-5">
        {rows.length ? (
          <ol className="space-y-3">
            {rows.slice(0, 10).map((r, i) => (
              <li key={i} className="flex flex-wrap items-center gap-3 rounded-lg border p-3">
                <CalendarDays className="h-4 w-4 shrink-0 text-muted-foreground" />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[12.5px] font-semibold">{String(r.title ?? r.name ?? r.id)}</p>
                  <p className="text-[11.5px] text-muted-foreground">
                    {String(r.date ?? r.start ?? r.dueDate ?? "")} · {String(r.location ?? r.site ?? r.projectId ?? "")}
                  </p>
                </div>
                {typeof r.status === "string" && <StatusBadge value={r.status} />}
              </li>
            ))}
          </ol>
        ) : (
          <EmptyState title={t("empty.title")} icon={<CalendarDays className="h-5 w-5" />} />
        )}
      </Panel>
    </div>
  );
}

export function MapView({ screen }: { screen: ScreenDef }) {
  const { t } = useI18n();
  const rows = useRows(screen);
  const [selected, setSelected] = React.useState(0);

  const pins = React.useMemo(() => {
    const source = rows.length ? rows : [];
    return source.slice(0, 14).map((r, i) => {
      const lat = typeof r.lat === "number" ? r.lat : 24.7 + ((i * 37) % 100) / 900;
      const lng = typeof r.lng === "number" ? r.lng : 46.55 + ((i * 53) % 100) / 900;
      return {
        lat,
        lng,
        label: String(r.location ?? r.title ?? r.name ?? r.id ?? i),
        status: String(r.status ?? "Active"),
        id: String(r.id ?? i),
        row: r,
      };
    });
  }, [rows]);

  const active = pins[selected];

  return (
    <div className="space-y-5">
      <PageHeader screen={screen} />

      <div className="grid gap-4 lg:grid-cols-3">
        <Panel className="lg:col-span-2" title={t("map.title")} description={t("map.subtitle")} bodyClassName="p-0">
          <div className="relative h-[460px] w-full overflow-hidden bg-[linear-gradient(160deg,#e8e2d8,#cfd8d5_45%,#b9c7c3)]">
            <svg className="absolute inset-0 h-full w-full opacity-40" viewBox="0 0 800 460" aria-hidden="true">
              <g stroke="#142b30" strokeWidth="0.6" opacity="0.5">
                {Array.from({ length: 14 }).map((_, i) => (
                  <line key={"h" + i} x1="0" y1={i * 36} x2="800" y2={i * 36} />
                ))}
                {Array.from({ length: 22 }).map((_, i) => (
                  <line key={"v" + i} x1={i * 38} y1="0" x2={i * 38} y2="460" />
                ))}
              </g>
              <path d="M60 380 C180 300 260 340 340 250 S560 140 740 90" fill="none" stroke="#bc8158" strokeWidth="3" opacity="0.7" />
              <path d="M120 60 C240 120 300 210 420 250 S660 330 760 400" fill="none" stroke="#188b6a" strokeWidth="2" opacity="0.5" />
            </svg>

            {pins.map((p, i) => {
              const x = ((p.lng - 46.5) / 0.2) * 100;
              const y = ((24.95 - p.lat) / 0.35) * 100;
              const left = Math.min(94, Math.max(4, x));
              const top = Math.min(90, Math.max(6, y));
              const tone = p.status === "Closed" ? "bg-sea-500" : p.status === "Overdue" || p.status === "Critical" ? "bg-crimson-500" : "bg-copper-500";
              return (
                <button
                  key={p.id}
                  onClick={() => setSelected(i)}
                  style={{ left: `${left}%`, top: `${top}%` }}
                  className={
                    "absolute -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white shadow " +
                    tone +
                    (i === selected ? " ring-4 ring-copper-300/60 scale-110" : "") +
                    " h-3.5 w-3.5"
                  }
                  aria-label={p.label}
                />
              );
            })}

            <div className="absolute bottom-3 start-3 rounded-lg bg-card/90 px-3 py-2 text-[11px] shadow backdrop-blur">
              <p className="font-bold">{pins.length} {t("map.list")}</p>
            </div>
          </div>
        </Panel>

        <Panel title={t("map.list")} bodyClassName="p-0">
          {active && (
            <div className="border-b p-4">
              <p className="text-[13.5px] font-bold">{active.label}</p>
              <div className="mt-2">
                <KeyValue
                  items={[
                    { label: "LAT", value: active.lat.toFixed(4) },
                    { label: "LNG", value: active.lng.toFixed(4) },
                    { label: t("form.status"), value: <StatusBadge value={active.status} /> },
                    { label: t("common.reference"), value: active.id },
                  ]}
                />
              </div>
            </div>
          )}
          <ul className="max-h-[360px] divide-y overflow-y-auto">
            {pins.map((p, i) => (
              <li key={p.id}>
                <button
                  onClick={() => setSelected(i)}
                  className={"flex w-full items-center gap-2 px-4 py-2.5 text-start transition-colors " + (i === selected ? "bg-secondary" : "hover:bg-secondary/50")}
                >
                  <MapPin className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
                  <span className="min-w-0 flex-1 truncate text-[12.5px] font-medium">{p.label}</span>
                  <StatusBadge value={p.status} />
                </button>
              </li>
            ))}
            {!pins.length && <li className="px-4 py-10 text-center text-sm text-muted-foreground">{t("table.noResults")}</li>}
          </ul>
        </Panel>
      </div>
    </div>
  );
}

export function AnalyticsView({ screen }: { screen: ScreenDef }) {
  const { t } = useI18n();
  const rows = useRows(screen);
  const kpiMap = useKpiMap();
  const kpis = screenKpis(screen, kpiMap);

  const months = React.useMemo(() => {
    const now = new Date();
    const base = Array.from({ length: 12 }).map((_, i) => {
      const d = new Date(now.getFullYear(), now.getMonth() - 11 + i, 1);
      return {
        name: d.toLocaleString("en-GB", { month: "short" }),
        Planned: 20 + ((i * 7) % 14),
        Actual: 18 + ((i * 11) % 16),
        Target: 24,
      };
    });
    return base;
  }, []);

  return (
    <div className="space-y-5">
      <PageHeader screen={screen} />
      {kpis.length > 0 && <KpiStrip kpis={kpis.slice(0, 4)} />}

      <div className="grid gap-4 xl:grid-cols-2">
        <Panel title={t("panel.trends")} bodyClassName="p-5">
          <TimeseriesChart
            data={months}
            type="composed"
            series={[
              { key: "Actual", label: t("env.actual") },
              { key: "Planned", label: t("report.preview"), color: CHART_PALETTE[1] },
              { key: "Target", label: t("env.target"), color: CHART_PALETTE[2] },
            ]}
          />
        </Panel>
        <Panel title={t("panel.distribution")} bodyClassName="p-5">
          <DonutChart
            data={[
              { name: t("status.closed"), value: 42 },
              { name: t("status.progress"), value: 23 },
              { name: t("status.pending"), value: 14 },
              { name: t("status.overdue"), value: 7 },
            ]}
          />
        </Panel>
        <Panel title={t("panel.performance")} bodyClassName="p-5">
          <RadarChartView
            data={[
              { subject: t("compliance.framework"), A: 88, B: 74 },
              { subject: t("training.attendance"), A: 81, B: 78 },
              { subject: t("contractor.hse"), A: 76, B: 70 },
              { subject: t("env.metric"), A: 69, B: 72 },
              { subject: t("common.risk"), A: 84, B: 68 },
            ]}
            series={[
              { key: "A", label: t("common.period") + " A" },
              { key: "B", label: t("common.period") + " B", color: CHART_PALETTE[1] },
            ]}
          />
        </Panel>
        <Panel title={t("risk.matrix")} bodyClassName="p-5">
          <ScatterChartView
            data={rows.slice(0, 24).map((r, i) => ({
              x: Number(r.likelihood ?? r.score ?? r.riskScore ?? (i % 5) + 1) || 1,
              y: Number(r.impact ?? r.residual ?? (i % 4) + 1) || 1,
              z: Number(r.headcount ?? 30) || 30,
              name: String(r.title ?? r.name ?? r.id ?? i),
            }))}
          />
        </Panel>
      </div>

      <Panel title={t("report.preview")} bodyClassName="p-5">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { label: t("compliance.score"), value: 91 },
            { label: t("support.sla"), value: 96 },
            { label: t("training.attendance"), value: 84 },
            { label: t("contractor.hse"), value: 77 },
          ].map((x) => (
            <ProgressRow key={x.label} label={x.label} value={x.value} tone={x.value > 90 ? "sea" : "copper"} />
          ))}
        </div>
      </Panel>
    </div>
  );
}
