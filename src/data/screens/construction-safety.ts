import { screen, ST } from "./kit";
import type { ScreenDef } from "@/types";

export const csScreens: ScreenDef[] = [
  screen("construction-safety", "safety-overview", "Construction Safety Dashboard", "لوحة سلامة أعمال البناء", "dashboard", "incidents", {
    icon: "hard-hat",
    kpis: ["safety", "contractor", "volume"],
    chart: "composed",
    layout: "wide",
  }),
  screen("construction-safety", "observations", "Safety Observation Registry", "سجل ملاحظات السلامة", "table", "observations", {
    icon: "eye",
    columns: ["id", "title", "type", "rating", "observer", "date", "status"],
    statuses: ["Open", "Action raised", "Under review", "Closed"],
  }),
  screen("construction-safety", "new-observation", "Submit Safety Observation", "تسجيل ملاحظة سلامة", "form", "observations", {
    icon: "file-plus-2",
    features: ["steps", "upload", "create"],
    layout: "focus",
  }),
  screen("construction-safety", "observation-detail", "Safety Observation Details", "تفاصيل ملاحظة السلامة", "detail", "observations", {
    icon: "eye",
    features: ["timeline", "attachments", "status", "edit"],
    layout: "split",
  }),
  screen("construction-safety", "site-inspections", "Site Inspections", "فحوصات الموقع", "table", "inspections", {
    icon: "clipboard-check",
    columns: ["id", "title", "type", "inspector", "score", "nonConformances", "status"],
    statuses: ST.inspection,
    kpis: ["compliance"],
  }),
  screen("construction-safety", "inspection-checklist", "Inspection Checklist", "قائمة الفحص", "builder", "inspections", {
    icon: "list-checks",
    features: ["workflow", "edit", "upload", "create"],
    scopeNote: "Digital checklist templates are configurable per inspection type.",
  }),
  screen("construction-safety", "lifting-operations", "Lifting Operations Management", "إدارة عمليات الرفع", "table", "permits", {
    icon: "construction",
    columns: ["number", "type", "location", "riskLevel", "startDate", "endDate", "status"],
    features: ["search", "filters", "pagination", "status", "create", "edit", "map"],
  }),
  screen("construction-safety", "scaffolding", "Scaffolding Safety Management", "إدارة سلامة السقالات", "table", "inspections", {
    icon: "layers-3",
    columns: ["id", "title", "contractorId", "score", "nonConformances", "nextDue", "status"],
  }),
  screen("construction-safety", "competency", "Personnel Competency", "كفاءة الأفراد", "table", "trainees", {
    icon: "badge-check",
    columns: ["id", "employeeId", "programId", "expiryDate", "score", "status"],
  }),
  screen("construction-safety", "fitness-to-work", "Fitness-to-Work Verification", "التحقق من اللياقة للعمل", "table", "employees", {
    icon: "heart-pulse",
    columns: ["id", "name", "jobTitle", "fitness", "site", "status"],
    statuses: ST.fitness,
    restricted: true,
  }),
  screen("construction-safety", "stop-work", "Stop Work Notices", "إشعارات إيقاف العمل", "table", "permits", {
    icon: "octagon-x",
    columns: ["number", "type", "location", "riskLevel", "startDate", "status"],
    statuses: ["Active", "Closed", "Suspended"],
  }),
  screen("construction-safety", "notice-to-start", "Notice-to-Start Requests", "طلبات إشعار بالبدء", "approval", "permits", {
    icon: "play-circle",
    approvalStages: ["Supervisor", "HSE manager", "Project director"],
    statuses: ST.workflow,
  }),
  screen("construction-safety", "lookahead", "Two Weeks Lookahead Plans", "خطط الأسبوعين القادمة", "table", "plans", {
    icon: "calendar-range",
    columns: ["id", "name", "type", "version", "owner", "reviewDate", "status"],
  }),
  screen("construction-safety", "toolbox-talks", "Toolbox Talks", "المحاضرات التوعوية", "table", "programs", {
    icon: "messages-square",
    columns: ["code", "name", "category", "duration", "enrolled", "status"],
  }),
  screen("construction-safety", "daily-instructions", "Daily Safety Task Instructions", "تعليمات المهام اليومية", "table", "plans", {
    icon: "clipboard-list",
    columns: ["id", "name", "type", "owner", "reviewDate", "status"],
  }),
  screen("construction-safety", "innovation", "Construction Safety Innovation Portal", "بوابة ابتكارات سلامة البناء", "table", "plans", {
    icon: "lightbulb",
    columns: ["id", "name", "category", "owner", "status", "reviewDate"],
    scopeNote: "Ideas submitted by site teams, reviewed and tracked through to adoption.",
  }),
  screen("construction-safety", "traffic-safety", "Traffic Safety Dashboard", "لوحة سلامة المرور", "dashboard", "roadClosures", {
    icon: "car",
    kpis: ["security", "volume"],
    chart: "bar",
    layout: "wide",
  }),
  screen("construction-safety", "road-closures", "Road Closure Management", "إدارة إغلاقات الطرق", "table", "roadClosures", {
    icon: "route-off",
    columns: ["id", "location", "reason", "start", "end", "lanes", "status"],
    statuses: ["Planned", "Active", "Closed", "Cancelled"],
  }),
  screen("construction-safety", "road-closure-map", "Road Closure Map", "خريطة إغلاقات الطرق", "map", "roadClosures", {
    icon: "map",
    features: ["map", "filters", "export", "status"],
  }),
  screen("construction-safety", "escalations", "Safety Escalation Items", "بنود التصعيد السلامة", "table", "actions", {
    icon: "siren",
    columns: ["id", "title", "priority", "owner", "dueDate", "status"],
    statuses: ["Escalated", "Open", "In progress", "Closed"],
  }),
  screen("construction-safety", "adhoc-requests", "Ad-Hoc Requests & Meetings", "الطلبات والاجتماعات الخاصة", "table", "approvals", {
    icon: "calendar-plus",
    columns: ["id", "title", "type", "requester", "stage", "submitted", "status"],
  }),
  screen("construction-safety", "kpi-dashboard", "Construction Safety KPI Dashboard", "لوحة مؤشرات السلامة", "analytics", "incidents", {
    icon: "chart-no-axes-combined",
    kpis: ["safety", "compliance", "training"],
    chart: "composed",
    layout: "wide",
    features: ["chart", "filters", "export", "compare", "schedule"],
  }),
];
