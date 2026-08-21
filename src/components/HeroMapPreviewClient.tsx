"use client";

import dynamic from "next/dynamic";
import type { PreviewPoint } from "@/components/MiniLeafletMap";

const MiniLeafletMap = dynamic(() => import("@/components/MiniLeafletMap"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full min-h-72 w-full items-center justify-center font-mono text-xs text-ink-muted">
      Cargando mapa…
    </div>
  ),
});

export function HeroMapPreviewClient({ points }: { points: PreviewPoint[] }) {
  return <MiniLeafletMap points={points} />;
}
