import * as React from "react";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export function Panel({
  title,
  description,
  action,
  children,
  className,
  bodyClassName,
}: {
  title?: React.ReactNode;
  description?: React.ReactNode;
  action?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  bodyClassName?: string;
}) {
  return (
    <Card className={cn("flex flex-col", className)}>
      {(title || action) && (
        <CardHeader className="flex-row items-center justify-between space-y-0 gap-3 border-b pb-3.5">
          <div className="min-w-0">
            {title && <CardTitle>{title}</CardTitle>}
            {description && <CardDescription className="mt-1">{description}</CardDescription>}
          </div>
          {action && <div className="shrink-0">{action}</div>}
        </CardHeader>
      )}
      <CardContent className={cn("flex-1 p-5", bodyClassName)}>{children}</CardContent>
    </Card>
  );
}

export function SectionLabel({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        "mb-3 border-b border-border pb-2 text-[11px] font-bold uppercase tracking-[0.12em] text-muted-foreground",
        className
      )}
    >
      {children}
    </div>
  );
}

export function KeyValue({ items }: { items: Array<{ label: string; value: React.ReactNode }> }) {
  return (
    <dl className="grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-2">
      {items.map((it, i) => (
        <div key={i} className="min-w-0">
          <dt className="text-[11px] font-bold uppercase tracking-wide text-muted-foreground">{it.label}</dt>
          <dd className="mt-0.5 truncate text-[13px] font-semibold">{it.value ?? "—"}</dd>
        </div>
      ))}
    </dl>
  );
}

export function EmptyState({
  title,
  description,
  action,
  icon,
}: {
  title: string;
  description?: string;
  action?: React.ReactNode;
  icon?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-center rounded-lg border border-dashed bg-muted/20 px-6 py-14 text-center">
      <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-full bg-secondary text-muted-foreground">
        {icon}
      </div>
      <p className="font-display text-[15px] font-bold">{title}</p>
      {description && <p className="mt-1 max-w-sm text-[12.5px] text-muted-foreground">{description}</p>}
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}

export function Timeline({
  items,
}: {
  items: Array<{ id: string; text: string; actor: string; at: string; kind?: string }>;
}) {
  return (
    <ol className="relative ms-2 space-y-4 border-s border-border ps-5">
      {items.map((it) => (
        <li key={it.id} className="relative">
          <span
            className={cn(
              "absolute -start-[27px] top-1 h-3 w-3 rounded-full border-2 border-card",
              it.kind === "approve"
                ? "bg-sea-500"
                : it.kind === "escalate"
                  ? "bg-crimson-500"
                  : it.kind === "attach"
                    ? "bg-ink-400"
                    : "bg-copper-500"
            )}
          />
          <p className="text-[13px] font-semibold leading-snug">{it.text}</p>
          <p className="mt-0.5 text-[11.5px] text-muted-foreground">
            {it.actor} · {it.at.replace("T", " ")}
          </p>
        </li>
      ))}
    </ol>
  );
}

export function ProgressRow({ label, value, tone = "sea" }: { label: string; value: number; tone?: "sea" | "copper" | "amber" | "red" }) {
  const color = tone === "sea" ? "bg-sea-500" : tone === "copper" ? "bg-copper-500" : tone === "amber" ? "bg-amberish-500" : "bg-crimson-500";
  return (
    <div className="space-y-1.5">
      <div className="flex items-baseline justify-between text-[12.5px]">
        <span className="truncate font-medium">{label}</span>
        <span className="num font-bold">{value}%</span>
      </div>
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
        <div className={cn("h-full rounded-full", color)} style={{ width: `${Math.min(100, value)}%` }} />
      </div>
    </div>
  );
}
