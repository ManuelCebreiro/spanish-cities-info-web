import bundleSizes from "@/lib/bundle-sizes.json";

export const PACKAGE_NAME = "spanish-cities-info";
export const REPO_URL = "https://github.com/ManuelCebreiro/spanish-cities-info";
export const NPM_URL = "https://www.npmjs.com/package/spanish-cities-info";
export const AUTHOR_URL = "https://manuelcebreiro.com";

const { full, "postal-codes": postalCodes } = bundleSizes.results;

export const STATS = {
  totalCities: 8132,
  totalProvinces: 52,
  totalCommunities: 19,
  ineVerifiedDate: "2026-01-01",
  mainImportMinifiedKB: Math.round((full.minifiedBytes / 1024) * 10) / 10,
  mainImportGzipKB: Math.round((full.gzipBytes / 1024) * 10) / 10,
  postalCodesGzipKB: Math.round((postalCodes.gzipBytes / 1024) * 10) / 10,
  competitorAllSpanishCitiesKB: 800,
};

export type CodeExample = {
  id: string;
  label: string;
  description: string;
  code: string;
};

export const CODE_EXAMPLES: CodeExample[] = [
  {
    id: "getCitiesInRange",
    label: "getCitiesInRange",
    description:
      "Municipios dentro de un radio en km de una ciudad de referencia. No incluye la propia ciudad de referencia.",
    code: `import { getCitiesInRange } from 'spanish-cities-info';

getCitiesInRange('Ferrol', 10).map((c) => c.name);
// ['Ares', 'Mugardos', 'Narón']`,
  },
  {
    id: "getAllCities",
    label: "getAllCities",
    description: "Devuelve los 8.132 municipios, ordenados alfabéticamente por nombre.",
    code: `import { getAllCities } from 'spanish-cities-info';

getAllCities();
// [{ name: 'A Baña', ineCode: '15007', province: 'A Coruña',
//    community: 'Galicia', latitude: 42.9634, longitude: -8.7529 }, ...]`,
  },
  {
    id: "getCityByCityCode",
    label: "getCityByCityCode",
    description: "Busca un municipio por su código INE de 5 dígitos. Devuelve undefined si no existe.",
    code: `import { getCityByCityCode } from 'spanish-cities-info';

getCityByCityCode('15036');
// { name: 'Ferrol', ineCode: '15036', province: 'A Coruña',
//   community: 'Galicia', latitude: 43.5098, longitude: -8.2704 }`,
  },
  {
    id: "getCityByName",
    label: "getCityByName",
    description: "Busca municipios cuyo nombre contenga el texto indicado. No distingue mayúsculas/minúsculas.",
    code: `import { getCityByName } from 'spanish-cities-info';

getCityByName('Ferrol');
// [{ name: 'Ferrol', ineCode: '15036', province: 'A Coruña', ... }]`,
  },
  {
    id: "getCitiesByProvince",
    label: "getCitiesByProvince",
    description: "Todos los municipios de una provincia. Útil para un select en cascada en un formulario.",
    code: `import { getCitiesByProvince } from 'spanish-cities-info';

getCitiesByProvince('Melilla');
// [{ name: 'Melilla', ineCode: '52001', province: 'Melilla',
//    community: 'Melilla', latitude: 35.291, longitude: -2.9505 }]`,
  },
  {
    id: "getCitiesByCommunity",
    label: "getCitiesByCommunity",
    description: "Todos los municipios de una comunidad autónoma.",
    code: `import { getCitiesByCommunity } from 'spanish-cities-info';

getCitiesByCommunity('Melilla');
// [{ name: 'Melilla', ineCode: '52001', province: 'Melilla', ... }]`,
  },
  {
    id: "getCitiesByIsland",
    label: "getCitiesByIsland",
    description:
      "Todos los municipios de una isla. Solo aplica a los 155 municipios de Illes Balears, Las Palmas y Santa Cruz de Tenerife: el resto de España no tiene este dato y su island es undefined.",
    code: `import { getCitiesByIsland } from 'spanish-cities-info';

getCitiesByIsland('Menorca');
// [{ name: 'Alaior', ineCode: '07002', province: 'Illes Balears',
//    community: 'Illes Balears', island: 'Menorca',
//    latitude: 39.9339, longitude: 4.1403 }, ...]`,
  },
  {
    id: "getProvinces",
    label: "getProvinces",
    description: "Listado de las 52 provincias, ordenado alfabéticamente.",
    code: `import { getProvinces } from 'spanish-cities-info';

getProvinces();
// ['A Coruña', 'Alacant', 'Albacete', 'Almería', 'Araba', ...]`,
  },
  {
    id: "getCommunities",
    label: "getCommunities",
    description: "Listado de las 19 comunidades y ciudades autónomas, sin duplicados.",
    code: `import { getCommunities } from 'spanish-cities-info';

getCommunities();
// ['Andalucía', 'Aragón', 'Asturias', 'Canarias', 'Cantabria', ...]`,
  },
];

export type FaqItem = {
  id: string;
  question: string;
  answer: string;
};

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: "gratis",
    question: "¿Es gratis?",
    answer:
      "Sí. spanish-cities-info se publica bajo licencia ISC, que permite uso comercial y no comercial sin coste ni atribución obligatoria.",
  },
  {
    id: "peso",
    question: "¿Cuánto pesa el paquete en mi bundle?",
    answer: `El import principal (spanish-cities-info) pesa ~${STATS.mainImportMinifiedKB} KB minificado y ~${STATS.mainImportGzipKB} KB con gzip, medido con un bundle real (esbuild), no solo con la calculadora de Bundlephobia. Si solo necesitas una provincia o comunidad, los imports modulares pesan una fracción de eso: por ejemplo, la comunidad de Galicia entera son ~${Math.round((bundleSizes.results["comunidad-galicia"].minifiedBytes / 1024) * 10) / 10} KB minificados (~${Math.round((bundleSizes.results["comunidad-galicia"].gzipBytes / 1024) * 10) / 10} KB gzip).`,
  },
  {
    id: "codigos-postales",
    question: "¿Tiene códigos postales?",
    answer: `Sí, como import opcional separado: spanish-cities-info/postal-codes, con getPostalCodes(ineCode). No forma parte de City ni del import principal — así quien no los necesita no paga su peso (~${STATS.postalCodesGzipKB} KB gzip adicional si lo importas). La cobertura puede tener huecos en zonas rurales: la fuente es el callejero censal del INE, que a veces no tiene ningún tramo censado bajo el código INE de una parroquia o núcleo disperso.`,
  },
  {
    id: "verificado",
    question: "¿Los datos están verificados contra alguna fuente oficial?",
    answer:
      "Sí. Los municipios y códigos INE proceden del Instituto Nacional de Estadística, a fecha 01-01-2026. Las comunidades autónomas están verificadas contra el mismo lookup provincia → comunidad del INE.",
  },
  {
    id: "actualizacion",
    question: "¿Con qué frecuencia se actualiza el dataset?",
    answer:
      "El INE publica actualizaciones del callejero de municipios periódicamente, normalmente cada enero y a veces también en julio. Cuando hay una versión nueva, se descarga el fichero oficial y se compara contra el dataset actual con un script de reconciliación para detectar altas, bajas y cambios de nombre antes de publicar la actualización del paquete.",
  },
  {
    id: "typescript",
    question: "¿Funciona con TypeScript?",
    answer:
      "Sí, el paquete está escrito en TypeScript y publica sus propios tipos (.d.ts), incluyendo el tipo City para cada municipio.",
  },
  {
    id: "diferencia",
    question: "¿Qué diferencia hay con otros paquetes similares de ciudades de España?",
    answer:
      "Dos cosas principalmente: los datos están verificados y reconciliados contra el INE de forma explícita y repetible, y el paquete ofrece imports modulares por provincia y comunidad autónoma además del import completo — algo que paquetes como all-spanish-cities o country-state-city no ofrecen para España específicamente.",
  },
  {
    id: "radio",
    question: "¿Cómo busco ciudades cerca de una ubicación?",
    answer:
      "Con getCitiesInRange(ciudadDeReferencia, radioEnKm). Devuelve todos los municipios dentro de ese radio, sin incluir la ciudad de referencia. Puedes probarlo en vivo en la demo interactiva de esta página.",
  },
  {
    id: "modulares",
    question: "¿Puedo importar solo una provincia o comunidad sin cargar el dataset completo?",
    answer:
      "Sí. spanish-cities-info/provincias/<slug> y spanish-cities-info/comunidades/<slug> son imports autocontenidos: un bundler que resuelva spanish-cities-info/provincias/lugo solo incluye los municipios de Lugo, no el resto de España.",
  },
];

export const WEIGHT_COMPARISON = [
  {
    name: "spanish-cities-info",
    weight: `${STATS.mainImportMinifiedKB} KB / ${STATS.mainImportGzipKB} KB gzip`,
    note: "import principal, medido con bundle real",
    isSubject: true,
  },
  {
    name: "all-spanish-cities",
    weight: "~800 KB",
    note: "sin imports modulares por provincia/comunidad",
    isSubject: false,
  },
  {
    name: "country-state-city",
    weight: "varios MB",
    note: "dataset mundial, no específico de España",
    isSubject: false,
  },
  {
    name: "spanish-cities-info/postal-codes",
    weight: `~${STATS.postalCodesGzipKB} KB gzip`,
    note: "solo si lo importas — opcional, no forma parte del import principal",
    isSubject: false,
  },
];
