import { createFileRoute, Outlet, useLocation } from "@tanstack/react-router";
import { Sidebar } from "../components/saas/Sidebar";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Espace Client — XR Agency" },
      {
        name: "description",
        content:
          "Espace Client XR Agency : suivi de projets, progression, tâches, documents, factures, messagerie et support.",
      },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
  component: DashboardLayout,
});

function DashboardLayout() {
  const location = useLocation();
  const isRootDashboard =
    location.pathname === "/dashboard" || location.pathname === "/dashboard/";

  if (isRootDashboard) {
    return (
      <div className="min-h-screen bg-[#F7F4EE] text-[#171613]">
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
