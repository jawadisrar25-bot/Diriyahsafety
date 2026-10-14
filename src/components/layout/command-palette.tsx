import * as React from "react";
import { useNavigate } from "react-router-dom";
import { Search, CornerDownLeft } from "lucide-react";
import { useI18n } from "@/i18n";
import { useAppStore } from "@/store/app-store";
import { canViewScreen } from "@/lib/roles";
import { SCREENS, MODULE_META } from "@/data/screens";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

interface Ctx {
  open: boolean;
  openSearch: () => void;
  close: () => void;
}
const CommandCtx = React.createContext<Ctx>({ open: false, openSearch: () => {}, close: () => {} });

export function CommandPaletteProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = React.useState(false);
  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);
  const value = React.useMemo<Ctx>(
    () => ({ open, openSearch: () => setOpen(true), close: () => setOpen(false) }),
    [open]
  );
  return (
    <CommandCtx.Provider value={value}>
      {children}
      <Palette open={open} onClose={() => setOpen(false)} />
    </CommandCtx.Provider>
  );
}

export function useCommandPalette() {
  return React.useContext(CommandCtx);
}

function Palette({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { t, locale } = useI18n();
  const navigate = useNavigate();
  const role = useAppStore((s) => s.role);
  const [query, setQuery] = React.useState("");
  const [cursor, setCursor] = React.useState(0);

  const results = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    const pool = SCREENS.filter((s) => canViewScreen(role, s));
    if (!q) return pool.slice(0, 40);
    return pool
      .filter((s) => {
        const hay = `${s.title} ${s.titleAr} ${s.path} ${MODULE_META[s.module].name} ${MODULE_META[s.module].nameAr}`.toLowerCase();
        return hay.includes(q);
      })
      .slice(0, 40);
  }, [query, role]);

  React.useEffect(() => {
    if (!open) {
      setQuery("");
      setCursor(0);
    }
  }, [open]);

  const go = (path: string) => {
    navigate(path);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="top-[12%] max-w-2xl translate-y-0 gap-0 overflow-hidden p-0">
        <DialogTitle className="sr-only">{t("nav.searchPlaceholder")}</DialogTitle>
        <div className="flex items-center gap-3 border-b px-4">
          <Search className="h-4 w-4 shrink-0 text-muted-foreground" />
          <input
            autoFocus
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setCursor(0);
            }}
            onKeyDown={(e) => {
              if (e.key === "ArrowDown") {
                e.preventDefault();
                setCursor((c) => Math.min(c + 1, results.length - 1));
              } else if (e.key === "ArrowUp") {
                e.preventDefault();
                setCursor((c) => Math.max(c - 1, 0));
              } else if (e.key === "Enter" && results[cursor]) {
                e.preventDefault();
                go(results[cursor].path);
              }
            }}
            placeholder={t("nav.searchPlaceholder")}
            className="h-14 w-full bg-transparent text-[15px] outline-none placeholder:text-muted-foreground"
          />
          <kbd className="rounded border bg-muted px-1.5 py-0.5 text-[10px] font-semibold text-muted-foreground">ESC</kbd>
        </div>
        <div className="max-h-[52vh] overflow-y-auto p-2 scrollbar-thin">
          {results.length === 0 && (
            <p className="px-3 py-8 text-center text-sm text-muted-foreground">{t("table.noResults")}</p>
          )}
          {results.map((s, i) => (
            <button
              key={s.path}
              onMouseEnter={() => setCursor(i)}
              onClick={() => go(s.path)}
              className={
                "flex w-full items-center gap-3 rounded-lg px-3 py-2 text-start transition-colors " +
                (i === cursor ? "bg-secondary" : "hover:bg-secondary/60")
              }
            >
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-primary text-[10px] font-bold text-primary-foreground">
                {String(s.id).padStart(3, "0")}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate text-[13px] font-semibold">
                  {locale === "ar" ? s.titleAr : s.title}
                </span>
                <span className="block truncate text-[11px] text-muted-foreground">
                  {locale === "ar" ? MODULE_META[s.module].nameAr : MODULE_META[s.module].name} · {s.path}
                </span>
              </span>
              {i === cursor && <CornerDownLeft className="h-3.5 w-3.5 text-muted-foreground" />}
            </button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
