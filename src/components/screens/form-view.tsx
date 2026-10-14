import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Check, UploadCloud, Save, Send } from "lucide-react";
import type { ScreenDef } from "@/types";
import { useI18n } from "@/i18n";
import { useAppStore } from "@/store/app-store";
import { PageHeader } from "@/components/layout/page-header";
import { Panel, SectionLabel } from "@/components/common/panel";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/toast";

const schema = z.object({
  title: z.string().min(3, "Too short"),
  owner: z.string().min(2, "Required"),
  date: z.string().min(1, "Required"),
  description: z.string().min(5, "Too short"),
});

type FormValues = z.infer<typeof schema>;

export function FormView({ screen }: { screen: ScreenDef }) {
  const { t } = useI18n();
  const addRecord = useAppStore((s) => s.addRecord);
  const entity = screen.entity === "none" ? "actions" : screen.entity;
  const [step, setStep] = React.useState(0);
  const steps = screen.features.includes("steps") ? [t("panel.summary"), t("form.section"), t("form.attachments"), t("panel.approval")] : [t("form.section")];

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    watch,
  } = useForm<FormValues>({ resolver: zodResolver(schema), mode: "onBlur" });

  const onSubmit = (values: FormValues) => {
    addRecord(entity, { ...values, status: "Draft", projectId: "P-001" });
    toast.success(t("form.saved"), t("form.savedDesc"));
    reset();
    setStep(0);
  };

  return (
    <div className="space-y-5">
      <PageHeader screen={screen} />

      {steps.length > 1 && (
        <ol className="flex flex-wrap gap-2">
          {steps.map((s, i) => (
            <li key={s}>
              <button
                type="button"
                onClick={() => setStep(i)}
                className={
                  "flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[12px] font-bold transition-colors " +
                  (i === step
                    ? "bg-primary text-primary-foreground"
                    : i < step
                      ? "bg-sea-50 text-sea-700"
                      : "bg-secondary text-secondary-foreground")
                }
              >
                {i < step ? <Check className="h-3 w-3" /> : <span className="num">{i + 1}</span>}
                {s}
              </button>
            </li>
          ))}
        </ol>
      )}

      <div className="grid gap-4 xl:grid-cols-3">
        <Panel className="xl:col-span-2" title={steps[step]} bodyClassName="p-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label htmlFor="title">{t("common.name")} *</Label>
                <Input id="title" {...register("title")} placeholder={t("common.name")} />
                {errors.title && <p className="text-[11.5px] text-crimson-600">{errors.title.message}</p>}
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="owner">{t("form.owner")} *</Label>
                <Input id="owner" {...register("owner")} placeholder={t("form.owner")} />
                {errors.owner && <p className="text-[11.5px] text-crimson-600">{errors.owner.message}</p>}
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="date">{t("form.date")} *</Label>
                <Input id="date" type="date" {...register("date")} />
                {errors.date && <p className="text-[11.5px] text-crimson-600">{errors.date.message}</p>}
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="description">{t("form.description")} *</Label>
              <Textarea id="description" rows={5} {...register("description")} placeholder={t("form.description")} />
              {errors.description && <p className="text-[11.5px] text-crimson-600">{errors.description.message}</p>}
            </div>

            {screen.features.includes("upload") && (
              <div>
                <SectionLabel>{t("form.attachments")}</SectionLabel>
                <div className="flex items-center gap-3 rounded-lg border border-dashed bg-muted/20 px-4 py-5">
                  <UploadCloud className="h-6 w-6 text-muted-foreground" />
                  <p className="text-[12.5px] text-muted-foreground">{t("form.uploadHint")}</p>
                </div>
              </div>
            )}

            <div className="flex flex-wrap items-center gap-2 border-t pt-4">
              {step < steps.length - 1 ? (
                <Button type="button" onClick={() => setStep((s) => Math.min(s + 1, steps.length - 1))}>
                  {t("action.next")}
                </Button>
              ) : (
                <>
                  <Button type="submit" disabled={isSubmitting}>
                    <Send className="h-3.5 w-3.5" />
                    {t("action.submit")}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleSubmit((v) => {
                      addRecord(entity, { ...v, status: "Draft", projectId: "P-001" });
                      toast.success(t("action.draft"), t("form.savedDesc"));
                    })}
                  >
                    <Save className="h-3.5 w-3.5" />
                    {t("action.draft")}
                  </Button>
                </>
              )}
              {step > 0 && (
                <Button type="button" variant="ghost" onClick={() => setStep((s) => s - 1)}>
                  {t("action.previous")}
                </Button>
              )}
              {Object.keys(watch() ?? {}).length > 0 && (
                <span className="ms-auto text-[11.5px] text-muted-foreground">{t("form.unsaved")}</span>
              )}
            </div>
          </form>
        </Panel>

        <Panel title={t("panel.notes")} bodyClassName="p-6">
          <p className="text-[12.5px] leading-relaxed text-muted-foreground">
            {t("scope.desc")}
          </p>
          <ul className="mt-4 space-y-2 text-[12.5px] text-muted-foreground">
            <li>{t("form.requiredField")}</li>
            <li>{t("form.uploadHint")}</li>
          </ul>
        </Panel>
      </div>
    </div>
  );
}
