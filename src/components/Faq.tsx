import { SectionMarker } from "@/components/SectionMarker";
import { FAQ_ITEMS } from "@/lib/content";

export function Faq() {
  return (
    <section id="faq" className="mx-auto max-w-6xl px-6 py-16 sm:px-10">
      <SectionMarker sheetNumber="07" title="Preguntas frecuentes" />
      <div className="divide-y divide-line border-t border-b border-line">
        {FAQ_ITEMS.map((item) => (
          <details key={item.id} className="group py-4">
            <summary className="flex cursor-pointer list-none items-start justify-between gap-4 font-mono text-sm marker:content-none [&::-webkit-details-marker]:hidden">
              <span className="text-ink">{item.question}</span>
              <span
                aria-hidden="true"
                className="mt-0.5 shrink-0 font-mono text-accent select-none"
              >
                <span className="inline group-open:hidden">+</span>
                <span className="hidden group-open:inline">−</span>
              </span>
            </summary>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-ink-muted">
              {item.answer}
            </p>
          </details>
        ))}
      </div>
    </section>
  );
}
