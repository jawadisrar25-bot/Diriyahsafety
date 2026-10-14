import { screen, ST } from "./kit";
import type { ScreenDef } from "@/types";

export const contractorScreens: ScreenDef[] = [
  screen("contractors", "contractor-overview", "Contractor Dashboard", "لوحة المقاولين", "dashboard", "contractors", {
    icon: "building-2",
    kpis: ["contractor", "volume"],
    chart: "composed",
    layout: "wide",
  }),
  screen("contractors", "contractor-directory", "Contractor Directory", "دليل المقاولين", "table", "contractors", {
    icon: "book-user",
    columns: ["id", "name", "trade", "projectId", "hseScore", "rating", "status"],
    statuses: ["Approved", "Conditional", "Suspended", "Onboarding"],
    features: ["search", "filters", "pagination", "status", "export", "create", "edit"],
  }),
  screen("contractors", "register-contractor", "Register Contractor", "تسجيل مقاول", "form", "contractors", {
    icon: "file-plus-2",
    features: ["steps", "upload", "create"],
    layout: "focus",
  }),
  screen("contractors", "contractor-profile", "Contractor Profile", "الملف التعريفي للمقاول", "detail", "contractors", {
    icon: "building",
    features: ["timeline", "attachments", "status", "edit", "chart"],
    layout: "split",
    companion: "related",
  }),
  screen("contractors", "contractor-employees", "Contractor Employees", "موظفو المقاول", "table", "employees", {
    icon: "users",
    columns: ["id", "name", "trade", "jobTitle", "fitness", "status", "hireDate"],
  }),
  screen("contractors", "contractor-projects", "Contractor Project Assignments", "تعيينات المقاول للمشاريع", "table", "projects", {
    icon: "folder-kanban",
    columns: ["name", "code", "phase", "progress", "headcount", "status"],
  }),
  screen("contractors", "approved-activities", "Authorized Work Activities", "الأنشطة المعتمدة", "table", "contractors", {
    icon: "list-checks",
    columns: ["id", "name", "trade", "approvedActivities", "hseScore", "status"],
  }),
  screen("contractors", "contractor-compliance", "Contractor Compliance", "امتثال المقاول", "table", "ncrs", {
    icon: "file-check-2",
    columns: ["id", "title", "severity", "clause", "dueDate", "status"],
    statuses: ST.compliance,
  }),
  screen("contractors", "contractor-incidents", "Contractor Incidents", "حوادث المقاول", "table", "incidents", {
    icon: "triangle-alert",
    columns: ["id", "title", "severity", "contractorId", "date", "status"],
  }),
  screen("contractors", "contractor-inspections", "Contractor Inspections", "فحوصات المقاول", "table", "inspections", {
    icon: "clipboard-check",
    columns: ["id", "title", "inspector", "score", "nonConformances", "nextDue", "status"],
  }),
  screen("contractors", "contractor-audits", "Contractor Audit History", "سجل تدقيق المقاول", "table", "audits", {
    icon: "scroll-text",
    columns: ["id", "title", "standard", "auditor", "score", "findings", "status"],
  }),
  screen("contractors", "contractor-risk", "Contractor Risk Register", "سجل مخاطر المقاول", "table", "risks", {
    icon: "shield-alert",
    columns: ["id", "title", "category", "score", "residual", "owner", "status"],
  }),
  screen("contractors", "contractor-actions", "Contractor Corrective Actions", "الإجراءات التصحيحية للمقاول", "table", "actions", {
    icon: "list-todo",
    columns: ["id", "title", "owner", "priority", "dueDate", "status"],
    statuses: ST.openClosed,
  }),
  screen("contractors", "scorecard", "Contractor Performance Scorecard", "بطاقة أداء المقاول", "scorecard", "contractors", {
    icon: "gauge",
    chart: "radar",
    kpis: ["contractor"],
    layout: "wide",
    features: ["chart", "compare", "export", "filters"],
  }),
];
