import { SectionMarker } from "@/components/SectionMarker";
import { HeroMapPreview } from "@/components/HeroMapPreview";
import { STATS, REPO_URL, NPM_URL } from "@/lib/content";

export function Hero() {
  return (
    <section id="hero" className="mx-auto max-w-6xl px-6 pt-16 pb-20 sm:px-10 sm:pt-24">
      <SectionMarker sheetNumber="01" title="spanish-cities-info" />
      <div className="grid gap-12 lg:grid-cols-[1.15fr_1fr] lg:items-center">
        <div>
          <h1 className="font-display text-5xl leading-[0.95] font-extrabold tracking-tight uppercase sm:text-6xl md:text-7xl">
            {STATS.totalCities.toLocaleString("es-ES")} municipios
            <br />
            de España
          </h1>
          <p className="mt-6 max-w-xl text-lg text-ink-muted">
            Paquete npm con el listado completo de municipios españoles,
            verificado contra el INE a fecha{" "}
            {new Date(STATS.ineVerifiedDate).toLocaleDateString("es-ES", {
              day: "2-digit",
              month: "long",
              year: "numeric",
            })}
            . ~{STATS.mainImportMinifiedKB} KB minificado, ~{STATS.mainImportGzipKB} KB
            con gzip en el import principal.
          </p>

          <div className="mt-8 inline-flex items-center gap-3 border-l-2 border-accent bg-paper-raised px-4 py-3 font-mono text-sm">
            <span className="text-accent select-none" aria-hidden="true">
              $
            </span>
            <code>npm install spanish-cities-info</code>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 font-mono text-sm tracking-wide uppercase">
            <a href="#demo" className="border-b border-ink pb-0.5 hover:border-accent hover:text-accent">
              Ver demo ↓
            </a>
            <a
              href={REPO_URL}
              target="_blank"
              rel="noreferrer"
              className="border-b border-transparent pb-0.5 text-ink-muted hover:border-accent hover:text-accent"
            >
              GitHub
            </a>
            <a
              href={NPM_URL}
              target="_blank"
              rel="noreferrer"
              className="border-b border-transparent pb-0.5 text-ink-muted hover:border-accent hover:text-accent"
            >
              npm
            </a>
          </div>
        </div>

        <HeroMapPreview />
      </div>
    </section>
  );
}
