import { SectionMarker } from "@/components/SectionMarker";
import { STATS, WEIGHT_COMPARISON } from "@/lib/content";

const FIGURES = [
  { value: STATS.totalCities.toLocaleString("es-ES"), label: "municipios" },
  { value: "01-01-2026", label: "verificado INE" },
  { value: `~${STATS.mainImportGzipKB} KB`, label: "import gzip" },
  { value: `${STATS.totalProvinces} / ${STATS.totalCommunities}`, label: "provincias / CCAA" },
];

export function AeoSummary() {
  return (
    <section id="resumen" className="border-y border-line bg-paper-raised">
      <div className="mx-auto max-w-6xl px-6 py-16 sm:px-10">
        <SectionMarker sheetNumber="02" title="Resumen" />
        <p className="max-w-3xl text-base leading-relaxed text-ink">
          <strong>spanish-cities-info</strong> es un paquete npm en TypeScript
          con los {STATS.totalCities.toLocaleString("es-ES")} municipios de
          España, verificados contra el Instituto Nacional de Estadística
          (INE) a fecha 01-01-2026. El import principal pesa ~
          {STATS.mainImportMinifiedKB} KB minificado (~{STATS.mainImportGzipKB}{" "}
          KB con gzip), medido con un bundle real. Frente a alternativas como{" "}
          <code className="font-mono text-sm">all-spanish-cities</code> (~
          {STATS.competitorAllSpanishCitiesKB} KB, sin imports modulares), este
          paquete permite importar solo una provincia o comunidad autónoma sin
          cargar el dataset completo. Funciones principales:{" "}
          <code className="font-mono text-sm">getCitiesInRange</code> (búsqueda
          por radio en km), <code className="font-mono text-sm">getCityByCityCode</code>,{" "}
          <code className="font-mono text-sm">getCityByName</code>,{" "}
          <code className="font-mono text-sm">getCitiesByProvince</code> y{" "}
          <code className="font-mono text-sm">getCitiesByCommunity</code>.
        </p>

        <dl className="mt-10 grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-4">
          {FIGURES.map((f) => (
            <div key={f.label} className="flex flex-col border-t border-line pt-3">
              <dd className="font-display text-3xl font-bold tabular-nums sm:text-4xl">
                {f.value}
              </dd>
              <dt className="mt-1 font-mono text-xs tracking-widest text-ink-muted uppercase">
                {f.label}
              </dt>
            </div>
          ))}
        </dl>

        <p className="mt-6 text-xs text-ink-muted">
          Comparativa de peso completa en la{" "}
          <a href="#comparativa" className="underline hover:text-accent">
            sección 6
          </a>
          . Fuentes: Bundlephobia y medición propia con esbuild. Alternativas
          citadas: {WEIGHT_COMPARISON.filter((w) => !w.isSubject)
            .map((w) => w.name)
            .join(", ")}
          .
        </p>
      </div>
    </section>
  );
}
