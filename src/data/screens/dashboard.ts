import { screen, ST, type ScreenOpts } from "./kit";
import type { ScreenDef } from "@/types";

const opt = (o: ScreenOpts) => o;

export const dashboardScreens: ScreenDef[] = [
  screen("dashboard", "executive", "Executive Dashboard", "لوحة المؤشرات التنفيذية", "dashboard", "incidents", {
    icon: "layout-dashboard",
    kpis: ["safety", "compliance", "training", "contractor"],
    chart: "composed",
    features: ["chart", "filters", "export", "compare"],
    layout: "wide",
    companion: "activity",
  }),
  screen("dashboard", "operations", "OHSS Operations Dashboard", "لوحة عمليات أوهس", "dashboard", "actions", {
    icon: "activity",
    kpis: ["safety", "hygiene", "emergency", "platform"],
    chart: "area",
    features: ["chart", "filters", "export"],
    layout: "wide",
    companion: "quicklinks",
  }),
  screen("dashboard", "workspace", "Personal Workspace", "مساحة العمل الشخصية", "workspace", "actions", {
    icon: "briefcase",
    kpis: ["volume"],
    features: ["search", "filters", "pagination", "status", "create", "export"],
    layout: "wide",
    companion: "activity",
  }),
  screen("dashboard", "my-tasks", "My Tasks", "مهامي", "table", "actions", {
    icon: "list-checks",
    columns: ["id", "title", "sourceType", "priority", "dueDate", "status", "projectId"],
    statuses: ST.openClosed,
    kpis: ["volume"],
    features: ["search", "filters", "pagination", "status", "edit", "export"],
    companion: "activity",
  }),
  screen("dashboard", "my-approvals", "My Approvals", "موافقاتي", "approval", "approvals", {
    icon: "stamp",
    columns: ["id", "title", "type", "reference", "stage", "submitted", "status"],
    approvalStages: ["Line manager", "HSE manager", "Project director", "OHSS director"],
    statuses: ["Pending", "Approved", "Rejected", "Returned", "Escalated"],
    kpis: ["volume"],
    features: ["search", "filters", "approval", "workflow", "status", "export"],
  }),
  screen("dashboard", "notifications", "Notifications Center", "مركز الإشعارات", "table", "notifications", {
    icon: "bell",
    columns: ["id", "title", "type", "severity", "audience", "createdAt", "status"],
    statuses: ["Unread", "Read", "Archived"],
    features: ["search", "filters", "pagination", "status", "delete"],
    companion: "quicklinks",
  }),
  screen("dashboard", "search", "Global Search", "البحث الشامل", "workspace", "none", {
    icon: "search",
    columns: [],
    features: ["search", "filters"],
    layout: "focus",
    companion: "none",
  }),
  screen("dashboard", "projects", "Project Portfolio Overview", "نظرة عامة على محفظة المشاريع", "table", "projects", {
    icon: "building",
    columns: ["name", "code", "phase", "progress", "headcount", "budget", "status"],
    statuses: ["Active", "On hold", "Mobilisation", "Complete"],
    kpis: ["volume"],
    features: ["search", "filters", "pagination", "status", "export", "compare"],
    chart: "bar",
    companion: "quicklinks",
  }),
  screen("dashboard", "project-detail", "Project Details", "تفاصيل المشروع", "detail", "projects", {
    icon: "building-2",
    features: ["timeline", "attachments", "status", "edit", "chart"],
    layout: "split",
    companion: "related",
  }),
  screen("dashboard", "organization", "Organization Overview", "نظرة عامة على الهيكل التنظيمي", "dashboard", "employees", {
    icon: "network",
    kpis: ["volume", "health", "training"],
    chart: "stacked",
    features: ["chart", "filters", "export"],
    layout: "wide",
  }),
  screen("dashboard", "activity", "Activity Timeline", "الخط الزمني للنشاط", "table", "activities", {
    icon: "history",
    columns: ["id", "ref", "text", "actor", "at", "kind"],
    features: ["search", "filters", "pagination", "export"],
    companion: "related",
  }),
  screen("dashboard", "profile", "My Profile", "ملفي الشخصي", "viewer", "employees", {
    icon: "user-round",
    features: ["timeline", "attachments", "edit", "status"],
    layout: "split",
    companion: "none",
  }),
];
