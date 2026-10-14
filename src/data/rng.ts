export function mulberry32(seed: number) {
  let a = seed >>> 0;
  return function next() {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export class Rng {
  private r: () => number;
  constructor(seed: number) {
    this.r = mulberry32(seed);
  }
  next() {
    return this.r();
  }
  int(min: number, max: number) {
    return Math.floor(this.r() * (max - min + 1)) + min;
  }
  float(min: number, max: number, digits = 2) {
    const v = this.r() * (max - min) + min;
    return Number(v.toFixed(digits));
  }
  pick<T>(arr: readonly T[]): T {
    return arr[Math.floor(this.r() * arr.length)];
  }
  picks<T>(arr: readonly T[], n: number): T[] {
    const pool = [...arr];
    const out: T[] = [];
    for (let i = 0; i < n && pool.length; i++) out.push(pool.splice(Math.floor(this.r() * pool.length), 1)[0]);
    return out;
  }
  chance(p: number) {
    return this.r() < p;
  }
  /** A date within the last `spanDays` days, ending today. */
  date(fromYear = 2024, spanDays = 700) {
    void fromYear;
    const days = Math.floor(this.r() * Math.max(1, spanDays));
    const d = new Date();
    d.setUTCHours(12, 0, 0, 0);
    d.setUTCDate(d.getUTCDate() - days);
    return d.toISOString().slice(0, 10);
  }
  /** A date within the next `spanDays` days, starting today. */
  future(spanDays = 180) {
    const days = Math.floor(this.r() * Math.max(1, spanDays));
    const d = new Date();
    d.setUTCHours(12, 0, 0, 0);
    d.setUTCDate(d.getUTCDate() + days);
    return d.toISOString().slice(0, 10);
  }
  dateTime(fromYear = 2024, spanDays = 700) {
    const day = this.date(fromYear, spanDays);
    const h = this.int(6, 20);
    const m = this.pick([0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55]);
    return `${day}T${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
  }
  id(prefix: string, n: number, width = 5) {
    return `${prefix}-${String(n).padStart(width, "0")}`;
  }
}

export function addDays(iso: string, days: number) {
  const d = new Date(iso);
  d.setUTCDate(d.getUTCDate() + days);
  return d.toISOString().slice(0, 10);
}

export function daysBetween(a: string, b: string) {
  return Math.round((new Date(b).getTime() - new Date(a).getTime()) / 86400000);
}
