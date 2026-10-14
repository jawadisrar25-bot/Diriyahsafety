import { screen, ST } from "./kit";
import type { ScreenDef } from "@/types";

export const riskPermitScreens: ScreenDef[] = [
  screen("risk-permits", "risk-overview", "Risk Management Dashboard", "لوحة إدارة المخاطر", "dashboard", "risks", {
    icon: "shield-alert",
    kpis: ["volume", "compliance"],
    chart: "composed",
    layout: "wide",
  }),
  screen("risk-permits", "risk-register", "Enterprise Risk Register", "سجل المخاطر المؤسسي", "table", "risks", {
    icon: "table-properties",
    columns: ["id", "title", "category", "likelihood", "impact", "score", "residual", "owner", "status"],
    kpis: ["volume"],
    features: ["search", "filters", "advanced", "pagination", "status", "export", "create", "edit"],
  }),
  screen("risk-permits", "new-risk", "Create Risk Assessment", "إنشاء تقييم مخاطر", "form", "risks", {
    icon: "file-plus-2",
    features: ["steps", "create"],
    layout: "focus",
  }),
  screen("risk-permits", "risk-detail", "Risk Assessment Details", "تفاصيل تقييم المخاطر", "detail", "risks", {
    icon: "file-search",
    features: ["timeline", "attachments", "status", "edit", "approval"],
    layout: "split",
  }),
  screen("risk-permits", "risk-matrix", "Risk Matrix", "مصفوفة المخاطر", "builder", "risks", {
    icon: "grid-3x3",
    features: ["chart", "filters", "compare"],
    layout: "wide",
  }),
  screen("risk-permits", "hazard-identification", "Hazard Identification", "تحديد المخاطر", "table", "observations", {
    icon: "scan-search",
    columns: ["id", "title", "type", "behaviour", "rating", "date", "status"],
  }),
  screen("risk-permits", "cow-overview", "Control of Work Dashboard", "لوحة التحكم في العمل", "dashboard", "permits", {
    icon: "clipboard-check",
    kpis: ["volume", "compliance"],
    chart: "bar",
    layout: "wide",
  }),
  screen("risk-permits", "permit-registry", "Permit-to-Work Registry", "سجل تصاريح العمل", "table", "permits", {
    icon: "badge-check",
    columns: ["number", "type", "projectId", "contractorId", "riskLevel", "startDate", "endDate", "status"],
    statuses: ST.permit,
    kpis: ["volume"],
    features: ["search", "filters", "advanced", "pagination", "status", "export", "create", "edit"],
  }),
  screen("risk-permits", "new-permit", "New Permit Request", "طلب تصريح عمل جديد", "form", "permits", {
    icon: "file-plus-2",
    features: ["steps", "upload", "create"],
    layout: "focus",
  }),
  screen("risk-permits", "permit-detail", "Permit Details", "تفاصيل التصريح", "detail", "permits", {
    icon: "file-check-2",
    features: ["timeline", "attachments", "status", "edit", "approval"],
    layout: "split",
  }),
  screen("risk-permits", "permit-approvals", "Permit Approval Workflow", "سير اعتماد التصاريح", "approval", "permits", {
    icon: "stamp",
    approvalStages: ["Issuing authority", "HSE officer", "Area owner", "Permit office"],
    statuses: ST.workflow,
  }),
  screen("risk-permits", "active-permits-map", "Active Permits Map", "خريطة التصاريح النشطة", "map", "permits", {
    icon: "map-pinned",
    features: ["map", "filters", "status", "export"],
  }),
  screen("risk-permits", "high-risk-work", "High-Risk Work Monitoring", "مراقبة الأعمال عالية المخاطر", "table", "permits", {
    icon: "triangle-alert",
    columns: ["number", "type", "riskScore", "location", "startDate", "issuer", "status"],
    statuses: ["Active", "Pending approval", "Suspended"],
  }),
  screen("risk-permits", "permit-closure", "Permit Closure", "إغلاق التصاريح", "workflow", "permits", {
    icon: "lock",
    features: ["workflow", "approval", "status", "attachments"],
  }),
  screen("risk-permits", "management-of-change", "Management of Change", "إدارة التغيير", "table", "approvals", {
    icon: "replace",
    columns: ["id", "title", "type", "requester", "stage", "submitted", "status"],
  }),
  screen("risk-permits", "risk-permit-analytics", "Risk & Permit Analytics", "تحليلات المخاطر والتصاريح", "analytics", "permits", {
    icon: "chart-spline",
    kpis: ["volume", "compliance"],
    chart: "composed",
    layout: "wide",
    features: ["chart", "filters", "export", "compare", "schedule"],
  }),
];
