import * as React from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar,
  ScatterChart,
  Scatter,
  ZAxis,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const PALETTE = ["#142b30", "#bc8158", "#188b6a", "#d76255", "#b8730e", "#3a6169", "#a56b44", "#875638"];

export interface SeriesPoint {
  name: string;
  [key: string]: string | number;
}
export interface SeriesDef {
  key: string;
  label: string;
  color?: string;
}

function AxisStyle() {
  return { fontSize: 11, fill: "hsl(var(--muted-foreground))" } as const;
}

export function TimeseriesChart({
  data,
  series,
  type = "line",
  height = 260,
}: {
  data: SeriesPoint[];
  series: SeriesDef[];
  type?: "line" | "area" | "bar" | "stacked" | "composed";
  height?: number;
}) {
  const stacked = type === "stacked";
  return (
    <ResponsiveContainer width="100%" height={height}>
      {type === "area" ? (
        <AreaChart data={data} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
          <XAxis dataKey="name" tick={AxisStyle()} tickLine={false} axisLine={false} />
          <YAxis tick={AxisStyle()} tickLine={false} axisLine={false} />
          <Tooltip contentStyle={{ borderRadius: 10, border: "1px solid hsl(var(--border))", fontSize: 12 }} />
          <Legend wrapperStyle={{ fontSize: 11 }} />
          {series.map((s, i) => (
            <Area
              key={s.key}
              type="monotone"
              dataKey={s.key}
              name={s.label}
              stroke={s.color ?? PALETTE[i % PALETTE.length]}
              fill={s.color ?? PALETTE[i % PALETTE.length]}
              fillOpacity={0.15}
              strokeWidth={2}
            />
          ))}
        </AreaChart>
      ) : type === "bar" || type === "stacked" ? (
        <BarChart data={data} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
          <XAxis dataKey="name" tick={AxisStyle()} tickLine={false} axisLine={false} />
          <YAxis tick={AxisStyle()} tickLine={false} axisLine={false} />
          <Tooltip contentStyle={{ borderRadius: 10, border: "1px solid hsl(var(--border))", fontSize: 12 }} />
          <Legend wrapperStyle={{ fontSize: 11 }} />
          {series.map((s, i) => (
            <Bar key={s.key} dataKey={s.key} name={s.label} fill={s.color ?? PALETTE[i % PALETTE.length]} stackId={stacked ? "a" : undefined} radius={stacked ? undefined : [3, 3, 0, 0]} />
          ))}
        </BarChart>
      ) : (
        <LineChart data={data} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
          <XAxis dataKey="name" tick={AxisStyle()} tickLine={false} axisLine={false} />
          <YAxis tick={AxisStyle()} tickLine={false} axisLine={false} />
          <Tooltip contentStyle={{ borderRadius: 10, border: "1px solid hsl(var(--border))", fontSize: 12 }} />
          <Legend wrapperStyle={{ fontSize: 11 }} />
          {series.map((s, i) => (
            <Line
              key={s.key}
              type="monotone"
              dataKey={s.key}
              name={s.label}
              stroke={s.color ?? PALETTE[i % PALETTE.length]}
              strokeWidth={2}
              dot={false}
            />
          ))}
        </LineChart>
      )}
    </ResponsiveContainer>
  );
}

export function DonutChart({
  data,
  height = 240,
  valueKey = "value",
}: {
  data: Array<{ name: string; value: number }>;
  height?: number;
  valueKey?: string;
}) {
  const total = data.reduce((s, d) => s + d.value, 0) || 1;
  return (
    <ResponsiveContainer width="100%" height={height}>
      <PieChart>
        <Pie
          data={data as never}
          dataKey={valueKey}
          nameKey="name"
          innerRadius="58%"
          outerRadius="88%"
          paddingAngle={2}
          stroke="hsl(var(--card))"
        >
          {data.map((_, i) => (
            <Cell key={i} fill={PALETTE[i % PALETTE.length]} />
          ))}
        </Pie>
        <Tooltip
          formatter={(v: number, n: string) => [`${v} · ${Math.round((v / total) * 100)}%`, n]}
          contentStyle={{ borderRadius: 10, border: "1px solid hsl(var(--border))", fontSize: 12 }}
        />
        <Legend wrapperStyle={{ fontSize: 11 }} />
      </PieChart>
    </ResponsiveContainer>
  );
}

export function RadarChartView({
  data,
  series,
  height = 260,
}: {
  data: Array<{ subject: string; [k: string]: string | number }>;
  series: SeriesDef[];
  height?: number;
}) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <RadarChart data={data} outerRadius="72%">
        <PolarGrid stroke="hsl(var(--border))" />
        <PolarAngleAxis dataKey="subject" tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }} />
        {series.map((s, i) => (
          <Radar
            key={s.key}
            dataKey={s.key}
            name={s.label}
            stroke={s.color ?? PALETTE[i % PALETTE.length]}
            fill={s.color ?? PALETTE[i % PALETTE.length]}
            fillOpacity={0.18}
          />
        ))}
        <Tooltip contentStyle={{ borderRadius: 10, border: "1px solid hsl(var(--border))", fontSize: 12 }} />
        <Legend wrapperStyle={{ fontSize: 11 }} />
      </RadarChart>
    </ResponsiveContainer>
  );
}

export function ScatterChartView({
  data,
  height = 260,
}: {
  data: Array<{ x: number; y: number; name: string; z?: number }>;
  height?: number;
}) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <ScatterChart margin={{ top: 8, right: 12, left: -16, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
        <XAxis type="number" dataKey="x" name="x" tick={AxisStyle()} tickLine={false} axisLine={false} />
        <YAxis type="number" dataKey="y" name="y" tick={AxisStyle()} tickLine={false} axisLine={false} />
        <ZAxis type="number" dataKey="z" range={[40, 400]} />
        <Tooltip
          cursor={{ strokeDasharray: "3 3" }}
          contentStyle={{ borderRadius: 10, border: "1px solid hsl(var(--border))", fontSize: 12 }}
          formatter={(v: number, n: string) => [v, n]}
          labelFormatter={() => ""}
          content={({ payload }) =>
            payload && payload[0] ? (
              <div className="rounded-lg border bg-card px-3 py-2 text-[11.5px] shadow">
                {String((payload[0].payload as { name: string }).name)}
              </div>
            ) : null
          }
        />
        <Scatter data={data as never} fill={PALETTE[1]} />
      </ScatterChart>
    </ResponsiveContainer>
  );
}

export function ChartFrame({
  title,
  subtitle,
  children,
  className,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <div className="mb-2 flex items-baseline justify-between gap-2">
        <div>
          <p className="text-[13px] font-bold">{title}</p>
          {subtitle && <p className="mt-0.5 text-[11.5px] text-muted-foreground">{subtitle}</p>}
        </div>
      </div>
      {children}
    </div>
  );
}

export { PALETTE as CHART_PALETTE };
