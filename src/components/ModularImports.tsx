import { SectionMarker } from "@/components/SectionMarker";
import bundleSizes from "@/lib/bundle-sizes.json";

const { full, "comunidad-galicia": galicia } = bundleSizes.results;

const bars = [
  { label: "import completo", gzipKB: full.gzipBytes / 1024, highlight: false },
  {
    label: "comunidades/galicia",
    gzipKB: galicia.gzipBytes / 1024,
    highlight: true,
  },
];

const maxKB = Math.max(...bars.map((b) => b.gzipKB));

export function ModularImports() {
  return (
    <section id="modulares" className="mx-auto max-w-6xl px-6 py-16 sm:px-10">
      <SectionMarker sheetNumber="05" title="Imports modulares" />

      <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr]">
        <div className="min-w-0">
          <p className="max-w-xl text-ink-muted">
            Si solo necesitas los municipios de una provincia o comunidad
            autónoma, puedes importar directamente esa zona sin cargar el
            dataset completo. Cada import modular es autocontenido: un
            bundler que resuelva{" "}
            <code className="font-mono text-sm">
              spanish-cities-info/provincias/lugo
            </code>{" "}
            solo incluye los municipios de Lugo, no el resto de España.
          </p>

          <pre className="mt-6 overflow-x-auto border-l-2 border-topo-green bg-paper-raised p-4 font-mono text-sm leading-relaxed">
            <code>{`import { cities } from 'spanish-cities-info/provincias/lugo';
// 67 municipios de Lugo

import { cities } from 'spanish-cities-info/comunidades/galicia';
// 313 municipios: A Coruña + Lugo + Ourense + Pontevedra`}</code>
          </pre>

          <p className="mt-4 text-xs text-ink-muted">
            El slug es el nombre de la provincia/comunidad en minúsculas, sin
            tildes ni ñ, con espacios sustituidos por guiones — por ejemplo{" "}
            <code className="font-mono">getProvinces()</code> devuelve{" "}
            <code className="font-mono">&apos;A Coruña&apos;</code> y el
            import correspondiente es{" "}
            <code className="font-mono">
              spanish-cities-info/provincias/a-coruna
            </code>
            .
          </p>
        </div>

        <div className="min-w-0 border border-line bg-paper-raised p-6">
          <p className="font-mono text-xs tracking-widest text-ink-muted uppercase">
            Peso real (gzip), medido con esbuild
          </p>
          <div className="mt-6 space-y-6">
            {bars.map((bar) => (
              <div key={bar.label}>
                <div className="flex items-baseline justify-between font-mono text-xs">
                  <span className="text-ink">{bar.label}</span>
                  <span className="tabular-nums text-ink-muted">
                    {bar.gzipKB.toFixed(1)} KB
                  </span>
                </div>
                <div className="mt-1.5 h-2 w-full bg-paper">
                  <div
                    className={bar.highlight ? "h-full bg-accent" : "h-full bg-ink-muted"}
                    style={{ width: `${(bar.gzipKB / maxKB) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
          <p className="mt-6 text-xs text-ink-muted">
            Importar solo Galicia pesa un{" "}
            <strong className="text-ink">
              {((galicia.gzipBytes / full.gzipBytes) * 100).toFixed(1)}%
            </strong>{" "}
            del import completo.
          </p>
        </div>
      </div>
    </section>
  );
}
