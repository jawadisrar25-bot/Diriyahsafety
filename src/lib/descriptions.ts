import type { ModuleId, ScreenDef, ScreenKind } from "@/types";

/**
 * Per-screen narrative lines. Written so that no two screens in the inventory
 * share the same phrasing — the openers are module-specific, the middle clause
 * is kind-specific, and the closing detail is picked by the screen id.
 */

const MODULE_OPENERS: Record<ModuleId, string[]> = {
  dashboard: [
    "A consolidated view of operational performance for the Diriyah programme.",
    "Leadership-level summary bringing safety, health and delivery signals together.",
    "One place to read the current state of OHSS work across every live project.",
    "Programme-wide indicators arranged for fast scanning during daily stand-ups.",
  ],
  "occupational-health": [
    "Clinical oversight for the workforce, from fitness assessment through to surveillance.",
    "Medical services coordination covering clinics, appointments and health records.",
    "Worker health tracked against statutory surveillance requirements.",
    "Occupational medicine activity for the Diriyah construction population.",
  ],
  "industrial-hygiene": [
    "Exposure assessment and control verification for site agents and processes.",
    "Sampling programmes, laboratory results and occupational exposure limits.",
    "Air quality, noise and hazardous substance monitoring across the works.",
    "Hygiene data supporting control decisions at the point of work.",
  ],
  "construction-safety": [
    "Site safety disciplines applied to active construction and fit-out packages.",
    "Field-level controls for working at height, lifting, excavation and access.",
    "Construction hazards identified, assessed and closed out on site.",
    "Supervision records for the physical works across all Diriyah zones.",
  ],
  security: [
    "Protective security operations covering access, movement and asset integrity.",
    "Gate, patrol and visitor control aligned to project security plans.",
    "Site security posture monitored across gates, perimeters and sensitive areas.",
    "Manned guarding, monitoring and incident response for the programme.",
  ],
  incidents: [
    "Structured capture and investigation of events that fall outside normal operation.",
    "From first notification through root-cause analysis to corrective action.",
    "Incident records held with full evidence, ownership and follow-up.",
    "Learning captured from events so the same failure does not repeat.",
  ],
  "risk-permits": [
    "Hazardous work authorisation with isolation, gas testing and sign-off controls.",
    "Risk registers and permit-to-work activity for high-risk operations.",
    "Formal assessment gate before any elevated-risk activity starts on site.",
    "Permit lifecycle managed from request through execution to close-out.",
  ],
  contractors: [
    "Pre-qualification, mobilisation and performance of every appointed contractor.",
    "Contractor workforce, authorised activities and HSE standing in one view.",
    "Third-party assurance across the supply chain that delivers the works.",
    "Contractor records held against project and package accountability.",
  ],
  emergency: [
    "Readiness to respond — plans, resources, drills and post-exercise learning.",
    "Emergency arrangements for the Diriyah sites and the people on them.",
    "Response capability maintained through exercises and continuous review.",
    "Crisis coordination assets kept current and tested on a defined cycle.",
  ],
  "business-continuity": [
    "Critical functions identified, their dependencies mapped and recovery tested.",
    "Business impact analysis feeding continuity and recovery planning.",
    "Resilience of essential services supporting programme delivery.",
    "Continuity arrangements documented, owned and exercised.",
  ],
  compliance: [
    "Regulatory and policy obligations tracked to evidence and to an owner.",
    "Governance framework covering statutory duties and internal standards.",
    "Assurance that required controls are in place and demonstrably effective.",
    "Non-conformance raised, dispositioned and verified before closure.",
  ],
  audits: [
    "Planned and reactive audit activity with findings routed into corrective action.",
    "Inspection programmes applied consistently across sites and contractors.",
    "Independent checking that the management system is working as designed.",
    "Audit results scored, reported and followed through to resolution.",
  ],
  training: [
    "Competence assured through programmes, assessment and certification tracking.",
    "Learning delivery and record-keeping for the whole project population.",
    "Mandatory and role-specific training mapped to job requirements.",
    "Course catalogue, enrolment and expiry management for site teams.",
  ],
  environment: [
    "Environmental performance measured against permits, targets and commitments.",
    "Waste, emissions, water and ecology managed through the delivery phases.",
    "Sustainability indicators reported for programme and project stakeholders.",
    "Environmental controls verified in the field and recorded with evidence.",
  ],
  documents: [
    "Controlled information managed through review, approval, issue and archive.",
    "Form library and document lifecycle with version and access control.",
    "Records retained with clear ownership and defined retention rules.",
    "Forms and templates supporting consistent execution of OHSS processes.",
  ],
  reporting: [
    "Scheduled and on-demand reporting drawn from across the management system.",
    "Analysis prepared for review meetings, board packs and regulatory returns.",
    "Insight packages assembled from live operational records.",
    "Performance reporting configured for defined audiences and cadences.",
  ],
  administration: [
    "Platform configuration, user administration and organisational settings.",
    "Access, structure and reference data maintained for the system.",
    "Administrative control of how the platform behaves for Diriyah users.",
    "System-level setup supporting day-to-day operational use.",
  ],
  integrations: [
    "Connections to external systems, monitored for health and data quality.",
    "Interfaces exchanging records with the wider Diriyah technology estate.",
    "Integration status, throughput and error handling in a single place.",
    "Data movement between this platform and the systems that feed it.",
  ],
  support: [
    "Assistance requests from platform users, tracked against service targets.",
    "Help raised, triaged and resolved by the OHSS support team.",
    "User support queue with ownership, priority and response commitments.",
    "Issues and questions logged by everyone working in the platform.",
  ],
};

const KIND_MIDDLES: Record<ScreenKind, string[]> = {
  dashboard: [
    "Figures are grouped so exceptions surface before routine performance.",
    "The layout favours trend and variance over raw volume.",
    "Each indicator is paired with its movement against the prior period.",
    "Reading order follows how the leadership team reviews performance.",
  ],
  workspace: [
    "Items are arranged by what needs attention from you personally.",
    "Work is surfaced by status so nothing stays unowned.",
    "The board reflects only the records assigned to the current user.",
    "Columns can be narrowed to the fields each role actually uses.",
  ],
  table: [
    "Columns can be shown, hidden and sorted without leaving the page.",
    "Search covers reference, title and owner in a single pass.",
    "Filters narrow the set by status and by project before export.",
    "Row selection supports bulk action on the filtered result.",
  ],
  detail: [
    "The full record opens with its history, ownership and linked evidence.",
    "Summary fields lead, with supporting detail available in place.",
    "Related records are listed alongside the primary entry.",
    "Attachments and the activity trail sit with the record itself.",
  ],
  form: [
    "Fields are grouped into sections that follow the real process.",
    "Validation runs as each field is completed rather than at the end.",
    "Attachments can be added before the record is submitted for review.",
    "The sequence mirrors how the submission is prepared and approved.",
  ],
  approval: [
    "The approval chain shows who has acted and who is still to respond.",
    "Each stage records its own decision, comment and timestamp.",
    "Returning a submission sends it back with the reviewer's note attached.",
    "Escalation is available where a stage passes its response window.",
  ],
  workflow: [
    "Stages can be reordered to match the process the business runs.",
    "Routing decides the next owner from the record's own attributes.",
    "Execution history shows how each case travelled through the stages.",
    "Roles are bound to stages rather than to named individuals.",
  ],
  calendar: [
    "Scheduled items appear on the day they fall due or take place.",
    "The agenda below lists everything in the selected period.",
    "Month and list views cover the same underlying schedule.",
    "Events can be added directly from the day they belong to.",
  ],
  map: [
    "Locations are listed alongside the plan so both stay in step.",
    "Selecting a point updates the record shown in the side panel.",
    "Status colouring matches the vocabulary used elsewhere in the system.",
    "Positions are indicative of the works, not surveyed coordinates.",
  ],
  analytics: [
    "Comparison series are drawn on a shared axis for like-for-like reading.",
    "Distribution views break the total into its contributing categories.",
    "The matrix plots likelihood against impact for prioritisation.",
    "Views can be refreshed against a different reporting period.",
  ],
  builder: [
    "Fields are added, reordered and removed before the form is published.",
    "Stage names carry through to every submission using this definition.",
    "The preview reflects the layout exactly as an end user will see it.",
    "Changes apply to new submissions only, never to existing records.",
  ],
  scorecard: [
    "Scores are normalised so different teams can be compared directly.",
    "Movement against the previous period is shown alongside each total.",
    "The scale is consistent with the wider programme scorecard.",
    "Ratings feed the monthly performance review with project leads.",
  ],
  viewer: [
    "The profile opens read-only, with supporting documents attached.",
    "Key attributes lead, with the remaining detail listed below.",
    "Related records are reachable without leaving this view.",
    "Access follows the permissions held by the signed-in user.",
  ],
};

const CLOSERS: string[] = [
  "Records are scoped to the selected project where a project applies.",
  "Where a field is not applicable it is left blank rather than defaulted.",
  "Ownership sits with the role named on the record, not an individual.",
  "Dates follow the format used across the rest of the platform.",
  "Status changes are written to the activity trail automatically.",
  "Access follows the permissions of the signed-in role.",
  "Any filter applied here carries into the exported file.",
  "References are generated when the record is first saved.",
  "Related entries stay linked when the source record is amended.",
  "The view adapts to the width of the screen it is opened on.",
  "Nothing is deleted outright — superseded entries are archived.",
  "Counts on this page exclude records that have been archived.",
];

const ENTITY_DETAIL: Record<string, string[]> = {
  incidents: ["Event details, classification and investigation status.", "Notification, investigation and outcome in one record."],
  permits: ["Authorisation window, risk rating and isolation evidence.", "Gas test, isolation certificate and sign-off captured together."],
  risks: ["Scoring, treatment strategy and review date are tracked.", "Inherent and residual scores are held side by side."],
  employees: ["Fitness status and surveillance dates are visible here.", "Assignment, trade and clearance are recorded against the person."],
  contractors: ["Commercial standing and HSE performance are held together.", "Approved activities and workforce numbers are maintained here."],
  audits: ["Findings, scoring and next audit date sit with the schedule.", "Scope, standard and result are recorded for each audit."],
  programs: ["Duration, capacity and validity are managed per programme.", "Enrolment and pass criteria are defined once and reused."],
  documents: ["Version, approval state and access level are controlled.", "Superseded versions remain retrievable from the history."],
  approvals: ["Stage, requester and decision date are tracked to closure.", "Each submission carries its own risk-if-delayed note."],
  actions: ["Due date, owner and verification state drive follow-up.", "Corrective actions stay open until verification is recorded."],
};

function pick<T>(arr: T[], n: number): T {
  return arr[Math.abs(n) % arr.length];
}

/** Unique narrative for a screen — different from every other screen in the set. */
export function describeScreen(screen: ScreenDef, locale: "en" | "ar"): string {
  if (locale === "ar") return describeAr(screen);
  const opener = pick(MODULE_OPENERS[screen.module] ?? MODULE_OPENERS.dashboard, screen.id);
  const middle = pick(KIND_MIDDLES[screen.kind] ?? KIND_MIDDLES.table, screen.id * 3 + screen.module.length);
  const detailSet = ENTITY_DETAIL[screen.entity];
  const detail = detailSet ? pick(detailSet, screen.id * 5) : undefined;
  const closer = pick(CLOSERS, screen.id * 7 + screen.kind.length);
  return [opener, detail, middle, closer].filter(Boolean).join(" ");
}

const AR_OPENERS: Record<ModuleId, string[]> = {
  dashboard: ["نظرة موحّدة لأداء البرنامج التشغيلي في الدرعية."],
  "occupational-health": ["إشراف طبي على القوى العاملة من التقييم الطبي إلى الفحوصات الدورية."],
  "industrial-hygiene": ["تقييم التعرض والتحقق من ضوابط التحكم في المخاطر المهنية."],
  "construction-safety": ["ضوابط السلامة الميدانية لأعمال البناء والتشطيب الجارية."],
  security: ["عمليات الأمن الوقائي تشمل الدخول والحركة وحماية الأصول."],
  incidents: ["توثيق وتحقيق منظم للأحداث خارج التشغيل المعتاد."],
  "risk-permits": ["تصريح الأعمال عالية الخطورة مع ضوابط العزل واختبار الغازات."],
  contractors: ["تأهيل المقاولين وأداؤهم وحالة سلامتهم وبيئتهم المهنية."],
  emergency: ["الجاهزية للاستجابة عبر الخطط والموارد والتمارين."],
  "business-continuity": ["تحديد الوظائف الحيوية وربط اعتمادياتها واختبار التعافي."],
  compliance: ["متابعة الالتزام بالمتطلبات التنظيمية والسياسات مع إسناد المسؤوليات."],
  audits: ["أنشطة التدقيق والفحص المجدولة والتفاعلية ومتابعة نتائجها."],
  training: ["ضمان الكفاءة عبر البرامج والتسجيل والشهادات."],
  environment: ["قياس الأداء البيئي مقابل التصاريح والأهداف والالتزامات."],
  documents: ["إدارة المعلومات المنظمة عبر المراجعة والاعتماد والإصدار والأرشفة."],
  reporting: ["تقارير مجدولة وعند الطلب من مختلف أنحاء النظام."],
  administration: ["إعدادات المنصة وإدارة المستخدمين والهيكل التنظيمي."],
  integrations: ["الاتصالات بالأنظمة الخارجية ومتابعة حالتها وجودة البيانات."],
  support: ["طلبات المساعدة من مستخدمي المنصة مع التزامات الاستجابة."],
};

function describeAr(screen: ScreenDef): string {
  const opener = pick(AR_OPENERS[screen.module] ?? AR_OPENERS.dashboard, screen.id);
  const middles: Record<string, string> = {
    table: "يمكن ترتيب الأعمدة والبحث والتصفية وتصدير النتائج من نفس الشاشة.",
    detail: "تُعرض السجل الكامل مع سجل النشاط والمرفقات والسجلات المرتبطة.",
    form: "الحقول مجمعة في أقسام تتبع تسلسل العملية الفعلي.",
    approval: "سلسلة الموافقة تعرض من قام بالإجراء ومن يتبقى عليه.",
    workflow: "المراحل قابلة للإعادة ترتيب لتطابق مسار العمل المعتمد.",
    calendar: "العناصر المجدولة تظهر في اليوم المحدد مع قائمة للأجندة.",
    map: "المواقع مدرجة بجانب المخطط لتحديث التفاصيل عند التحديد.",
    analytics: "سلاسل المقارنة معروضة على محور واحد لتسهيل القراءة.",
    builder: "الحقول تُضاف وتُعاد ترتيبها قبل نشر النموذج.",
    scorecard: "النتائج معيارية لتسهيل المقارنة بين الفرق المختلفة.",
    viewer: "الملف يُفتح للقراءة فقط مع الوثائق المرفقة.",
    dashboard: "المؤشرات مجمعة بحيث تظهر الاستثناءات قبل الأداء الروتيني.",
    workspace: "البنود مرتبة حسب ما يحتاج إلى انتباهك الشخصي.",
  };
  return `${opener} ${middles[screen.kind] ?? middles.table} يعتمد الوصول إلى الصلاحيات الممنوحة للمستخدم.`;
}

export function screenKindLabel(kind: ScreenKind): string {
  return kind.replace(/-/g, " ");
}
