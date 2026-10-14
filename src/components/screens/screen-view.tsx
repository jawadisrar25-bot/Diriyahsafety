import * as React from "react";
import { Search, ShieldAlert, Construction } from "lucide-react";
import { useLocation, Navigate } from "react-router-dom";
import { findScreen } from "@/data/screens";
import { canViewScreen } from "@/lib/roles";
import { useAppStore } from "@/store/app-store";
import { useI18n } from "@/i18n";
import type { ScreenDef } from "@/types";
import { DashboardView } from "./dashboard-view";
import { TableView, DetailView, WorkspaceView } from "./table-view";
import { FormView } from "./form-view";
import { ApprovalView, WorkflowView } from "./approval-workflow-view";
import { CalendarView, MapView, AnalyticsView } from "./calendar-map-analytics";
import { BuilderView, ScorecardView, ViewerView } from "./builder-scorecard-viewer";
import { GlobalSearchScreen, SavedScreensScreen } from "./special-screens";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export function ScreenView() {
  const location = useLocation();
  const role = useAppStore((s) => s.role);
  const screen = findScreen(location.pathname);

  if (!screen) return <NotFound />;

  if (!canViewScreen(role, screen)) {
    return (
      <AccessDenied
        screen={screen}
        descriptionKey="restricted.desc"
      />
    );
  }

  return <RenderScreen screen={screen} />;
}

export function RenderScreen({ screen }: { screen: ScreenDef }) {
  switch (screen.kind) {
    case "dashboard":
      return <DashboardView screen={screen} />;
    case "workspace":
      if (screen.path === "/dashboard/search") return <GlobalSearchScreen />;
      if (screen.path === "/dashboard/workspace") return <SavedScreensScreen />;
      return <WorkspaceView screen={screen} />;
    case "table":
      return <TableView screen={screen} />;
    case "detail":
      return <DetailView screen={screen} />;
    case "form":
      return <FormView screen={screen} />;
    case "approval":
      return <ApprovalView screen={screen} />;
    case "workflow":
      return <WorkflowView screen={screen} />;
    case "calendar":
      return <CalendarView screen={screen} />;
    case "map":
      return <MapView screen={screen} />;
    case "analytics":
      return <AnalyticsView screen={screen} />;
    case "builder":
      return <BuilderView screen={screen} />;
    case "scorecard":
      return <ScorecardView screen={screen} />;
    case "viewer":
      return <ViewerView screen={screen} />;
    default:
      return <TableView screen={screen} />;
  }
}

export function AccessDenied({
  screen,
  descriptionKey,
}: {
  screen: ScreenDef;
  descriptionKey: string;
}) {
  const { t } = useI18n();
  const setRole = useAppStore((s) => s.setRole);
  return (
    <Card className="mx-auto mt-16 max-w-lg">
      <CardContent className="space-y-4 p-8 text-center">
        <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-crimson-50 text-crimson-600">
          <ShieldAlert className="h-6 w-6" />
        </span>
        <h1 className="font-display text-[20px] font-bold">{t("restricted.title")}</h1>
        <p className="text-[13px] text-muted-foreground">{t(descriptionKey as never)}</p>
        <p className="text-[12px] text-muted-foreground">
          {screen.title} · {t("top.switchRole")}
        </p>
        <Button onClick={() => setRole("ohss-director")}>{t("top.switchRole")}</Button>
      </CardContent>
    </Card>
  );
}

export function NotFound() {
  const { t } = useI18n();
  const first = findScreen("/dashboard/executive");
  return (
    <Card className="mx-auto mt-16 max-w-lg">
      <CardContent className="space-y-4 p-8 text-center">
        <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-amberish-50 text-amberish-600">
          <Construction className="h-6 w-6" />
        </span>
        <h1 className="font-display text-[20px] font-bold">{t("notFound.title")}</h1>
        <p className="text-[13px] text-muted-foreground">{t("notFound.desc")}</p>
        {first && <Navigate to={first.path} replace />}
      </CardContent>
    </Card>
  );
}

export function SearchScreen() {
  return <GlobalSearchScreen />;
}

export { Search };
