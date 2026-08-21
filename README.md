# spanish-cities-info-web

Landing interactiva del paquete npm [`spanish-cities-info`](https://www.npmjs.com/package/spanish-cities-info) — 8.132 municipios de España verificados contra el INE. Muestra la API en vivo (búsqueda por radio, imports modulares por provincia/comunidad) con mapa, ejemplos de código y comparativa de peso frente a paquetes similares.

- Paquete: [npmjs.com/package/spanish-cities-info](https://www.npmjs.com/package/spanish-cities-info)
- Repo del paquete: [github.com/ManuelCebreiro/spanish-cities-info](https://github.com/ManuelCebreiro/spanish-cities-info)

## Getting Started

```bash
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) para ver el resultado.

## Estructura

Componentes principales en [src/components/](src/components/):

- [Hero.tsx](src/components/Hero.tsx) — cabecera con el dato clave del paquete y CTA de instalación
- [AeoSummary.tsx](src/components/AeoSummary.tsx) — resumen verificable pensado para LLMs
- [MapDemo.tsx](src/components/MapDemo.tsx) / [LeafletMap.tsx](src/components/LeafletMap.tsx) — demo interactiva de `getCitiesInRange` sobre Leaflet
- [CodeExamples.tsx](src/components/CodeExamples.tsx) — snippets de cada función exportada por el paquete
- [ModularImports.tsx](src/components/ModularImports.tsx) — imports por provincia/comunidad
- [WeightComparison.tsx](src/components/WeightComparison.tsx) — comparativa de peso vs. paquetes similares
- [Faq.tsx](src/components/Faq.tsx) — acordeón de preguntas frecuentes (sincronizado con schema `FAQPage`)
- [Footer.tsx](src/components/Footer.tsx) — enlaces a GitHub, npm, licencia y autor

## Stack

- [Next.js](https://nextjs.org) (App Router) + TypeScript
- [Leaflet](https://leafletjs.com) / [react-leaflet](https://react-leaflet.js.org) sobre OpenStreetMap para el mapa interactivo
- Tailwind CSS

Desplegado en Vercel.

## License

MIT © [Manuel Cebreiro](https://manuelcebreiro.com)
