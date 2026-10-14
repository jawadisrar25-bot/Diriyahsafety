import type { ModuleId, ScreenDef } from "@/types";
import { assemble, MODULE_META, MODULE_PATH } from "./screens/kit";
import { dashboardScreens } from "./screens/dashboard";
import { ohScreens } from "./screens/occupational-health";
import { ihScreens } from "./screens/industrial-hygiene";
import { csScreens } from "./screens/construction-safety";
import { securityScreens } from "./screens/security";
import { incidentScreens } from "./screens/incidents";
import { riskPermitScreens } from "./screens/risk-permits";
import { contractorScreens } from "./screens/contractors";
import { emergencyScreens, bcmScreens } from "./screens/emergency-bcm";
import { complianceScreens, auditScreens } from "./screens/compliance-audits";
import { trainingScreens, environmentScreens } from "./screens/training-environment";
import { documentScreens, reportingScreens } from "./screens/documents-reporting";
import {
  adminScreens,
  integrationScreens,
  supportScreens,
} from "./screens/admin-integrations-support";

export const SCREEN_GROUPS: Array<{ module: ModuleId; screens: ScreenDef[] }> = [
  { module: "dashboard", screens: dashboardScreens },
  { module: "occupational-health", screens: ohScreens },
  { module: "industrial-hygiene", screens: ihScreens },
  { module: "construction-safety", screens: csScreens },
  { module: "security", screens: securityScreens },
  { module: "incidents", screens: incidentScreens },
  { module: "risk-permits", screens: riskPermitScreens },
  { module: "contractors", screens: contractorScreens },
  { module: "emergency", screens: emergencyScreens },
  { module: "business-continuity", screens: bcmScreens },
  { module: "compliance", screens: complianceScreens },
  { module: "audits", screens: auditScreens },
  { module: "training", screens: trainingScreens },
  { module: "environment", screens: environmentScreens },
  { module: "documents", screens: documentScreens },
  { module: "reporting", screens: reportingScreens },
  { module: "administration", screens: adminScreens },
  { module: "integrations", screens: integrationScreens },
  { module: "support", screens: supportScreens },
];

export const SCREENS: ScreenDef[] = assemble(SCREEN_GROUPS.map((g) => g.screens));

export const SCREEN_COUNT = SCREENS.length;

export const MODULE_ORDER: ModuleId[] = SCREEN_GROUPS.map((g) => g.module);

export const SCREEN_BY_PATH: Record<string, ScreenDef> = Object.fromEntries(
  SCREENS.map((s) => [s.path, s])
);

export function findScreen(path: string): ScreenDef | undefined {
  return SCREEN_BY_PATH[path.replace(/\/$/, "") || "/"];
}

export function screensByModule(module: ModuleId): ScreenDef[] {
  return SCREENS.filter((s) => s.module === module);
}

export { MODULE_META, MODULE_PATH };
export type { ScreenDef };
