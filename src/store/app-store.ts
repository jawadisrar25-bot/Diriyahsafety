import { create } from "zustand";
import { SEED_DATASET } from "@/data/seed";
import { DEFAULT_ROLE, getRole, type RoleDef } from "@/lib/roles";
import type { Dataset, ScreenDef } from "@/types";
import { SCREENS, findScreen } from "@/data/screens";

export interface UserRecord {
  id: string;
  entity: string;
  values: Record<string, string>;
  createdAt: string;
}

interface AppState {
  data: Dataset;
  role: RoleDef;
  theme: "light" | "dark";
  savedPaths: string[];
  projectFilter: string;
  userRecords: UserRecord[];
  sidebarCollapsed: boolean;
  mobileNav: boolean;
  searchOpen: boolean;

  setRole: (id: string) => void;
  toggleTheme: () => void;
  toggleSaved: (path: string) => void;
  setProjectFilter: (id: string) => void;
  addRecord: (entity: string, values: Record<string, string>) => void;
  updateRecord: (entity: string, id: string, values: Record<string, string>) => void;
  deleteRecord: (id: string) => void;
  setSidebarCollapsed: (v: boolean) => void;
  setMobileNav: (v: boolean) => void;
  setSearchOpen: (v: boolean) => void;
  rowsFor: (screen: ScreenDef) => Array<Record<string, unknown>>;
}

const baseRole = getRole(DEFAULT_ROLE);

export const useAppStore = create<AppState>((set, get) => ({
  data: SEED_DATASET,
  role: baseRole,
  theme: "light",
  savedPaths: [],
  projectFilter: "all",
  userRecords: [],
  sidebarCollapsed: false,
  mobileNav: false,
  searchOpen: false,

  setRole: (id) => {
    set({ role: getRole(id) });
  },
  toggleTheme: () => {
    const next = get().theme === "light" ? "dark" : "light";
    set({ theme: next });
  },
  toggleSaved: (path) => {
    const cur = get().savedPaths;
    const next = cur.includes(path) ? cur.filter((p) => p !== path) : [...cur, path];
    set({ savedPaths: next });
  },
  setProjectFilter: (id) => {
    set({ projectFilter: id });
  },
  addRecord: (entity, values) => {
    const id = `USR-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;
    const rec: UserRecord = { id, entity, values, createdAt: new Date().toISOString() };
    set({ userRecords: [rec, ...get().userRecords] });
  },
  updateRecord: (entity, id, values) => {
    const next = get().userRecords.map((r) =>
      r.id === id && r.entity === entity ? { ...r, values: { ...r.values, ...values } } : r
    );
    set({ userRecords: next });
  },
  deleteRecord: (id) => {
    set({ userRecords: get().userRecords.filter((r) => r.id !== id) });
  },
  setSidebarCollapsed: (v) => set({ sidebarCollapsed: v }),
  setMobileNav: (v) => set({ mobileNav: v }),
  setSearchOpen: (v) => set({ searchOpen: v }),

  rowsFor: (screen) => {
    const { data, userRecords, projectFilter } = get();
    const entity = screen.entity;
    const key = entity as keyof Dataset;
    const source = Array.isArray(data[key]) ? (data[key] as Array<Record<string, unknown>>) : [];
    const user = userRecords
      .filter((r) => r.entity === entity)
      .map((r) => ({ id: r.id, ...r.values, __user: true }));
    const merged = [...user, ...source] as Array<Record<string, unknown>>;
    if (projectFilter === "all") return merged;
    return merged.filter((r) => !r["projectId"] || r["projectId"] === projectFilter);
  },
}));

export function resolveInitialScreen(): ScreenDef {
  const path = window.location.pathname.replace(/\/$/, "") || "/";
  return findScreen(path) ?? SCREENS[0];
}
