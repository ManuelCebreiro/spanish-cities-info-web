"use client";

import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, CircleMarker } from "react-leaflet";

export type PreviewPoint = { name: string; lat: number; lon: number };

export default function MiniLeafletMap({ points }: { points: PreviewPoint[] }) {
  return (
    <MapContainer
      center={[40.0, -3.5]}
      zoom={5.5}
      zoomSnap={0.25}
      zoomControl={false}
      dragging={false}
      scrollWheelZoom={false}
      doubleClickZoom={false}
      boxZoom={false}
      keyboard={false}
      touchZoom={false}
      attributionControl={true}
      className="h-full w-full"
      aria-label="Mapa de referencia de España con doce municipios de ejemplo"
    >
      <TileLayer
        className="map-mono-tiles"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {points.map((p) => (
        <CircleMarker
          key={p.name}
          center={[p.lat, p.lon]}
          radius={5}
          pathOptions={{ color: "#4a6741", weight: 1.5, fillColor: "#c17817", fillOpacity: 1 }}
        />
      ))}
    </MapContainer>
  );
}
