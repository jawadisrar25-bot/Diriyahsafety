import { screen } from "./kit";
import type { ScreenDef } from "@/types";

export const ihScreens: ScreenDef[] = [
  screen("industrial-hygiene", "hygiene-overview", "Industrial Hygiene Dashboard", "لوحة النظافة الصناعية", "dashboard", "exposureSamples", {
    icon: "flask-conical",
    kpis: ["hygiene", "volume"],
    chart: "composed",
    layout: "wide",
    features: ["chart", "filters", "export", "compare"],
  }),
  screen("industrial-hygiene", "exposure-monitoring", "Exposure Monitoring Registry", "سجل مراقبة التعرض", "table", "exposureSamples", {
    icon: "gauge",
    columns: ["id", "segId", "agent", "result", "oel", "lab", "date", "status"],
    statuses: ["Within limit", "Near limit", "Exceedance", "Critical exceedance"],
    kpis: ["hygiene"],
  }),
  screen("industrial-hygiene", "worker-exposure-profile", "Worker Exposure Profile", "الملف الفردي للتعرض", "detail", "exposureSamples", {
    icon: "user-round-search",
    features: ["timeline", "chart", "attachments", "status"],
    layout: "split",
    companion: "related",
  }),
  screen("industrial-hygiene", "similar-exposure-groups", "Similar Exposure Groups", "مجموعات التعرض المتشابه", "table", "segments", {
    icon: "users-round",
    columns: ["id", "name", "projectId", "headcount", "agents", "riskLevel", "samplingFreq"],
    statuses: ["Low", "Medium", "High", "Very high"],
  }),
  screen("industrial-hygiene", "seg-details", "SEG Details", "تفاصيل مجموعة التعرض", "detail", "segments", {
    icon: "users-round",
    features: ["timeline", "chart", "attachments", "edit"],
    layout: "split",
    companion: "related",
  }),
  screen("industrial-hygiene", "sampling-plans", "Exposure Sampling Plans", "خطط أخذ عينات التعرض", "table", "segments", {
    icon: "calendar-range",
    columns: ["id", "name", "samplingFreq", "agents", "riskLevel", "projectId"],
    statuses: ["Active", "Draft", "Complete"],
  }),
  screen("industrial-hygiene", "sampling-results", "Sampling Results", "نتائج أخذ العينات", "table", "exposureSamples", {
    icon: "test-tubes",
    columns: ["id", "agent", "method", "result", "unit", "oel", "exceedancePct", "status"],
    features: ["search", "filters", "advanced", "pagination", "export", "status"],
  }),
  screen("industrial-hygiene", "exposure-limits", "Occupational Exposure Limits", "الحدود المسموح بها للتعرض", "table", "segments", {
    icon: "ruler",
    columns: ["id", "name", "agents", "headcount", "riskLevel", "samplingFreq"],
    scopeNote: "OEL library covers local regulatory limits and ACGOH / WHO reference values.",
  }),
  screen("industrial-hygiene", "exceedance-alerts", "Exposure Exceedance Alerts", "تنبيهات تجاوز حدود التعرض", "table", "exposureSamples", {
    icon: "triangle-alert",
    columns: ["id", "agent", "result", "oel", "exceedancePct", "segId", "status"],
    statuses: ["Exceedance", "Critical exceedance", "Near limit"],
  }),
  screen("industrial-hygiene", "risk-assessments", "Industrial Hygiene Risk Assessments", "تقييمات مخاطر النظافة الصناعية", "table", "risks", {
    icon: "shield-alert",
    columns: ["id", "title", "category", "score", "residual", "owner", "status"],
  }),
  screen("industrial-hygiene", "noise-monitoring", "Noise Monitoring", "مراقبة الضوضاء", "table", "exposureSamples", {
    icon: "audio-lines",
    columns: ["id", "segId", "result", "oel", "exceedancePct", "date", "status"],
    features: ["search", "filters", "pagination", "export", "chart", "status"],
  }),
  screen("industrial-hygiene", "silica-monitoring", "Silica & Dust Monitoring", "مراقبة السيليكا والغبار", "table", "exposureSamples", {
    icon: "wind",
    columns: ["id", "segId", "agent", "result", "oel", "method", "date", "status"],
  }),
  screen("industrial-hygiene", "bayesian-analysis", "Bayesian Sampling Analysis", "التحليل البايزي لأخذ العينات", "analytics", "exposureSamples", {
    icon: "sigma",
    chart: "composed",
    features: ["chart", "filters", "simulate", "export"],
    scopeNote: "Estimated distributions are derived from the sampling history held for each similar exposure group.",
  }),
  screen("industrial-hygiene", "ih-reports", "Industrial Hygiene Reports", "تقارير النظافة الصناعية", "analytics", "exposureSamples", {
    icon: "file-chart-column",
    chart: "bar",
    kpis: ["hygiene"],
    features: ["chart", "filters", "export", "schedule"],
  }),
];
