import { Rng, addDays } from "./rng";
import type {
  Audit,
  BIA,
  Chemical,
  Contractor,
  CorrectiveAction,
  Dataset,
  Drill,
  Employee,
  Environmental,
  ExposureSample,
  Incident,
  Inspection,
  Integration,
  Instructor,
  MedicalVisit,
  NCR,
  Observation,
  Patrol,
  Permit,
  Policy,
  Project,
  Risk,
  RoadClosure,
  Ticket,
  Trainee,
  TrainingProgram,
  Visitor,
  DocumentRec,
} from "@/types";

const SEED = 20261013;

const PROJECT_DEFS: Array<[string, string, string, string]> = [
  ["Diriyah Gate — Zone A", "DG-A", "Foundations & substructure", "Diriyah Gate"],
  ["Wadi Hanifah Works", "WH-W", "Infrastructure & utilities", "Wadi Hanifah"],
  ["Cultural District", "CD-1", "Superstructure", "Al Bujairi"],
  ["North Infrastructure", "NI-2", "Roads & drainage", "Northern Corridor"],
  ["King Salman Boulevard", "KS-B", "Landscaping & public realm", "Boulevard"],
  ["West District", "WD-3", "Fit-out & MEP", "Western Quarter"],
  ["Heritage Quarter", "HQ-4", "Restoration & conservation", "Historic Core"],
];

const CONTRACTOR_DEFS: Array<[string, string, string]> = [
  ["Al Bawani Company", "Civil works", "Riyadh"],
  ["Saudi Binladin Group", "Structural", "Riyadh"],
  ["Almabani General Contractors", "Infrastructure", "Riyadh"],
  ["El Seif Engineering", "MEP", "Riyadh"],
  ["Al Latifia Trading", "Landscaping", "Diriyah"],
  ["Hajar Medical Services", "Occupational health", "Riyadh"],
  ["National Fire & Safety", "Fire safety", "Riyadh"],
  ["Gulf Security Services", "Manned guarding", "Riyadh"],
  ["Tawzea Labour Supply", "Labour supply", "Riyadh"],
  ["Sabic Polymers KSA", "Chemical supply", "Jubail"],
  ["Red Sea Environmental", "Environmental services", "Jeddah"],
  ["Desert Line Scaffolding", "Scaffolding", "Riyadh"],
  ["Zamil Steel Industries", "Steel erection", "Dammam"],
  ["Arabian Cranes & Lifting", "Lifting operations", "Riyadh"],
  ["MedGulf Clinics", "Medical services", "Riyadh"],
  ["Qudra Facilities", "Facilities management", "Riyadh"],
  ["Tamimi Global", "Catering & welfare", "Riyadh"],
  ["Nesma Company", "Manpower", "Riyadh"],
  ["Al Rajhi Transport", "Logistics", "Riyadh"],
  ["Vision Surveying", "Surveying", "Riyadh"],
  ["Delta Water Solutions", "Water treatment", "Riyadh"],
  ["EFS Waste Management", "Waste management", "Riyadh"],
  ["Hydro Tech Drilling", "Dewatering", "Riyadh"],
  ["Protec Painting & Coating", "Painting", "Riyadh"],
  ["Master Concrete", "Ready-mix concrete", "Riyadh"],
  ["Al Mashreq Trading", "Material supply", "Riyadh"],
  ["Riyadh Metro Builders", "Civil works", "Riyadh"],
  ["Najd Electromechanical", "Electromechanical", "Riyadh"],
];

const FIRST = ["Fahad", "Noura", "Ahmed", "Sara", "Khalid", "Mariam", "Omar", "Reem", "Yousef", "Huda", "Abdullah", "Layla", "Saud", "Mona", "Tariq", "Salma", "Bader", "Hessa", "Mishal", "Danah", "Waleed", "Aisha", "Nasser", "Rania", "Saad", "Ghada", "Ibrahim", "Maha", "Faisal", "Hanan"];
const LAST = ["Al Qahtani", "Al Harbi", "Al Otaibi", "Al Dosari", "Al Shamrani", "Al Saleh", "Al Rashid", "Al Ghamdi", "Al Jaber", "Al Mutairi", "Al Subaie", "Al Amri", "Al Zahrani", "Al Shehri", "Al Dossary", "Al Ajmi", "Al Nasser", "Al Harthi", "Al Maliki", "Al Ghafili"];
const NATIONALITIES = ["Saudi", "Saudi", "Saudi", "Saudi", "Bangladeshi", "Indian", "Pakistani", "Nepalese", "Filipino", "Egyptian", "Jordanian", "Sudanese"];
const TRADES = ["Rigger", "Scaffold erector", "Steel fixer", "Crane operator", "Electrician", "Pipe fitter", "Welder", "MEP technician", "General labourer", "Surveyor", "Safety officer", "Site engineer", "Driver", "Carpenter", "Plant operator", "Painter", "HVAC technician", "Instrumentation tech"];
const DEPARTMENTS = ["Construction", "Engineering", "HSE", "Security", "Clinic", "Logistics", "Commercial", "Design", "Facilities"];
const SITES = ["Wadi Hanifah Works", "Cultural District", "North Infrastructure", "King Salman Boulevard", "West District", "Heritage Quarter", "Diriyah Gate — Zone A"];

const INCIDENT_TYPES = ["Near miss", "Injury", "Property damage", "Environmental", "Security event", "Traffic incident", "Toolbox non-compliance", "Lifting incident"];
const INCIDENT_SEVERITIES = ["Low", "Medium", "High", "Critical"];
const LOCATIONS = ["Zone A - Grid 4", "Boulevard Segment 3", "Wadi crossing", "North pump station", "Cultural District podium", "West District Level 2", "Heritage Quarter workshop", "Plant yard", "Access gate 2", "Temporary works area"];

const AGENTS = [
  { name: "Respirable crystalline silica", unit: "mg/m³", oel: 0.05 },
  { name: "Noise (8h TWA)", unit: "dB(A)", oel: 85 },
  { name: "Welding fume", unit: "mg/m³", oel: 1 },
  { name: "Diesel particulate matter", unit: "mg/m³", oel: 0.1 },
  { name: "Benzene", unit: "ppm", oel: 1 },
  { name: "Carbon monoxide", unit: "ppm", oel: 30 },
  { name: "Wood dust", unit: "mg/m³", oel: 5 },
  { name: "Lead (fume)", unit: "µg/m³", oel: 50 },
  { name: "Sulphur dioxide", unit: "ppm", oel: 2 },
  { name: "Vibration (HAV)", unit: "m/s²", oel: 5 },
];

const PERMIT_TYPES = ["Hot work", "Confined space", "Work at height", "Excavation", "Electrical isolation", "Lifting operation", "Line breaking", "Radiography", "Scaffold erection", "Demolition"];
const RISK_CATEGORIES = ["Health & safety", "Environmental", "Commercial", "Schedule", "Security", "Reputational", "Technical", "Regulatory"];
const AUDIT_STANDARDS = ["ISO 45001:2018", "ISO 14001:2015", "OSHA 1926", "NFPA 241", "Diriyah HSE Standard", "ISO 19011", "Saudi Building Code", "PDPL / NCA"];
const PROGRAM_CATEGORIES = ["HSE induction", "Technical", "Emergency response", "Supervisory", "Medical", "Security", "Environmental", "Leadership"];

function pickStatus(roll: number) {
  if (roll < 0.52) return "Closed";
  if (roll < 0.74) return "In progress";
  if (roll < 0.88) return "Open";
  if (roll < 0.96) return "Pending";
  return "Overdue";
}

export function buildDataset(): Dataset {
  const rng = new Rng(SEED);

  /* ---------- projects ---------- */
  const projects: Project[] = PROJECT_DEFS.map(([name, code, phase, location], i) => ({
    id: `PRJ-${code}`,
    name,
    code,
    phase,
    status: rng.pick(["Active", "Active", "Active", "On hold", "Mobilisation"]),
    location,
    progress: rng.int(18, 88),
    manager: `${rng.pick(FIRST)} ${rng.pick(LAST)}`,
    contractorId: "",
    budget: rng.int(180, 1900) * 1_000_000,
    headcount: rng.int(220, 1450),
  }));

  /* ---------- contractors ---------- */
  const contractors: Contractor[] = CONTRACTOR_DEFS.map(([name, trade, city], i) => {
    const projectId = rng.pick(projects).id;
    return {
      id: `CON-${String(i + 1).padStart(3, "0")}`,
      name,
      crNumber: `${rng.int(1010000000, 1049999999)}`,
      trade,
      contact: `${rng.pick(FIRST)} ${rng.pick(LAST)}`,
      phone: `+966 5${rng.int(10000000, 89999999)}`,
      projectId,
      status: rng.pick(["Approved", "Approved", "Approved", "Conditional", "Suspended", "Onboarding"]),
      hseScore: rng.int(58, 97),
      rating: "",
      employees: rng.int(24, 420),
      incidents12m: rng.int(0, 9),
      approvedActivities: rng.picks(["Civil works", "Lifting", "Hot work", "Electrical", "Scaffolding", "Excavation", "Chemical handling", "Confined space", "Demolition", "Transport"], rng.int(2, 5)),
      onboarded: rng.date(2023, 900),
    };
  });
  contractors.forEach((c) => {
    c.rating = c.hseScore >= 90 ? "Excellent" : c.hseScore >= 80 ? "Good" : c.hseScore >= 70 ? "Satisfactory" : "Improvement required";
  });
  projects.forEach((p) => {
    p.contractorId = rng.pick(contractors).id;
  });

  /* ---------- employees ---------- */
  const employees: Employee[] = [];
  for (let i = 0; i < 168; i++) {
    const project = rng.pick(projects);
    const onContractor = rng.chance(0.62);
    const contractor = onContractor ? rng.pick(contractors) : undefined;
    const name = `${rng.pick(FIRST)} ${rng.pick(LAST)}`;
    employees.push({
      id: `EMP-${String(i + 1).padStart(4, "0")}`,
      name,
      jobTitle: rng.pick(["Site supervisor", "HSE advisor", "Engineer", "Foreman", "Technician", "Operator", "Clinician", "Security supervisor", "Planner", "Quantity surveyor"]),
      trade: rng.pick(TRADES),
      department: contractor ? "Contractor" : rng.pick(DEPARTMENTS),
      projectId: project.id,
      contractorId: contractor?.id,
      site: project.location,
      status: rng.pick(["Active", "Active", "Active", "On leave", "Transferred", "Exited"]),
      hireDate: rng.date(2019, 2200),
      fitness: rng.pick(["Fit", "Fit", "Fit", "Fit with restrictions", "Temporarily unfit", "Under review"]),
      nationality: rng.pick(NATIONALITIES),
      badge: `D${rng.int(100000, 999999)}`,
    });
  }
  const empByProject = (pid: string) => employees.filter((e) => e.projectId === pid);

  /* ---------- clinics ---------- */
  const CLINIC_DEFS = ["Wadi Hanifah Site Clinic", "Cultural District Clinic", "Diriyah Gate Medical Point", "West District Clinic", "Heritage Quarter Clinic", "North Infrastructure Mobile Unit"];
  const clinics = CLINIC_DEFS.map((name, i) => ({
    id: `CLI-${String(i + 1).padStart(2, "0")}`,
    name,
    site: rng.pick(SITES),
    projectId: rng.pick(projects).id,
    capacity: rng.int(6, 24),
    staff: rng.int(2, 9),
    status: rng.pick(["Operational", "Operational", "Operational", "Limited hours"]),
    hours: rng.pick(["06:00 – 22:00", "07:00 – 19:00", "24 hours", "06:00 – 14:00"]),
  }));

  /* ---------- medical visits ---------- */
  const VISIT_TYPES = ["Pre-placement", "Periodic surveillance", "Return-to-work", "Exit medical", "Clinic consultation", "Injury assessment", "Illness review", "Fitness re-assessment"];
  const ICD = [
    ["M54.5", "Low back pain", "M545"],
    ["H91.1", "Noise-induced hearing loss", "H911"],
    ["J44.9", "COPD, unspecified", "J449"],
    ["L24.9", "Contact dermatitis", "L249"],
    ["S60.2", "Contusion of wrist/hand", "S602"],
    ["T78.4", "Allergic reaction", "T784"],
    ["Z02.5", "Encounter for pre-procedural exam", "Z025"],
    ["Z73.0", "Burnout", "Z730"],
    ["J62.8", "Pneumoconiosis", "J628"],
    ["M75.1", "Rotator cuff syndrome", "M751"],
  ];
  const FINDINGS = [
    "No abnormality detected. Cleared for unrestricted duties.",
    "Mild lumbar strain. Temporary lifting restriction applied.",
    "Audiometric shift noted at 4 kHz. Referred for follow-up.",
    "Skin irritation consistent with irritant dermatitis. Barrier cream issued.",
    "Blood pressure elevated. Recheck in 14 days.",
    "Respiratory questionnaire positive. Spirometry requested.",
    "Laceration dressed; tetanus status verified.",
    "Hearing protection compliance issue identified at worksite.",
  ];
  const medicalVisits: MedicalVisit[] = [];
  for (let i = 0; i < 240; i++) {
    const emp = rng.pick(employees);
    const [code10, desc, code11] = rng.pick(ICD);
    const restricted = rng.chance(0.18);
    medicalVisits.push({
      id: `MED-${String(i + 1).padStart(5, "0")}`,
      employeeId: emp.id,
      clinicId: rng.pick(clinics).id,
      type: rng.pick(VISIT_TYPES),
      date: rng.date(2024, 640),
      provider: `${rng.pick(["Dr. Al Zahrani", "Dr. Hessa Al Mutairi", "Dr. Nasser Al Harbi", "Nurse Reem Al Ghamdi", "Dr. Tariq Al Dosari"])}`,
      icd10: code10,
      icd11: code11,
      cpt: rng.pick(["99213", "99214", "99385", "99396", "99417", "31575"]),
      findings: rng.pick(FINDINGS),
      fitness: restricted ? rng.pick(["Fit with restrictions", "Temporarily unfit"]) : rng.chance(0.86) ? "Fit" : "Under review",
      restrictions: restricted ? rng.pick(["No work at height", "No lifting > 10 kg", "No noise exposure > 85 dB", "Day shift only", "No confined space entry"]) : "",
      projectId: emp.projectId,
      status: rng.pick(["Completed", "Completed", "Completed", "Awaiting results", "Follow-up due"]),
      followUp: restricted ? addDays(rng.date(2024, 640), rng.int(14, 90)) : undefined,
      exposureLink: rng.chance(0.3) ? rng.pick(AGENTS).name : undefined,
    });
  }

  /* ---------- appointments ---------- */
  const appointments = Array.from({ length: 120 }, (_, i) => {
    const emp = rng.pick(employees);
    return {
      id: `APT-${String(i + 1).padStart(4, "0")}`,
      employeeId: emp.id,
      clinicId: rng.pick(clinics).id,
      date: rng.date(2025, 400),
      time: `${String(rng.int(7, 15)).padStart(2, "0")}:${rng.pick(["00", "15", "30", "45"])}`,
      type: rng.pick(VISIT_TYPES),
      status: rng.pick(["Scheduled", "Scheduled", "Confirmed", "Completed", "Cancelled", "No-show"]),
      practitioner: rng.pick(["Dr. Al Zahrani", "Dr. Hessa Al Mutairi", "Dr. Nasser Al Harbi", "Nurse Reem Al Ghamdi"]),
    };
  });

  /* ---------- surveillance ---------- */
  const SURV_PROGRAMS = ["Audiometric surveillance", "Respiratory surveillance", "Skin surveillance", "HAVS surveillance", "Lead surveillance", "Heat stress surveillance"];
  const surveillance = Array.from({ length: 160 }, (_, i) => {
    const emp = rng.pick(employees);
    const agent = rng.pick(AGENTS);
    const last = rng.date(2024, 520);
    return {
      id: `SUR-${String(i + 1).padStart(4, "0")}`,
      program: rng.pick(SURV_PROGRAMS),
      employeeId: emp.id,
      projectId: emp.projectId,
      lastDate: last,
      nextDue: addDays(last, rng.pick([90, 180, 365])),
      status: rng.pick(["Current", "Current", "Due soon", "Overdue"]),
      agent: agent.name,
      interval: rng.pick(["Quarterly", "6-monthly", "Annual"]),
    };
  });

  /* ---------- SEGs ---------- */
  const segments = Array.from({ length: 32 }, (_, i) => ({
    id: `SEG-${String(i + 1).padStart(3, "0")}`,
    name: `${rng.pick(["Concrete sawing", "Scaffold erection", "Steel fixing", "Welding", "Plant operation", "Excavation", "Painting", "Crane operation", "Tunnel works", "Material handling", "Road construction", "Demolition"])} ${rng.pick(["crew", "team", "group", "unit"])}`,
    projectId: rng.pick(projects).id,
    agents: rng.picks(AGENTS.map((a) => a.name), rng.int(1, 3)),
    headcount: rng.int(6, 90),
    riskLevel: rng.pick(["Low", "Medium", "Medium", "High", "Very high"]),
    samplingFreq: rng.pick(["Monthly", "Quarterly", "6-monthly", "Annual"]),
  }));

  /* ---------- exposure samples ---------- */
  const LABS = ["SGS Saudi Arabia", "Bureau Veritas", "Eurofins", "ALS Arabia", "Diriyah Site Lab"];
  const exposureSamples: ExposureSample[] = [];
  for (let i = 0; i < 420; i++) {
    const agent = rng.pick(AGENTS);
    const seg = rng.pick(segments);
    const emp = rng.pick(empByProject(seg.projectId)) ?? rng.pick(employees);
    const ratio = rng.float(0.15, 1.55, 3);
    const result = Number((agent.oel * ratio).toFixed(3));
    const exceed = result > agent.oel;
    exposureSamples.push({
      id: `EXP-${String(i + 1).padStart(5, "0")}`,
      employeeId: emp.id,
      segId: seg.id,
      projectId: seg.projectId,
      agent: agent.name,
      method: rng.pick(["NIOSH 0600", "OSHA ID-188", "ISO 7899", "Personal sampling pump", "Calibrated sound level meter", "Direct-reading instrument"]),
      date: rng.date(2024, 640),
      result,
      unit: agent.unit,
      oel: agent.oel,
      status: exceed ? (ratio > 1.3 ? "Critical exceedance" : "Exceedance") : ratio > 0.8 ? "Near limit" : "Within limit",
      lab: rng.pick(LABS),
      exceedancePct: Number((((result - agent.oel) / agent.oel) * 100).toFixed(1)),
    });
  }

  /* ---------- incidents ---------- */
  const incidents: Incident[] = [];
  for (let i = 0; i < 180; i++) {
    const project = rng.pick(projects);
    const contractor = rng.chance(0.55) ? rng.pick(contractors) : undefined;
    const emp = rng.pick(empByProject(project.id));
    const severity = rng.pick(INCIDENT_SEVERITIES);
    const type = rng.pick(INCIDENT_TYPES);
    incidents.push({
      id: `INC-${String(i + 1).padStart(5, "0")}`,
      title: `${type} — ${rng.pick(LOCATIONS)}`,
      type,
      severity,
      date: rng.date(2024, 640),
      time: `${String(rng.int(5, 21)).padStart(2, "0")}:${rng.pick(["00", "10", "20", "30", "40", "50"])}`,
      projectId: project.id,
      contractorId: contractor?.id,
      employeeId: rng.chance(0.5) ? emp?.id : undefined,
      location: rng.pick(LOCATIONS),
      status: rng.pick(["Closed", "Closed", "Investigation", "Action pending", "Reported", "Escalated"]),
      category: rng.pick(["Safety", "Health", "Security", "Environmental", "Traffic"]),
      description: `${type} raised during routine site activity at ${project.location}. Initial assessment completed and routed to the responsible supervisor for review and close-out.`,
      rootCause: rng.pick(["Inadequate hazard identification", "Procedure not followed", "PPE non-compliance", "Supervision gap", "Plant condition", "Human factors / fatigue", "Weather conditions", "Not yet determined"]),
      investigator: `${rng.pick(FIRST)} ${rng.pick(LAST)}`,
      lostTime: severity === "Critical" ? rng.chance(0.03) : rng.chance(0.004),
      rcaMethod: rng.pick(["5 Whys", "Fishbone", "TapRooT", "Barrier analysis", "Not yet started"]),
    });
  }

  /* ---------- observations ---------- */
  const observations: Observation[] = Array.from({ length: 170 }, (_, i) => {
    const project = rng.pick(projects);
    return {
      id: `OBS-${String(i + 1).padStart(4, "0")}`,
      title: `${rng.pick(["Safe practice observed", "Unsafe act", "Unsafe condition", "Positive HSE behaviour", "Housekeeping concern", "PPE compliance check", "Environmental practice"])} — ${rng.pick(LOCATIONS)}`,
      type: rng.pick(["Behaviour", "Condition", "Positive", "Housekeeping"]),
      behaviour: rng.pick(["Safe", "Unsafe", "Improvement", "Exemplary"]),
      location: rng.pick(LOCATIONS),
      projectId: project.id,
      contractorId: rng.chance(0.6) ? rng.pick(contractors).id : undefined,
      observer: `${rng.pick(FIRST)} ${rng.pick(LAST)}`,
      date: rng.date(2024, 640),
      rating: rng.pick(["Green", "Yellow", "Orange", "Red"]),
      status: rng.pick(["Closed", "Action raised", "Open", "Under review"]),
      description: "Safety observation captured during a scheduled walkdown. Behaviour and condition were reviewed against the current method statement with the area supervisor present.",
      immediateAction: rng.pick(["Crew briefed on site", "Area barricaded", "Equipment isolated", "No further action required", "Toolbox talk scheduled"]),
    };
  });

  /* ---------- inspections ---------- */
  const inspections: Inspection[] = Array.from({ length: 110 }, (_, i) => {
    const project = rng.pick(projects);
    const nc = rng.int(0, 6);
    return {
      id: `INS-${String(i + 1).padStart(4, "0")}`,
      title: `${rng.pick(["Scaffold handover", "Electrical installation", "Lifting equipment", "Temporary works", "Fire protection", "Confined space", "Site welfare", "PPE compliance", "Excavation support"])} inspection`,
      type: rng.pick(["Routine", "Handover", "Follow-up", "Ad-hoc", "Statutory"]),
      projectId: project.id,
      inspector: `${rng.pick(FIRST)} ${rng.pick(LAST)}`,
      contractorId: rng.chance(0.7) ? rng.pick(contractors).id : undefined,
      date: rng.date(2024, 640),
      score: rng.int(55, 100),
      status: rng.pick(["Closed", "Closed", "Action tracking", "Scheduled", "In progress"]),
      checklist: rng.pick(["Diriyah Scaffolding Standard", "OSHA 1926 Subpart L", "NFPA 241 checklist", "Temporary works checklist", "Site logistics checklist"]),
      items: rng.int(12, 48),
      nonConformances: nc,
      nextDue: rng.future(120),
    };
  });

  /* ---------- permits ---------- */
  const permits: Permit[] = [];
  for (let i = 0; i < 260; i++) {
    const type = rng.pick(PERMIT_TYPES);
    const project = rng.pick(projects);
    const contractor = rng.pick(contractors);
    const riskLevel = rng.pick(["Low", "Medium", "Medium", "High", "Very high"]);
    const start = rng.date(2024, 640);
    const status = rng.pick(["Closed", "Closed", "Active", "Active", "Pending approval", "Rejected", "Expired", "Suspended"]);
    permits.push({
      id: `PMT-${String(i + 1).padStart(5, "0")}`,
      number: `PTW-${rng.int(10000, 99999)}`,
      type,
      contractorId: contractor.id,
      projectId: project.id,
      location: rng.pick(LOCATIONS),
      status,
      riskLevel,
      riskScore: rng.int(4, 25),
      startDate: start,
      endDate: addDays(start, rng.int(1, 14)),
      issuer: `${rng.pick(FIRST)} ${rng.pick(LAST)}`,
      approver: `${rng.pick(FIRST)} ${rng.pick(LAST)}`,
      gasTest: type === "Confined space" || type === "Hot work" ? rng.pick(["Passed", "Passed", "Not required", "Failed — retest required"]) : "Not required",
      isolation: type === "Electrical isolation" || type === "Line breaking" ? rng.pick(["Certificate ISO-4471", "LOTO applied", "Not required"]) : "Not required",
      ppe: rng.picks(["Hard hat", "Safety boots", "Hi-vis", "Harness", "Gas detector", "Face shield", "Gloves", "Hearing protection"], rng.int(3, 6)).join(", "),
      description: `${type} permit covering works at ${project.location}. Isolation, gas testing and supervisor sign-off are completed before the activity starts on site.`,
    });
  }

  /* ---------- risks ---------- */
  const risks: Risk[] = [];
  for (let i = 0; i < 180; i++) {
    const l = rng.int(1, 5);
    const im = rng.int(1, 5);
    const score = l * im;
    risks.push({
      id: `RSK-${String(i + 1).padStart(4, "0")}`,
      title: `${rng.pick(["Crane collision with temporary works", "Silica dust exposure to SEG", "Groundwater ingress at excavation", "Permit lapse during night shift", "Contractor labour dispute", "Design change late in fit-out", "Extreme heat stress event", "Fire during hot works", "Unauthorised site access", "Schedule compression reducing supervision", "Chemical spill near wadi", "Scaffold failure in high wind"])} `,
      category: rng.pick(RISK_CATEGORIES),
      description: "Risk arising from the activity if controls are not applied as specified. Residual scoring assumes the listed treatment is implemented and verified.",
      likelihood: l,
      impact: im,
      score,
      treatment: score >= 15 ? "Reduce" : score >= 8 ? "Reduce" : score >= 4 ? "Tolerate / monitor" : "Transfer",
      owner: `${rng.pick(FIRST)} ${rng.pick(LAST)}`,
      projectId: rng.pick(projects).id,
      status: score >= 16 ? rng.pick(["Open", "Treatment in progress"]) : pickStatus(rng.next()),
      residual: Math.max(1, l * im - rng.int(1, 6)),
      strategy: rng.pick(["Engineering control", "Administrative control", "PPE", "Avoidance", "Insurance transfer", "Shared with contractor"]),
      reviewDate: rng.future(150),
    });
  }

  /* ---------- NCRs ---------- */
  const ncrs: NCR[] = Array.from({ length: 90 }, (_, i) => {
    const project = rng.pick(projects);
    return {
      id: `NCR-${String(i + 1).padStart(4, "0")}`,
      title: `${rng.pick(["Missing scaffold tag", "Unapproved hot works", "Inadequate excavation support", "Expired fire extinguisher", "PPE non-compliance", "Uncontrolled chemical storage", "Missing permits for lifting", "Incomplete daily checklist"])} `,
      source: rng.pick(["Audit", "Inspection", "Incident", "Regulatory visit", "Self-identification"]),
      sourceId: "",
      severity: rng.pick(["Minor", "Minor", "Major", "Critical"]),
      projectId: project.id,
      contractorId: rng.chance(0.7) ? rng.pick(contractors).id : undefined,
      status: rng.pick(["Closed", "Closed", "Open", "Extension requested", "Awaiting verification"]),
      raised: rng.date(2024, 640),
      dueDate: rng.date(2025, 400),
      description: "Non-conformance raised during an HSE activity. Disposition and corrective action are assigned before the finding can be closed.",
      clause: rng.pick(AUDIT_STANDARDS),
      disposition: rng.pick(["Rework", "Use as-is (concession)", "Scrap", "Repair", "Retrain crew"]),
      owner: `${rng.pick(FIRST)} ${rng.pick(LAST)}`,
    };
  });

  /* ---------- audits ---------- */
  const audits: Audit[] = Array.from({ length: 100 }, (_, i) => {
    const project = rng.pick(projects);
    const findings = rng.int(0, 12);
    const major = rng.int(0, Math.min(3, findings));
    return {
      id: `AUD-${String(i + 1).padStart(4, "0")}`,
      title: `${rng.pick(AUDIT_STANDARDS)} ${rng.pick(["internal audit", "surveillance audit", "certification audit", "compliance assessment", "desktop review"])}`,
      type: rng.pick(["Internal", "External", "Certification", "Regulatory", "Supplier"]),
      standard: rng.pick(AUDIT_STANDARDS),
      auditor: `${rng.pick(FIRST)} ${rng.pick(LAST)}`,
      projectId: project.id,
      date: rng.date(2024, 640),
      endDate: rng.date(2024, 645),
      score: rng.int(52, 99),
      status: rng.pick(["Closed", "Closed", "In progress", "Planned", "Report issued"]),
      findings,
      majorNC: major,
      minorNC: findings - major,
      scope: rng.pick(["All active projects", "Selected contractor packages", "Clinic operations", "Emergency preparedness", "Document control", "Industrial hygiene programme"]),
      nextDate: rng.future(200),
    };
  });

  /* ---------- corrective actions ---------- */
  const actions: CorrectiveAction[] = [];
  const ACTION_TITLES = [
    "Re-brief crew on permit isolation requirements",
    "Install additional local exhaust ventilation",
    "Replace damaged scaffold planks and re-tag",
    "Schedule audiometric re-test for exposed SEG",
    "Update risk assessment and re-issue to supervisors",
    "Complete overdue scaffolding handover inspection",
    "Provide supplementary hearing protection",
    "Repair bunding around chemical store",
    "Re-train operators on lifting exclusion zones",
    "Deploy additional spotter for reversing plant",
    "Revise emergency evacuation muster point signage",
    "Close out outstanding gas test records",
    "Replace non-compliant temporary power distribution",
    "Implement daily housekeeping inspection routine",
    "Submit revised method statement for approval",
  ];
  for (let i = 0; i < 320; i++) {
    const src = rng.pick(incidents);
    const project = projects.find((p) => p.id === src.projectId)!;
    const contractor = rng.chance(0.5) ? rng.pick(contractors) : undefined;
    const due = rng.date(2024, 700);
    const status = pickStatus(rng.next());
    actions.push({
      id: `ACT-${String(i + 1).padStart(5, "0")}`,
      sourceType: rng.pick(["Incident", "Audit", "NCR", "Inspection", "Observation", "Risk treatment"]),
      sourceId: rng.pick(incidents).id,
      title: rng.pick(ACTION_TITLES),
      description: "Corrective action generated from an OHSS activity. The owner is accountable for delivery by the due date and for providing evidence of completion.",
      owner: `${rng.pick(FIRST)} ${rng.pick(LAST)}`,
      ownerRole: rng.pick(["Site engineer", "HSE manager", "Contractor supervisor", "Clinic lead", "Security manager", "Project manager"]),
      dueDate: due,
      status,
      priority: rng.pick(["Low", "Medium", "High", "Critical"]),
      projectId: project.id,
      contractorId: contractor?.id,
      verified: status === "Closed" && rng.chance(0.8),
    });
  }

  /* ---------- training ---------- */
  const PROGRAM_DEFS: Array<[string, string, number, number]> = [
    ["HSE Induction — Diriyah Gate", "HSE induction", 4, 12],
    ["Working at Height (Awareness)", "Technical", 1, 24],
    ["Scaffold Inspection Competence", "Technical", 3, 36],
    ["Confined Space Entry & Rescue", "Emergency response", 2, 12],
    ["Hot Work Control & Fire Watch", "HSE induction", 2, 12],
    ["Excavation & Trenching Safety", "Technical", 2, 24],
    ["Lifting Operations & Slinger Signaller", "Technical", 3, 36],
    ["Manual Handling & Ergonomics", "HSE induction", 1, 24],
    ["First Aid at Work (Level 2)", "Medical", 3, 24],
    ["Fire Warden & Emergency Marshal", "Emergency response", 2, 12],
    ["Silica Awareness & Control", "Environmental", 1, 12],
    ["Chemical Handling & GHS Labelling", "Environmental", 2, 24],
    ["Defensive Driving", "Security", 1, 24],
    ["Security Awareness for All Staff", "Security", 1, 12],
    ["Heat Stress Prevention", "HSE induction", 1, 12],
    ["Supervising for Safety", "Supervisory", 5, 36],
    ["Incident Investigation Fundamentals", "Leadership", 3, 36],
    ["Risk Assessment Practitioner", "Leadership", 5, 36],
    ["ISO 45001 Lead Auditor", "Leadership", 5, 36],
    ["Occupational Health Technician Update", "Medical", 2, 12],
    ["Emergency Response Team Drill Briefing", "Emergency response", 2, 12],
    ["Business Continuity Awareness", "Leadership", 1, 24],
    ["PDPL & Information Security Awareness", "Leadership", 1, 12],
    ["Environmental Spill Response", "Environmental", 2, 12],
  ];
  const programs: TrainingProgram[] = PROGRAM_DEFS.map(([name, category, duration, validity], i) => {
    const max = rng.int(12, 40);
    return {
      id: `TRP-${String(i + 1).padStart(3, "0")}`,
      code: `DT-${String(i + 101)}`,
      name,
      category,
      type: rng.pick(["Classroom", "Blended", "e-Learning", "Practical", "On-the-job"]),
      duration,
      provider: rng.pick(["Diriyah HSE Academy", "NEBOSH approved centre", "Saudi Red Crescent", "External specialist", "In-house trainer"]),
      maxSeats: max,
      enrolled: rng.int(4, max),
      validityMonths: validity,
      status: rng.pick(["Active", "Active", "Active", "Under review", "Retired"]),
      mandatory: category === "HSE induction" || rng.chance(0.35),
      passScore: rng.pick([60, 70, 75, 80]),
      cost: rng.int(2, 45) * 500,
    };
  });
  const instructors: Instructor[] = Array.from({ length: 20 }, (_, i) => ({
    id: `INS-${String(i + 1).padStart(3, "0")}`,
    name: `${rng.pick(FIRST)} ${rng.pick(LAST)}`,
    specialty: rng.pick(PROGRAM_CATEGORIES),
    provider: rng.pick(["Diriyah HSE Academy", "NEBOSH approved centre", "External specialist", "In-house trainer"]),
    rating: rng.float(3.2, 5, 1),
    sessions: rng.int(12, 240),
    status: rng.pick(["Active", "Active", "On leave", "Inactive"]),
    languages: rng.pick(["English", "Arabic", "English, Arabic", "English, Hindi, Arabic"]),
    accreditation: rng.pick(["NEBOSH IGC", "ISO 45001 Lead Auditor", "Certified First Aid Trainer", "Fire Warden Trainer", "IOSH Managing Safely", "None"]),
  }));
  const trainees: Trainee[] = Array.from({ length: 280 }, (_, i) => {
    const emp = rng.pick(employees);
    const prog = rng.pick(programs);
    const done = rng.date(2024, 640);
    return {
      id: `TRN-${String(i + 1).padStart(5, "0")}`,
      employeeId: emp.id,
      programId: prog.id,
      completionDate: done,
      expiryDate: addDays(done, prog.validityMonths * 30),
      score: rng.int(48, 100),
      status: rng.chance(0.86) ? "Completed" : rng.chance(0.5) ? "Registered" : "No-show",
      attendance: rng.pick(["Present", "Present", "Present", "Partial", "Absent"]),
      certificateNo: `CERT-${rng.int(100000, 999999)}`,
      instructorId: rng.pick(instructors).id,
    };
  });

  /* ---------- emergency ---------- */
  const drills: Drill[] = Array.from({ length: 60 }, (_, i) => {
    const project = rng.pick(projects);
    return {
      id: `DRL-${String(i + 1).padStart(4, "0")}`,
      name: `${rng.pick(["Fire evacuation", "Medical emergency", "Chemical spill", "Confined space rescue", "Crane incident", "Bomb threat", "Earthquake", "Crowd evacuation"])} drill`,
      type: rng.pick(["Unannounced", "Announced", "Tabletop", "Full-scale", "Functional"]),
      scenario: "Multi-agency response exercise covering evacuation, assembly and accountability across the Diriyah works.",
      date: rng.date(2024, 640),
      site: project.location,
      projectId: project.id,
      result: rng.pick(["Satisfactory", "Satisfactory", "Needs improvement", "Excellent", "Unsatisfactory"]),
      score: rng.int(45, 98),
      status: rng.pick(["Closed", "Closed", "Planned", "In progress"]),
      participants: rng.int(18, 320),
      durationMin: rng.int(20, 180),
      evaluator: `${rng.pick(FIRST)} ${rng.pick(LAST)}`,
      lessons: rng.pick([
        "Muster point signage requires additional lighting.",
        "Response times within target for all teams.",
        "Communication with external agencies should be rehearsed.",
        "Some contractors unaware of secondary assembly point.",
        "Rescue team equipment inventory needs updating.",
      ]),
    };
  });

  const PLANS_DEFS: Array<[string, string, string]> = [
    ["Fire & Explosion Emergency Plan", "Emergency", "Site-wide"],
    ["Medical Emergency Response Plan", "Emergency", "Clinic"],
    ["Chemical Spill Response Plan", "Emergency", "Environmental"],
    ["Severe Weather & Heat Plan", "Emergency", "Site-wide"],
    ["Security Incident & Lockdown Plan", "Security", "Access control"],
    ["Crane & Lifting Emergency Plan", "Emergency", "Lifting"],
    ["Business Continuity Plan — Core Operations", "Continuity", "Corporate"],
    ["IT & Cyber Incident Continuity Plan", "Continuity", "Corporate"],
    ["Clinic Service Continuity Plan", "Continuity", "Health"],
    ["Construction Programme Continuity Plan", "Continuity", "Delivery"],
    ["Crisis Communication Plan", "Crisis", "Corporate"],
    ["Pandemic Response Plan", "Emergency", "Corporate"],
    ["Evacuation & Assembly Plan", "Emergency", "Site-wide"],
    ["Marine / Wadi Incident Plan", "Emergency", "Environmental"],
    ["Temporary Displacement Plan", "Crisis", "Welfare"],
    ["Mutual Aid & External Assistance Plan", "Crisis", "Corporate"],
  ];
  const plans = PLANS_DEFS.map(([name, type, category], i) => ({
    id: `PLN-${String(i + 1).padStart(3, "0")}`,
    name,
    type,
    category,
    version: `v${rng.int(1, 5)}.${rng.int(0, 9)}`,
    status: rng.pick(["Approved", "Approved", "In review", "Draft", "Under revision"]),
    owner: `${rng.pick(FIRST)} ${rng.pick(LAST)}`,
    approvedDate: rng.date(2023, 900),
    reviewDate: rng.future(150),
    pages: rng.int(8, 120),
    callsign: rng.pick(["FALCON", "TALON", "SANDSTORM", "OASIS", "HERITAGE", "WADI"]),
    summary: "Approved plan covering response arrangements, roles, communications and recovery steps for the relevant function.",
  }));

  /* ---------- BCM ---------- */
  const FUNCTION_DEFS: Array<[string, string, number, number]> = [
    ["Site HSE supervision", "Day-to-day safety management", 4, 2],
    ["Emergency medical response", "On-site clinic services", 2, 1],
    ["Security & access control", "Perimeter and gate operations", 2, 1],
    ["Lifting operations", "Planned and unplanned lifts", 8, 4],
    ["Utilities — power & water", "Temporary services", 12, 6],
    ["Construction programme control", "Planning and progress", 24, 12],
    ["Contractor payment", "Commercial cycle", 72, 24],
    ["Document control", "Controlled drawings and records", 24, 8],
    ["Environmental monitoring", "Emissions and discharge", 24, 12],
    ["Incident investigation", "Investigation and reporting", 24, 12],
    ["Training delivery", "Mandatory training", 168, 48],
    ["IT & communications", "Network and devices", 4, 2],
    ["Logistics & materials", "Delivery coordination", 24, 12],
    ["Design coordination", "RFIs and submittals", 72, 24],
    ["Quality assurance", "Inspections and tests", 48, 24],
    ["Waste management", "Collection and disposal", 24, 12],
    ["Traffic management", "Access and road closures", 4, 2],
    ["Payroll & timekeeping", "Workforce records", 48, 24],
    ["Security intelligence", "Threat monitoring", 8, 4],
    ["Stakeholder communication", "Reporting and briefings", 48, 24],
  ];
  const bias: BIA[] = FUNCTION_DEFS.map(([fn, process, rto, rpo], i) => ({
    id: `BIA-${String(i + 1).padStart(3, "0")}`,
    businessFunction: fn,
    process,
    rtoHours: rto,
    rpoHours: rpo,
    financialImpact: rng.int(2, 480) * 10000,
    operationalImpact: rng.pick(["High", "High", "Critical", "Moderate", "Low"]),
    criticality: rto <= 4 ? "Tier 1" : rto <= 24 ? "Tier 2" : rto <= 72 ? "Tier 3" : "Tier 4",
    owner: `${rng.pick(FIRST)} ${rng.pick(LAST)}`,
    status: rng.pick(["Approved", "Approved", "In progress", "Draft", "Review due"]),
    dependencies: rng.picks(["IT network", "Temporary power", "Clinic staffing", "Contractor availability", "Transport", "Security systems", "Vendor supply chain", "Telecom"], rng.int(2, 4)),
    strategy: rng.pick(["Redundant staffing", "Alternate site", "Manual workaround", "Mutual aid agreement", "Insurance", "Prioritised recovery"]),
  }));

  /* ---------- compliance ---------- */
  const POLICY_DEFS: Array<[string, string]> = [
    ["HSE Policy", "HSE"],
    ["Occupational Health Policy", "Health"],
    ["Environmental & Sustainability Policy", "Environmental"],
    ["Security Management Policy", "Security"],
    ["Emergency Preparedness Policy", "Emergency"],
    ["Business Continuity Policy", "Continuity"],
    ["Contractor HSE Management Standard", "Contractor"],
    ["Permit to Work Procedure", "Control of work"],
    ["Incident Management Procedure", "Incident"],
    ["Risk Management Framework", "Risk"],
    ["Training & Competency Standard", "Training"],
    ["Document & Records Control Procedure", "Governance"],
    ["Internal Audit Procedure", "Audit"],
    ["Non-Conformance & Corrective Action Procedure", "Audit"],
    ["Data Protection & Privacy Notice", "Governance"],
    ["Information Security Policy", "Governance"],
    ["Chemical Management Procedure", "Environmental"],
    ["Heat Stress Management Standard", "Health"],
    ["Working at Height Procedure", "Control of work"],
    ["Confined Space Entry Procedure", "Control of work"],
    ["Manual Handling Assessment Standard", "Health"],
    ["PPE Management Standard", "Control of work"],
    ["Site Traffic Management Plan", "Security"],
    ["Waste Management Procedure", "Environmental"],
    ["Noise & Hearing Conservation Programme", "Health"],
    ["Respirable Dust Control Programme", "Health"],
    ["Fatigue Management Standard", "Health"],
    ["Security Incident Reporting Procedure", "Security"],
    ["Emergency Drill & Exercise Policy", "Emergency"],
    ["Supplier HSE Prequalification Standard", "Contractor"],
  ];
  const policies: Policy[] = POLICY_DEFS.map(([title, category], i) => {
    const approved = rng.date(2023, 900);
    return {
      id: `POL-${String(i + 1).padStart(3, "0")}`,
      title,
      number: `DH-${category.slice(0, 3).toUpperCase()}-${String(i + 1).padStart(3, "0")}`,
      category,
      version: `v${rng.int(1, 6)}.${rng.int(0, 4)}`,
      status: rng.pick(["Approved", "Approved", "Approved", "In review", "Draft", "Superseded"]),
      owner: `${rng.pick(FIRST)} ${rng.pick(LAST)}`,
      approvedDate: approved,
      reviewDate: rng.future(150),
      nextReview: rng.future(300),
      appliesTo: rng.pick(["All Diriyah projects", "All employees & contractors", "Corporate functions", "Site operations"]),
      clauses: rng.int(6, 48),
    };
  });

  /* ---------- documents ---------- */
  const DOC_CATEGORIES = ["Procedure", "Standard", "Form", "Method statement", "Risk assessment", "Report", "Certificate", "Drawing", "Minutes", "Plan"];
  const documents: DocumentRec[] = Array.from({ length: 220 }, (_, i) => {
    const project = rng.pick(projects);
    const category = rng.pick(DOC_CATEGORIES);
    return {
      id: `DOC-${String(i + 1).padStart(5, "0")}`,
      name: `${rng.pick(["HSE", "Safety", "Medical", "Environmental", "Security", "Training", "Audit", "Permit", "Emergency", "Quality"])} ${category} — ${rng.pick(["Zone A", "Boulevard", "Cultural District", "Wadi Hanifah", "West District", "Heritage Quarter"])} Rev ${rng.int(1, 9)}`,
      category,
      subcategory: rng.pick(PROGRAM_CATEGORIES),
      version: `v${rng.int(0, 6)}.${rng.int(0, 9)}`,
      projectId: project.id,
      uploadedBy: `${rng.pick(FIRST)} ${rng.pick(LAST)}`,
      date: rng.date(2024, 640),
      status: rng.pick(["Approved", "Approved", "In review", "Draft", "Superseded", "Restricted"]),
      size: `${rng.int(120, 9400)} KB`,
      type: rng.pick(["PDF", "PDF", "XLSX", "DOCX", "DWG", "JPG"]),
      restricted: rng.chance(0.12),
      linkedId: rng.chance(0.3) ? rng.pick(incidents).id : undefined,
    };
  });

  /* ---------- integrations ---------- */
  const INTEGRATION_DEFS: Array<[string, string, string]> = [
    ["SAP S/4HANA", "ERP", "Bidirectional"],
    ["Oracle Aconex", "Document control", "Inbound"],
    ["Oracle Primavera Unifier", "Commercial", "Bidirectional"],
    ["IBM Maximo", "Asset management", "Outbound"],
    ["ServiceNow", "ITSM & tickets", "Bidirectional"],
    ["Esri ArcGIS", "Geospatial", "Inbound"],
    ["EMS Dispatch", "Emergency services", "Outbound"],
    ["Vesa Security Platform", "Access control", "Inbound"],
    ["SAP SuccessFactors", "HR master data", "Inbound"],
    ["Power BI", "Analytics", "Outbound"],
    ["Microsoft Fabric", "Analytics", "Outbound"],
    ["Microsoft Entra ID", "Identity", "Inbound"],
    ["DocuSign", "e-Signature", "Bidirectional"],
    ["Panasonic i-PRO", "Video surveillance", "Inbound"],
    ["HikCentral", "Video surveillance", "Inbound"],
    ["Weather Service API", "Environmental", "Inbound"],
    ["Honeywell Gas Detection", "Industrial hygiene", "Inbound"],
    ["Trimble LMS", "Lifting management", "Bidirectional"],
    ["Construction Intelligence Cloud", "Risk", "Inbound"],
    ["DocuSign CLM", "Contract lifecycle", "Inbound"],
    ["Twilio SMS", "Notifications", "Outbound"],
    ["Microsoft Exchange", "Email", "Outbound"],
    ["Enterprise Risk Register (Logicall)", "Risk", "Inbound"],
    ["Medgate Occupational Health", "Clinical", "Inbound"],
    ["SAP Concur", "Travel & expense", "Outbound"],
    ["Milestone XProtect", "Video", "Inbound"],
    ["Bentley iTwin", "Digital twin", "Inbound"],
    ["SharePoint Online", "Documents", "Bidirectional"],
  ];
  const integrations: Integration[] = INTEGRATION_DEFS.map(([name, category, direction], i) => ({
    id: `INT-${String(i + 1).padStart(3, "0")}`,
    name,
    category,
    status: rng.pick(["Connected", "Connected", "Connected", "Degraded", "Maintenance", "Disconnected"]),
    direction,
    protocol: rng.pick(["REST / OAuth 2.0", "SOAP", "SFTP", "SFTP", "Event webhook", "Database link"]),
    lastSync: rng.dateTime(2025, 400),
    latencyMs: rng.int(40, 2400),
    records24h: rng.int(0, 42000),
    errorRate: rng.float(0, 3.4, 2),
    owner: `${rng.pick(FIRST)} ${rng.pick(LAST)}`,
    environment: rng.pick(["Production", "Production", "UAT", "Sandbox"]),
  }));

  /* ---------- tickets ---------- */
  const TICKET_SUBJECTS = [
    "Unable to submit permit from mobile device",
    "Medical record attachment fails to upload",
    "Bi-weekly SAP sync delay",
    "Request additional licence for new supervisor",
    "Dashboard KPI mismatch with report",
    "Password reset for contractor account",
    "ServiceNow connector authentication error",
    "Request new custom field on incident form",
    "Slow response on audit checklist page",
    "Bulk CSV import validation failure",
    "Email notifications not received",
    "Request read-only role for executive user",
  ];
  const tickets: Ticket[] = Array.from({ length: 160 }, (_, i) => {
    const elapsed = rng.int(1, 240);
    return {
      id: `TKT-${String(i + 1).padStart(5, "0")}`,
      subject: rng.pick(TICKET_SUBJECTS),
      category: rng.pick(["Application support", "Access & identity", "Data & integration", "Licensing", "How-to", "Incident"]),
      priority: rng.pick(["P1", "P2", "P3", "P3", "P4"]),
      status: rng.pick(["Closed", "Closed", "Resolved", "In progress", "Awaiting requester", "Open", "Escalated"]),
      requester: `${rng.pick(FIRST)} ${rng.pick(LAST)}`,
      assignee: `${rng.pick(FIRST)} ${rng.pick(LAST)}`,
      team: rng.pick(["L1 Service Desk", "L2 Application Support", "L3 Engineering", "L4 Vendor"]),
      slaHours: rng.pick([4, 8, 24, 72]),
      elapsedHours: elapsed,
      created: rng.dateTime(2025, 380),
      updated: rng.dateTime(2025, 380),
      channel: rng.pick(["Portal", "Email", "Phone", "Teams", "Walk-in"]),
      satisfaction: rng.chance(0.7) ? rng.int(3, 5) : 0,
    };
  });

  /* ---------- security ---------- */
  const visitors: Visitor[] = Array.from({ length: 200 }, (_, i) => {
    const project = rng.pick(projects);
    const inT = `${rng.date(2025, 400)}T${String(rng.int(6, 18)).padStart(2, "0")}:${rng.pick(["00", "15", "30", "45"])}`;
    return {
      id: `VIS-${String(i + 1).padStart(5, "0")}`,
      name: `${rng.pick(FIRST)} ${rng.pick(LAST)}`,
      company: rng.pick([...CONTRACTOR_DEFS.map((c) => c[0]), "Diriyah Company", "Consultant — Dar Al-Handasah", "Client representative", "Government visitor"]),
      host: `${rng.pick(FIRST)} ${rng.pick(LAST)}`,
      projectId: project.id,
      checkIn: inT,
      checkOut: rng.chance(0.75) ? `${rng.date(2025, 400)}T${String(rng.int(12, 21)).padStart(2, "0")}:${rng.pick(["00", "15", "30", "45"])}` : "",
      badge: `B${rng.int(1000, 9999)}`,
      status: rng.pick(["On site", "Checked out", "Pre-registered", "Refused entry"]),
      gate: rng.pick(["Gate 1", "Gate 2", "Gate 3", "Gate 4", "Clinic entrance"]),
      purpose: rng.pick(["Meeting", "Inspection", "Delivery", "Interview", "Maintenance", "Audit", "Tour"]),
      vehicle: rng.chance(0.4) ? `RUH ${rng.int(1000, 9999)}` : "Walk-in",
    };
  });

  const patrols: Patrol[] = Array.from({ length: 80 }, (_, i) => {
    const project = rng.pick(projects);
    const cp = rng.int(8, 32);
    return {
      id: `PTL-${String(i + 1).padStart(4, "0")}`,
      officer: `${rng.pick(FIRST)} ${rng.pick(LAST)}`,
      route: rng.pick(["Perimeter circuit", "Inner ring", "Clinic & welfare", "Plant yard", "Material storage", "Access gates", "Night patrol A"]),
      projectId: project.id,
      zone: rng.pick(["Zone A", "Zone B", "Zone C", "North", "South", "East", "West"]),
      start: `${rng.date(2025, 400)}T${String(rng.int(0, 22)).padStart(2, "0")}:00`,
      end: `${rng.date(2025, 400)}T${String(rng.int(0, 23)).padStart(2, "0")}:00`,
      checkpoints: cp,
      completed: rng.int(0, cp),
      status: rng.pick(["Completed", "Completed", "In progress", "Scheduled", "Interrupted"]),
      exceptions: rng.int(0, 4),
      vehicle: rng.pick(["Security 01", "Security 02", "Security 03", "On foot"]),
      handover: rng.pick(["Standard handover", "Issues escalated", "Relieved early", ""]),
    };
  });

  const trafficViolations = Array.from({ length: 70 }, (_, i) => ({
    id: `TV-${String(i + 1).padStart(4, "0")}`,
    plate: `RUH ${rng.int(1000, 9999)}`,
    driver: `${rng.pick(FIRST)} ${rng.pick(LAST)}`,
    violation: rng.pick(["Speeding on site", "Reversing without banksman", "No seatbelt", "Unauthorized entry", "Unsafe parking", "Mobile phone use"]),
    location: rng.pick(LOCATIONS),
    date: rng.dateTime(2025, 400),
    fine: rng.pick([0, 200, 500, 1000]),
    status: rng.pick(["Closed", "Open", "Appealed", "Escalated"]),
    contractorId: rng.pick(contractors).id,
  }));

  /* ---------- environment ---------- */
  const CHEMICAL_DEFS: Array<[string, string, string]> = [
    ["Diesel fuel", "68334-30-5", "Flammable liquid"],
    ["Hydraulic oil ISO 68", "64742-65-0", "Combustible"],
    ["Sodium hypochlorite", "7681-52-9", "Corrosive"],
    ["Cement (bulk)", "65997-15-1", "Irritant"],
    ["Epoxy resin hardener", "28064-10-4", "Corrosive / sensitiser"],
    ["Thinners & solvents", "1330-20-7", "Flammable liquid"],
    ["Silica (crystalline)", "14808-60-7", "Carcinogen"],
    ["Lead-acid batteries", "7439-92-1", "Toxic / corrosive"],
    ["Paint — water based", "—", "Irritant"],
    ["Welding rods (cellulose)", "—", "Hazardous"],
    ["Antifreeze (ethylene glycol)", "107-21-1", "Toxic"],
    ["AdBlue / DEF", "3164-33-0", "Non-hazardous"],
    ["Formwork release agent", "—", "Combustible"],
    ["Bitumen", "8052-42-0", "Combustible"],
    ["Acetylene", "74-86-2", "Flammable gas"],
    ["Oxygen", "7782-44-7", "Oxidiser"],
    ["LPG", "74-98-6", "Flammable gas"],
    ["Asphalt emulsion", "8052-42-0", "Combustible"],
    ["Polyethylene sheeting", "—", "Non-hazardous"],
    ["Bleach (industrial)", "7681-52-9", "Corrosive"],
  ];
  const chemicals: Chemical[] = Array.from({ length: 70 }, (_, i) => {
    const [name, cas, hazardClass] = rng.pick(CHEMICAL_DEFS);
    return {
      id: `CHM-${String(i + 1).padStart(4, "0")}`,
      name,
      cas,
      quantity: rng.int(5, 2400),
      unit: rng.pick(["L", "kg", "drum", "cylinder", "m³"]),
      hazardClass,
      storage: rng.pick(["Chemical store A", "Chemical store B", "Plant yard", "Welfare unit", "Mobile dispensing unit", "Secured container"]),
      projectId: rng.pick(projects).id,
      supplier: rng.pick(["Sabic Polymers KSA", "Al Mashreq Trading", "National Industrial Gas", "Local supplier", "Direct import"]),
      sds: `SDS-${String(rng.int(100, 999))}`,
      status: rng.pick(["In stock", "In stock", "Low stock", "Quarantined", "Disposed", "On order"]),
      expiry: rng.future(400),
    };
  });

  const ENV_METRICS = ["Site water consumption", "Potable water use", "Wastewater discharge volume", "Generator CO₂ emissions", "Diesel consumption", "Waste to landfill", "Waste recycled", "Dust (PM10) index", "Noise level (boundary)", "Carbon intensity per m²"];
  const environmental: Environmental[] = [];
  for (let p of projects) {
    for (const metric of ENV_METRICS) {
      for (let m = 0; m < 12; m++) {
        const target = rng.int(40, 900);
        const value = Number((target * rng.float(0.72, 1.28, 3)).toFixed(1));
        environmental.push({
          id: `ENV-${p.code}-${m}-${metric.slice(0, 3)}`.replace(/\s+/g, ""),
          metric,
          unit: metric.includes("CO₂") ? "tCO₂e" : metric.includes("waste") ? "tonnes" : metric.includes("Noise") ? "dB(A)" : metric.includes("Dust") ? "µg/m³" : "m³",
          month: `2025-${String(m + 1).padStart(2, "0")}`,
          value,
          target,
          projectId: p.id,
          status: value <= target ? "On target" : value <= target * 1.12 ? "Watch" : "Off target",
          source: rng.pick(["Site meters", "Utility invoices", "Laboratory report", "Supplier delivery notes", "Monitoring station"]),
          variancePct: Number((((value - target) / target) * 100).toFixed(1)),
        });
      }
    }
  }

  /* ---------- road closures ---------- */
  const roadClosures: RoadClosure[] = Array.from({ length: 48 }, (_, i) => {
    const start = rng.date(2025, 400);
    return {
      id: `RC-${String(i + 1).padStart(4, "0")}`,
      location: rng.pick(["Boulevard Segment 3", "Wadi Hanifah bridge approach", "North access road", "Heritage Quarter lane 2", "Gate 4 approach", "Service road — West District", "King Salman Blvd junction"]),
      reason: rng.pick(["Lifting operation", "Excavation crossing", "Concrete pour logistics", "Utility tie-in", "Event traffic management", "Road resurfacing"]),
      start: `${start}T${String(rng.int(5, 9)).padStart(2, "0")}:00`,
      end: `${addDays(start, rng.int(0, 5))}T${String(rng.int(14, 20)).padStart(2, "0")}:00`,
      status: rng.pick(["Closed", "Closed", "Planned", "Active", "Cancelled"]),
      projectId: rng.pick(projects).id,
      detour: rng.pick(["Via Al Bujairi Rd", "Via Diriyah Gate access", "Local diversion — signed", "No diversion required"]),
      lanes: rng.pick(["1 lane", "2 lanes", "Full closure", "Half width"]),
      approver: `${rng.pick(FIRST)} ${rng.pick(LAST)}`,
      lat: 24.44 + rng.float(0, 0.12, 4),
      lng: 46.55 + rng.float(0, 0.12, 4),
    };
  });

  /* ---------- approvals ---------- */
  const approvals: { id: string; title: string; type: string; reference: string; requester: string; approver: string; stage: string; status: string; submitted: string; decisionDate: string; comments: string; priority: string; riskIfDelayed: string }[] = Array.from({ length: 110 }, (_, i) => {
    const status = rng.pick(["Pending", "Pending", "Approved", "Rejected", "Returned", "Escalated"]);
    const submitted = rng.dateTime(2025, 400);
    return {
      id: `APR-${String(i + 1).padStart(5, "0")}`,
      title: `${rng.pick(["High-risk permit", "Corrective action extension", "New contractor onboarding", "Training budget", "Risk treatment plan", "Policy revision", "Audit report release", "Emergency plan revision", "Purchase of PPE", "Work suspension"])} approval`,
      type: rng.pick(["Permit", "Action", "Contractor", "Policy", "Budget", "Plan", "Report", "Procurement"]),
      reference: rng.pick(permits).number,
      requester: `${rng.pick(FIRST)} ${rng.pick(LAST)}`,
      approver: `${rng.pick(FIRST)} ${rng.pick(LAST)}`,
      stage: rng.pick(["Line manager", "HSE manager", "Project director", "OHSS director", "Executive committee"]),
      status,
      submitted,
      decisionDate: status === "Pending" ? "" : rng.dateTime(2025, 400),
      comments: status === "Pending" ? "" : rng.pick(["Approved with conditions.", "Please attach supporting evidence first.", "Rejected — insufficient control measures.", "Escalated for executive review.", "No comment."]),
      priority: rng.pick(["Low", "Medium", "High", "Critical"]),
      riskIfDelayed: rng.pick(["Work stoppage", "Programme delay", "Compliance breach", "Cost impact", "Limited"]),
    };
  });

  /* ---------- notifications ---------- */
  const notifications = Array.from({ length: 40 }, (_, i) => ({
    id: `NTF-${String(i + 1).padStart(4, "0")}`,
    title: rng.pick(["Permit expiring soon", "Corrective action overdue", "New incident reported", "Audit scheduled", "Training certification expiring", "Integration degraded", "Policy review due", "Visitor pre-registered", "Drill completed", "SLA breached"]),
    body: "A record assigned to you has changed status and now requires your review or decision.",
    type: rng.pick(["Alert", "Reminder", "Approval", "System", "Digest"]),
    severity: rng.pick(["Info", "Warning", "Critical", "Success"]),
    createdAt: rng.dateTime(2025, 400),
    read: rng.chance(0.4),
    audience: rng.pick(["All HSE staff", "Project managers", "Contractors", "Clinic team", "Security team"]),
    reference: rng.chance(0.5) ? rng.pick(incidents).id : rng.pick(permits).number,
  }));

  /* ---------- activities ---------- */
  const activities = Array.from({ length: 160 }, (_, i) => ({
    id: `ACTV-${String(i + 1).padStart(4, "0")}`,
    ref: rng.pick(incidents).id,
    text: rng.pick([
      "Record created and submitted for review",
      "Corrective action assigned to contractor supervisor",
      "Investigation report uploaded",
      "Approval stage advanced to project director",
      "Status changed to closed following verification",
      "Comment added by safety officer",
      "Attachment added — site photograph",
      "Due date extended with justification",
      "Escalated to OHSS director",
      "Linked record association updated",
    ]),
    actor: `${rng.pick(FIRST)} ${rng.pick(LAST)}`,
    at: rng.dateTime(2025, 400),
    kind: rng.pick(["create", "update", "approve", "comment", "attach", "escalate"]),
    projectId: rng.pick(projects).id,
  }));

  return {
    projects,
    employees,
    contractors,
    clinics,
    medicalVisits,
    appointments,
    surveillance,
    exposureSamples,
    segments,
    incidents,
    actions,
    permits,
    risks,
    audits,
    ncrs,
    programs,
    trainees,
    instructors,
    drills,
    bias,
    policies,
    documents,
    integrations,
    tickets,
    visitors,
    roadClosures,
    chemicals,
    environmental,
    observations,
    inspections,
    patrols,
    plans,
    approvals,
    notifications,
    activities,
  };
}

export const SEED_DATASET = buildDataset();
