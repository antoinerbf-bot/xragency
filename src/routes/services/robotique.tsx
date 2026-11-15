import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/site/Nav";
import { Contact } from "@/components/site/Contact";
import { RoboticsShowcase } from "@/components/site/RoboticsShowcase";
import { CustomCrmShowcase } from "@/components/site/CustomCrmShowcase";
import { ServicePillarDeepBlocks } from "@/components/site/ServicePillarDeepBlocks";

export const Route = createFileRoute("/services/robotique")({
  head: () => ({
    meta: [
      { title: "Logiciel Caisse POS & CRM Omnicanal (dès 2 000 €) — Économisez 30% Uber Eats | XR Agency" },
      { name: "description", content: "Logiciel de caisse tactile, tickets certifiés, gestion complète des stocks, KDS cuisine, interface livreurs et jumeau numérique 3D immersif style GTA. 0% de commission à vie." },
      { property: "og:title", content: "Logiciel Caisse POS & CRM Omnicanal — 0% de Commission | XR Agency" },
      { property: "og:description", content: "Reprenez le contrôle de vos marges face aux 30% d'Uber Eats et Deliveroo. Système caisse, stocks, site web et livraison directe dès 2 000 €." },
    ],
  }),
  component: RoboticsPage,
});

function RoboticsPage() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-[#06070a] text-white">
      <Nav />
      <main>
        <CustomCrmShowcase />
        <ServicePillarDeepBlocks serviceId="robotics" />
        <RoboticsShowcase />
        <Contact />
      </main>
    </div>
  );
}
