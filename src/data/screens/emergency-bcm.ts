import { screen, ST } from "./kit";
import type { ScreenDef } from "@/types";

export const emergencyScreens: ScreenDef[] = [
  screen("emergency", "emergency-overview", "Emergency Management Dashboard", "لوحة إدارة الطوارئ", "dashboard", "drills", {
    icon: "siren",
    kpis: ["emergency", "volume"],
    chart: "composed",
    layout: "wide",
  }),
  screen("emergency", "preparedness-plans", "Emergency Preparedness Plans", "خطط الاستعداد للطوارئ", "table", "plans", {
    icon: "file-text",
    columns: ["id", "name", "type", "version", "owner", "reviewDate", "status"],
    statuses: ST.plan,
  }),
  screen("emergency", "plan-detail", "Emergency Plan Details", "تفاصيل خطة الطوارئ", "detail", "plans", {
    icon: "file-text",
    features: ["timeline", "attachments", "status", "edit", "approval"],
    layout: "split",
  }),
  screen("emergency", "drill-calendar", "Emergency Drill Calendar", "تقويم تدريبات الطوارئ", "calendar", "drills", {
    icon: "calendar-days",
    features: ["calendar", "create", "schedule", "filters"],
  }),
  screen("emergency", "schedule-drill", "Schedule Emergency Drill", "جدولة تدريب طوارئ", "form", "drills", {
    icon: "calendar-plus",
    features: ["steps", "create", "upload"],
    layout: "focus",
  }),
  screen("emergency", "drill-results", "Emergency Drill Results", "نتائج تدريبات الطوارئ", "table", "drills", {
    icon: "clipboard-check",
    columns: ["id", "name", "type", "date", "score", "result", "status"],
    statuses: ST.drill,
  }),
  screen("emergency", "response-procedures", "Emergency Response Procedures", "إجراءات الاستجابة للطوارئ", "table", "plans", {
    icon: "route",
    columns: ["id", "name", "callsign", "version", "owner", "status"],
  }),
  screen("emergency", "event-log", "Emergency Event Log", "سجل أحداث الطوارئ", "table", "incidents", {
    icon: "notebook-text",
    columns: ["id", "title", "severity", "location", "date", "investigator", "status"],
  }),
  screen("emergency", "response-tasks", "Emergency Response Tasks", "مهام الاستجابة للطوارئ", "table", "actions", {
    icon: "list-todo",
    columns: ["id", "title", "owner", "priority", "dueDate", "status"],
    statuses: ST.openClosed,
  }),
  screen("emergency", "crisis-communications", "Crisis Communications", "الاتصالات في الأزمات", "workflow", "notifications", {
    icon: "radio",
    features: ["workflow", "create", "schedule", "status"],
  }),
  screen("emergency", "emergency-actions", "Emergency Corrective Actions", "الإجراءات التصحيحية للطوارئ", "table", "actions", {
    icon: "list-todo",
    columns: ["id", "title", "owner", "dueDate", "verified", "status"],
  }),
  screen("emergency", "preparedness-reports", "Emergency Preparedness Reports", "تقارير الاستعداد للطوارئ", "analytics", "drills", {
    icon: "file-chart-column",
    kpis: ["emergency"],
    chart: "bar",
    features: ["chart", "filters", "export", "schedule"],
  }),
];

export const bcmScreens: ScreenDef[] = [
  screen("business-continuity", "continuity-overview", "Business Continuity Dashboard", "لوحة استمرارية الأعمال", "dashboard", "bias", {
    icon: "workflow",
    kpis: ["bcm", "volume"],
    chart: "composed",
    layout: "wide",
  }),
  screen("business-continuity", "bcm-governance", "BCM Governance", "حوكمة استمرارية الأعمال", "table", "policies", {
    icon: "scale",
    columns: ["number", "title", "category", "version", "nextReview", "status"],
  }),
  screen("business-continuity", "bia-registry", "Business Impact Analysis Registry", "سجل تحليل الأثر على الأعمال", "table", "bias", {
    icon: "table-2",
    columns: ["id", "businessFunction", "rtoHours", "rpoHours", "criticality", "owner", "status"],
    kpis: ["bcm"],
  }),
  screen("business-continuity", "new-bia", "Create Business Impact Analysis", "إنشاء تحليل أثر الأعمال", "form", "bias", {
    icon: "file-plus-2",
    features: ["steps", "create"],
    layout: "focus",
  }),
  screen("business-continuity", "bia-detail", "BIA Details", "تفاصيل تحليل الأثر", "detail", "bias", {
    icon: "file-search",
    features: ["timeline", "attachments", "status", "edit", "chart"],
    layout: "split",
  }),
  screen("business-continuity", "continuity-plans", "Business Continuity Plans", "خطط استمرارية الأعمال", "table", "plans", {
    icon: "files",
    columns: ["id", "name", "type", "version", "owner", "reviewDate", "status"],
    statuses: ST.plan,
  }),
  screen("business-continuity", "plan-detail", "Continuity Plan Details", "تفاصيل خطة الاستمرارية", "detail", "plans", {
    icon: "file-check-2",
    features: ["timeline", "attachments", "status", "edit", "approval"],
    layout: "split",
  }),
  screen("business-continuity", "dependencies", "Dependency Assessments", "تقييمات الاعتماديات", "table", "bias", {
    icon: "network",
    columns: ["id", "businessFunction", "dependencies", "rtoHours", "criticality", "status"],
  }),
  screen("business-continuity", "continuity-risks", "Continuity Risk Register", "سجل مخاطر الاستمرارية", "table", "risks", {
    icon: "shield-alert",
    columns: ["id", "title", "category", "score", "residual", "owner", "status"],
  }),
  screen("business-continuity", "strategies", "Continuity Strategies", "استراتيجيات الاستمرارية", "table", "bias", {
    icon: "waypoints",
    columns: ["id", "businessFunction", "strategy", "rtoHours", "owner", "status"],
  }),
  screen("business-continuity", "crisis-activation", "Crisis Activation Dashboard", "لوحة تفعيل الأزمات", "dashboard", "plans", {
    icon: "siren",
    kpis: ["bcm", "emergency"],
    chart: "stacked",
    layout: "wide",
    features: ["chart", "simulate", "filters", "export"],
  }),
  screen("business-continuity", "crisis-workflows", "Crisis Communication Workflows", "سير اتصالات الأزمات", "workflow", "notifications", {
    icon: "messages-square",
    features: ["workflow", "create", "schedule"],
  }),
  screen("business-continuity", "exercises", "BCM Exercises & Testing", "تدريبات واختبارات الاستمرارية", "table", "drills", {
    icon: "dumbbell",
    columns: ["id", "name", "type", "date", "score", "result", "status"],
  }),
  screen("business-continuity", "compliance-reports", "BCM Compliance Reports", "تقارير امتثال الاستمرارية", "analytics", "bias", {
    icon: "file-chart-column",
    kpis: ["bcm", "compliance"],
    chart: "bar",
    features: ["chart", "filters", "export", "schedule"],
  }),
];
