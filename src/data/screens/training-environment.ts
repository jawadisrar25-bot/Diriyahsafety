import { screen, ST } from "./kit";
import type { ScreenDef } from "@/types";

export const trainingScreens: ScreenDef[] = [
  screen("training", "training-overview", "Training Dashboard", "لوحة التدريب", "dashboard", "programs", {
    icon: "graduation-cap",
    kpis: ["training", "volume"],
    chart: "composed",
    layout: "wide",
  }),
  screen("training", "training-calendar", "Training Calendar", "تقويم التدريب", "calendar", "programs", {
    icon: "calendar-days",
    features: ["calendar", "create", "schedule", "filters"],
  }),
  screen("training", "program-directory", "Training Program Directory", "دليل برامج التدريب", "table", "programs", {
    icon: "library-big",
    columns: ["code", "name", "category", "duration", "maxSeats", "validityMonths", "status"],
    statuses: ["Active", "Under review", "Retired"],
    features: ["search", "filters", "pagination", "status", "export", "create", "edit"],
  }),
  screen("training", "create-program", "Create Training Program", "إنشاء برنامج تدريب", "form", "programs", {
    icon: "file-plus-2",
    features: ["steps", "upload", "create"],
    layout: "focus",
  }),
  screen("training", "training-plans", "Training Plans", "خطط التدريب", "table", "programs", {
    icon: "notebook-tabs",
    columns: ["code", "name", "category", "enrolled", "status"],
  }),
  screen("training", "request-approvals", "Training Request Approvals", "موافقات طلبات التدريب", "approval", "trainees", {
    icon: "stamp",
    approvalStages: ["Line manager", "HSE manager", "Training manager"],
    statuses: ST.workflow,
  }),
  screen("training", "trainee-directory", "Trainee Registry", "سجل المتدربين", "table", "trainees", {
    icon: "users",
    columns: ["id", "employeeId", "programId", "completionDate", "expiryDate", "score", "status"],
    statuses: ST.training,
    kpis: ["training"],
  }),
  screen("training", "trainee-profile", "Trainee Profile", "الملف التعريفي للمتدرب", "detail", "trainees", {
    icon: "user-round",
    features: ["timeline", "attachments", "status", "edit", "chart"],
    layout: "split",
  }),
  screen("training", "instructor-directory", "Instructor Registry", "سجل المدربين", "table", "instructors", {
    icon: "presentation",
    columns: ["id", "name", "specialty", "provider", "rating", "sessions", "status"],
  }),
  screen("training", "instructor-schedule", "Instructor Schedule", "جدول المدربين", "calendar", "instructors", {
    icon: "calendar-clock",
    features: ["calendar", "schedule", "filters"],
  }),
  screen("training", "classroom", "Classroom Management", "إدارة القاعات", "table", "programs", {
    icon: "school",
    columns: ["code", "name", "type", "maxSeats", "enrolled", "status"],
  }),
  screen("training", "resources", "Training Resources", "موارد التدريب", "table", "documents", {
    icon: "package-open",
    columns: ["id", "name", "category", "version", "size", "status"],
  }),
  screen("training", "materials", "Training Materials", "مواد التدريب", "table", "documents", {
    icon: "book-open",
    columns: ["id", "name", "category", "uploadedBy", "date", "status"],
  }),
  screen("training", "attendance", "Training Attendance", "حضور التدريب", "table", "trainees", {
    icon: "user-check",
    columns: ["id", "employeeId", "programId", "attendance", "score", "status"],
  }),
  screen("training", "qr-attendance", "QR Attendance Management", "إدارة الحضور عبر رمز QR", "builder", "trainees", {
    icon: "qr-code",
    features: ["qr", "create", "status"],
    scopeNote: "Attendance is captured by scanning the QR code issued to each trainee.",
  }),
  screen("training", "competency", "Competency Assessments", "تقييمات الكفاءة", "table", "trainees", {
    icon: "badge-check",
    columns: ["id", "employeeId", "programId", "score", "expiryDate", "status"],
  }),
  screen("training", "certifications", "Certifications Management", "إدارة الشهادات", "table", "trainees", {
    icon: "award",
    columns: ["id", "certificateNo", "employeeId", "programId", "expiryDate", "status"],
    statuses: ["Completed", "Expired", "Registered"],
    kpis: ["training"],
  }),
  screen("training", "training-analytics", "Training Analytics", "تحليلات التدريب", "analytics", "trainees", {
    icon: "chart-column",
    kpis: ["training", "safety"],
    chart: "composed",
    layout: "wide",
    features: ["chart", "filters", "export", "compare", "schedule"],
  }),
];

export const environmentScreens: ScreenDef[] = [
  screen("environment", "environment-overview", "Environmental Dashboard", "لوحة البيئة", "dashboard", "environmental", {
    icon: "leaf",
    kpis: ["environmental", "volume"],
    chart: "composed",
    layout: "wide",
  }),
  screen("environment", "compliance-register", "Environmental Compliance Register", "سجل الامتثال البيئي", "table", "policies", {
    icon: "notebook-tabs",
    columns: ["number", "title", "category", "version", "nextReview", "status"],
  }),
  screen("environment", "water-use", "Water Consumption Monitoring", "مراقبة استهلاك المياه", "table", "environmental", {
    icon: "droplets",
    columns: ["id", "metric", "month", "value", "target", "variancePct", "status"],
  }),
  screen("environment", "wastewater", "Wastewater Management", "إدارة المياه العادمة", "table", "environmental", {
    icon: "waves",
    columns: ["id", "metric", "month", "value", "target", "source", "status"],
  }),
  screen("environment", "air-emissions", "Air Emissions Monitoring", "مراقبة الانبعاثات الهوائية", "table", "environmental", {
    icon: "wind",
    columns: ["id", "metric", "month", "value", "target", "variancePct", "status"],
  }),
  screen("environment", "ghg-inventory", "Greenhouse Gas Emissions", "الانبعاثات الغازية الدفيئة", "analytics", "environmental", {
    icon: "cloud",
    chart: "area",
    kpis: ["environmental"],
    features: ["chart", "filters", "export", "compare"],
  }),
  screen("environment", "esg-dashboard", "ESG Dashboard", "لوحة الاستدامة", "dashboard", "environmental", {
    icon: "sprout",
    kpis: ["environmental", "compliance"],
    chart: "composed",
    layout: "wide",
    scopeNote: "Environmental, social and governance indicators reported against annual targets.",
  }),
  screen("environment", "chemical-inventory", "Chemical Inventory", "سجل المواد الكيميائية", "table", "chemicals", {
    icon: "flask-round",
    columns: ["id", "name", "cas", "hazardClass", "quantity", "storage", "status"],
    kpis: ["environmental"],
  }),
  screen("environment", "chemical-detail", "Hazardous Material Details", "تفاصيل المواد الخطرة", "detail", "chemicals", {
    icon: "flask-conical",
    features: ["timeline", "attachments", "status", "edit"],
    layout: "split",
  }),
  screen("environment", "hazardous-waste", "Hazardous Waste Tracking", "تتبع النفايات الخطرة", "table", "chemicals", {
    icon: "recycle",
    columns: ["id", "name", "hazardClass", "quantity", "storage", "status"],
  }),
  screen("environment", "ergonomics", "Ergonomics Assessments", "تقييمات الملاءمة البيئية", "table", "inspections", {
    icon: "accessibility",
    columns: ["id", "title", "type", "inspector", "score", "status"],
    scopeNote: "Workstation and task assessments with risk grading and control recommendations.",
  }),
  screen("environment", "environment-reports", "Environmental Reports", "التقارير البيئية", "analytics", "environmental", {
    icon: "file-chart-column",
    kpis: ["environmental"],
    chart: "bar",
    features: ["chart", "filters", "export", "schedule"],
  }),
];
