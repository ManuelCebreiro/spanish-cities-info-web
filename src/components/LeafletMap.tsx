"use client";

import "leaflet/dist/leaflet.css";
import { useEffect } from "react";
import { MapContainer, TileLayer, CircleMarker, Circle, useMap } from "react-leaflet";
import type { City } from "@/lib/types";

function radiusToZoom(radiusKm: number) {
  const zoom = 13 - Math.log2(Math.max(radiusKm, 1) / 5);
  return Math.min(13, Math.max(6, Math.round(zoom)));
}

function prefersReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function Recenter({ lat, lon, zoom }: { lat: number; lon: number; zoom: number }) {
  const map = useMap();
  useEffect(() => {
    map.setView([lat, lon], zoom, { animate: !prefersReducedMotion() });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lat, lon, zoom]);
  return null;
}

export default function LeafletMap({
  referenceCity,
  radiusKm,
  results,
}: {
  referenceCity: City | undefined;
  radiusKm: number;
  results: City[];
}) {
  const center: [number, number] = referenceCity
    ? [referenceCity.latitude, referenceCity.longitude]
    : [40.4168, -3.7038];
  const zoom = radiusToZoom(radiusKm);

  return (
    <div className="h-[420px] w-full overflow-hidden border border-line">
      <MapContainer
        center={center}
        zoom={zoom}
        scrollWheelZoom={false}
        className="h-full w-full"
        attributionControl={true}
      >
        <TileLayer
          className="map-mono-tiles"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {referenceCity && (
          <>
            <Recenter lat={referenceCity.latitude} lon={referenceCity.longitude} zoom={zoom} />
            <Circle
              center={[referenceCity.latitude, referenceCity.longitude]}
              radius={radiusKm * 1000}
              pathOptions={{ color: "#c17817", weight: 1.5, fillColor: "#c17817", fillOpacity: 0.08 }}
            />
            <CircleMarker
              center={[referenceCity.latitude, referenceCity.longitude]}
              radius={7}
              pathOptions={{ color: "#1b2a4a", weight: 2, fillColor: "#c17817", fillOpacity: 1 }}
            >
            </CircleMarker>
          </>
        )}
        {results.map((c) => (
          <CircleMarker
            key={c.ineCode}
            center={[c.latitude, c.longitude]}
            radius={4}
            pathOptions={{ color: "#4a6741", weight: 1, fillColor: "#4a6741", fillOpacity: 0.85 }}
          />
        ))}
      </MapContainer>
    </div>
  );
}
