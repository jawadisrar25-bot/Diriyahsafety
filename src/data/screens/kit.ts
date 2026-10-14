import type { ModuleId, ScreenDef, ScreenFeature, ScreenKind, EntityId } from "@/types";

export const MODULE_PATH: Record<ModuleId, string> = {
  dashboard: "dashboard",
  "occupational-health": "occupational-health",
  "industrial-hygiene": "industrial-hygiene",
  "construction-safety": "construction-safety",
  security: "security-operations",
  incidents: "incidents",
  "risk-permits": "risk-permits",
  contractors: "contractor-management",
  emergency: "emergency-management",
  "business-continuity": "business-continuity",
  compliance: "compliance-governance",
  audits: "audits-inspections",
  training: "training-development",
  environment: "environmental-esg",
  documents: "documents-forms",
  reporting: "reports-intelligence",
  administration: "administration",
  integrations: "integrations",
  support: "support-service",
};

export const MODULE_META: Record<
  ModuleId,
  { name: string; nameAr: string; icon: string; accent: string }
> = {
  dashboard: { name: "Command Center", nameAr: "مركز القيادة", icon: "layout-dashboard", accent: "#142b30" },
  "occupational-health": { name: "Occupational Health", nameAr: "الصحة المهنية", icon: "heart-pulse", accent: "#0f7257" },
  "industrial-hygiene": { name: "Industrial Hygiene", nameAr: "نظافة صناعية", icon: "flask-conical", accent: "#a56b44" },
  "construction-safety": { name: "Construction Safety", nameAr: "سلامة البناء", icon: "hard-hat", accent: "#b8730e" },
  security: { name: "Security Management", nameAr: "إدارة الأمن", icon: "shield", accent: "#1b363b" },
  incidents: { name: "Incident Management", nameAr: "إدارة الحوادث", icon: "triangle-alert", accent: "#d76255" },
  "risk-permits": { name: "Risk & Permit-to-Work", nameAr: "المخاطر وتصاريح العمل", icon: "clipboard-check", accent: "#875638" },
  contractors: { name: "Contractor Management", nameAr: "إدارة المقاولين", icon: "building-2", accent: "#25474e" },
  emergency: { name: "Emergency Management", nameAr: "إدارة الطوارئ", icon: "siren", accent: "#b84336" },
  "business-continuity": { name: "Business Continuity", nameAr: "استمرارية الأعمال", icon: "workflow", accent: "#3a6169" },
  compliance: { name: "Compliance & Governance", nameAr: "الامتثال والحوكمة", icon: "scale", accent: "#0d5a46" },
  audits: { name: "Audits & Inspections", nameAr: "التدقيق والفحص", icon: "clipboard-list", accent: "#4f3224" },
  training: { name: "Training & Development", nameAr: "التدريب والتطوير", icon: "graduation-cap", accent: "#a56b44" },
  environment: { name: "Environmental & ESG", nameAr: "البيئة واستدامة", icon: "leaf", accent: "#188b6a" },
  documents: { name: "Documents & Workflows", nameAr: "المستندات وسير العمل", icon: "files", accent: "#3a6169" },
  reporting: { name: "Reports & Intelligence", nameAr: "التقارير والذكاء", icon: "chart-no-axes-combined", accent: "#142b30" },
  administration: { name: "Administration", nameAr: "الإدارة", icon: "settings-2", accent: "#25474e" },
  integrations: { name: "Integrations & Data", nameAr: "التكاملات والبيانات", icon: "plug", accent: "#5d7f87" },
  support: { name: "Platform Support", nameAr: "دعم المنصة", icon: "headset", accent: "#0d1f24" },
};

/** Shared status vocabularies so screens stay consistent. */
export const ST = {
  openClosed: ["Open", "In progress", "Pending", "Closed", "Overdue"],
  lifecycle: ["Draft", "In review", "Approved", "Active", "Superseded"],
  workflow: ["Submitted", "Under review", "Approved", "Rejected", "Returned"],
  fitness: ["Fit", "Fit with restrictions", "Temporarily unfit", "Under review"],
  severity: ["Low", "Medium", "High", "Critical"],
  permit: ["Draft", "Pending approval", "Active", "Closed", "Rejected", "Expired", "Suspended"],
  training: ["Registered", "In progress", "Completed", "No-show", "Expired"],
  integration: ["Connected", "Degraded", "Maintenance", "Disconnected"],
  sla: ["Open", "In progress", "Awaiting requester", "Resolved", "Closed", "Escalated"],
  drill: ["Planned", "In progress", "Closed", "Cancelled"],
  compliance: ["Compliant", "Partial", "Non-compliant", "Not assessed"],
  inspection: ["Scheduled", "In progress", "Action tracking", "Closed"],
  plan: ["Draft", "In review", "Approved", "Under revision"],
} as const;

/** Column presets keyed by entity; screens may override. */
export const COLS: Record<string, string[]> = {
  projects: ["name", "code", "phase", "progress", "headcount", "status", "manager"],
  employees: ["id", "name", "jobTitle", "site", "fitness", "status", "hireDate"],
  contractors: ["id", "name", "trade", "projectId", "hseScore", "rating", "status"],
  medicalVisits: ["id", "employeeId", "type", "date", "icd10", "fitness", "status"],
  appointments: ["id", "employeeId", "clinicId", "date", "time", "type", "status"],
  surveillance: ["id", "employeeId", "program", "lastDate", "nextDue", "status"],
  exposureSamples: ["id", "segId", "agent", "result", "oel", "status", "date"],
  segments: ["id", "name", "projectId", "headcount", "agents", "riskLevel"],
  incidents: ["id", "title", "severity", "projectId", "contractorId", "date", "status"],
  actions: ["id", "title", "owner", "priority", "dueDate", "status", "projectId"],
  permits: ["number", "type", "projectId", "contractorId", "riskLevel", "startDate", "status"],
  risks: ["id", "title", "category", "score", "residual", "owner", "status"],
  audits: ["id", "title", "standard", "auditor", "score", "findings", "status"],
  ncrs: ["id", "title", "source", "severity", "dueDate", "status"],
  programs: ["code", "name", "category", "duration", "enrolled", "status"],
  trainees: ["id", "employeeId", "programId", "completionDate", "expiryDate", "score", "status"],
  instructors: ["id", "name", "specialty", "rating", "sessions", "status"],
  drills: ["id", "name", "type", "date", "site", "score", "status"],
  bias: ["id", "businessFunction", "rtoHours", "criticality", "owner", "status"],
  policies: ["number", "title", "category", "version", "nextReview", "status"],
  documents: ["id", "name", "category", "version", "projectId", "date", "status"],
  integrations: ["id", "name", "category", "direction", "lastSync", "status"],
  tickets: ["id", "subject", "priority", "team", "slaHours", "status"],
  visitors: ["id", "name", "company", "host", "gate", "checkIn", "status"],
  roadClosures: ["id", "location", "reason", "start", "end", "status"],
  chemicals: ["id", "name", "cas", "hazardClass", "quantity", "storage", "status"],
  environmental: ["id", "metric", "month", "value", "target", "variancePct", "status"],
  observations: ["id", "title", "type", "rating", "observer", "date", "status"],
  inspections: ["id", "title", "type", "inspector", "score", "nonConformances", "status"],
  patrols: ["id", "officer", "route", "zone", "checkpoints", "exceptions", "status"],
  plans: ["id", "name", "type", "version", "owner", "reviewDate", "status"],
  approvals: ["id", "title", "type", "requester", "stage", "submitted", "status"],
  activities: ["id", "ref", "text", "actor", "at", "kind"],
};

export const KPI_SETS: Record<string, string[]> = {
  volume: ["records", "open", "overdue", "closedRate"],
  safety: ["incidents", "ltifr", "nearMiss", "openActions"],
  health: ["surveillanceDue", "fitRate", "restrictions", "clinicVisits"],
  hygiene: ["samples", "exceedances", "nearLimit", "segMonitored"],
  compliance: ["complianceRate", "policiesDue", "openNcrs", "auditScore"],
  training: ["programs", "trainees", "complianceRate", "expiring"],
  contractor: ["contractors", "avgHse", "suspended", "openIncidents"],
  security: ["visitors", "incidents", "patrols", "violations"],
  emergency: ["drills", "participants", "score", "openActions"],
  bcm: ["functions", "tier1", "plansApproved", "exercises"],
  platform: ["uptime", "ticketsOpen", "slaMet", "integrations"],
  licence: ["fullUsers", "liteUsers", "utilisation", "expiring"],
  environmental: ["metrics", "offTarget", "wasteRecycled", "emissions"],
  document: ["documents", "inReview", "restricted", "expiring"],
};

export type ScreenOpts = Partial<
  Omit<ScreenDef, "id" | "path" | "module" | "title" | "titleAr" | "kind" | "entity">
>;

/** Compact screen definition used by every module file. */
export function screen(
  module: ModuleId,
  slug: string,
  title: string,
  titleAr: string,
  kind: ScreenKind,
  entity: EntityId,
  opts: ScreenOpts = {}
): ScreenDef {
  const features: ScreenFeature[] = opts.features ?? defaultFeatures(kind, entity);
  return {
    id: 0,
    path: `/${MODULE_PATH[module]}/${slug}`,
    module,
    title,
    titleAr,
    kind,
    entity,
    icon: opts.icon ?? MODULE_META[module].icon,
    features,
    columns: opts.columns ?? (kind === "table" || kind === "workspace" ? COLS[entity] ?? undefined : undefined),
    kpis: opts.kpis,
    chart: opts.chart,
    statuses: opts.statuses,

    approvalStages: opts.approvalStages,
    restricted: opts.restricted,
    scopeNote: opts.scopeNote,
    companion: opts.companion ?? defaultCompanion(kind),
    layout: opts.layout,
  };
}

function defaultFeatures(kind: ScreenKind, entity: EntityId): ScreenFeature[] {
  const base: ScreenFeature[] = [];
  switch (kind) {
    case "table":
      base.push("search", "filters", "pagination", "status", "export", "create", "edit");
      break;
    case "detail":
      base.push("timeline", "attachments", "status", "edit");
      break;
    case "form":
      base.push("steps", "upload", "create");
      break;
    case "approval":
      base.push("approval", "workflow", "status", "search");
      break;
    case "workflow":
      base.push("workflow", "approval", "status");
      break;
    case "calendar":
      base.push("calendar", "create", "schedule");
      break;
    case "map":
      base.push("map", "filters", "export");
      break;
    case "analytics":
      base.push("chart", "filters", "export");
      break;
    case "builder":
      base.push("workflow", "create", "edit");
      break;
    case "scorecard":
      base.push("chart", "compare", "export");
      break;
    case "workspace":
      base.push("search", "filters", "pagination", "status", "create");
      break;
    case "dashboard":
      base.push("chart", "filters", "export");
      break;
    default:
      base.push("search", "filters");
  }
  if (entity === "medicalVisits" || entity === "appointments" || entity === "surveillance") base.push("restricted");
  return Array.from(new Set(base));
}

function defaultCompanion(kind: ScreenKind): ScreenDef["companion"] {
  switch (kind) {
    case "dashboard":
    case "analytics":
      return "activity";
    case "detail":
      return "related";
    case "table":
      return "quicklinks";
    default:
      return "none";
  }
}

/** Assemble and number the full inventory. */
export function assemble(groups: ScreenDef[][]): ScreenDef[] {
  const out: ScreenDef[] = [];
  let id = 1;
  for (const g of groups) {
    for (const s of g) {
      out.push({ ...s, id: id++ });
    }
  }
  return out;
}
