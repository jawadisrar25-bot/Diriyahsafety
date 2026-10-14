import { screen, ST, type ScreenOpts } from "./kit";
import type { ScreenDef } from "@/types";

const opt = (o: ScreenOpts) => o;
const restricted = opt({ restricted: true });

export const ohScreens: ScreenDef[] = [
  screen("occupational-health", "health-overview", "Occupational Health Dashboard", "لوحة الصحة المهنية", "dashboard", "medicalVisits", {
    icon: "heart-pulse",
    kpis: ["health", "volume"],
    chart: "area",
    features: ["chart", "filters", "export"],
    layout: "wide",
    companion: "activity",
    restricted: true,
  }),
  screen("occupational-health", "employee-health-registry", "Employee Health Registry", "سجل صحة الموظفين", "table", "employees", {
    icon: "users",
    columns: ["id", "name", "jobTitle", "site", "fitness", "status", "hireDate"],
    statuses: ["Fit", "Fit with restrictions", "Temporarily unfit", "Under review"],
    kpis: ["health"],
    restricted: true,
    companion: "quicklinks",
  }),
  screen("occupational-health", "employee-health-profile", "Employee Health Profile", "الملف الصحي للموظف", "detail", "employees", {
    icon: "user-round",
    features: ["timeline", "attachments", "status", "edit", "restricted"],
    layout: "split",
    restricted: true,
    companion: "related",
  }),
  screen("occupational-health", "medical-records", "Electronic Medical Records", "السجلات الطبية الإلكترونية", "table", "medicalVisits", {
    icon: "file-heart",
    columns: ["id", "employeeId", "type", "date", "icd10", "cpt", "fitness", "status"],
    statuses: ["Completed", "Awaiting results", "Follow-up due", "Draft"],
    kpis: ["health", "volume"],
    restricted: true,
    features: ["search", "filters", "pagination", "status", "export", "restricted", "advanced"],
  }),
  screen("occupational-health", "medical-record-detail", "Medical Visit Details", "تفاصيل الزيارة الطبية", "detail", "medicalVisits", {
    icon: "file-heart",
    features: ["timeline", "attachments", "status", "edit", "restricted"],
    restricted: true,
    layout: "split",
    companion: "related",
  }),
  screen("occupational-health", "register-medical-visit", "Register Medical Visit", "تسجيل زيارة طبية", "form", "medicalVisits", {
    icon: "file-plus-2",
    features: ["steps", "upload", "create"],
    restricted: true,
    layout: "focus",
  }),
  screen("occupational-health", "surveillance-dashboard", "Medical Surveillance Dashboard", "لوحة المراقبة الطبية", "dashboard", "surveillance", {
    icon: "activity",
    kpis: ["health"],
    chart: "composed",
    features: ["chart", "filters", "export"],
    restricted: true,
    layout: "wide",
  }),
  screen("occupational-health", "surveillance-programs", "Medical Surveillance Programs", "برامج المراقبة الطبية", "table", "surveillance", {
    icon: "list-checks",
    columns: ["id", "program", "agent", "interval", "nextDue", "status"],
    statuses: ["Current", "Due soon", "Overdue"],
    kpis: ["health"],
    restricted: true,
  }),
  screen("occupational-health", "pre-placement", "Pre-Placement Assessments", "تقييمات ما قبل التعيين", "table", "medicalVisits", {
    icon: "clipboard-check",
    columns: ["id", "employeeId", "date", "icd10", "fitness", "provider", "status"],
    statuses: ["Completed", "Awaiting results", "Follow-up due"],
    restricted: true,
  }),
  screen("occupational-health", "periodic-assessments", "Periodic Health Assessments", "التقييمات الصحية الدورية", "table", "medicalVisits", {
    icon: "calendar-check",
    columns: ["id", "employeeId", "date", "type", "fitness", "followUp", "status"],
    restricted: true,
  }),
  screen("occupational-health", "return-to-work", "Return-to-Work Assessments", "تقييمات العودة إلى العمل", "table", "medicalVisits", {
    icon: "rotate-ccw",
    columns: ["id", "employeeId", "date", "restrictions", "fitness", "followUp", "status"],
    statuses: ["Fit", "Fit with restrictions", "Temporarily unfit", "Under review"],
    restricted: true,
  }),
  screen("occupational-health", "exit-assessments", "Exit Medical Assessments", "التقييمات الطبية عند انتهاء الخدمة", "table", "medicalVisits", {
    icon: "log-out",
    columns: ["id", "employeeId", "date", "findings", "fitness", "status"],
    restricted: true,
  }),
  screen("occupational-health", "appointment-calendar", "Medical Appointment Calendar", "تقويم المواعيد الطبية", "calendar", "appointments", {
    icon: "calendar-days",
    features: ["calendar", "create", "schedule", "filters", "restricted"],
    restricted: true,
  }),
  screen("occupational-health", "appointment-scheduling", "Medical Appointment Scheduling", "جدولة المواعيد الطبية", "form", "appointments", {
    icon: "calendar-plus",
    features: ["steps", "create", "restricted"],
    restricted: true,
    layout: "focus",
  }),
  screen("occupational-health", "test-results", "Medical Test Results", "نتائج الفحوص الطبية", "table", "medicalVisits", {
    icon: "test-tube",
    columns: ["id", "employeeId", "cpt", "icd10", "date", "provider", "status"],
    restricted: true,
  }),
  screen("occupational-health", "abnormal-results", "Abnormal Test Results", "النتائج غير الطبيعية", "table", "medicalVisits", {
    icon: "circle-alert",
    columns: ["id", "employeeId", "icd10", "findings", "followUp", "status"],
    statuses: ["Follow-up due", "Awaiting results", "Under review"],
    restricted: true,
  }),
  screen("occupational-health", "fitness-certificates", "Medical Fitness Certificates", "شهادات اللياقة الطبية", "table", "medicalVisits", {
    icon: "badge-check",
    columns: ["id", "employeeId", "type", "date", "fitness", "restrictions", "status"],
    restricted: true,
  }),
  screen("occupational-health", "restrictions", "Medical Restrictions", "القيود الطبية", "table", "medicalVisits", {
    icon: "shield-alert",
    columns: ["id", "employeeId", "restrictions", "fitness", "followUp", "status"],
    statuses: ST.fitness,
    restricted: true,
  }),
  screen("occupational-health", "illness-registry", "Occupational Illness Registry", "سجل الأمراض المهنية", "table", "medicalVisits", {
    icon: "stethoscope",
    columns: ["id", "employeeId", "icd10", "exposureLink", "date", "status"],
    restricted: true,
  }),
  screen("occupational-health", "injury-cases", "Injury Medical Case Tracker", "متتبع الحالات الطبية للإصابات", "table", "medicalVisits", {
    icon: "siren",
    columns: ["id", "employeeId", "type", "date", "fitness", "followUp", "status"],
    restricted: true,
    kpis: ["health"],
  }),
  screen("occupational-health", "mental-wellbeing", "Mental Health & Wellbeing", "الصحة النفسية والرفاه", "table", "medicalVisits", {
    icon: "brain",
    columns: ["id", "employeeId", "type", "date", "findings", "status"],
    restricted: true,
    scopeNote: "Wellbeing assessments, referral records and follow-up scheduling for the workforce.",
  }),
  screen("occupational-health", "questionnaires", "Occupational Health Questionnaires", "استبيانات الصحة المهنية", "builder", "medicalVisits", {
    icon: "clipboard-list",
    features: ["workflow", "create", "edit", "upload", "restricted"],
    restricted: true,
    scopeNote: "Includes HAVS, respiratory, dermatitis and fatigue questionnaire templates.",
  }),
  screen("occupational-health", "clinic-staff-registry", "Clinic Staff Registry", "سجل طاقم العيادة", "table", "clinics", {
    icon: "hospital",
    columns: ["id", "name", "site", "staff", "capacity", "hours", "status"],
    restricted: false,
  }),
  screen("occupational-health", "clinic-directory", "Clinic Directory", "دليل العيادات", "table", "clinics", {
    icon: "map-pin",
    columns: ["id", "name", "site", "capacity", "staff", "hours", "status"],
    restricted: false,
  }),
  screen("occupational-health", "medical-analytics", "Medical Analytics Dashboard", "لوحة التحليلات الطبية", "analytics", "medicalVisits", {
    icon: "chart-spline",
    kpis: ["health"],
    chart: "composed",
    features: ["chart", "filters", "export", "compare", "restricted"],
    restricted: true,
    layout: "wide",
  }),
];
