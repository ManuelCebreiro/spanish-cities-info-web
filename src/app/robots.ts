import type { MetadataRoute } from "next";

// No se bloquean GPTBot, Google-Extended ni anthropic-ai: estos user-agents
// alimentan las respuestas de ChatGPT, Google AI Overviews y Claude, que son
// parte del objetivo de posicionamiento de esta página (ver CLAUDE.md, AEO).
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: "https://spanish-cities-info-web.vercel.app/sitemap.xml",
  };
}
