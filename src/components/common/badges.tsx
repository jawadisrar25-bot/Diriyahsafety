import * as React from "react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { useI18n } from "@/i18n";

const TONE: Record<string, string> = {
  neutral: "bg-secondary text-secondary-foreground border-transparent",
  good: "bg-sea-50 text-sea-700 border-sea-500/20",
  warn: "bg-amberish-50 text-amberish-700 border-amberish-500/30",
  bad: "bg-crimson-50 text-crimson-700 border-crimson-500/20",
  info: "bg-ink-50 text-ink-700 border-ink-300/40",
};

function toneFor(value: string): keyof typeof TONE {
  const v = value.toLowerCase();
  if (["approved", "active", "closed", "resolved", "completed", "fit", "compliant", "connected", "safe", "passed", "green"].includes(v))
    return "good";
  if (["pending", "in review", "in progress", "draft", "scheduled", "partial", "degraded", "under review", "awaiting requester", "registered", "submitted", "amber", "medium"].includes(v))
    return "warn";
  if (["rejected", "overdue", "expired", "suspended", "critical", "non-compliant", "disconnected", "temporarily unfit", "failed", "escalated", "red", "high"].includes(v))
    return "bad";
  if (["unconnected", "maintenance", "no-show", "returned", "on hold", "mobilisation", "blue"].includes(v))
    return "info";
  return "neutral";
}

export function StatusBadge({ value, className }: { value: string | undefined | null; className?: string }) {
  const { locale } = useI18n();
  if (!value) return <span className="text-muted-foreground">—</span>;
  const tone = toneFor(value);
  const ar = STATUS_AR[value];
  return (
    <Badge variant="outline" className={cn("font-semibold", TONE[tone], className)}>
      {locale === "ar" && ar ? ar : value}
    </Badge>
  );
}

export function ToneBadge({
  children,
  tone,
  className,
}: {
  children: React.ReactNode;
  tone: keyof typeof TONE;
  className?: string;
}) {
  return (
    <Badge variant="outline" className={cn("font-semibold", TONE[tone], className)}>
      {children}
    </Badge>
  );
}

export function ScoreBadge({ value, max = 100 }: { value: number; max?: number }) {
  const ratio = max === 0 ? 0 : value / max;
  const tone = ratio >= 0.85 ? "good" : ratio >= 0.6 ? "warn" : "bad";
  return <ToneBadge tone={tone}>{value}</ToneBadge>;
}

export function SeverityBadge({ value }: { value: string }) {
  return <StatusBadge value={value} />;
}

const STATUS_AR: Record<string, string> = {
  Open: "مفتوح",
  Closed: "مغلق",
  "In progress": "قيد التنفيذ",
  Pending: "معلق",
  Overdue: "متأخر",
  Draft: "مسودة",
  "In review": "قيد المراجعة",
  Approved: "معتمد",
  Rejected: "مرفوض",
  Returned: "مُعاد",
  Active: "نشط",
  Superseded: "ملغى",
  Submitted: "مُقدَّم",
  "Under review": "قيد المراجعة",
  Expired: "منتهي",
  Suspended: "موقوف",
  "Pending approval": "بانتظار الاعتماد",
  Completed: "مكتمل",
  Registered: "مسجل",
  "No-show": "غائب",
  Connected: "متصل",
  Degraded: "متدهور",
  Maintenance: "صيانة",
  Disconnected: "منقطع",
  Resolved: "محلول",
  Escalated: "مُصعَّد",
  "Awaiting requester": "بانتظار مقدم الطلب",
  Planned: "مخطط",
  Cancelled: "ملغى",
  Compliant: "ممتثل",
  Partial: "جزئي",
  "Non-compliant": "غير ممتثل",
  "Not assessed": "غير مُقيَّم",
  Scheduled: "مجدول",
  "Action tracking": "تتبع الإجراءات",
  "Under revision": "قيد المراجعة",
  Fit: "لائق",
  "Fit with restrictions": "لائق مع قيود",
  "Temporarily unfit": "غير لائق مؤقتًا",
  Low: "منخفض",
  Medium: "متوسط",
  High: "عالٍ",
  Critical: "حرج",
  Unread: "غير مقروء",
  Read: "مقروء",
  Archived: "مؤرشف",
  "On hold": "معلّق",
  Mobilisation: "تجهيز",
  Complete: "مكتمل",
};
