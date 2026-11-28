import { createFileRoute, redirect } from "@tanstack/react-router";

/** Legacy URL kept as a redirect to the maintained service page. */
export const Route = createFileRoute("/webcare")({
  beforeLoad: () => {
    throw redirect({ to: "/services/webcare", statusCode: 301 });
  },
});
