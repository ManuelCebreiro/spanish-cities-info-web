import type { Metadata } from "next";
import { Big_Shoulders, IBM_Plex_Mono, IBM_Plex_Sans } from "next/font/google";
import "./globals.css";

const bigShoulders = Big_Shoulders({
  variable: "--font-big-shoulders",
  subsets: ["latin"],
  weight: ["600", "700", "800", "900"],
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const plexSans = IBM_Plex_Sans({
  variable: "--font-plex-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://cities.manuelcebreiro.com"),
  title: {
    default: "spanish-cities-info — 8.132 municipios de España en npm",
    template: "%s — spanish-cities-info",
  },
  description:
    "Paquete npm con los 8.132 municipios de España verificados contra el INE. Búsqueda por radio, imports modulares por provincia/comunidad, TypeScript, ~330 KB / ~125 KB gzip.",
  authors: [{ name: "Manuel Cebreiro", url: "https://manuelcebreiro.com" }],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      data-scroll-behavior="smooth"
      className={`${bigShoulders.variable} ${plexMono.variable} ${plexSans.variable} h-full antialiased`}
    >
      <body
        className="min-h-full flex flex-col bg-paper text-ink"
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
