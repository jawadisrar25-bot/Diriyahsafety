import * as React from "react";
import { GripVertical, Plus, Trash2, Play, Sparkles, QrCode, Layers } from "lucide-react";
import type { ScreenDef } from "@/types";
import { useI18n } from "@/i18n";
import { useAppStore } from "@/store/app-store";
import { useRows, screenKpis, useKpiMap } from "@/lib/records";
import { PageHeader } from "@/components/layout/page-header";
import { Panel, KeyValue, SectionLabel } from "@/components/common/panel";
import { KpiStrip } from "@/components/common/kpi-card";
import { TimeseriesChart, RadarChartView, DonutChart, CHART_PALETTE } from "@/components/common/charts";
import { StatusBadge, ToneBadge, ScoreBadge } from "@/components/common/badges";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/toast";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

const FIELD_TYPES = ["Text", "Date", "Select", "Number", "Attachment", "Signature"];

export function BuilderView({ screen }: { screen: ScreenDef }) {
  const { t } = useI18n();
  const [fields, setFields] = React.useState([
    { id: "f1", type: "Text", label: "Title", required: true },
    { id: "f2", type: "Select", label: "Category", required: true },
    { id: "f3", type: "Date", label: "Due date", required: false },
    { id: "f4", type: "Attachment", label: "Evidence", required: false },
  ]);
  const [stages, setStages] = React.useState(["Submitter", "Supervisor", "HSE manager"]);

  const addField = (type: string) =>
    setFields((f) => [...f, { id: `f${Date.now()}`, type, label: `New ${type} field`, required: false }]);

  return (
    <div className="space-y-5">
      <PageHeader screen={screen} />

      <div className="grid gap-4 xl:grid-cols-3">
        <Panel title={t("workflow.designer")} bodyClassName="p-5">
          <SectionLabel>{t("form.section")}</SectionLabel>
          <ul className="space-y-1.5">
            {fields.map((f, i) => (
              <li
                key={f.id}
                className="group flex items-center gap-2 rounded-lg border bg-card px-2.5 py-2"
              >
                <GripVertical className="h-4 w-4 shrink-0 cursor-grab text-muted-foreground" />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[12.5px] font-semibold">{f.label}</p>
                  <p className="text-[11px] text-muted-foreground">
                    {f.type} {f.required && "· Required"}
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="icon-sm"
                  onClick={() => setFields((prev) => prev.filter((_, j) => j !== i))}
                  aria-label={t("action.remove")}
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </Button>
              </li>
            ))}
          </ul>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {FIELD_TYPES.map((ft) => (
              <button
                key={ft}
                onClick={() => addField(ft)}
                className="rounded-full border px-2.5 py-1 text-[11.5px] font-semibold text-muted-foreground hover:bg-secondary"
              >
                <Plus className="mr-1 inline h-3 w-3" />
                {ft}
              </button>
            ))}
          </div>

          <div className="mt-5">
            <SectionLabel>{t("workflow.stages")}</SectionLabel>
            <ol className="space-y-1.5">
              {stages.map((s, i) => (
                <li key={s} className="flex items-center gap-2 rounded-lg border bg-card px-2.5 py-2">
                  <span className="num flex h-6 w-6 items-center justify-center rounded-full bg-secondary text-[11px] font-bold">
                    {i + 1}
                  </span>
                  <span className="flex-1 text-[12.5px] font-semibold">{s}</span>
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    onClick={() => setStages((prev) => prev.filter((_, j) => j !== i))}
                    aria-label={t("action.remove")}
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </li>
              ))}
            </ol>
            <Button
              variant="outline"
              size="sm"
              className="mt-2"
              onClick={() => setStages((s) => [...s, `Stage ${s.length + 1}`])}
            >
              <Plus className="h-3.5 w-3.5" />
              {t("workflow.addStage")}
            </Button>
          </div>
        </Panel>

        <Panel className="xl:col-span-2" title={t("report.preview")} bodyClassName="p-0">
          <div className="border-b bg-muted/30 px-4 py-2 text-[11.5px] font-semibold text-muted-foreground">
            {screen.title} — {fields.length} {t("common.items")}
          </div>
          <div className="space-y-4 p-5">
            {fields.map((f) => (
              <div key={f.id} className="space-y-1.5">
                <label className="text-[12.5px] font-bold">
                  {f.label} {f.required && <span className="text-crimson-600">*</span>}
                </label>
                {f.type === "Attachment" ? (
                  <div className="rounded-lg border border-dashed bg-muted/20 px-3 py-4 text-[12px] text-muted-foreground">
                    {t("form.uploadHint")}
                  </div>
                ) : (
                  <Input disabled placeholder={f.type} />
                )}
              </div>
            ))}
            <div className="flex gap-2 pt-2">
              <Button onClick={() => toast.success(t("action.save"), t("form.saved"))}>
                <Play className="h-3.5 w-3.5" />
                {t("action.save")}
              </Button>
              <Button variant="outline" onClick={() => toast.success(t("action.simulate"), t("ai.desc"))}>
                <Sparkles className="h-3.5 w-3.5" />
                {t("action.simulate")}
              </Button>
            </div>
          </div>
        </Panel>
      </div>
    </div>
  );
}

export function ScorecardView({ screen }: { screen: ScreenDef }) {
  const { t } = useI18n();
  const rows = useRows(screen);
  const kpiMap = useKpiMap();
  const kpis = screenKpis(screen, kpiMap);

  const teams = ["Alpha", "Bravo", "Charlie", "Delta", "Echo"];
  const data = teams.map((name, i) => ({
    subject: name,
    Current: 62 + ((i * 13) % 32),
    Previous: 58 + ((i * 9) % 30),
  }));

  return (
    <div className="space-y-5">
      <PageHeader screen={screen} />
      {kpis.length > 0 && <KpiStrip kpis={kpis.slice(0, 4)} />}

      <div className="grid gap-4 xl:grid-cols-2">
        <Panel title={t("panel.performance")} bodyClassName="p-5">
          <RadarChartView
            data={data}
            series={[
              { key: "Current", label: t("common.period") + " A" },
              { key: "Previous", label: t("common.period") + " B", color: CHART_PALETTE[1] },
            ]}
          />
        </Panel>
        <Panel title={t("common.score")} bodyClassName="p-5">
          <DonutChart data={data.map((d) => ({ name: d.subject, value: d.Current }))} />
        </Panel>
      </div>

      <Panel title={t("table.records")} bodyClassName="p-5">
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {data.map((d) => (
            <li key={d.subject} className="rounded-lg border p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Avatar>
                    <AvatarFallback>{d.subject.slice(0, 2).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <p className="text-[13px] font-bold">{d.subject}</p>
                </div>
                <ScoreBadge value={d.Current} />
              </div>
              <div className="mt-3">
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
                  <div className="h-full rounded-full bg-copper-500" style={{ width: `${d.Current}%` }} />
                </div>
              </div>
              <p className="mt-2 text-[11.5px] text-muted-foreground">
                {t("kpi.trend")}: {d.Current - d.Previous >= 0 ? "+" : ""}
                {d.Current - d.Previous}
              </p>
            </li>
          ))}
        </ul>
        {rows.length > 0 && (
          <p className="mt-4 text-[11.5px] text-muted-foreground">
            {rows.length} {t("table.records")}
          </p>
        )}
      </Panel>
    </div>
  );
}

export function ViewerView({ screen }: { screen: ScreenDef }) {
  const { t, locale } = useI18n();
  const rows = useRows(screen);
  const entry = (rows[0] ?? {}) as Record<string, unknown>;
  const kpiMap = useKpiMap();
  const kpis = screenKpis(screen, kpiMap);
  const name = String(entry.name ?? entry.title ?? screen.title);
  const role = useAppStore((s) => s.role);

  return (
    <div className="space-y-5">
      <PageHeader screen={screen} />

      <div className="grid gap-4 lg:grid-cols-3">
        <Panel className={cn("lg:col-span-2")} title={t("panel.summary")} bodyClassName="p-5">
          <div className="flex flex-wrap items-center gap-4">
            <Avatar className="h-16 w-16">
              <AvatarFallback className="text-lg">
                {name
                  .split(" ")
                  .map((x) => x[0])
                  .join("")
                  .slice(0, 2)
                  .toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="min-w-0">
              <p className="font-display text-[20px] font-bold">{name}</p>
              <p className="text-[13px] text-muted-foreground">
                {String(entry.jobTitle ?? entry.specialty ?? entry.category ?? role.name)}
              </p>
              <div className="mt-1.5 flex flex-wrap gap-1.5">
                {typeof entry.status === "string" && <StatusBadge value={entry.status} />}
                {typeof entry.fitness === "string" && <ToneBadge tone="warn">{String(entry.fitness)}</ToneBadge>}
              </div>
            </div>
          </div>

          <div className="mt-5">
            <SectionLabel>{t("form.section")}</SectionLabel>
            <KeyValue
              items={Object.entries(entry)
                .filter(([k, v]) => !k.startsWith("__") && v !== undefined && v !== null)
                .slice(0, 12)
                .map(([k, v]) => ({
                  label: k.replace(/([A-Z])/g, " $1").replace(/^./, (c) => c.toUpperCase()).trim(),
                  value: Array.isArray(v) ? v.join(", ") : String(v),
                }))}
            />
          </div>
        </Panel>

        <div className="space-y-4">
          {kpis.length > 0 && <KpiStrip kpis={kpis.slice(0, 2)} columns={2} />}
          <Panel title={t("panel.attachments")} bodyClassName="p-5">
            <ul className="space-y-2 text-[12.5px]">
              {["Profile.pdf", "Certificates.zip", "ID scan.jpg"].map((n) => (
                <li key={n} className="flex items-center gap-2 rounded border px-3 py-2">
                  <Layers className="h-3.5 w-3.5 text-muted-foreground" />
                  <span className="flex-1 truncate">{n}</span>
                  {n.endsWith("Certificates.zip") && <QrCode className="h-4 w-4 text-muted-foreground" />}
                </li>
              ))}
            </ul>
          </Panel>
        </div>
      </div>

      <Panel title={t("panel.trends")} bodyClassName="p-5">
        <TimeseriesChart
          data={Array.from({ length: 8 }).map((_, i) => ({
            name: `M${i + 1}`,
            Score: 60 + ((i * 17) % 35),
            Target: 75,
          }))}
          type="line"
          series={[
            { key: "Score", label: t("common.score") },
            { key: "Target", label: t("env.target"), color: CHART_PALETTE[2] },
          ]}
        />
      </Panel>
    </div>
  );
}
