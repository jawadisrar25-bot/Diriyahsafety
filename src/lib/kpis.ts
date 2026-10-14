import type { Dataset } from "@/types";

export type KpiFormat = "int" | "pct" | "money" | "decimal" | "hours";
export type KpiTone = "neutral" | "good" | "warn" | "bad";

export interface KpiValue {
  key: string;
  label: string;
  labelAr: string;
  value: number;
  format: KpiFormat;
  deltaPct: number;
  tone: KpiTone;
  hint?: string;
  hintAr?: string;
}

const pct = (n: number, d: number) => (d === 0 ? 0 : Math.round((n / d) * 100));

/** Deterministic ±delta around a seed value so the UI never jumps between renders. */
function delta(seed: number): number {
  const x = Math.sin(seed * 127.1) * 43758.5453;
  return Math.round((x - Math.floor(x)) * 24 - 12);
}

export function computeKpis(d: Dataset): Record<string, KpiValue> {
  const openActions = d.actions.filter((a) => a.status !== "Closed").length;
  const overdueActions = d.actions.filter(
    (a) => a.status !== "Closed" && a.dueDate < new Date().toISOString().slice(0, 10)
  ).length;
  const closedActions = d.actions.length - openActions;
  const incidents12 = d.incidents.filter((i) => i.date >= daysAgo(365)).length;
  const lostTime = d.incidents.filter((i) => i.lostTime).length;
  const nearMiss = d.incidents.filter((i) => i.type === "Near miss").length;
  const surveillanceDue = d.surveillance.filter((s) => s.nextDue <= daysAhead(60)).length;
  const fit = d.employees.filter((e) => e.fitness === "Fit").length;
  const restricted = d.employees.filter((e) => e.fitness === "Fit with restrictions").length;
  const exceed = d.exposureSamples.filter((s) => s.exceedancePct > 0).length;
  const nearLimit = d.exposureSamples.filter((s) => s.exceedancePct >= -15 && s.exceedancePct <= 0).length;
  const segMonitored = new Set(d.exposureSamples.map((s) => s.segId)).size;
  const openNcrs = d.ncrs.filter((n) => n.status !== "Closed").length;
  const approvedPolicies = d.policies.filter((p) => p.status === "Active").length;
  const programsDue = d.programs.filter((p) => p.status === "Active").length;
  const expiringCerts = d.trainees.filter((t) => t.expiryDate <= daysAhead(90)).length;
  const suspended = d.contractors.filter((c) => c.status === "Suspended").length;
  const avgHse =
    d.contractors.length === 0
      ? 0
      : Math.round((d.contractors.reduce((s, c) => s + c.hseScore, 0) / d.contractors.length) * 10) / 10;
  const openPermits = d.permits.filter((p) => p.status === "Active").length;
  const highRisks = d.risks.filter((r) => r.score >= 12).length;
  const drillsClosed = d.drills.filter((x) => x.status === "Closed").length;
  const drillParticipants = d.drills.reduce((s, x) => s + x.participants, 0);
  const avgDrillScore =
    d.drills.length === 0 ? 0 : Math.round(d.drills.reduce((s, x) => s + x.score, 0) / d.drills.length);
  const tier1 = d.bias.filter((b) => b.criticality === "Tier 1").length;
  const plansApproved = d.plans.filter((p) => p.status === "Approved").length;
  const plansApprovedPolicies = d.policies.filter((p) => p.status === "Active").length;
  const ticketsOpen = d.tickets.filter((t) => t.status === "Open" || t.status === "In progress").length;
  const slaMet = pct(
    d.tickets.filter((t) => t.elapsedHours <= t.slaHours).length,
    Math.max(1, d.tickets.length)
  );
  const connected = d.integrations.filter((i) => i.status === "Connected").length;
  const degraded = d.integrations.filter((i) => i.status === "Degraded").length;
  const docsInReview = d.documents.filter((doc) => doc.status === "In review").length;
  const docsRestricted = d.documents.filter((doc) => doc.restricted).length;
  const docsExpiring = d.documents.filter((doc) => doc.status === "Expiring").length;
  const envMetrics = new Set(d.environmental.map((e) => e.metric)).size;
  const envOff = d.environmental.filter((e) => e.variancePct > 0).length;
  const recycled = d.environmental.filter((e) => e.metric.toLowerCase().includes("waste")).length;
  const emissions = d.environmental
    .filter((e) => e.metric.toLowerCase().includes("emission"))
    .reduce((s, e) => s + e.value, 0);
  const visitorsToday = d.visitors.filter((v) => v.checkIn.startsWith(new Date().toISOString().slice(0, 10))).length;
  const patrolsOpen = d.patrols.filter((p) => p.status !== "Closed").length;
  const patrolExceptions = d.patrols.reduce((s, p) => s + p.exceptions, 0);
  const securityIncidents = d.incidents.filter((i) => i.category === "Security").length;
  const auditAvg =
    d.audits.length === 0 ? 0 : Math.round(d.audits.reduce((s, a) => s + a.score, 0) / d.audits.length);
  const auditOpen = d.audits.filter((a) => a.status !== "Closed").length;
  const complianceRate = Math.min(99, Math.max(40, 100 - openNcrs * 3));
  const traineesActive = d.trainees.filter((t) => t.status === "In progress").length;
  const programsActive = d.programs.filter((p) => p.status === "Active").length;

  const kpis: KpiValue[] = [
    // volume
    kpi("records", "Total records", "إجمالي السجلات", countAll(d), "int", 0, "neutral"),
    kpi("open", "Open items", "البنود المفتوحة", openActions + auditOpen + ticketsOpen, "int", -5, "warn"),
    kpi("overdue", "Overdue", "متأخر", overdueActions + expiringCerts, "int", 9, "bad"),
    kpi("closedRate", "Closure rate", "نسبة الإغلاق", pct(closedActions, Math.max(1, d.actions.length)), "pct", 4, "good"),
    // safety
    kpi("incidents", "Incidents (12m)", "الحوادث (12 شهر)", incidents12, "int", -7, "good"),
    kpi("ltifr", "LTIFR", "معدل الحوادث المفقودة", Math.round(((lostTime * 1000000) / Math.max(1, d.employees.length * 2000)) * 100) / 100, "decimal", -3, "good"),
    kpi("nearMiss", "Near misses", "الحوادث الوشيكة", nearMiss, "int", 11, "neutral"),
    kpi("openActions", "Open actions", "إجراءات مفتوحة", openActions, "int", -4, "warn"),
    // health
    kpi("surveillanceDue", "Surveillance due", "فحوصات مستحقة", surveillanceDue, "int", 6, "warn"),
    kpi("fitRate", "Fitness rate", "نسبة اللياقة الطبية", pct(fit, Math.max(1, d.employees.length)), "pct", 1, "good"),
    kpi("restrictions", "Restrictions", "قيود طبية", restricted, "int", 0, "neutral"),
    kpi("clinicVisits", "Clinic visits", "زيارات العيادة", d.medicalVisits.length, "int", 8, "neutral"),
    // hygiene
    kpi("samples", "Samples analysed", "عينات محللة", d.exposureSamples.length, "int", 12, "neutral"),
    kpi("exceedances", "OEL exceedances", "تجاوزات الحد المسموح", exceed, "int", -9, "good"),
    kpi("nearLimit", "Near OEL", "قريب من الحد", nearLimit, "int", 3, "warn"),
    kpi("segMonitored", "SEGs monitored", "مجموعات التعرض المراقَبة", segMonitored, "int", 2, "neutral"),
    // compliance
    kpi("complianceRate", "Compliance rate", "نسبة الامتثال", complianceRate, "pct", 2, "good"),
    kpi("policiesDue", "Policies in force", "سياسات سارية", approvedPolicies + plansApprovedPolicies, "int", 0, "neutral"),
    kpi("openNcrs", "Open NCRs", "مخالفات مفتوحة", openNcrs, "int", -6, "good"),
    kpi("auditScore", "Audit score", "نتيجة التدقيق", auditAvg, "int", 3, "good"),
    // training
    kpi("programs", "Active programs", "برامج نشطة", programsActive, "int", 1, "neutral"),
    kpi("trainees", "Trainees enrolled", "متدربون مسجلون", d.trainees.length, "int", 14, "good"),
    kpi("trainingRate", "Training compliance", "امتثال التدقيق", pct(d.trainees.filter((t) => t.score >= 70).length, Math.max(1, d.trainees.length)), "pct", 3, "good"),
    kpi("expiring", "Certificates expiring", "شهادات تنتهي قريبًا", expiringCerts, "int", -2, "warn"),
    // contractor
    kpi("contractors", "Active contractors", "مقاولون نشطون", d.contractors.filter((c) => c.status === "Approved").length, "int", 4, "neutral"),
    kpi("avgHse", "Average HSE score", "متوسط نتيجة HSE", avgHse, "decimal", 2, "good"),
    kpi("suspended", "Suspended", "موقوفون", suspended, "int", -1, "good"),
    // security
    kpi("visitors", "Visitors today", "زوار اليوم", visitorsToday, "int", 9, "neutral"),
    kpi("securityIncidents", "Security incidents", "حوادث أمنية", securityIncidents, "int", -3, "good"),
    kpi("patrols", "Patrols open", "دوريات مفتوحة", patrolsOpen, "int", 0, "neutral"),
    kpi("violations", "Patrol exceptions", "استثناءات الدورية", patrolExceptions, "int", -5, "good"),
    // emergency
    kpi("drills", "Drills conducted", "تمارين منفذة", drillsClosed, "int", 2, "good"),
    kpi("participants", "Participants", "المشاركون", drillParticipants, "int", 18, "good"),
    kpi("drillScore", "Average score", "متوسط النتيجة", avgDrillScore, "int", 1, "good"),
    // bcm
    kpi("functions", "Business functions", "الوظائف الحيوية", d.bias.length, "int", 0, "neutral"),
    kpi("tier1", "Tier 1 functions", "الوظائف من المستوى 1", tier1, "int", 0, "warn"),
    kpi("plansApproved", "Plans approved", "خطط معتمدة", plansApproved, "int", 3, "good"),
    // platform
    kpi("uptime", "Platform uptime", "جاهزية المنصة", 99.9, "decimal", 0, "good"),
    kpi("ticketsOpen", "Open tickets", "تذاكر مفتوحة", ticketsOpen, "int", -8, "good"),
    kpi("slaMet", "SLA met", "التزام خدمة SLA", slaMet, "pct", 2, "good"),
    kpi("integrations", "Integrations live", "تكاملات نشطة", connected, "int", 1, "good"),
    // environmental
    kpi("envMetrics", "Metrics tracked", "مؤشرات مُتَبَعة", envMetrics, "int", 0, "neutral"),
    kpi("offTarget", "Off target", "خارج الهدف", envOff, "int", -4, "good"),
    kpi("wasteRecycled", "Waste streams", "تدفقات النفايات", recycled, "int", 1, "neutral"),
    kpi("emissionsE", "Emissions total", "إجمالي الانبعاثات", emissions, "decimal", -2, "good"),
    // document
    kpi("documents", "Documents", "المستندات", d.documents.length, "int", 6, "neutral"),
    kpi("inReview", "In review", "قيد المراجعة", docsInReview, "int", 0, "warn"),
    kpi("restrictedDocs", "Restricted", "مقيّد", docsRestricted, "int", 0, "neutral"),
    kpi("docsExpiring", "Expiring", "تنتهي قريبًا", docsExpiring, "int", -1, "warn"),
  ];

  const map: Record<string, KpiValue> = {};
  for (const k of kpis) {
    map[k.key] = k;
    k.deltaPct = delta(kpis.indexOf(k) + 1);
  }
  // Set-set membership sets used by the four-slot KPI strips.
  map.records = kpi("records", "Total records", "إجمالي السجلات", countAll(d), "int", 0, "neutral");
  map.open = kpi("open", "Open items", "البنود المفتوحة", openActions + auditOpen + ticketsOpen, "int", -5, "warn");
  map.overdue = kpi("overdue", "Overdue", "متأخر", overdueActions + expiringCerts, "int", 9, "bad");
  map.closedRate = kpi("closedRate", "Closure rate", "نسبة الإغلاق", pct(closedActions, Math.max(1, d.actions.length)), "pct", 4, "good");
  map.tier1 = kpi("tier1", "Tier 1 functions", "الوظائف من المستوى 1", tier1, "int", 0, "warn");
  map.trainingCompliance = map.trainingRate;
  map.wasteRecycled = kpi("wasteRecycled", "Waste recycled %", "نسبة إعادة التدوير", 68, "pct", 3, "good");
  map.emissions = kpi("emissions", "Emissions (tCO₂e)", "الانبعاثات (طن مكافئ)", emissions, "decimal", -2, "good");
  map.restricted = map.restrictedDocs;
  map.expiring = map.expiring;
  map.drillScore = kpi("drillScore", "Average score", "متوسط النتيجة", avgDrillScore, "int", 1, "good");
  map.score = map.drillScore;
  map.licenceFull = kpi("licenceFull", "Full users", "مستخدمون كاملون", 180, "int", 5, "neutral");
  map.licenceLite = kpi("licenceLite", "Collaborative users", "مستخدمون تعاونيون", 420, "int", 7, "neutral");
  map.licenceUtil = kpi("licenceUtil", "Utilisation", "نسبة الاستخدام", 76, "pct", 4, "good");
  map.licenceExpiring = kpi("licenceExpiring", "Seats expiring", "مقاعد تنتهي قريبًا", 24, "int", -2, "warn");
  map.functions = kpi("functions", "Business functions", "الوظائف الحيوية", d.bias.length, "int", 0, "neutral");
  map.exercises = kpi("exercises", "Exercises completed", "تمارين مكتملة", drillsClosed, "int", 2, "good");
  return map;
}

function kpi(
  key: string,
  label: string,
  labelAr: string,
  value: number,
  format: KpiFormat,
  deltaPct: number,
  tone: KpiTone
): KpiValue {
  return { key, label, labelAr, value, format, deltaPct, tone };
}

function countAll(d: Dataset): number {
  return Object.values(d).reduce((s, v) => (Array.isArray(v) ? s + v.length : s), 0);
}

function daysAgo(n: number): string {
  const dt = new Date();
  dt.setDate(dt.getDate() - n);
  return dt.toISOString().slice(0, 10);
}
function daysAhead(n: number): string {
  const dt = new Date();
  dt.setDate(dt.getDate() + n);
  return dt.toISOString().slice(0, 10);
}

/** Resolve a KPI set name to its four slots, in order. */
export function kpiSet(name: string, map: Record<string, KpiValue>): KpiValue[] {
  const sets: Record<string, string[]> = {
    volume: ["records", "open", "overdue", "closedRate"],
    safety: ["incidents", "ltifr", "nearMiss", "openActions"],
    health: ["surveillanceDue", "fitRate", "restrictions", "clinicVisits"],
    hygiene: ["samples", "exceedances", "nearLimit", "segMonitored"],
    compliance: ["complianceRate", "policiesDue", "openNcrs", "auditScore"],
    training: ["programs", "trainees", "trainingRate", "expiring"],
    contractor: ["contractors", "avgHse", "suspended", "openActions"],
    security: ["visitors", "securityIncidents", "patrols", "violations"],
    emergency: ["drills", "participants", "drillScore", "openActions"],
    bcm: ["functions", "tier1", "plansApproved", "exercises"],
    platform: ["uptime", "ticketsOpen", "slaMet", "integrations"],
    licence: ["licenceFull", "licenceLite", "licenceUtil", "licenceExpiring"],
    environmental: ["envMetrics", "offTarget", "wasteRecycled", "emissions"],
    document: ["documents", "inReview", "restrictedDocs", "docsExpiring"],
  };
  const keys = sets[name] ?? sets.volume;
  return keys.map((k, i) => map[k] ?? kpi(k, k, k, 0, "int", 0, "neutral"));
}
