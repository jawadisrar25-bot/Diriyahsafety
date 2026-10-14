import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

const root = new URL("..", import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1");
const screensDir = join(root, "src", "data", "screens");
const files = readdirSync(screensDir).filter((f) => f.endsWith(".ts"));

const paths = [];
for (const f of files) {
  const src = readFileSync(join(screensDir, f), "utf8");
  const re = /screen\(\s*"([^"]+)"\s*,\s*"([^"]+)"/g;
  let m;
  while ((m = re.exec(src))) paths.push(`${m[1]}/${m[2]}`);
}

const MODULE_PATH = {
  dashboard: "dashboard",
  "occupational-health": "occupational-health",
  "industrial-hygiene": "industrial-hygiene",
  "construction-safety": "construction-safety",
  security: "security-operations",
  incidents: "incidents",
  "risk-permits": "risk-permits",
  contractors: "contractor-management",
  emergency: "emergency-management",
  "business-continuity": "business-continuity",
  compliance: "compliance-governance",
  audits: "audits-inspections",
  training: "training-development",
  environment: "environmental-esg",
  documents: "documents-forms",
  reporting: "reports-intelligence",
  administration: "administration",
  integrations: "integrations",
  support: "support-service",
};

const full = paths.map((p) => {
  const [mod, slug] = p.split("/");
  return "/" + (MODULE_PATH[mod] ?? mod) + "/" + slug;
});

const dupes = full.filter((p, i) => full.indexOf(p) !== i);
console.log(`screens: ${full.length}`);
console.log(`unique: ${new Set(full).size}`);
if (dupes.length) {
  console.log("duplicate paths:", [...new Set(dupes)]);
  process.exit(1);
}
if (full.length < 250 || full.length > 280) {
  console.log("WARN: expected 250-280 screens");
}
console.log("ok");
