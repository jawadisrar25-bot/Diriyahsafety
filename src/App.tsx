import * as React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { I18nProvider } from "@/i18n";
import { CommandPaletteProvider } from "@/components/layout/command-palette";
import { AppShell } from "@/components/layout/app-shell";
import { ScreenView, NotFound } from "@/components/screens/screen-view";
import { SCREENS } from "@/data/screens";
import { useAppStore } from "@/store/app-store";

export default function App() {
  return (
    <I18nProvider>
      <CommandPaletteProvider>
        <Routes>
          <Route element={<AppShell />}>
            <Route index element={<HomeRedirect />} />
            {SCREENS.map((s) => (
              <Route key={s.path} path={s.path} element={<ScreenView />} />
            ))}
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </CommandPaletteProvider>
    </I18nProvider>
  );
}

function HomeRedirect() {
  const role = useAppStore((s) => s.role);
  return <Navigate to={role.homePath} replace />;
}
