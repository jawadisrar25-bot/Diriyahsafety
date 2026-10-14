import * as React from "react";
import { TrendingUp, TrendingDown } from "lucide-react";
import { useI18n } from "@/i18n";
import type { KpiValue } from "@/lib/kpis";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export function formatKpi(k: KpiValue, locale: string): string {
  switch (k.format) {
    case "pct":
      return `${k.value.toFixed(0)}%`;
    case "decimal":
      return k.value.toFixed(1);
    case "money":
      return new Intl.NumberFormat(locale === "ar" ? "ar-SA" : "en-GB", {
        style: "currency",
        currency: "SAR",
        maximumFractionDigits: 0,
      }).format(k.value);
    default:
      return new Intl.NumberFormat(locale === "ar" ? "ar-SA" : "en-GB").format(k.value);
  }
}

const BAR_TONE: Record<string, string> = {
  neutral: "bg-ink-300",
  good: "bg-sea-500",
  warn: "bg-amberish-500",
  bad: "bg-crimson-500",
};

export function KpiCard({ kpi, compact }: { kpi: KpiValue; compact?: boolean }) {
  const { locale } = useI18n();
  const up = kpi.deltaPct > 0;
  const flat = kpi.deltaPct === 0;
  const positive = kpi.tone === "good";
  const favourable = !flat && ((up && positive) || (!up && !positive));
  const deltaTone = flat
    ? "bg-muted text-muted-foreground"
    : favourable
      ? "bg-sea-50 text-sea-700"
      : "bg-crimson-50 text-crimson-700";

  return (
    <Card className={cn("relative overflow-hidden", compact && "min-w-0")}>
      <span className={cn("absolute inset-x-0 top-0 h-[3px]", BAR_TONE[kpi.tone] ?? BAR_TONE.neutral)} />
      <CardContent className="flex flex-col p-5 pt-5">
        <p className="truncate text-[11px] font-bold uppercase tracking-[0.12em] text-muted-foreground">
          {locale === "ar" ? kpi.labelAr : kpi.label}
        </p>
        <p className="mt-2 num font-display text-[30px] font-bold leading-none tracking-tight">
          {formatKpi(kpi, locale)}
        </p>
        <div className="mt-4 flex flex-wrap items-center gap-x-2 gap-y-1">
          <span
            className={cn(
              "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11.5px] font-bold",
              deltaTone
            )}
          >
            {flat ? (
              "—"
            ) : up ? (
              <TrendingUp className="h-3 w-3" />
            ) : (
              <TrendingDown className="h-3 w-3" />
            )}
            {!flat && `${Math.abs(kpi.deltaPct)}%`}
          </span>
          <span className="truncate text-[11.5px] text-muted-foreground">
            {locale === "ar" ? "مقارنة بالفترة السابقة" : "vs previous period"}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}

export function KpiStrip({ kpis, columns }: { kpis: KpiValue[]; columns?: number }) {
  return (
    <div
      className={cn(
        "grid gap-4",
        (columns ?? kpis.length) >= 4 ? "sm:grid-cols-2 xl:grid-cols-4" : "sm:grid-cols-2 xl:grid-cols-3"
      )}
    >
      {kpis.map((k) => (
        <KpiCard key={k.key} kpi={k} />
      ))}
    </div>
  );
}
