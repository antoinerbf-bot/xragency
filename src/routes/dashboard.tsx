import { createFileRoute, Outlet, useLocation } from "@tanstack/react-router";
import { Sidebar } from "../components/saas/Sidebar";

export const Route = createFileRoute("/dashboard")({
  component: DashboardLayout,
});

function DashboardLayout() {
  const location = useLocation();
  const isRootDashboard =
    location.pathname === "/dashboard" || location.pathname === "/dashboard/";

  if (isRootDashboard) {
    return (
      <div className="min-h-screen bg-[#080B10] text-[#F8FAFC]">
        <Outlet />
      </div>
    );
  }

  return (
    <div className="flex h-screen overflow-hidden bg-[#080B10] text-[#F8FAFC]">
      <Sidebar />
      <main className="flex-1 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}
