import type { ModuleId, ScreenDef } from "@/types";

export interface RoleDef {
  id: string;
  name: string;
  nameAr: string;
  short: string;
  scope: string;
  homePath: string;
  capabilities: Capability[];
  moduleGrants: ModuleId[];
}

export type Capability =
  | "dashboard.executive"
  | "incident.create"
  | "incident.investigate"
  | "incident.approve"
  | "permit.request"
  | "permit.issue"
  | "permit.approve"
  | "medical.view"
  | "medical.edit"
  | "medical.restricted"
  | "exposure.view"
  | "exposure.enter"
  | "audit.plan"
  | "audit.execute"
  | "audit.close"
  | "training.manage"
  | "contractor.approve"
  | "risk.accept"
  | "action.verify"
  | "action.assign"
  | "document.edit"
  | "workflow.design"
  | "admin.users"
  | "admin.roles"
  | "admin.config"
  | "integrations.configure"
  | "report.build"
  | "export.records"
  | "emergency.activate"
  | "bcm.activate"
  | "compliance.approve";

const ALL: Capability[] = [
  "dashboard.executive",
  "incident.create",
  "incident.investigate",
  "incident.approve",
  "permit.request",
  "permit.issue",
  "permit.approve",
  "medical.view",
  "medical.edit",
  "medical.restricted",
  "exposure.view",
  "exposure.enter",
  "audit.plan",
  "audit.execute",
  "audit.close",
  "training.manage",
  "contractor.approve",
  "risk.accept",
  "action.verify",
  "action.assign",
  "document.edit",
  "workflow.design",
  "admin.users",
  "admin.roles",
  "admin.config",
  "integrations.configure",
  "report.build",
  "export.records",
  "emergency.activate",
  "bcm.activate",
  "compliance.approve",
];

const HEALTH: Capability[] = [
  "medical.view",
  "medical.edit",
  "medical.restricted",
  "exposure.view",
  "action.assign",
  "action.verify",
  "export.records",
];

const HYGIENE: Capability[] = [
  "exposure.view",
  "exposure.enter",
  "medical.view",
  "action.assign",
  "action.verify",
  "export.records",
  "audit.execute",
];

const SAFETY: Capability[] = [
  "incident.create",
  "incident.investigate",
  "permit.request",
  "permit.issue",
  "risk.accept",
  "action.assign",
  "action.verify",
  "audit.execute",
  "training.manage",
  "export.records",
];

const SECURITY: Capability[] = ["incident.create", "incident.investigate", "action.assign", "export.records"];

const VIEWER: Capability[] = ["export.records"];

const ALL_MODULES: ModuleId[] = [
  "dashboard",
  "occupational-health",
  "industrial-hygiene",
  "construction-safety",
  "security",
  "incidents",
  "risk-permits",
  "contractors",
  "emergency",
  "business-continuity",
  "compliance",
  "audits",
  "training",
  "environment",
  "documents",
  "reporting",
  "administration",
  "integrations",
  "support",
];

const OPERATOR_MODULES: ModuleId[] = ALL_MODULES.filter(
  (m) => m !== "administration" && m !== "integrations" && m !== "business-continuity"
);

const PUBLIC_ROLES: Omit<RoleDef, "id" | "name" | "nameAr" | "short" | "scope" | "homePath">[] = [
  {
    capabilities: ALL,
    moduleGrants: ALL_MODULES,
  },
  {
    capabilities: ALL.filter((c) => c !== "admin.users" && c !== "admin.roles"),
    moduleGrants: ALL_MODULES,
  },
  {
    capabilities: SAFETY.concat(["dashboard.executive", "incident.approve", "medical.view", "audit.plan", "compliance.approve", "risk.accept"]),
    moduleGrants: ALL_MODULES.filter((m) => m !== "administration"),
  },
  {
    capabilities: SAFETY,
    moduleGrants: OPERATOR_MODULES,
  },
  {
    capabilities: HEALTH.concat(["dashboard.executive", "incident.create", "action.assign"]),
    moduleGrants: ALL_MODULES.filter((m) => m !== "administration"),
  },
  {
    capabilities: HEALTH,
    moduleGrants: ["occupational-health", "incidents", "documents", "reporting", "dashboard", "support"],
  },
  {
    capabilities: HYGIENE,
    moduleGrants: ["industrial-hygiene", "occupational-health", "incidents", "documents", "reporting", "dashboard", "support"],
  },
  {
    capabilities: SECURITY,
    moduleGrants: ["security", "incidents", "contractors", "documents", "reporting", "dashboard", "support", "emergency"],
  },
  {
    capabilities: ["emergency.activate", "action.assign", "action.verify", "incident.create", "audit.execute", "export.records"],
    moduleGrants: ALL_MODULES.filter((m) => m !== "administration"),
  },
  {
    capabilities: ["bcm.activate", "risk.accept", "action.assign", "action.verify", "audit.plan", "export.records", "compliance.approve"],
    moduleGrants: ALL_MODULES.filter((m) => m !== "administration"),
  },
  {
    capabilities: ["compliance.approve", "document.edit", "audit.plan", "risk.accept", "action.assign", "action.verify", "export.records"],
    moduleGrants: ALL_MODULES.filter((m) => m !== "administration"),
  },
  {
    capabilities: ["audit.plan", "audit.execute", "audit.close", "export.records", "action.assign"],
    moduleGrants: ["audits", "compliance", "incidents", "contractors", "construction-safety", "documents", "reporting", "dashboard"],
  },
  {
    capabilities: ["action.assign", "export.records"],
    moduleGrants: ["contractors", "incidents", "audits", "documents", "dashboard"],
  },
  {
    capabilities: ["training.manage", "action.assign", "export.records"],
    moduleGrants: ["training", "dashboard", "documents", "reporting", "support"],
  },
  {
    capabilities: ["training.manage"],
    moduleGrants: ["training", "dashboard"],
  },
  {
    capabilities: ALL.filter((c) => c !== "admin.users" && c !== "admin.roles" && c !== "integrations.configure"),
    moduleGrants: ALL_MODULES,
  },
  {
    capabilities: VIEWER,
    moduleGrants: ALL_MODULES.filter((m) => m !== "administration" && m !== "integrations"),
  },
];

const META: Array<[string, string, string, string, string, string]> = [
  ["sysadmin", "System Administrator", "مدير النظام", "SYS", "Full platform configuration and access administration.", "/administration/admin-overview"],
  ["ohss-director", "OHSS Director", "مدير الصحة والسلامة والأمن", "DIR", "Executive ownership of OHSS performance across all Diriyah projects.", "/dashboard/executive"],
  ["ohss-engineer", "OHSS Engineer", "مهندس الصحة والسلامة والأمن", "ENG", "Designs and monitors OHSS controls, assessments and corrective actions.", "/dashboard/operations"],
  ["safety-officer", "Safety Officer", "ضابط السلامة", "SAF", "Site safety inspections, observations, permits and incident response.", "/construction-safety/safety-overview"],
  ["oh-specialist", "Occupational Health Specialist", "أخصائي الصحة المهنية", "MED", "Clinical surveillance, medical fitness and restricted medical records.", "/occupational-health/health-overview"],
  ["clinic-staff", "Clinic Staff", "طاقم العيادة", "CLN", "Day-to-day clinic operations, visits, appointments and test results.", "/occupational-health/clinic-directory"],
  ["hygiene-specialist", "Industrial Hygiene Specialist", "أخصائي نظافة صناعية", "HYG", "Exposure monitoring, SEG management and occupational exposure limits.", "/industrial-hygiene/hygiene-overview"],
  ["security-officer", "Security Officer", "ضابط الأمن", "SEC", "Security incidents, patrol monitoring, access control and visitor management.", "/security-operations/security-overview"],
  ["emergency-officer", "Emergency Management Officer", "ضابط إدارة الطوارئ", "EMG", "Emergency plans, drills, response teams and crisis communications.", "/emergency-management/emergency-overview"],
  ["bcm-manager", "Business Continuity Manager", "مدير استمرارية الأعمال", "BCM", "Business impact analysis, continuity plans and crisis activation.", "/business-continuity/continuity-overview"],
  ["compliance-officer", "Compliance Officer", "ضابط الامتثال", "CMP", "Legal registers, policies, compliance assessments and governance reviews.", "/compliance-governance/compliance-overview"],
  ["auditor", "Auditor", "مدقق داخلي", "AUD", "Audit planning, execution, findings and non-conformance management.", "/audits-inspections/audit-overview"],
  ["contractor-rep", "Contractor Representative", "ممثل المقاول", "CON", "Contractor-side view of safety actions, permits and compliance status.", "/contractor-management/contractor-overview"],
  ["training-manager", "Training Manager", "مدير التدريب", "TRN", "Training programs, calendar, trainees, instructors and certifications.", "/training-development/training-overview"],
  ["instructor", "Instructor", "مدرب", "INS", "Instructor schedule, attendance capture and competency assessment.", "/training-development/instructor-schedule"],
  ["executive", "Executive Management", "الإدارة التنفيذية", "EXE", "Read-oriented strategic view of OHSS performance and risk.", "/dashboard/executive"],
  ["read-only", "Read-Only User", "مستخدم للقراءة فقط", "RO", "View-only access across permitted modules for audit and review purposes.", "/dashboard/executive"],
];

export const ROLES: RoleDef[] = META.map(([id, name, nameAr, short, scope, homePath], i) => ({
  id,
  name,
  nameAr,
  short,
  scope,
  homePath,
  capabilities: PUBLIC_ROLES[i].capabilities,
  moduleGrants: PUBLIC_ROLES[i].moduleGrants,
}));

export const DEFAULT_ROLE = "ohss-director";

export function getRole(id: string): RoleDef {
  return ROLES.find((r) => r.id === id) ?? ROLES.find((r) => r.id === DEFAULT_ROLE)!;
}

export function can(role: RoleDef | string, capability: Capability): boolean {
  const r = typeof role === "string" ? getRole(role) : role;
  return r.capabilities.includes(capability);
}

export function canViewModule(role: RoleDef | string, module: ModuleId): boolean {
  const r = typeof role === "string" ? getRole(role) : role;
  return r.moduleGrants.includes(module);
}

export function canViewScreen(role: RoleDef | string, screen: ScreenDef): boolean {
  const r = typeof role === "string" ? getRole(role) : role;
  if (!canViewModule(r, screen.module)) return false;
  if (screen.restricted && !can(r, "medical.view")) return false;
  return true;
}

export function filterScreensForRole<T extends { module: ModuleId; restricted?: boolean }>(
  role: RoleDef | string,
  screens: T[]
): T[] {
  const r = typeof role === "string" ? getRole(role) : role;
  return screens.filter((s) => canViewModule(r, s.module) && (!s.restricted || can(r, "medical.view")));
}
