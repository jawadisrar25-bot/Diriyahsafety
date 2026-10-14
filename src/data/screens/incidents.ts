import { screen, ST } from "./kit";
import type { ScreenDef } from "@/types";

export const incidentScreens: ScreenDef[] = [
  screen("incidents", "incident-overview", "Incident Dashboard", "لوحة الحوادث", "dashboard", "incidents", {
    icon: "triangle-alert",
    kpis: ["safety", "volume"],
    chart: "composed",
    layout: "wide",
  }),
  screen("incidents", "incident-register", "Incident Register", "سجل الحوادث", "table", "incidents", {
    icon: "notebook-tabs",
    columns: ["id", "title", "type", "severity", "projectId", "date", "status"],
    statuses: ["Reported", "Investigation", "Action pending", "Escalated", "Closed"],
    kpis: ["safety"],
    features: ["search", "filters", "advanced", "pagination", "status", "export", "create", "edit", "delete"],
  }),
  screen("incidents", "new-incident", "Report New Incident", "تسجيل حادث جديد", "form", "incidents", {
    icon: "file-warning",
    features: ["steps", "upload", "create"],
    layout: "focus",
  }),
  screen("incidents", "incident-detail", "Incident Details", "تفاصيل الحادث", "detail", "incidents", {
    icon: "file-warning",
    features: ["timeline", "attachments", "status", "edit", "approval"],
    layout: "split",
    companion: "related",
  }),
  screen("incidents", "investigation", "Incident Investigation", "تحقيق الحوادث", "workflow", "incidents", {
    icon: "search-check",
    features: ["workflow", "approval", "status", "attachments", "edit"],
  }),
  screen("incidents", "root-cause", "Root Cause Analysis", "تحليل الأسباب الجذرية", "builder", "incidents", {
    icon: "git-branch",
    features: ["workflow", "edit", "create", "chart"],
    scopeNote: "Supports 5 Whys, fishbone, TapRooT and barrier analysis templates.",
  }),
  screen("incidents", "near-miss", "Near Miss Reports", "تقارير الإكاديمات", "table", "incidents", {
    icon: "circle-dot-dashed",
    columns: ["id", "title", "projectId", "contractorId", "date", "rcaMethod", "status"],
  }),
  screen("incidents", "anonymous", "Anonymous Safety Reporting", "الإبلاغ المجهول عن السلامة", "form", "incidents", {
    icon: "incognito",
    features: ["steps", "upload", "create"],
    scopeNote: "Submissions are logged with a reference so the reporter can follow progress without disclosing identity.",
  }),
  screen("incidents", "corrective-actions", "Corrective Action Management", "إدارة الإجراءات التصحيحية", "table", "actions", {
    icon: "list-todo",
    columns: ["id", "title", "owner", "priority", "dueDate", "status", "projectId"],
    statuses: ST.openClosed,
    kpis: ["volume"],
  }),
  screen("incidents", "preventive-actions", "Preventive Actions", "الإجراءات الوقائية", "table", "actions", {
    icon: "shield-check",
    columns: ["id", "title", "sourceType", "owner", "dueDate", "status"],
  }),
  screen("incidents", "overdue-actions", "Overdue Actions", "الإجراءات المتأخرة", "table", "actions", {
    icon: "clock-alert",
    columns: ["id", "title", "owner", "priority", "dueDate", "status"],
    statuses: ["Overdue", "Open"],
    kpis: ["volume"],
  }),
  screen("incidents", "escalations", "Incident Escalations", "تصعيد الحوادث", "table", "incidents", {
    icon: "arrow-up-right",
    columns: ["id", "title", "severity", "investigator", "date", "status"],
    statuses: ["Escalated", "Investigation"],
  }),
  screen("incidents", "lessons-learned", "Lessons Learned", "الدروس المستفادة", "table", "documents", {
    icon: "book-open-check",
    columns: ["id", "name", "category", "uploadedBy", "date", "status"],
  }),
  screen("incidents", "incident-analytics", "Incident Analytics", "تحليلات الحوادث", "analytics", "incidents", {
    icon: "chart-column-big",
    kpis: ["safety"],
    chart: "composed",
    layout: "wide",
    features: ["chart", "filters", "export", "compare", "schedule"],
  }),
];
