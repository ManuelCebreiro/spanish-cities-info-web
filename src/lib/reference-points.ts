import { getCityByName } from "spanish-cities-info";

export type SectionPoint = {
  sectionId: string;
  sheetNumber: string;
  cityName: string;
  lat: number;
  lon: number;
};

const SECTION_CITIES: { sectionId: string; sheetNumber: string; city: string }[] = [
  { sectionId: "hero", sheetNumber: "01", city: "Madrid" },
  { sectionId: "resumen", sheetNumber: "02", city: "Barcelona" },
  { sectionId: "demo", sheetNumber: "03", city: "València" },
  { sectionId: "api", sheetNumber: "04", city: "Bilbao" },
  { sectionId: "modulares", sheetNumber: "05", city: "Zaragoza" },
  { sectionId: "comparativa", sheetNumber: "06", city: "Sevilla" },
  { sectionId: "faq", sheetNumber: "07", city: "Malaga" },
  { sectionId: "footer", sheetNumber: "08", city: "Ferrol" },
];

function resolveCity(name: string) {
  const matches = getCityByName(name);
  const exact = matches.find((c) => c.name.toLowerCase() === name.toLowerCase());
  const city = exact ?? matches[0];
  if (!city) {
    throw new Error(`No se encontró la ciudad de referencia "${name}" en spanish-cities-info`);
  }
  return city;
}

export function getSectionReferencePoints(): SectionPoint[] {
  return SECTION_CITIES.map(({ sectionId, sheetNumber, city }) => {
    const c = resolveCity(city);
    return {
      sectionId,
      sheetNumber,
      cityName: c.name,
      lat: c.latitude,
      lon: c.longitude,
    };
  });
}

export function formatCoordinate(lat: number, lon: number): string {
  const ns = lat >= 0 ? "N" : "S";
  const ew = lon >= 0 ? "E" : "W";
  return `${Math.abs(lat).toFixed(4)}°${ns}  ${Math.abs(lon).toFixed(4)}°${ew}`;
}
