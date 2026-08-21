"use client";

import { useRef, useState } from "react";
import { SectionMarker } from "@/components/SectionMarker";
import { CODE_EXAMPLES } from "@/lib/content";

export function CodeExamples() {
  const [activeIndex, setActiveIndex] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const active = CODE_EXAMPLES[activeIndex];

  function focusTab(index: number) {
    const wrapped = (index + CODE_EXAMPLES.length) % CODE_EXAMPLES.length;
    setActiveIndex(wrapped);
    tabRefs.current[wrapped]?.focus();
  }

  function onKeyDown(e: React.KeyboardEvent) {
    switch (e.key) {
      case "ArrowRight":
        e.preventDefault();
        focusTab(activeIndex + 1);
        break;
      case "ArrowLeft":
        e.preventDefault();
        focusTab(activeIndex - 1);
        break;
      case "Home":
        e.preventDefault();
        focusTab(0);
        break;
      case "End":
        e.preventDefault();
        focusTab(CODE_EXAMPLES.length - 1);
        break;
    }
  }

  return (
    <section id="api" className="mx-auto max-w-6xl px-6 py-16 sm:px-10">
      <SectionMarker sheetNumber="04" title="API" />

      <div
        role="tablist"
        aria-label="Funciones exportadas por spanish-cities-info"
        onKeyDown={onKeyDown}
        className="flex flex-wrap gap-x-1 gap-y-2 border-b border-line"
      >
        {CODE_EXAMPLES.map((ex, i) => {
          const selected = i === activeIndex;
          return (
            <button
              key={ex.id}
              ref={(el) => {
                tabRefs.current[i] = el;
              }}
              id={`tab-${ex.id}`}
              role="tab"
              type="button"
              aria-selected={selected}
              aria-controls={`panel-${ex.id}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActiveIndex(i)}
              className={`border-b-2 px-3 py-2 font-mono text-xs tracking-wide whitespace-nowrap uppercase transition-colors ${
                selected
                  ? "border-ochre text-ink"
                  : "border-transparent text-ink-muted hover:text-ink"
              }`}
            >
              {ex.label}
            </button>
          );
        })}
      </div>

      {CODE_EXAMPLES.map((ex, i) => (
        <div
          key={ex.id}
          id={`panel-${ex.id}`}
          role="tabpanel"
          aria-labelledby={`tab-${ex.id}`}
          hidden={i !== activeIndex}
          tabIndex={0}
          className="pt-6"
        >
          <p className="max-w-2xl text-sm text-ink-muted">{ex.description}</p>
          <pre className="mt-4 overflow-x-auto border-l-2 border-ochre bg-paper-raised p-4 font-mono text-sm leading-relaxed">
            <code>{ex.code}</code>
          </pre>
        </div>
      ))}

      <p className="sr-only" aria-live="polite">
        {active ? `Mostrando ejemplo de ${active.label}` : ""}
      </p>
    </section>
  );
}
