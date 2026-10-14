import * as React from "react";
import { create } from "zustand";
import { X, CheckCircle2, AlertTriangle, Info, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export type ToastKind = "success" | "error" | "warning" | "info";
export interface ToastItem {
  id: number;
  kind: ToastKind;
  title: string;
  description?: string;
}

interface ToastState {
  items: ToastItem[];
  push: (t: Omit<ToastItem, "id">) => void;
  dismiss: (id: number) => void;
}

let seq = 0;
export const useToastStore = create<ToastState>((set) => ({
  items: [],
  push: (t) => {
    const id = ++seq;
    set((s) => ({ items: [...s.items, { ...t, id }] }));
    setTimeout(() => set((s) => ({ items: s.items.filter((x) => x.id !== id) })), 4200);
  },
  dismiss: (id) => set((s) => ({ items: s.items.filter((x) => x.id !== id) })),
}));

export const toast = {
  success: (title: string, description?: string) => useToastStore.getState().push({ kind: "success", title, description }),
  error: (title: string, description?: string) => useToastStore.getState().push({ kind: "error", title, description }),
  warning: (title: string, description?: string) => useToastStore.getState().push({ kind: "warning", title, description }),
  info: (title: string, description?: string) => useToastStore.getState().push({ kind: "info", title, description }),
};

const ICONS = {
  success: CheckCircle2,
  error: XCircle,
  warning: AlertTriangle,
  info: Info,
} as const;

const TONE = {
  success: "text-sea-500",
  error: "text-crimson-500",
  warning: "text-amberish-500",
  info: "text-ink-400",
} as const;

export function Toaster() {
  const items = useToastStore((s) => s.items);
  const dismiss = useToastStore((s) => s.dismiss);
  if (!items.length) return null;
  return (
    <div className="pointer-events-none fixed bottom-5 start-5 z-[100] flex w-[min(380px,calc(100vw-2.5rem))] flex-col gap-2">
      {items.map((t) => {
        const Icon = ICONS[t.kind];
        return (
          <div
            key={t.id}
            className="pointer-events-auto flex items-start gap-3 rounded-lg border bg-card p-3.5 shadow-pop animate-slide-up"
            role="status"
          >
            <Icon className={cn("mt-0.5 h-5 w-5 shrink-0", TONE[t.kind])} />
            <div className="min-w-0 flex-1">
              <p className="text-[13px] font-bold">{t.title}</p>
              {t.description && <p className="mt-0.5 text-[12px] text-muted-foreground">{t.description}</p>}
            </div>
            <button
              onClick={() => dismiss(t.id)}
              className="rounded p-1 text-muted-foreground transition-colors hover:bg-secondary"
              aria-label="Dismiss notification"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        );
      })}
    </div>
  );
}
