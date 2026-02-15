"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import type { UrbexLocation } from "@/lib/types";
import { motion } from "framer-motion";

interface MapViewProps {
  locations: UrbexLocation[];
  selectedLocationId?: string;
  onLocationSelect?: (id: string) => void;
}

// Default to San Francisco Bay Area center
const DEFAULT_CENTER: [number, number] = [-122.4194, 37.7749];
const DEFAULT_ZOOM = 9;

// Create SVG pin marker
function createPinElement(isVerified: boolean, isSelected: boolean): HTMLDivElement {
  const size = isSelected ? 36 : 28;
  const color = isVerified ? "#22c55e" : "#f59e0b"; // green-500 : amber-500
  const strokeColor = isSelected ? "#ffffff" : "#1f2937";
  const strokeWidth = isSelected ? 2.5 : 1.5;
  
  const el = document.createElement("div");
  el.style.width = `${size}px`;
  el.style.height = `${size}px`;
  el.style.cursor = "pointer";
  el.style.display = "flex";
  el.style.alignItems = "center";
  el.style.justifyContent = "center";
  
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("width", String(size));
  svg.setAttribute("height", String(size));
  svg.setAttribute("viewBox", "0 0 24 24");
  svg.setAttribute("fill", "none");
  svg.style.transition = "transform 0.15s ease";
  svg.style.transformOrigin = "center bottom";
  
  svg.innerHTML = `
    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" 
          fill="${color}" 
          stroke="${strokeColor}" 
          stroke-width="${strokeWidth}"/>
    <circle cx="12" cy="9" r="2.5" fill="${strokeColor}"/>
  `;
  
  el.appendChild(svg);
  
  el.addEventListener("mouseenter", () => {
    svg.style.transform = "scale(1.2)";
  });
  el.addEventListener("mouseleave", () => {
    svg.style.transform = "scale(1)";
  });
  
  return el;
}

export function MapView({
  locations,
  selectedLocationId,
  onLocationSelect,
}: MapViewProps) {
  const router = useRouter();
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<maplibregl.Map | null>(null);
  const markersRef = useRef<Map<string, maplibregl.Marker>>(new Map());
  const popupsRef = useRef<Map<string, maplibregl.Popup>>(new Map());
  const [mapLoaded, setMapLoaded] = useState(false);

  // Function to add markers to the map
  const addMarkers = useCallback(() => {
    if (!map.current || !mapLoaded) return;

    // Remove old markers and popups
    markersRef.current.forEach((marker) => marker.remove());
    markersRef.current.clear();
    popupsRef.current.forEach((popup) => popup.remove());
    popupsRef.current.clear();

    // Add new markers
    locations.forEach((location) => {
      const isVerified = location.status === "verified";
      const isSelected = selectedLocationId === location.id;
      const el = createPinElement(isVerified, isSelected);

      // Create popup for hover tooltip
      const popup = new maplibregl.Popup({
        closeButton: false,
        closeOnClick: false,
        offset: [0, -30],
        className: "urbex-popup",
      }).setHTML(`
        <div style="
          background: rgba(15, 23, 42, 0.95);
          border: 1px solid rgba(100, 116, 139, 0.3);
          border-radius: 8px;
          padding: 10px 14px;
          min-width: 180px;
          backdrop-filter: blur(8px);
        ">
          <div style="
            font-weight: 600;
            color: #f1f5f9;
            font-size: 13px;
            margin-bottom: 4px;
          ">${location.name}</div>
          <div style="
            display: flex;
            align-items: center;
            gap: 6px;
            margin-bottom: 6px;
          ">
            <span style="
              display: inline-block;
              width: 8px;
              height: 8px;
              border-radius: 50%;
              background: ${isVerified ? "#22c55e" : "#f59e0b"};
            "></span>
            <span style="
              color: ${isVerified ? "#86efac" : "#fcd34d"};
              font-size: 11px;
              text-transform: uppercase;
              letter-spacing: 0.5px;
            ">${isVerified ? "Verified" : "Unverified"}</span>
            <span style="color: #64748b; font-size: 11px;">•</span>
            <span style="color: #94a3b8; font-size: 11px;">${location.confidence}% confidence</span>
          </div>
          <div style="
            color: #94a3b8;
            font-size: 11px;
            line-height: 1.4;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
          ">${location.description.slice(0, 100)}${location.description.length > 100 ? "..." : ""}</div>
          <div style="
            margin-top: 8px;
            color: #38bdf8;
            font-size: 10px;
            font-weight: 500;
          ">Click to view details →</div>
        </div>
      `);

      const marker = new maplibregl.Marker({ element: el, anchor: "bottom" })
        .setLngLat([location.longitude, location.latitude])
        .addTo(map.current!);

      // Show popup on hover
      el.addEventListener("mouseenter", () => {
        popup.setLngLat([location.longitude, location.latitude]).addTo(map.current!);
      });
      el.addEventListener("mouseleave", () => {
        popup.remove();
      });

      // Navigate to location page on click
      el.addEventListener("click", (e) => {
        e.stopPropagation();
        onLocationSelect?.(location.id);
        router.push(`/locations/${location.id}`);
      });

      markersRef.current.set(location.id, marker);
      popupsRef.current.set(location.id, popup);
    });
  }, [locations, selectedLocationId, onLocationSelect, router, mapLoaded]);

  // Initialize map once
  useEffect(() => {
    if (!mapContainer.current || map.current) return;

    // Initialize map with default center
    const instance = new maplibregl.Map({
      container: mapContainer.current,
      style: {
        version: 8,
        sources: {
          "osm-raster": {
            type: "raster",
            tiles: [
              "https://a.tile.openstreetmap.org/{z}/{x}/{y}.png",
              "https://b.tile.openstreetmap.org/{z}/{x}/{y}.png",
              "https://c.tile.openstreetmap.org/{z}/{x}/{y}.png",
            ],
            tileSize: 256,
            attribution:
              '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
          },
        },
        layers: [
          {
            id: "osm-raster",
            type: "raster",
            source: "osm-raster",
            minzoom: 0,
            maxzoom: 19,
          },
        ],
      },
      center: DEFAULT_CENTER,
      zoom: DEFAULT_ZOOM,
    });

    map.current = instance;

    // Wait for map to fully load before adding markers
    instance.on("load", () => {
      setMapLoaded(true);
      
      // Try to get user location and pan to it
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            instance.flyTo({
              center: [position.coords.longitude, position.coords.latitude],
              zoom: DEFAULT_ZOOM,
            });
          },
          () => {
            console.log("Geolocation unavailable, using default center");
          },
          { enableHighAccuracy: false, timeout: 5000 }
        );
      }
    });

    return () => {
      instance.remove();
      map.current = null;
      setMapLoaded(false);
    };
  }, []);

  // Add markers when map is loaded and locations change
  useEffect(() => {
    addMarkers();
  }, [addMarkers]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="relative w-full h-full rounded-lg overflow-hidden glass border border-border/50"
    >
      <div
        ref={mapContainer}
        className="w-full h-full"
        style={{ backgroundColor: "oklch(0.16 0.012 220)" }}
      />
      {/* Legend */}
      <div className="absolute top-4 right-4 bg-black/60 px-3 py-2 rounded-lg text-xs text-white backdrop-blur-sm border border-white/10">
        <div className="flex items-center gap-2 mb-1">
          <span className="w-3 h-3 rounded-full bg-green-500"></span>
          <span>Verified</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-amber-500"></span>
          <span>Unverified</span>
        </div>
      </div>
      <div className="absolute bottom-4 left-4 bg-black/30 px-3 py-2 rounded text-xs text-white backdrop-blur">
        © OpenStreetMap contributors
      </div>
    </motion.div>
  );
}
