"use client";

import { useId, useMemo, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { getAllCities, getCitiesInRange } from "spanish-cities-info";
import { SectionMarker } from "@/components/SectionMarker";
import type { City } from "@/lib/types";

const LeafletMap = dynamic(() => import("@/components/LeafletMap"), {
  ssr: false,
  loading: () => (
    <div className="flex h-[420px] w-full items-center justify-center border border-line bg-paper-raised font-mono text-xs text-ink-muted">
      Cargando mapa…
    </div>
  ),
});

const DEFAULT_CITY = "Ferrol";
const MIN_RADIUS = 5;
const MAX_RADIUS = 100;
const DEFAULT_RADIUS = 15;

export function MapDemo() {
  const allCities = useMemo(() => getAllCities(), []);
  const [query, setQuery] = useState(DEFAULT_CITY);
  const [referenceCity, setReferenceCity] = useState<City | undefined>(() =>
    allCities.find((c) => c.name === DEFAULT_CITY)
  );
  const [radius, setRadius] = useState(DEFAULT_RADIUS);
  const [comboOpen, setComboOpen] = useState(false);
  const [activeOption, setActiveOption] = useState(-1);
  const listboxId = useId();
  const inputRef = useRef<HTMLInputElement>(null);

  const suggestions = useMemo(() => {
    if (!comboOpen || query.trim().length === 0) return [];
    const q = query.trim().toLowerCase();
    return allCities
      .filter((c) => c.name.toLowerCase().includes(q))
      .slice(0, 8);
  }, [allCities, query, comboOpen]);

  const results = useMemo(() => {
    if (!referenceCity) return [];
    return getCitiesInRange(referenceCity.ineCode, radius);
  }, [referenceCity, radius]);

  function selectCity(city: City) {
    setReferenceCity(city);
    setQuery(city.name);
    setComboOpen(false);
    setActiveOption(-1);
  }

  function onInputKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (!comboOpen && (e.key === "ArrowDown" || e.key === "ArrowUp")) {
      setComboOpen(true);
      return;
    }
    if (!comboOpen) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveOption((i) => Math.min(i + 1, suggestions.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveOption((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter") {
      if (activeOption >= 0 && suggestions[activeOption]) {
        e.preventDefault();
        selectCity(suggestions[activeOption]);
      }
    } else if (e.key === "Escape") {
      setComboOpen(false);
      setActiveOption(-1);
    }
  }

  return (
    <section id="demo" className="mx-auto max-w-6xl px-6 py-16 sm:px-10">
      <SectionMarker sheetNumber="03" title="Búsqueda por radio" />

      <div className="mb-6 flex flex-wrap items-end gap-x-10 gap-y-6">
        <div className="relative w-64">
          <label htmlFor="city-combobox" className="mb-1.5 block font-mono text-xs tracking-widest text-ink-muted uppercase">
            Ciudad de referencia
          </label>
          <input
            ref={inputRef}
            id="city-combobox"
            role="combobox"
            aria-expanded={comboOpen && suggestions.length > 0}
            aria-controls={listboxId}
            aria-autocomplete="list"
            aria-activedescendant={activeOption >= 0 ? `${listboxId}-opt-${activeOption}` : undefined}
            autoComplete="off"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setComboOpen(true);
              setActiveOption(-1);
            }}
            onFocus={() => setComboOpen(true)}
            onBlur={() => setTimeout(() => setComboOpen(false), 120)}
            onKeyDown={onInputKeyDown}
            className="w-full border border-line bg-paper px-3 py-2 font-mono text-sm text-ink focus-visible:outline-2 focus-visible:outline-ochre"
          />
          {comboOpen && suggestions.length > 0 && (
            <ul
              id={listboxId}
              role="listbox"
              aria-label="Sugerencias de municipios"
              className="absolute z-[1200] mt-1 max-h-64 w-full overflow-y-auto border border-line bg-paper shadow-none"
            >
              {suggestions.map((c, i) => (
                <li
                  key={c.ineCode}
                  id={`${listboxId}-opt-${i}`}
                  role="option"
                  aria-selected={i === activeOption}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    selectCity(c);
                  }}
                  className={`cursor-pointer px-3 py-2 font-mono text-sm ${
                    i === activeOption ? "bg-ochre text-paper" : "text-ink hover:bg-paper-raised"
                  }`}
                >
                  {c.name} <span className="text-xs opacity-70">({c.province})</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="w-64">
          <label htmlFor="radius-range" className="mb-1.5 flex justify-between font-mono text-xs tracking-widest text-ink-muted uppercase">
            <span>Radio</span>
            <span className="text-ink tabular-nums">{radius} km</span>
          </label>
          <input
            id="radius-range"
            type="range"
            min={MIN_RADIUS}
            max={MAX_RADIUS}
            step={1}
            value={radius}
            onChange={(e) => setRadius(Number(e.target.value))}
            className="w-full accent-ochre"
          />
        </div>

        <p className="font-mono text-sm text-ink-muted">
          {referenceCity ? (
            <>
              <strong className="text-ochre tabular-nums">{results.length}</strong>{" "}
              municipios en {radius} km alrededor de {referenceCity.name}
            </>
          ) : (
            "Elige una ciudad de referencia"
          )}
        </p>
      </div>

      <LeafletMap referenceCity={referenceCity} radiusKm={radius} results={results} />

      {results.length > 0 && (
        <ul className="mt-6 flex flex-wrap gap-x-4 gap-y-1 font-mono text-xs text-ink-muted">
          {results.slice(0, 24).map((c) => (
            <li key={c.ineCode}>{c.name}</li>
          ))}
          {results.length > 24 && <li>+{results.length - 24} más</li>}
        </ul>
      )}
    </section>
  );
}
