import { getCityByName } from "spanish-cities-info";
import { HeroMapPreviewClient } from "@/components/HeroMapPreviewClient";
import type { PreviewPoint } from "@/components/MiniLeafletMap";

const PREVIEW_CITIES = [
  "Madrid",
  "Barcelona",
  "València",
  "Sevilla",
  "Zaragoza",
  "Bilbao",
  "Málaga",
  "Ferrol",
  "Palma",
  "Vigo",
  "Murcia",
  "Gijón",
];

function resolvePreviewPoints(): PreviewPoint[] {
  return PREVIEW_CITIES.map((name) => {
    const matches = getCityByName(name);
    const city = matches.find((c) => c.name === name) ?? matches[0];
    if (!city) return null;
    return { name: city.name, lat: city.latitude, lon: city.longitude };
  }).filter((p): p is PreviewPoint => p !== null);
}

export function HeroMapPreview() {
  const points = resolvePreviewPoints();

  return (
    <div className="border border-line bg-paper-raised p-4">
      <div className="h-72 w-full sm:h-80">
        <HeroMapPreviewClient points={points} />
      </div>
      <p className="mt-3 font-mono text-[10px] tracking-widest text-ink-muted">
        getCityByName() × 12 · VISTA PREVIA
      </p>
    </div>
  );
}
