export type ModuleId =
  | "dashboard"
  | "occupational-health"
  | "industrial-hygiene"
  | "construction-safety"
  | "security"
  | "incidents"
  | "risk-permits"
  | "contractors"
  | "emergency"
  | "business-continuity"
  | "compliance"
  | "audits"
  | "training"
  | "environment"
  | "documents"
  | "reporting"
  | "administration"
  | "integrations"
  | "support";

export type ScreenKind =
  | "dashboard"
  | "workspace"
  | "table"
  | "detail"
  | "form"
  | "approval"
  | "workflow"
  | "calendar"
  | "map"
  | "analytics"
  | "builder"
  | "scorecard"
  | "viewer";

export type ScreenFeature =
  | "search"
  | "filters"
  | "advanced"
  | "export"
  | "create"
  | "edit"
  | "delete"
  | "pagination"
  | "status"
  | "timeline"
  | "attachments"
  | "approval"
  | "workflow"
  | "chart"
  | "map"
  | "calendar"
  | "upload"
  | "steps"
  | "compare"
  | "schedule"
  | "restricted"
  | "simulate"
  | "qr";

export type EntityId =
  | "projects"
  | "employees"
  | "contractors"
  | "clinics"
  | "medicalVisits"
  | "appointments"
  | "surveillance"
  | "exposureSamples"
  | "segments"
  | "incidents"
  | "actions"
  | "permits"
  | "risks"
  | "audits"
  | "ncrs"
  | "programs"
  | "trainees"
  | "instructors"
  | "drills"
  | "bias"
  | "policies"
  | "documents"
  | "integrations"
  | "tickets"
  | "visitors"
  | "roadClosures"
  | "chemicals"
  | "environmental"
  | "approvals"
  | "observations"
  | "inspections"
  | "patrols"
  | "plans"
  | "messages"
  | "notifications"
  | "activities"
  | "none";

export interface ScreenDef {
  id: number;
  path: string;
  module: ModuleId;
  title: string;
  titleAr: string;
  kind: ScreenKind;
  entity: EntityId;
  icon: string;
  features: ScreenFeature[];
  columns?: string[];
  kpis?: string[];
  chart?: "line" | "bar" | "area" | "donut" | "radar" | "stacked" | "composed" | "scatter";
  statuses?: readonly string[];
  approvalStages?: string[];
  restricted?: boolean;
  scopeNote?: string;
  companion?: "activity" | "quicklinks" | "related" | "none";
  layout?: "default" | "wide" | "focus" | "split";
}

export interface Project {
  id: string;
  name: string;
  code: string;
  phase: string;
  status: string;
  location: string;
  progress: number;
  manager: string;
  contractorId: string;
  budget: number;
  headcount: number;
}

export interface Employee {
  id: string;
  name: string;
  jobTitle: string;
  trade: string;
  department: string;
  projectId: string;
  contractorId?: string;
  site: string;
  status: string;
  hireDate: string;
  fitness: string;
  nationality: string;
  badge: string;
}

export interface Contractor {
  id: string;
  name: string;
  crNumber: string;
  trade: string;
  contact: string;
  phone: string;
  projectId: string;
  status: string;
  hseScore: number;
  rating: string;
  employees: number;
  incidents12m: number;
  approvedActivities: string[];
  onboarded: string;
}

export interface MedicalVisit {
  id: string;
  employeeId: string;
  clinicId: string;
  type: string;
  date: string;
  provider: string;
  icd10: string;
  icd11: string;
  cpt: string;
  findings: string;
  fitness: string;
  restrictions: string;
  projectId: string;
  status: string;
  followUp?: string;
  exposureLink?: string;
}

export interface ExposureSample {
  id: string;
  employeeId: string;
  segId: string;
  projectId: string;
  agent: string;
  method: string;
  date: string;
  result: number;
  unit: string;
  oel: number;
  status: string;
  lab: string;
  exceedancePct: number;
}

export interface Incident {
  id: string;
  title: string;
  type: string;
  severity: string;
  date: string;
  time: string;
  projectId: string;
  contractorId?: string;
  employeeId?: string;
  location: string;
  status: string;
  category: string;
  description: string;
  rootCause: string;
  investigator: string;
  lostTime: boolean;
  rcaMethod: string;
}

export interface CorrectiveAction {
  id: string;
  sourceType: string;
  sourceId: string;
  title: string;
  description: string;
  owner: string;
  ownerRole: string;
  dueDate: string;
  status: string;
  priority: string;
  projectId: string;
  contractorId?: string;
  verified: boolean;
}

export interface Permit {
  id: string;
  number: string;
  type: string;
  contractorId: string;
  projectId: string;
  location: string;
  status: string;
  riskLevel: string;
  riskScore: number;
  startDate: string;
  endDate: string;
  issuer: string;
  approver: string;
  gasTest: string;
  isolation: string;
  ppe: string;
  description: string;
}

export interface Risk {
  id: string;
  title: string;
  category: string;
  description: string;
  likelihood: number;
  impact: number;
  score: number;
  treatment: string;
  owner: string;
  projectId: string;
  status: string;
  residual: number;
  strategy: string;
  reviewDate: string;
}

export interface Audit {
  id: string;
  title: string;
  type: string;
  standard: string;
  auditor: string;
  projectId: string;
  date: string;
  endDate: string;
  score: number;
  status: string;
  findings: number;
  majorNC: number;
  minorNC: number;
  scope: string;
  nextDate: string;
}

export interface NCR {
  id: string;
  title: string;
  source: string;
  sourceId: string;
  severity: string;
  projectId: string;
  contractorId?: string;
  status: string;
  raised: string;
  dueDate: string;
  description: string;
  clause: string;
  disposition: string;
  owner: string;
}

export interface TrainingProgram {
  id: string;
  code: string;
  name: string;
  category: string;
  type: string;
  duration: number;
  provider: string;
  maxSeats: number;
  enrolled: number;
  validityMonths: number;
  status: string;
  mandatory: boolean;
  passScore: number;
  cost: number;
}

export interface Trainee {
  id: string;
  employeeId: string;
  programId: string;
  completionDate: string;
  expiryDate: string;
  score: number;
  status: string;
  attendance: string;
  certificateNo: string;
  instructorId: string;
}

export interface Instructor {
  id: string;
  name: string;
  specialty: string;
  provider: string;
  rating: number;
  sessions: number;
  status: string;
  languages: string;
  accreditation: string;
}

export interface Drill {
  id: string;
  name: string;
  type: string;
  scenario: string;
  date: string;
  site: string;
  projectId: string;
  result: string;
  score: number;
  status: string;
  participants: number;
  durationMin: number;
  evaluator: string;
  lessons: string;
}

export interface BIA {
  id: string;
  businessFunction: string;
  process: string;
  rtoHours: number;
  rpoHours: number;
  financialImpact: number;
  operationalImpact: string;
  criticality: string;
  owner: string;
  status: string;
  dependencies: string[];
  strategy: string;
}

export interface Policy {
  id: string;
  title: string;
  number: string;
  category: string;
  version: string;
  status: string;
  owner: string;
  approvedDate: string;
  reviewDate: string;
  nextReview: string;
  appliesTo: string;
  clauses: number;
}

export interface DocumentRec {
  id: string;
  name: string;
  category: string;
  subcategory: string;
  version: string;
  projectId: string;
  uploadedBy: string;
  date: string;
  status: string;
  size: string;
  type: string;
  restricted: boolean;
  linkedId?: string;
}

export interface Integration {
  id: string;
  name: string;
  category: string;
  status: string;
  direction: string;
  protocol: string;
  lastSync: string;
  latencyMs: number;
  records24h: number;
  errorRate: number;
  owner: string;
  environment: string;
}

export interface Ticket {
  id: string;
  subject: string;
  category: string;
  priority: string;
  status: string;
  requester: string;
  assignee: string;
  team: string;
  slaHours: number;
  elapsedHours: number;
  created: string;
  updated: string;
  channel: string;
  satisfaction: number;
}

export interface Visitor {
  id: string;
  name: string;
  company: string;
  host: string;
  projectId: string;
  checkIn: string;
  checkOut: string;
  badge: string;
  status: string;
  gate: string;
  purpose: string;
  vehicle: string;
}

export interface RoadClosure {
  id: string;
  location: string;
  reason: string;
  start: string;
  end: string;
  status: string;
  projectId: string;
  detour: string;
  lanes: string;
  approver: string;
  lat: number;
  lng: number;
}

export interface Chemical {
  id: string;
  name: string;
  cas: string;
  quantity: number;
  unit: string;
  hazardClass: string;
  storage: string;
  projectId: string;
  supplier: string;
  sds: string;
  status: string;
  expiry: string;
}

export interface Environmental {
  id: string;
  metric: string;
  unit: string;
  month: string;
  value: number;
  target: number;
  projectId: string;
  status: string;
  source: string;
  variancePct: number;
}

export interface Observation {
  id: string;
  title: string;
  type: string;
  behaviour: string;
  location: string;
  projectId: string;
  contractorId?: string;
  observer: string;
  date: string;
  rating: string;
  status: string;
  description: string;
  immediateAction: string;
}

export interface Inspection {
  id: string;
  title: string;
  type: string;
  projectId: string;
  inspector: string;
  contractorId?: string;
  date: string;
  score: number;
  status: string;
  checklist: string;
  items: number;
  nonConformances: number;
  nextDue: string;
}

export interface Patrol {
  id: string;
  officer: string;
  route: string;
  projectId: string;
  zone: string;
  start: string;
  end: string;
  checkpoints: number;
  completed: number;
  status: string;
  exceptions: number;
  vehicle: string;
  handover: string;
}

export interface Plan {
  id: string;
  name: string;
  type: string;
  category: string;
  version: string;
  status: string;
  owner: string;
  approvedDate: string;
  reviewDate: string;
  pages: number;
  callsign: string;
  summary: string;
}

export interface Approval {
  id: string;
  title: string;
  type: string;
  reference: string;
  requester: string;
  approver: string;
  stage: string;
  status: string;
  submitted: string;
  decisionDate: string;
  comments: string;
  priority: string;
  riskIfDelayed: string;
}

export interface Notification {
  id: string;
  title: string;
  body: string;
  type: string;
  severity: string;
  createdAt: string;
  read: boolean;
  audience: string;
  reference?: string;
}

export interface Dataset {
  projects: Project[];
  employees: Employee[];
  contractors: Contractor[];
  clinics: { id: string; name: string; site: string; projectId: string; capacity: number; staff: number; status: string; hours: string }[];
  medicalVisits: MedicalVisit[];
  appointments: { id: string; employeeId: string; clinicId: string; date: string; time: string; type: string; status: string; practitioner: string }[];
  surveillance: { id: string; program: string; employeeId: string; projectId: string; lastDate: string; nextDue: string; status: string; agent: string; interval: string }[];
  exposureSamples: ExposureSample[];
  segments: { id: string; name: string; projectId: string; agents: string[]; headcount: number; riskLevel: string; samplingFreq: string }[];
  incidents: Incident[];
  actions: CorrectiveAction[];
  permits: Permit[];
  risks: Risk[];
  audits: Audit[];
  ncrs: NCR[];
  programs: TrainingProgram[];
  trainees: Trainee[];
  instructors: Instructor[];
  drills: Drill[];
  bias: BIA[];
  policies: Policy[];
  documents: DocumentRec[];
  integrations: Integration[];
  tickets: Ticket[];
  visitors: Visitor[];
  roadClosures: RoadClosure[];
  chemicals: Chemical[];
  environmental: Environmental[];
  observations: Observation[];
  inspections: Inspection[];
  patrols: Patrol[];
  plans: Plan[];
  approvals: Approval[];
  notifications: Notification[];
  activities: { id: string; ref: string; text: string; actor: string; at: string; kind: string; projectId: string }[];
}
