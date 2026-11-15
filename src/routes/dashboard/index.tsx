import { createFileRoute } from "@tanstack/react-router";
import { RpgDashboardCommandCenter } from "../../components/crm/RpgDashboardCommandCenter";

export const Route = createFileRoute("/dashboard/")({
  component: DashboardIndex,
});

function DashboardIndex() {
  return <RpgDashboardCommandCenter />;
}
