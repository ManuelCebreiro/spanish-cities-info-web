import type { Metadata } from "next";
import { Graticule } from "@/components/Graticule";
import { Hero } from "@/components/Hero";
import { AeoSummary } from "@/components/AeoSummary";
import { MapDemo } from "@/components/MapDemo";
import { CodeExamples } from "@/components/CodeExamples";
import { ModularImports } from "@/components/ModularImports";
import { WeightComparison } from "@/components/WeightComparison";
import { Faq } from "@/components/Faq";
import { Footer } from "@/components/Footer";
import { getSectionReferencePoints } from "@/lib/reference-points";
import { jsonLdGraph } from "@/lib/schema";
import { STATS } from "@/lib/content";

export async function generateMetadata(): Promise<Metadata> {
  const title = `spanish-cities-info — ${STATS.totalCities.toLocaleString("es-ES")} municipios de España en npm`;
  const description = `Paquete npm con los 8.132 municipios de España verificados contra el INE. Búsqueda por radio en km, imports modulares por provincia/comunidad, códigos postales opcionales, TypeScript, ~${STATS.mainImportMinifiedKB} KB / ~${STATS.mainImportGzipKB} KB gzip.`;

  return {
    title,
    description,
    alternates: { canonical: "/" },
    openGraph: {
      title,
      description,
      url: "https://spanish-cities-info-web.vercel.app",
      siteName: "spanish-cities-info",
      locale: "es_ES",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default function Home() {
  const points = getSectionReferencePoints();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdGraph()) }}
      />
      <Graticule points={points} />
      <main>
        <Hero />
        <AeoSummary />
        <MapDemo />
        <CodeExamples />
        <ModularImports />
        <WeightComparison />
        <Faq />
      </main>
      <Footer />
    </>
  );
}
