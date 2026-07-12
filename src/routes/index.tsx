import { createFileRoute } from "@tanstack/react-router";
import { Portfolio } from "@/components/Portfolio";

export const Route = createFileRoute("/")({
  component: Portfolio,
  head: () => ({
    meta: [
      { title: "Sara Hassib — Digital Marketing Specialist" },
      {
        name: "description",
        content:
          "Portfolio of Sara Hassib, Digital Marketing Specialist — paid advertising, marketing strategy and creative digital solutions.",
      },
      { property: "og:title", content: "Sara Hassib — Digital Marketing Specialist" },
      {
        property: "og:description",
        content:
          "Paid ads, marketing strategy and creative digital solutions. Explore projects, certifications and experience.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
});
