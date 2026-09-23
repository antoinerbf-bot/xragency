import { createFileRoute } from "@tanstack/react-router";
import { WorkPage } from "./work";

export const Route = createFileRoute("/realisations")({
  head: () => ({
    meta: [
      { title: "Nos réalisations — XR Agency" },
      { name: "description", content: "Portfolio XR Agency : références et projets digitaux classés par secteur et prestation." },
      { name: "robots", content: "index,follow,max-image-preview:large" },
    ],
    links: [{ rel: "canonical", href: "https://xragencyai.com/realisations" }],
  }),
  component: WorkPage,
});
