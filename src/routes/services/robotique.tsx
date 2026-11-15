import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/site/Nav";
import { Contact } from "@/components/site/Contact";
import { RoboticsShowcase } from "@/components/site/RoboticsShowcase";

export const Route = createFileRoute("/services/robotique")({
  head: () => ({
    meta: [
      { title: "Robotique de service & IA — XR Agency × Korben" },
      { name: "description", content: "Découvrez la gamme Korben de robots autonomes : accueil, livraison, nettoyage, logistique et humanoïdes. Sélection, démonstration et déploiement accompagnés par XR Agency." },
      { property: "og:title", content: "XR Robotics — XR Agency × Korben" },
      { property: "og:description", content: "Robots autonomes professionnels pour automatiser les opérations et enrichir l'expérience client." },
    ],
  }),
  component: RoboticsPage,
});

function RoboticsPage() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-[#050608] text-white">
      <Nav />
      <main>
        <RoboticsShowcase />
        <Contact />
      </main>
    </div>
  );
}
