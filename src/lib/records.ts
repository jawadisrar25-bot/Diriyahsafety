import * as React from "react";
import type { Dataset, ScreenDef } from "@/types";
import { useAppStore } from "@/store/app-store";
import { computeKpis, kpiSet, type KpiValue } from "@/lib/kpis";

export type Row = Record<string, unknown>;

const STATUS_KEYS = new Set([
  "status",
  "fitness",
  "severity",
  "priority",
  "rating",
  "criticality",
  "result",
  "phase",
  "attendance",
  "riskLevel",
  "disposition",
]);

/** Pull the right record collection for a screen and apply project + role scoping. */
export function useRows(screen: ScreenDef): Row[] {
  const data = useAppStore((s) => s.data);
  const projectFilter = useAppStore((s) => s.projectFilter);
  const userRecords = useAppStore((s) => s.userRecords);

  return React.useMemo(() => {
    const entity = screen.entity;
    let rows: Row[] = [];
    if (entity !== "none" && entity in data) {
      rows = ((data as unknown as Record<string, Row[]>)[entity] ?? []).map((r) => ({ ...r }));
    }
    const user = userRecords
      .filter((r) => r.entity === entity)
      .map((r) => ({ id: r.id, ...r.values, __user: true }) as Row);
    rows = [...user, ...rows];
    if (projectFilter !== "all") {
      rows = rows.filter((r) => !("projectId" in r) || r.projectId === projectFilter);
    }
    return rows;
  }, [screen.entity, data, projectFilter, userRecords]);
}

/** Human-readable cell value for a column key. */
export function cellValue(row: Row, key: string): string {
  const v = row[key];
  if (v === undefined || v === null) return "";
  if (typeof v === "boolean") return v ? "Yes" : "No";
  if (Array.isArray(v)) return v.join(", ");
  if (typeof v === "number") return String(v);
  return String(v);
}

export function isStatusColumn(key: string): boolean {
  return STATUS_KEYS.has(key);
}

export function statusValues(rows: Row[], key: string): string[] {
  const set = new Set<string>();
  for (const r of rows) {
    const v = cellValue(r, key);
    if (v) set.add(v);
  }
  return Array.from(set).sort();
}

export interface ChartSeriesPoint {
  name: string;
  [k: string]: string | number;
}

/** Derive a month-bucketed multi-series chart from rows. */
export function trendChartData(rows: Row[], metricKey: string | undefined, seriesKey: string): ChartSeriesPoint[] {
  const months: string[] = [];
  const now = new Date();
  for (let i = 11; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    months.push(d.toLocaleString("en-GB", { month: "short" }) + " " + String(d.getFullYear()).slice(2));
  }
  const seriesNames = Array.from(new Set(rows.map((r) => cellValue(r, seriesKey)).filter(Boolean))).slice(0, 4);
  const out: ChartSeriesPoint[] = months.map((m) => {
    const p: ChartSeriesPoint = { name: m };
    for (const s of seriesNames) p[s] = 0;
    return p;
  });
  const nowD = new Date();
  rows.forEach((r) => {
    const raw = String(r.date ?? r.submitted ?? r.createdAt ?? r.month ?? r.dueDate ?? r.at ?? r.start ?? r.checkIn ?? "");
    if (!raw) return;
    const d = new Date(raw);
    if (Number.isNaN(d.getTime())) return;
    if (d > nowD) return;
    const idx = (nowD.getFullYear() - d.getFullYear()) * 12 + (nowD.getMonth() - d.getMonth());
    if (idx < 0 || idx > 11) return;
    const target = out[out.length - 1 - idx];
    if (!target) return;
    const s = cellValue(r, seriesKey) || "Total";
    if (!(s in target)) target[s] = 0;
    const val = metricKey ? Number(String(r[metricKey] ?? 0)) || 0 : 1;
    target[s] = Number(target[s]) + (Number.isFinite(val) ? val : 1);
  });
  return out;
}

/** Count rows by a categorical key, for donut/bar charts. */
export function distribution(rows: Row[], key: string, limit = 6): Array<{ name: string; value: number }> {
  const counts = new Map<string, number>();
  for (const r of rows) {
    const v = cellValue(r, key) || "Unassigned";
    const label = v.split(",").map((x) => x.trim()).filter(Boolean);
    for (const l of label) counts.set(l, (counts.get(l) ?? 0) + 1);
  }
  const arr = Array.from(counts, ([name, value]) => ({ name, value })).sort((a, b) => b.value - a.value);
  if (arr.length <= limit) return arr;
  const head = arr.slice(0, limit - 1);
  const rest = arr.slice(limit - 1).reduce((s, x) => s + x.value, 0);
  return [...head, { name: "Other", value: rest }];
}

export function numericSeries(rows: Row[], valueKey: string, groupKey: string): ChartSeriesPoint[] {
  const groups = new Set(rows.map((r) => cellValue(r, groupKey)).filter(Boolean));
  if (!groups.size) return [];
  const pivot = new Map<string, Map<string, number>>();
  for (const r of rows) {
    const g = cellValue(r, groupKey) || "Total";
    const v = Number(String(r[valueKey] ?? 0)) || 0;
    const metric = cellValue(r, "metric") || cellValue(r, "name") || cellValue(r, "type") || "value";
    if (!pivot.has(metric)) pivot.set(metric, new Map());
    pivot.get(metric)!.set(g, (pivot.get(metric)!.get(g) ?? 0) + v);
  }
  const out: ChartSeriesPoint[] = [];
  for (const [metric, vals] of pivot) {
    const p: ChartSeriesPoint = { name: metric };
    for (const [g, v] of vals) p[g] = v;
    out.push(p);
  }
  return out;
}

export function useDataset(): Dataset {
  return useAppStore((s) => s.data);
}

export function useKpiMap(): Record<string, KpiValue> {
  const data = useAppStore((s) => s.data);
  return React.useMemo(() => computeKpis(data), [data]);
}

export function screenKpis(screen: ScreenDef, map: Record<string, KpiValue>): KpiValue[] {
  if (!screen.kpis?.length) return [];
  const out: KpiValue[] = [];
  for (const set of screen.kpis) out.push(...kpiSet(set, map));
  return out.slice(0, 8);
}
