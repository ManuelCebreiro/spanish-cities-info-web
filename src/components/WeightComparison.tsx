import { SectionMarker } from "@/components/SectionMarker";
import { WEIGHT_COMPARISON } from "@/lib/content";

export function WeightComparison() {
  return (
    <section id="comparativa" className="border-y border-line bg-paper-raised">
      <div className="mx-auto max-w-6xl px-6 py-16 sm:px-10">
        <SectionMarker sheetNumber="06" title="Comparativa de peso" />

        <div className="max-w-3xl overflow-x-auto">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="border-b border-line font-mono text-xs tracking-widest text-ink-muted uppercase">
                <th scope="col" className="py-2 pr-4 font-normal">
                  Paquete
                </th>
                <th scope="col" className="py-2 pr-4 font-normal">
                  Peso
                </th>
                <th scope="col" className="py-2 font-normal">
                  Nota
                </th>
              </tr>
            </thead>
            <tbody>
              {WEIGHT_COMPARISON.map((row) => (
                <tr key={row.name} className="border-b border-line">
                  <td
                    className={`py-3 pr-4 font-mono text-sm ${
                      row.isSubject ? "font-semibold text-ink" : "text-ink-muted"
                    }`}
                  >
                    {row.name}
                  </td>
                  <td
                    className={`py-3 pr-4 font-mono text-sm tabular-nums ${
                      row.isSubject ? "text-accent" : "text-ink-muted"
                    }`}
                  >
                    {row.weight}
                  </td>
                  <td className="py-3 text-sm text-ink-muted">{row.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="mt-6 max-w-2xl text-xs text-ink-muted">
          Datos verificados con Bundlephobia y con un bundle real (esbuild,
          minificado + gzip) para el import principal de spanish-cities-info.
        </p>
      </div>
    </section>
  );
}
