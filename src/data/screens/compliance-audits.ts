import { screen, ST } from "./kit";
import type { ScreenDef } from "@/types";

export const complianceScreens: ScreenDef[] = [
  screen("compliance", "compliance-overview", "Compliance Dashboard", "لوحة الامتثال", "dashboard", "policies", {
    icon: "scale",
    kpis: ["compliance", "volume"],
    chart: "composed",
    layout: "wide",
  }),
  screen("compliance", "compliance-register", "Compliance Register", "سجل الامتثال", "table", "policies", {
    icon: "notebook-tabs",
    columns: ["number", "title", "category", "version", "nextReview", "status"],
    statuses: ST.compliance,
  }),
  screen("compliance", "legal-register", "Legal & Regulatory Register", "السجل القانوني والتنظيمي", "table", "policies", {
    icon: "landmark",
    columns: ["number", "title", "category", "owner", "nextReview", "status"],
    scopeNote: "Covers Saudi labour law, OSHA references, ISO standards and PDPL / NCA obligations.",
  }),
  screen("compliance", "policies", "Policy Management", "إدارة السياسات", "table", "policies", {
    icon: "book-open",
    columns: ["number", "title", "category", "version", "owner", "nextReview", "status"],
    statuses: ST.lifecycle,
  }),
  screen("compliance", "procedures", "Procedure Management", "إدارة الإجراءات", "table", "policies", {
    icon: "list-ordered",
    columns: ["number", "title", "category", "version", "owner", "status"],
  }),
  screen("compliance", "policy-approvals", "Policy Approval Workflow", "سير اعتماد السياسات", "approval", "policies", {
    icon: "stamp",
    approvalStages: ["Author", "HSE manager", "Legal review", "Executive approval"],
    statuses: ST.workflow,
  }),
  screen("compliance", "version-control", "Document Version Control", "التحكم بإصدارات المستندات", "table", "documents", {
    icon: "git-compare",
    columns: ["id", "name", "version", "uploadedBy", "date", "status"],
  }),
  screen("compliance", "expiring-policies", "Expiring Policies", "السياسات القريبة من الانتهاء", "table", "policies", {
    icon: "clock-alert",
    columns: ["number", "title", "category", "nextReview", "owner", "status"],
    statuses: ["In review", "Draft", "Approved"],
  }),
  screen("compliance", "assessments", "Compliance Assessments", "تقييمات الامتثال", "table", "audits", {
    icon: "clipboard-check",
    columns: ["id", "title", "standard", "auditor", "score", "status"],
  }),
  screen("compliance", "site-compliance", "Site Compliance Dashboard", "لوحة امتثال المواقع", "scorecard", "projects", {
    icon: "map",
    chart: "bar",
    kpis: ["compliance"],
    layout: "wide",
  }),
  screen("compliance", "contractor-benchmarking", "Contractor Compliance Benchmarking", "مقارنة امتثال المقاولين", "analytics", "contractors", {
    icon: "scale",
    chart: "bar",
    kpis: ["contractor", "compliance"],
    features: ["chart", "compare", "export", "filters"],
  }),
  screen("compliance", "management-review", "Management Review Meetings", "اجتماعات مراجعة الإدارة", "table", "approvals", {
    icon: "users-round",
    columns: ["id", "title", "type", "requester", "stage", "submitted", "status"],
  }),
  screen("compliance", "alerts", "Compliance Alerts", "تنبيهات الامتثال", "table", "notifications", {
    icon: "bell-ring",
    columns: ["id", "title", "type", "severity", "createdAt", "status"],
  }),
  screen("compliance", "governance-reports", "Governance Reports", "تقارير الحوكمة", "analytics", "policies", {
    icon: "file-chart-column",
    kpis: ["compliance"],
    chart: "composed",
    features: ["chart", "filters", "export", "schedule"],
  }),
  screen("compliance", "hosting-compliance", "Hosting & Security Compliance", "الاستضافة والامتثال الأمني", "table", "policies", {
    icon: "shield-check",
    columns: ["number", "title", "category", "owner", "nextReview", "status"],
    statuses: ST.lifecycle,
    kpis: ["compliance"],
    features: ["search", "filters", "export", "chart"],
    scopeNote: "Tracks the platform's own compliance posture: hosting location, encryption, SSO / MFA, audit logging and data residency under Saudi PDPL, NCA and ISO 27001 requirements.",
  }),
];

export const auditScreens: ScreenDef[] = [
  screen("audits", "audit-overview", "Audit Dashboard", "لوحة التدقيق", "dashboard", "audits", {
    icon: "clipboard-list",
    kpis: ["compliance", "volume"],
    chart: "composed",
    layout: "wide",
  }),
  screen("audits", "audit-plan", "Audit Plan", "خطة التدقيق", "table", "audits", {
    icon: "calendar-range",
    columns: ["id", "title", "standard", "auditor", "date", "status"],
    statuses: ["Planned", "In progress", "Report issued", "Closed"],
  }),
  screen("audits", "audit-schedule", "Audit Schedule Calendar", "تقويم جدولة التدقيق", "calendar", "audits", {
    icon: "calendar-days",
    features: ["calendar", "create", "schedule", "filters"],
  }),
  screen("audits", "create-audit", "Create Audit", "إنشاء تدقيق", "form", "audits", {
    icon: "file-plus-2",
    features: ["steps", "create", "upload"],
    layout: "focus",
  }),
  screen("audits", "execution", "Audit Execution Workspace", "مساحة تنفيذ التدقيق", "workflow", "audits", {
    icon: "list-checks",
    features: ["workflow", "attachments", "status", "edit"],
    layout: "wide",
  }),
  screen("audits", "checklist", "Digital Audit Checklist", "قائمة التدقيق الرقمية", "builder", "audits", {
    icon: "list-checks",
    features: ["workflow", "edit", "create", "upload"],
  }),
  screen("audits", "findings", "Audit Findings", "نتائج التدقيق", "table", "ncrs", {
    icon: "file-warning",
    columns: ["id", "title", "severity", "clause", "dueDate", "status"],
    statuses: ["Open", "Awaiting verification", "Extension requested", "Closed"],
  }),
  screen("audits", "ncr-register", "Non-Conformance Register", "سجل عدم المطابقة", "table", "ncrs", {
    icon: "circle-x",
    columns: ["id", "title", "source", "severity", "dueDate", "disposition", "status"],
    kpis: ["compliance"],
  }),
  screen("audits", "create-ncr", "Create Non-Conformance Report", "إنشاء تقرير عدم مطابقة", "form", "ncrs", {
    icon: "file-warning",
    features: ["steps", "upload", "create"],
    layout: "focus",
  }),
  screen("audits", "ncr-detail", "NCR Details", "تفاصيل عدم المطابقة", "detail", "ncrs", {
    icon: "file-warning",
    features: ["timeline", "attachments", "status", "edit", "approval"],
    layout: "split",
  }),
  screen("audits", "action-closure", "Corrective Action Closure", "إغلاق الإجراءات التصحيحية", "workflow", "actions", {
    icon: "circle-check-big",
    features: ["workflow", "approval", "status", "attachments"],
  }),
  screen("audits", "inspection-register", "Inspection Register", "سجل الفحوصات", "table", "inspections", {
    icon: "clipboard-check",
    columns: ["id", "title", "type", "inspector", "score", "status"],
    statuses: ST.inspection,
  }),
  screen("audits", "standards-mapping", "Compliance Standards Mapping", "مطابقة المعايير", "table", "policies", {
    icon: "git-compare-arrows",
    columns: ["number", "title", "category", "clauses", "status", "nextReview"],
    scopeNote: "Maps ISO 45001, ISO 14001, OSHA 1926, NFPA 241 and Diriyah internal standards.",
  }),
  screen("audits", "audit-analytics", "Audit Analytics & Scorecards", "تحليلات ونتائج التدقيق", "analytics", "audits", {
    icon: "chart-column",
    kpis: ["compliance"],
    chart: "composed",
    layout: "wide",
    features: ["chart", "filters", "export", "compare", "schedule"],
  }),
];
