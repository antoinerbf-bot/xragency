import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";

export const Route = createFileRoute("/dashboard/")({
  component: DashboardIndex,
});

function DashboardIndex() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate({ to: "/crm" });
  }, [navigate]);

  return (
    <div className="grid min-h-screen place-items-center bg-[#080B10] text-[#F8FAFC]">
      <div className="flex flex-col items-center gap-3">
        <div className="h-10 w-10 animate-spin rounded-full border-2 border-[#D4AF37] border-t-transparent" />
        <p className="font-mono text-xs uppercase tracking-widest text-[#E2D5BC]">
          Redirection vers le CRM officiel unifié (/crm)...
        </p>
      </div>
    </div>
  );
}
