"use client";

import { useEffect, useRef, useState } from "react";
import type { SectionPoint } from "@/lib/reference-points";
import { formatCoordinate } from "@/lib/reference-points";

export function Graticule({ points }: { points: SectionPoint[] }) {
  const [activeId, setActiveId] = useState(points[0]?.sectionId);
  const ratios = useRef<Map<string, number>>(new Map());

  useEffect(() => {
    const sections = points
      .map((p) => document.getElementById(p.sectionId))
      .filter((el): el is HTMLElement => el !== null);

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          ratios.current.set(entry.target.id, entry.intersectionRatio);
        }
        let bestId = activeId;
        let bestRatio = -1;
        for (const [id, ratio] of ratios.current) {
          if (ratio > bestRatio) {
            bestRatio = ratio;
            bestId = id;
          }
        }
        if (bestRatio > 0) setActiveId(bestId);
      },
      { threshold: [0, 0.25, 0.5, 0.75, 1] }
    );

    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [points]);

  const active = points.find((p) => p.sectionId === activeId) ?? points[0];
  if (!active) return null;

  return (
    <>
      <RulerRail point={active} side="left" />
      <RulerRail point={active} side="right" />
    </>
  );
}

function RulerRail({ point, side }: { point: SectionPoint; side: "left" | "right" }) {
  const ticks = Array.from({ length: 12 });
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none fixed inset-y-0 z-10 hidden w-8 lg:flex ${
        side === "left" ? "left-2" : "right-2"
      } flex-col items-center justify-between py-24`}
    >
      {ticks.map((_, i) => (
        <span key={i} className="h-px w-3 bg-line" />
      ))}
      <div
        className={`absolute top-1/2 -translate-y-1/2 whitespace-nowrap font-mono text-[10px] tracking-widest text-ink-muted transition-opacity duration-300 ${
          side === "left" ? "left-1/2 origin-left -rotate-90" : "right-1/2 origin-right -rotate-90"
        }`}
      >
        {point.sheetNumber} · {point.cityName.toUpperCase()} · {formatCoordinate(point.lat, point.lon)}
      </div>
    </div>
  );
}
