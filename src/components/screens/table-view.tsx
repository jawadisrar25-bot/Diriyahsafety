import * as React from "react";
import { useNavigate } from "react-router-dom";
import type { ScreenDef } from "@/types";
import { useI18n } from "@/i18n";
import { useAppStore } from "@/store/app-store";
import { useRows, screenKpis, useKpiMap, trendChartData, distribution } from "@/lib/records";
import { PageHeader } from "@/components/layout/page-header";
import { Panel } from "@/components/common/panel";
import { KpiStrip } from "@/components/common/kpi-card";
import { DataTable } from "@/components/common/data-table";
import { TimeseriesChart, DonutChart, CHART_PALETTE } from "@/components/common/charts";
import { Companion } from "@/components/common/companion";
import { KeyValue } from "@/components/common/panel";
import { StatusBadge, ToneBadge, ScoreBadge } from "@/components/common/badges";

export function TableView({ screen }: { screen: ScreenDef }) {
  const { t } = useI18n();
  const navigate = useNavigate();
  const rows = useRows(screen);
  const kpiMap = useKpiMap();
  const kpis = screenKpis(screen, kpiMap);

  const seriesKey =
    (screen.columns ?? []).find((c) => ["status", "severity", "type", "category"].includes(c)) ?? "status";
  const trend = React.useMemo(() => trendChartData(rows, undefined, seriesKey), [rows, seriesKey]);
  const donut = React.useMemo(() => distribution(rows, seriesKey, 5), [rows, seriesKey]);
  const showChart = screen.features.includes("chart") && screen.chart && rows.length > 0;
  const withCompanion = screen.companion === "quicklinks" || screen.companion === "related";

  return (
    <div className="space-y-5">
      <PageHeader screen={screen} />

      {kpis.length > 0 && <KpiStrip kpis={kpis.slice(0, 4)} />}

      {showChart && (
        <div className="grid gap-4 xl:grid-cols-3">
          <Panel className="xl:col-span-2" title={t("panel.trends")} bodyClassName="p-5">
            <TimeseriesChart
              data={trend}
              type={
                screen.chart === "donut" || screen.chart === "radar" || screen.chart === "scatter"
                  ? "bar"
                  : ((screen.chart ?? "line") as "line" | "bar" | "area" | "stacked" | "composed")
              }
              series={trend[0]
                ? Object.keys(trend[0])
                    .filter((k) => k !== "name")
                    .map((k, i) => ({
                      key: k,
                      label: k,
                      color: i === 0 ? undefined : CHART_PALETTE[i % CHART_PALETTE.length],
                    }))
                : []}
            />
          </Panel>
          {donut.length > 0 && (
            <Panel title={t("panel.distribution")} bodyClassName="p-5">
              <DonutChart data={donut} height={230} />
            </Panel>
          )}
        </div>
      )}

      <div className={withCompanion ? "grid gap-4 xl:grid-cols-4" : ""}>
        <Panel className={withCompanion ? "xl:col-span-3" : ""} bodyClassName="p-5">
          <DataTable
            screen={screen}
            rows={rows}
            onOpen={() => navigate(screen.path.replace(/\/[^/]+$/, "") + "/detail")}
          />
        </Panel>
        {withCompanion && <Companion screen={screen} />}
      </div>
    </div>
  );
}

export function DetailView({ screen }: { screen: ScreenDef }) {
  const { t, locale, fmtDate } = useI18n();
  const rows = useRows(screen);
  const acts = useAppStore((s) => s.data.activities).slice(0, 5);
  const row = rows[0] ?? {};
  const entry = row as Record<string, unknown>;
  const keys = Object.keys(entry).filter((k) => !k.startsWith("__")).slice(0, 14);

  return (
    <div className="space-y-5">
      <PageHeader screen={screen} />

      <div className="grid gap-4 xl:grid-cols-3">
        <Panel className="xl:col-span-2" title={t("panel.summary")} bodyClassName="p-6">
          <div className="mb-5 flex flex-wrap items-center gap-2">
            <span className="font-display text-[18px] font-bold">
              {String(entry.title ?? entry.name ?? entry.subject ?? entry.number ?? entry.id ?? screen.title)}
            </span>
            {typeof entry.status === "string" && <StatusBadge value={entry.status} />}
            {typeof entry.severity === "string" && <ToneBadge tone="bad">{entry.severity}</ToneBadge>}
            {typeof entry.score === "number" && <ScoreBadge value={entry.score} />}
          </div>
          <KeyValue
            items={keys.map((k) => ({
              label: humanLabel(k),
              value: renderValue(k, entry[k], locale),
            }))}
          />
          <p className="mt-6 border-t pt-4 text-[12px] text-muted-foreground">
            {t("common.updated")}: {fmtDate(String(entry.date ?? entry.createdAt ?? entry.submitted ?? new Date().toISOString()))}
          </p>
        </Panel>

        <Panel title={t("panel.timeline")} bodyClassName="p-6">
          {acts.length ? (
            <ol className="relative ms-2 space-y-4 border-s border-border ps-5">
              {acts.map((a) => (
                <li key={a.id} className="relative">
                  <span className="absolute -start-[27px] top-1 h-3 w-3 rounded-full border-2 border-card bg-copper-500" />
                  <p className="text-[13px] font-semibold">{a.text}</p>
                  <p className="mt-0.5 text-[11.5px] text-muted-foreground">
                    {a.actor} · {a.at.replace("T", " ")}
                  </p>
                </li>
              ))}
            </ol>
          ) : (
            <p className="text-sm text-muted-foreground">{t("empty.title")}</p>
          )}
        </Panel>
      </div>
    </div>
  );
}

function humanLabel(key: string): string {
  return key.replace(/([A-Z])/g, " $1").replace(/[_-]/g, " ").replace(/^./, (c) => c.toUpperCase()).trim();
}

function renderValue(key: string, v: unknown, locale: string): React.ReactNode {
  if (v === undefined || v === null || v === "") return "—";
  if (Array.isArray(v)) return v.join(", ");
  if (typeof v === "boolean") return v ? "Yes" : "No";
  if (key === "status" && typeof v === "string") return <StatusBadge value={v} />;
  if (typeof v === "number" && ["score", "hseScore", "residual", "riskScore"].includes(key)) {
    return <ScoreBadge value={v} />;
  }
  if (typeof v === "string" && /^\d{4}-\d{2}-\d{2}/.test(v)) {
    try {
      return new Date(v).toLocaleDateString(locale === "ar" ? "ar-SA" : "en-GB");
    } catch {
      return v;
    }
  }
  return String(v);
}

export function WorkspaceView({ screen }: { screen: ScreenDef }) {
  const { t, locale } = useI18n();
  const rows = useRows(screen);
  const [tab, setTab] = React.useState(0);
  const groups = React.useMemo(() => {
    const keys = ["Open", "In progress", "Pending", "Closed"];
    return keys.map((k) => ({
      key: k,
      items: rows.filter((r) => String(r.status ?? "") === k).slice(0, 6),
    }));
  }, [rows]);

  const board = React.useMemo(() => {
    const boards: Record<string, Record<string, unknown>[]> = {};
    for (const g of groups) if (g.items.length) boards[g.key] = g.items;
    return boards;
  }, [groups]);

  return (
    <div className="space-y-5">
      <PageHeader screen={screen} />
      <div className="flex flex-wrap gap-2">
        {["Board", "List", "Timeline"].map((x, i) => (
          <button
            key={x}
            onClick={() => setTab(i)}
            className={
              "rounded-full px-3.5 py-1.5 text-[12.5px] font-bold transition-colors " +
              (tab === i ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground hover:bg-secondary/80")
            }
          >
            {x}
          </button>
        ))}
      </div>

      {tab === 0 && (
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          {Object.keys(board).length ? (
            Object.entries(board).map(([k, items]) => (
              <Panel key={k} title={k} bodyClassName="p-3">
                <ul className="space-y-2">
                  {items.map((r) => (
                    <li key={String(r.id)} className="rounded-lg border bg-card p-3">
                      <p className="text-[12.5px] font-bold">{String(r.title ?? r.name ?? r.id)}</p>
                      <p className="mt-1 text-[11px] text-muted-foreground">{String(r.owner ?? r.assignee ?? r.employeeId ?? "")}</p>
                      <div className="mt-2 flex items-center gap-1.5">
                        {typeof r.priority === "string" && <ToneBadge tone={r.priority === "High" ? "bad" : r.priority === "Medium" ? "warn" : "neutral"}>{String(r.priority)}</ToneBadge>}
                        {typeof r.dueDate === "string" && (
                          <span className="text-[11px] text-muted-foreground">{r.dueDate}</span>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              </Panel>
            ))
          ) : (
            <p className="col-span-full py-10 text-center text-sm text-muted-foreground">{t("table.noResults")}</p>
          )}
        </div>
      )}

      {tab === 1 && (
        <Panel bodyClassName="p-5">
          <DataTable screen={screen} rows={rows} />
        </Panel>
      )}

      {tab === 2 && (
        <Panel title={t("calendar.agenda")} bodyClassName="p-5">
          <ol className="space-y-3">
            {rows.slice(0, 10).map((r, i) => (
              <li key={i} className="flex gap-3 rounded-lg border p-3">
                <span className="num w-16 shrink-0 text-[11px] font-bold text-muted-foreground">
                  {String(r.date ?? r.dueDate ?? r.start ?? "").slice(0, 10)}
                </span>
                <div className="min-w-0">
                  <p className="text-[12.5px] font-semibold">{String(r.title ?? r.name ?? r.id)}</p>
                  <p className="text-[11.5px] text-muted-foreground">{String(r.description ?? r.owner ?? "")}</p>
                </div>
                {typeof r.status === "string" && <StatusBadge value={r.status} />}
              </li>
            ))}
            {!rows.length && <p className="py-8 text-center text-sm text-muted-foreground">{t("empty.title")}</p>}
          </ol>
        </Panel>
      )}
    </div>
  );
}
