import { screen, ST } from "./kit";
import type { ScreenDef } from "@/types";

export const documentScreens: ScreenDef[] = [
  screen("documents", "document-library", "Document Library", "مكتبة المستندات", "table", "documents", {
    icon: "library",
    columns: ["id", "name", "category", "version", "projectId", "date", "status"],
    statuses: ["Approved", "In review", "Draft", "Superseded", "Restricted"],
    kpis: ["document"],
    features: ["search", "filters", "advanced", "pagination", "status", "export", "create", "edit", "delete", "upload"],
  }),
  screen("documents", "document-detail", "Document Details", "تفاصيل المستند", "detail", "documents", {
    icon: "file-text",
    features: ["timeline", "attachments", "status", "edit", "approval"],
    layout: "split",
  }),
  screen("documents", "document-upload", "Document Upload", "رفع المستندات", "form", "documents", {
    icon: "upload-cloud",
    features: ["steps", "upload", "create"],
    layout: "focus",
  }),
  screen("documents", "templates", "Document Templates", "قوالب المستندات", "table", "documents", {
    icon: "copy",
    columns: ["id", "name", "category", "version", "uploadedBy", "status"],
  }),
  screen("documents", "form-builder", "Dynamic Form Builder", "منشئ النماذج الديناميكي", "builder", "none", {
    icon: "blocks",
    features: ["workflow", "create", "edit", "upload"],
    layout: "wide",
    scopeNote: "Fields can be added, reordered and marked required for each form template.",
  }),
  screen("documents", "form-templates", "Form Template Management", "إدارة قوالب النماذج", "table", "documents", {
    icon: "layout-template",
    columns: ["id", "name", "category", "version", "status", "date"],
  }),
  screen("documents", "workflow-builder", "Approval Workflow Builder", "منشئ سير الاعتماد", "builder", "none", {
    icon: "waypoints",
    features: ["workflow", "create", "edit"],
    layout: "wide",
  }),
  screen("documents", "approval-requests", "Approval Request Details", "تفاصيل طلبات الاعتماد", "approval", "approvals", {
    icon: "stamp",
    approvalStages: ["Submitter", "Reviewer", "Approver", "Executive"],
    statuses: ST.workflow,
    columns: ["id", "title", "type", "reference", "stage", "status"],
  }),
  screen("documents", "workflow-history", "Workflow Execution History", "سجل تنفيذ سير العمل", "table", "activities", {
    icon: "history",
    columns: ["id", "ref", "text", "actor", "at", "kind"],
  }),
  screen("documents", "document-analytics", "Document & Workflow Analytics", "تحليلات المستندات وسير العمل", "analytics", "documents", {
    icon: "chart-column",
    kpis: ["document"],
    chart: "composed",
    features: ["chart", "filters", "export", "schedule"],
  }),
];

export const reportingScreens: ScreenDef[] = [
  screen("reporting", "analytics-overview", "Analytics Overview", "نظرة عامة على التحليلات", "dashboard", "incidents", {
    icon: "chart-no-axes-combined",
    kpis: ["safety", "compliance", "training", "contractor"],
    chart: "composed",
    layout: "wide",
  }),
  screen("reporting", "executive-reporting", "Executive Reporting", "التقارير التنفيذية", "analytics", "incidents", {
    icon: "presentation",
    chart: "composed",
    kpis: ["safety", "compliance"],
    features: ["chart", "filters", "export", "schedule", "compare"],
    layout: "wide",
  }),
  screen("reporting", "safety-kpi", "Safety KPI Analytics", "تحليلات مؤشرات السلامة", "analytics", "incidents", {
    icon: "hard-hat",
    chart: "composed",
    kpis: ["safety"],
  }),
  screen("reporting", "medical-exposure", "Medical & Exposure Analytics", "تحليلات الطب والتعرض", "analytics", "exposureSamples", {
    icon: "stethoscope",
    chart: "area",
    kpis: ["hygiene", "health"],
    restricted: true,
  }),
  screen("reporting", "contractor-analytics", "Contractor Analytics", "تحليلات المقاولين", "analytics", "contractors", {
    icon: "building-2",
    chart: "bar",
    kpis: ["contractor"],
  }),
  screen("reporting", "report-builder", "Custom Report Builder", "منشئ التقارير المخصص", "builder", "none", {
    icon: "wrench",
    features: ["workflow", "create", "schedule", "export"],
    layout: "wide",
  }),
  screen("reporting", "dashboard-designer", "Dashboard Designer", "مصمم اللوحات", "builder", "none", {
    icon: "panels-top-left",
    features: ["workflow", "create", "edit", "chart"],
    layout: "wide",
  }),
  screen("reporting", "scheduled-reports", "Export & Scheduled Reports", "التقارير المجدولة والتصدير", "table", "documents", {
    icon: "calendar-clock",
    columns: ["id", "name", "category", "version", "uploadedBy", "status"],
    statuses: ["Scheduled", "Active", "Paused"],
    features: ["search", "filters", "schedule", "export", "status"],
  }),
  screen("reporting", "ai-insights", "AI Insights & Recommendations", "الرؤى والتحليلات الذكية والرؤى الآلية", "dashboard", "none", {
    icon: "sparkles",
    features: ["workflow", "create", "edit", "export", "simulate"],
    layout: "wide",
    scopeNote: "Risk prediction, incident trend detection, exposure and medical decision support, smart recommendations and automated report insights.",
  }),
];

