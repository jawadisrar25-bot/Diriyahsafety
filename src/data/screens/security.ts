import { screen } from "./kit";
import type { ScreenDef } from "@/types";

export const securityScreens: ScreenDef[] = [
  screen("security", "security-overview", "Security Dashboard", "لوحة الأمن", "dashboard", "visitors", {
    icon: "shield",
    kpis: ["security", "volume"],
    chart: "composed",
    layout: "wide",
  }),
  screen("security", "security-incidents", "Security Incidents", "الحوادث الأمنية", "table", "incidents", {
    icon: "shield-alert",
    columns: ["id", "title", "severity", "location", "date", "investigator", "status"],
    statuses: ["Reported", "Investigation", "Escalated", "Closed"],
  }),
  screen("security", "new-security-incident", "Report Security Incident", "تسجيل حادثة أمنية", "form", "incidents", {
    icon: "file-warning",
    features: ["steps", "upload", "create"],
    layout: "focus",
  }),
  screen("security", "security-incident-detail", "Security Incident Details", "تفاصيل الحادثة الأمنية", "detail", "incidents", {
    icon: "shield-alert",
    features: ["timeline", "attachments", "status", "edit", "approval"],
    layout: "split",
  }),
  screen("security", "guard-assignments", "Daily Security Assignments", "المهام الأمنية اليومية", "table", "patrols", {
    icon: "users",
    columns: ["id", "officer", "route", "zone", "start", "status"],
  }),
  screen("security", "patrol-monitoring", "Security Patrol Management", "إدارة الدوريات الأمنية", "table", "patrols", {
    icon: "footprints",
    columns: ["id", "officer", "route", "zone", "checkpoints", "completed", "exceptions", "status"],
  }),
  screen("security", "patrol-map", "Patrol Tracking Map", "خريطة تتبع الدوريات", "map", "patrols", {
    icon: "map-pinned",
    features: ["map", "filters", "status", "export"],
  }),
  screen("security", "access-control", "Access Control Records", "سجل التحكم بالدخول", "table", "visitors", {
    icon: "key-round",
    columns: ["id", "name", "company", "gate", "badge", "checkIn", "status"],
  }),
  screen("security", "visitor-management", "Visitor Management", "إدارة الزوار", "table", "visitors", {
    icon: "user-check",
    columns: ["id", "name", "company", "host", "purpose", "checkIn", "status"],
    statuses: ["On site", "Checked out", "Pre-registered", "Refused entry"],
  }),
  screen("security", "visitor-checkin", "Visitor Check-In", "تسجيل دخول الزوار", "form", "visitors", {
    icon: "scan-line",
    features: ["steps", "create", "qr"],
    layout: "focus",
  }),
  screen("security", "traffic-violations", "Traffic Violations", "مخالفات المرور", "table", "visitors", {
    icon: "car",
    columns: ["id", "plate", "violation", "location", "fine", "status"],
  }),
  screen("security", "security-compliance", "Security Compliance Reports", "تقارير الامتثال الأمني", "analytics", "incidents", {
    icon: "file-check-2",
    kpis: ["compliance", "security"],
    chart: "bar",
    features: ["chart", "filters", "export", "schedule"],
  }),
  screen("security", "integration-status", "Security System Integration Status", "حالة تكامل الأنظمة الأمنية", "table", "integrations", {
    icon: "plug-zap",
    columns: ["id", "name", "category", "lastSync", "latencyMs", "status"],
  }),
];
