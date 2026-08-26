// ── Dashboard layout route — wraps all /dashboard/* pages with sidebar ──

import { createFileRoute, Outlet } from "@tanstack/react-router";
import { Sidebar } from "../components/saas/Sidebar";

export const Route = createFileRoute("/dashboard")({
  component: DashboardLayout,
});

function DashboardLayout() {
  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <Sidebar />
      <main className="flex-1 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}
