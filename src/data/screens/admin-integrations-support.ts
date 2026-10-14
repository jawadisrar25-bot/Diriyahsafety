import { screen, ST } from "./kit";
import type { ScreenDef } from "@/types";

export const adminScreens: ScreenDef[] = [
  screen("administration", "admin-overview", "System Administration Dashboard", "لوحة إدارة النظام", "dashboard", "employees", {
    icon: "settings-2",
    kpis: ["platform", "licence"],
    chart: "bar",
    layout: "wide",
  }),
  screen("administration", "user-directory", "User Directory", "دليل المستخدمين", "table", "employees", {
    icon: "users-round",
    columns: ["id", "name", "jobTitle", "department", "status", "hireDate"],
    features: ["search", "filters", "pagination", "status", "export", "create", "edit", "delete"],
  }),
  screen("administration", "user-form", "Create / Edit User", "إنشاء / تعديل مستخدم", "form", "employees", {
    icon: "user-cog",
    features: ["steps", "create", "upload"],
    layout: "focus",
  }),
  screen("administration", "roles", "Roles & Permissions", "الأدوار والصلاحيات", "builder", "none", {
    icon: "key-round",
    features: ["workflow", "edit", "compare"],
    layout: "wide",
    scopeNote: "Permissions are inherited from the role assigned to each user account.",
  }),
  screen("administration", "organization", "Organization Hierarchy", "الهيكل التنظيمي", "dashboard", "employees", {
    icon: "network",
    chart: "bar",
    kpis: ["volume"],
  }),
  screen("administration", "projects-admin", "Project Administration", "إدارة المشاريع", "table", "projects", {
    icon: "folder-cog",
    columns: ["name", "code", "phase", "progress", "manager", "status"],
  }),
  screen("administration", "master-data", "Master Data Management", "إدارة البيانات الرئيسية", "table", "segments", {
    icon: "database",
    columns: ["id", "name", "projectId", "riskLevel", "samplingFreq", "headcount"],
  }),
  screen("administration", "notification-rules", "Notification Rules", "قواعد الإشعارات", "table", "notifications", {
    icon: "bell-plus",
    columns: ["id", "title", "type", "severity", "audience", "status"],
  }),
  screen("administration", "configuration", "Application Configuration", "إعدادات التطبيق", "workflow", "none", {
    icon: "sliders-horizontal",
    features: ["workflow", "edit"],
    layout: "wide",
  }),
  screen("administration", "audit-logs", "User Activity & Audit Logs", "سجلات نشاط المستخدم والتدقيق", "table", "activities", {
    icon: "scroll-text",
    columns: ["id", "ref", "text", "actor", "at", "kind"],
    features: ["search", "filters", "advanced", "pagination", "export", "status"],
  }),
  screen("administration", "licence-management", "Licence Management", "إدارة التراخيص والاشتراكات", "dashboard", "employees", {
    icon: "badge-check",
    kpis: ["licence"],
    chart: "composed",
    layout: "wide",
    scopeNote: "Tracks full (named) versus lite (collaborative) user entitlements across the subscription years, utilisation against the purchased seat pool, and seats approaching renewal.",
  }),
];

export const integrationScreens: ScreenDef[] = [
  screen("integrations", "integration-overview", "Integration Dashboard", "لوحة التكاملات", "dashboard", "integrations", {
    icon: "plug",
    kpis: ["platform"],
    chart: "bar",
    layout: "wide",
  }),
  screen("integrations", "integration-directory", "Enterprise Integration Directory", "دليل التكاملات المؤسسية", "table", "integrations", {
    icon: "blocks",
    columns: ["id", "name", "category", "direction", "protocol", "lastSync", "status"],
    statuses: ST.integration,
  }),
  screen("integrations", "integration-detail", "Integration Configuration Details", "تفاصيل إعداد التكامل", "detail", "integrations", {
    icon: "settings",
    features: ["timeline", "status", "edit", "simulate"],
    layout: "split",
    scopeNote: "Connection settings for SAP, Aconex, Unifier, Maximo, ServiceNow, GIS, EMS Dispatch and Vesa.",
  }),
  screen("integrations", "data-import", "Data Import & Migration", "استيراد البيانات والترحيل", "form", "documents", {
    icon: "file-input",
    features: ["steps", "upload", "create"],
    layout: "focus",
  }),
  screen("integrations", "import-history", "Import History & Validation", "سجل الاستيراد والتحقق", "table", "documents", {
    icon: "history",
    columns: ["id", "name", "category", "uploadedBy", "date", "status"],
  }),
  screen("integrations", "integration-monitoring", "Integration Monitoring", "مراقبة التكاملات", "analytics", "integrations", {
    icon: "activity",
    chart: "line",
    kpis: ["platform"],
    features: ["chart", "filters", "simulate", "export"],
  }),
];

export const supportScreens: ScreenDef[] = [
  screen("support", "system-health", "System Health & Performance", "صحة وأداء النظام", "dashboard", "integrations", {
    icon: "heart-pulse",
    kpis: ["platform"],
    chart: "area",
    layout: "wide",
  }),
  screen("support", "tickets", "Support Ticket Center", "مركز تذاكر الدعم", "table", "tickets", {
    icon: "life-buoy",
    columns: ["id", "subject", "priority", "team", "slaHours", "status"],
    statuses: ST.sla,
    kpis: ["platform"],
    features: ["search", "filters", "pagination", "status", "export", "create", "edit"],
  }),
  screen("support", "sla", "Service Level Agreements", "اتفاقيات مستوى الخدمة", "scorecard", "tickets", {
    icon: "timer",
    chart: "bar",
    kpis: ["platform"],
  }),
  screen("support", "backup-settings", "Backup, Recovery & Platform Settings", "النسخ الاحتياطي والاسترداد وإعدادات المنصة", "workflow", "none", {
    icon: "database-backup",
    features: ["workflow", "edit", "simulate"],
    layout: "wide",
    scopeNote: "Recovery objectives and exercise results are held against each critical function.",
  }),
  screen("support", "performance-reports", "Support Performance Reports", "تقارير أداء الدعم", "analytics", "tickets", {
    icon: "chart-line",
    kpis: ["platform"],
    chart: "composed",
    features: ["chart", "filters", "export", "schedule"],
    scopeNote: "Weekly and monthly service performance checks across the L1–L4 support tiers, ticket volumes, resolution times and SLA attainment.",
  }),
  screen("support", "change-requests", "Change Requests", "طلبات التغيير", "table", "tickets", {
    icon: "git-pull-request-arrow",
    columns: ["id", "subject", "category", "priority", "requester", "slaHours", "status"],
    statuses: ST.sla,
    features: ["search", "filters", "pagination", "status", "export", "create", "edit"],
  }),
];
