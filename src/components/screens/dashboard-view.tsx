import * as React from "react";
import { useNavigate } from "react-router-dom";
import type { ScreenDef } from "@/types";
import { useI18n } from "@/i18n";
import { useRows, screenKpis, useKpiMap, trendChartData, distribution } from "@/lib/records";
import { PageHeader } from "@/components/layout/page-header";
import { Panel } from "@/components/common/panel";
import { KpiStrip } from "@/components/common/kpi-card";
import { TimeseriesChart, DonutChart, CHART_PALETTE } from "@/components/common/charts";
import { DataTable } from "@/components/common/data-table";
import { Companion } from "@/components/common/companion";

export function DashboardView({ screen }: { screen: ScreenDef }) {
  const { t } = useI18n();
  const navigate = useNavigate();
  const rows = useRows(screen);
  const kpiMap = useKpiMap();
  const kpis = screenKpis(screen, kpiMap);

  const seriesKey = guessSeriesKey(rows, screen);
  const trend = React.useMemo(() => trendChartData(rows, undefined, seriesKey), [rows, seriesKey]);
  const distKey = ["status", "severity", "category", "type"].find((c) => (screen.columns ?? []).includes(c)) ?? seriesKey;
  const donut = React.useMemo(() => distribution(rows, distKey, 5), [rows, distKey]);

  const hasCompanion = screen.companion && screen.companion !== "none";

  return (
    <div className="space-y-5">
      <PageHeader screen={screen} />

      {kpis.length > 0 && <KpiStrip kpis={kpis.slice(0, 4)} />}

      <div className={"grid gap-4 " + (hasCompanion ? "xl:grid-cols-3" : "")}>
        <div className={"space-y-5 " + (hasCompanion ? "xl:col-span-2" : "")}>
          <div className={"grid gap-4 " + (donut.length ? "lg:grid-cols-3" : "")}>
            <Panel
              className={donut.length ? "lg:col-span-2" : ""}
              title={t("panel.trends")}
              bodyClassName="p-5"
            >
              {trend.length ? (
                <TimeseriesChart
                  data={trend}
                  type={
                    screen.chart === "donut" || screen.chart === "radar" || screen.chart === "scatter"
                      ? "bar"
                      : ((screen.chart ?? "line") as "line" | "bar" | "area" | "stacked" | "composed")
                  }
                  series={buildSeries(trend, t)}
                />
              ) : (
                <EmptyLine />
              )}
            </Panel>

            {donut.length > 0 && (
              <Panel title={t("panel.distribution")} bodyClassName="p-5">
                <DonutChart data={donut} height={230} />
              </Panel>
            )}
          </div>

          {rows.length > 0 && (
            <Panel title={t("panel.recent")} bodyClassName="p-5">
              <DataTable
                screen={screen}
                rows={rows.slice(0, 8)}
                onOpen={() => navigate(screen.path + "/detail")}
              />
            </Panel>
          )}
        </div>

        {hasCompanion && <Companion screen={screen} />}
      </div>
    </div>
  );
}

function EmptyLine() {
  const { t } = useI18n();
  return <p className="py-12 text-center text-sm text-muted-foreground">{t("table.noResults")}</p>;
}

function buildSeries(
  trend: Array<Record<string, unknown>>,
  t: (k: never) => string
): Array<{ key: string; label: string; color?: string }> {
  const keys = trend[0] ? Object.keys(trend[0]).filter((k) => k !== "name") : [];
  const labels: Record<string, string> = {
    Records: t("kpi.records" as never),
    Open: t("kpi.open" as never),
    Closed: t("status.closed" as never),
    Low: t("status.open" as never),
    Medium: t("status.pending" as never),
    High: t("status.overdue" as never),
    Critical: t("status.critical" as never),
  };
  return keys.map((k, i) => ({
    key: k,
    label: labels[k] ?? k,
    color: i === 0 ? undefined : CHART_PALETTE[i % CHART_PALETTE.length],
  }));
}

function guessSeriesKey(rows: Array<Record<string, unknown>>, screen: ScreenDef): string {
  const preferred = ["status", "severity", "type", "category", "riskLevel"];
  const keys = rows[0] ? Object.keys(rows[0]) : [];
  for (const p of preferred) if (keys.includes(p)) return p;
  const cols = screen.columns ?? [];
  return cols.find((c) => !["id", "name", "title", "date"].includes(c)) ?? "status";
}
