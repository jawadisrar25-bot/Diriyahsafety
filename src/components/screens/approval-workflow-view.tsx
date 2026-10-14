import * as React from "react";
import { Check, X, Undo2, ArrowUpRight, Stamp } from "lucide-react";
import type { ScreenDef } from "@/types";
import { useI18n } from "@/i18n";
import { useRows } from "@/lib/records";
import { PageHeader } from "@/components/layout/page-header";
import { Panel, Timeline, KeyValue } from "@/components/common/panel";
import { StatusBadge, ToneBadge } from "@/components/common/badges";
import { DataTable } from "@/components/common/data-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/toast";

export function ApprovalView({ screen }: { screen: ScreenDef }) {
  const { t } = useI18n();
  const rows = useRows(screen);
  const stages = screen.approvalStages ?? ["Submitted", "Line manager", "HSE manager", "Project director"];
  const [stage, setStage] = React.useState(1);
  const [comment, setComment] = React.useState("");
  const [decision, setDecision] = React.useState<string | null>(null);

  const decide = (d: "approve" | "reject" | "return") => {
    setDecision(d);
    toast.success(
      t("approval.decided"),
      d === "approve" ? t("action.approve") : d === "reject" ? t("action.reject") : t("action.back")
    );
  };

  return (
    <div className="space-y-5">
      <PageHeader screen={screen} />

      <div className="grid gap-4 xl:grid-cols-3">
        <Panel className="xl:col-span-2" title={t("approval.chain")} bodyClassName="p-5">
          <ol className="flex flex-wrap items-stretch gap-2">
            {stages.map((s, i) => {
              const state = i < stage ? "done" : i === stage ? "current" : "todo";
              return (
                <li key={s} className="flex items-center gap-2">
                  <span
                    className={
                      "flex items-center gap-2 rounded-full px-3.5 py-2 text-[12px] font-bold " +
                      (state === "done"
                        ? "bg-sea-50 text-sea-700"
                        : state === "current"
                          ? "bg-copper-500 text-white"
                          : "bg-secondary text-secondary-foreground")
                    }
                  >
                    {state === "done" ? <Check className="h-3.5 w-3.5" /> : <Stamp className="h-3.5 w-3.5" />}
                    {s}
                  </span>
                  {i < stages.length - 1 && <span className="h-px w-6 bg-border" />}
                </li>
              );
            })}
          </ol>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="comment">{t("approval.comment")}</Label>
              <Input
                id="comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder={t("approval.comment")}
              />
            </div>
            <div className="flex items-end gap-2">
              <Button size="sm" onClick={() => decide("approve")}>
                <Check className="h-3.5 w-3.5" />
                {t("action.approve")}
              </Button>
              <Button size="sm" variant="outline" className="border-crimson-300 text-crimson-600" onClick={() => decide("reject")}>
                <X className="h-3.5 w-3.5" />
                {t("action.reject")}
              </Button>
              <Button size="sm" variant="ghost" onClick={() => decide("return")}>
                <Undo2 className="h-3.5 w-3.5" />
                {t("action.back")}
              </Button>
            </div>
          </div>

          {decision && (
            <div className="mt-4 flex items-center gap-2 rounded-lg border bg-muted/30 px-4 py-3">
              <ArrowUpRight className="h-4 w-4 text-sea-600" />
              <p className="text-[12.5px] font-semibold">
                {t("approval.decided")} ·{" "}
                {decision === "approve" ? t("action.approve") : decision === "reject" ? t("action.reject") : t("action.back")}
              </p>
              {comment && <ToneBadge tone="info">{comment}</ToneBadge>}
            </div>
          )}
        </Panel>

        <Panel title={t("panel.approval")} bodyClassName="p-5">
          <KeyValue
            items={[
              { label: t("approval.stages"), value: `${stage + 1} / ${stages.length}` },
              { label: t("approval.submitted"), value: new Date().toISOString().slice(0, 10) },
              { label: t("support.level"), value: screen.module },
              { label: t("form.status"), value: <StatusBadge value="Pending" /> },
            ]}
          />
          <div className="mt-4">
            <Timeline
              items={stages.slice(0, Math.max(1, stage + 1)).map((s, i) => ({
                id: `${i}`,
                text: `${s} — ${i < stage ? t("action.approve") : t("approval.pending")}`,
                actor: ["A. Alharbi", "M. Qahtani", "S. Rahman", "L. Costa"][i % 4],
                at: new Date(Date.now() - (stage - i) * 86400000).toISOString(),
                kind: i < stage ? "approve" : "escalate",
              }))}
            />
          </div>
        </Panel>
      </div>

      <Panel title={t("approval.history")} bodyClassName="p-5">
        <DataTable screen={screen} rows={rows} />
      </Panel>
    </div>
  );
}

export function WorkflowView({ screen }: { screen: ScreenDef }) {
  const { t, locale } = useI18n();
  const stages = ["Intake", "Triage", "Execution", "Verification", "Close"];
  const [active, setActive] = React.useState(2);
  const rows = useRows(screen);

  return (
    <div className="space-y-5">
      <PageHeader screen={screen} />

      <div className="grid gap-4 xl:grid-cols-3">
        <Panel className="xl:col-span-2" title={t("workflow.designer")} bodyClassName="p-5">
          <div className="relative space-y-3">
            {stages.map((s, i) => (
              <div key={s} className="flex gap-3">
                <div className="flex flex-col items-center">
                  <span
                    className={
                      "flex h-7 w-7 items-center justify-center rounded-full text-[11px] font-bold " +
                      (i < active ? "bg-sea-500 text-white" : i === active ? "bg-copper-500 text-white" : "bg-secondary text-muted-foreground")
                    }
                  >
                    {i + 1}
                  </span>
                  {i < stages.length - 1 && <span className="w-px flex-1 bg-border" />}
                </div>
                <div className="flex-1 pb-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="text-[13px] font-bold">{s}</p>
                    {i === active && <ToneBadge tone="warn">{t("approval.pending")}</ToneBadge>}
                    {i < active && <ToneBadge tone="good">{t("status.approved")}</ToneBadge>}
                  </div>
                  <p className="mt-0.5 text-[11.5px] text-muted-foreground">
                    {locale === "ar" ? "مرحلة" : "Stage"} {i + 1} · {t("workflow.actors")}:{" "}
                    {["Coordinator", "Supervisor", "Manager", "Verifier", "Owner"][i]}
                  </p>
                  {i === active && (
                    <div className="mt-2 flex gap-2">
                      <Button size="sm" variant="outline" onClick={() => setActive((a) => Math.min(a + 1, stages.length - 1))}>
                        {t("action.next")}
                      </Button>
                      <Button size="sm" variant="ghost" onClick={() => setActive((a) => Math.max(a - 1, 0))}>
                        {t("action.previous")}
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </Panel>

        <div className="space-y-4">
          <Panel title={t("workflow.rules")} bodyClassName="p-5">
            <ul className="space-y-2 text-[12.5px]">
              <li>• {t("approval.stages")}: {stages.length}</li>
              <li>• {t("workflow.actors")}: 5</li>
              <li>• {t("support.sla")}: 48 {t("common.hours")}</li>
            </ul>
          </Panel>
          <Panel title={t("workflow.executions")} bodyClassName="p-5">
            <Timeline
              items={rows.slice(0, 5).map((r, i) => ({
                id: String(r.id ?? i),
                text: String(r.title ?? r.name ?? r.id ?? `Execution ${i + 1}`),
                actor: String(r.owner ?? r.assignee ?? "System"),
                at: String(r.date ?? r.createdAt ?? new Date().toISOString()),
                kind: i % 2 ? "escalate" : "approve",
              }))}
            />
          </Panel>
        </div>
      </div>
    </div>
  );
}
