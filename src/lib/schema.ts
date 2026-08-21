import { FAQ_ITEMS, REPO_URL, NPM_URL, AUTHOR_URL, STATS } from "@/lib/content";

const SITE_URL = "https://cities.manuelcebreiro.com";
const AUTHOR_ID = `${SITE_URL}#author`;

export function personSchema() {
  return {
    "@type": "Person",
    "@id": AUTHOR_ID,
    name: "Manuel Cebreiro",
    jobTitle: "Full Stack Developer",
    url: AUTHOR_URL,
    sameAs: [REPO_URL.replace("/spanish-cities-info", ""), AUTHOR_URL],
    address: {
      "@type": "PostalAddress",
      addressLocality: "A Coruña / Ferrol",
      addressCountry: "ES",
    },
    knowsAbout: [
      "TypeScript",
      "JavaScript",
      "Next.js",
      "Cloud architecture",
      "Datos geográficos de España",
    ],
    hasCredential: [
      {
        "@type": "EducationalOccupationalCredential",
        credentialCategory: "certification",
        name: "AWS Cloud Solutions Architect",
      },
      {
        "@type": "EducationalOccupationalCredential",
        credentialCategory: "certification",
        name: "AWS Generative AI with Amazon Bedrock",
      },
      {
        "@type": "EducationalOccupationalCredential",
        credentialCategory: "certification",
        name: "Google IT Automation with Python",
      },
    ],
  };
}

export function softwareSchema() {
  return {
    "@type": "SoftwareSourceCode",
    name: "spanish-cities-info",
    description:
      "Paquete npm en TypeScript con los 8.132 municipios de España verificados contra el INE. Búsqueda por radio, imports modulares por provincia y comunidad autónoma.",
    codeRepository: REPO_URL,
    programmingLanguage: "TypeScript",
    runtimePlatform: "Node.js",
    license: "https://opensource.org/licenses/ISC",
    url: SITE_URL,
    downloadUrl: NPM_URL,
    author: { "@id": AUTHOR_ID },
    creator: { "@id": AUTHOR_ID },
    codeSampleType: "full",
    keywords: [
      "municipios españa",
      "provincias españa json",
      "codigo INE",
      "comunidades autónomas españa",
      "typescript npm package",
    ].join(", "),
  };
}

export function faqSchema() {
  return {
    "@type": "FAQPage",
    mainEntity: FAQ_ITEMS.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export function howToSchema() {
  return {
    "@type": "HowTo",
    name: "Cómo instalar y buscar municipios cercanos con spanish-cities-info",
    description:
      "Pasos para instalar el paquete, importar sus funciones y buscar municipios dentro de un radio en km de una ciudad de referencia.",
    step: [
      {
        "@type": "HowToStep",
        name: "Instalar el paquete",
        text: "Ejecuta npm install spanish-cities-info en tu proyecto.",
      },
      {
        "@type": "HowToStep",
        name: "Importar la función",
        text: "Importa getCitiesInRange (u otra función) desde 'spanish-cities-info'.",
      },
      {
        "@type": "HowToStep",
        name: "Buscar municipios por radio",
        text: "Llama a getCitiesInRange('Ferrol', 10) para obtener los municipios dentro de 10 km de Ferrol.",
      },
      {
        "@type": "HowToStep",
        name: "Mostrar los resultados en un mapa (opcional)",
        text: "Usa las coordenadas latitude/longitude de cada municipio devuelto para pintarlos en un mapa, por ejemplo con Leaflet.",
      },
    ],
  };
}

export function jsonLdGraph() {
  return {
    "@context": "https://schema.org",
    "@graph": [personSchema(), softwareSchema(), faqSchema(), howToSchema()],
  };
}

export const SEO_STATS = STATS;
