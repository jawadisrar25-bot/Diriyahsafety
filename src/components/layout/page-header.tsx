import * as React from "react";
import { useNavigate } from "react-router-dom";
import { Star, Download, Plus } from "lucide-react";
import { useI18n } from "@/i18n";
import { useAppStore } from "@/store/app-store";
import { can } from "@/lib/roles";
import { MODULE_META } from "@/data/screens";
import { describeScreen } from "@/lib/descriptions";
import type { ScreenDef } from "@/types";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/toast";
import { cn } from "@/lib/utils";

export function PageHeader({
  screen,
  actions,
  children,
}: {
  screen: ScreenDef;
  actions?: React.ReactNode;
  children?: React.ReactNode;
}) {
  const { t, locale } = useI18n();
  const navigate = useNavigate();
  const role = useAppStore((s) => s.role);
  const savedPaths = useAppStore((s) => s.savedPaths);
  const toggleSaved = useAppStore((s) => s.toggleSaved);
  const isSaved = savedPaths.includes(screen.path);
  const f = screen.features;
  const meta = MODULE_META[screen.module];

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between lg:gap-8">
        <div className="flex min-w-0 max-w-3xl gap-3.5">
          <span
            className="w-1 shrink-0 self-stretch rounded-full"
            style={{ background: meta.accent }}
            aria-hidden="true"
          />
          <div className="min-w-0">
            <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-muted-foreground">
              {locale === "ar" ? meta.nameAr : meta.name}
            </p>
            <h1 className="mt-1.5 font-display text-[26px] font-bold leading-[1.15] tracking-tight md:text-[30px]">
              {locale === "ar" ? screen.titleAr : screen.title}
            </h1>
            <p className="mt-2 max-w-2xl text-[13.5px] leading-relaxed text-muted-foreground">
              {describeScreen(screen, locale)}
            </p>
          </div>
        </div>

        <div className="flex shrink-0 flex-wrap items-center gap-2 lg:pt-1">
          {actions ?? (
            <>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => toggleSaved(screen.path)}
                className={cn(isSaved && "text-copper-700")}
              >
                <Star className={cn("h-3.5 w-3.5", isSaved && "fill-current")} />
                {isSaved ? t("action.saved") : t("action.favorite")}
              </Button>
              {f.includes("export") && can(role, "export.records") && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => toast.success(t("action.export"), t("report.generated"))}
                >
                  <Download className="h-3.5 w-3.5" />
                  {t("action.export")}
                </Button>
              )}
              {f.includes("create") && (
                <Button size="sm" onClick={() => navigate(screen.path + "/new")}>
                  <Plus className="h-3.5 w-3.5" />
                  {t("action.new")}
                </Button>
              )}
            </>
          )}
        </div>
      </div>

      {children}
    </div>
  );
}
