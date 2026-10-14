import * as React from "react";
import { en, type MessageKey, type Dictionary } from "./en";
import { ar } from "./ar";

export type Locale = "en" | "ar";
export const LOCALES: { id: Locale; label: string; native: string; dir: "ltr" | "rtl" }[] = [
  { id: "en", label: "English", native: "English", dir: "ltr" },
  { id: "ar", label: "Arabic", native: "العربية", dir: "rtl" },
];

const DICTS: Record<Locale, Dictionary> = { en, ar };

interface I18nValue {
  locale: Locale;
  dir: "ltr" | "rtl";
  t: (key: MessageKey) => string;
  setLocale: (l: Locale) => void;
  fmtDate: (iso: string) => string;
  fmtNumber: (n: number, digits?: number) => string;
  fmtMoney: (n: number) => string;
}

const I18nContext = React.createContext<I18nValue | null>(null);

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = React.useState<Locale>("en");

  const dir = locale === "ar" ? "rtl" : "ltr";

  React.useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = dir;
  }, [locale, dir]);

  const setLocale = React.useCallback((l: Locale) => {
    setLocaleState(l);
  }, []);

  const value = React.useMemo<I18nValue>(() => {
    const dict = DICTS[locale];
    const intlLocale = locale === "ar" ? "ar-SA-u-nu-latn" : "en-GB";
    return {
      locale,
      dir,
      setLocale,
      t: (key) => dict[key] ?? en[key] ?? key,
      fmtDate: (iso) => {
        if (!iso) return "—";
        const d = new Date(iso);
        if (Number.isNaN(d.getTime())) return iso;
        return new Intl.DateTimeFormat(intlLocale, { day: "2-digit", month: "short", year: "numeric" }).format(d);
      },
      fmtNumber: (n, digits = 0) =>
        new Intl.NumberFormat(intlLocale, {
          minimumFractionDigits: digits,
          maximumFractionDigits: digits,
        }).format(n),
      fmtMoney: (n) =>
        new Intl.NumberFormat(intlLocale, { style: "currency", currency: "SAR", maximumFractionDigits: 0 }).format(n),
    };
  }, [locale, dir, setLocale]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n(): I18nValue {
  const ctx = React.useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
}

export type { MessageKey };
