// Script to generate SVG placeholder images for locations
// Run with: node scripts/generate-images.mjs

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function generateLocationSVG(
  name,
  type
) {
  const colorSchemes = {
    abandoned: {
      bg: "#292A33",
      accent1: "#B8E6DB",
      accent2: "#1A1B24",
      textColor: "#E0E8FF",
    },
    closed: {
      bg: "#262834",
      accent1: "#F4D99F",
      accent2: "#1B1D2A",
      textColor: "#E0E8FF",
    },
    industrial: {
      bg: "#2A2D38",
      accent1: "#B8E6DB",
      accent2: "#1C1F2D",
      textColor: "#E0E8FF",
    },
  };

  const colors = colorSchemes[type];
  const truncatedName = name.substring(0, 2).toUpperCase();

  const shapes =
    type === "abandoned"
      ? `
    <g opacity="0.3">
      <rect x="30" y="50" width="25" height="150" fill="${colors.accent1}"/>
      <rect x="70" y="40" width="25" height="160" fill="${colors.accent1}"/>
      <rect x="110" y="60" width="25" height="140" fill="${colors.accent1}"/>
      <rect x="150" y="35" width="25" height="165" fill="${colors.accent1}"/>
      <rect x="190" y="55" width="25" height="145" fill="${colors.accent1}"/>
      <rect x="230" y="45" width="25" height="155" fill="${colors.accent1}"/>
      <rect x="270" y="60" width="25" height="140" fill="${colors.accent1}"/>
      <rect x="310" y="50" width="25" height="150" fill="${colors.accent1}"/>
      <line x1="20" y1="215" x2="360" y2="215" stroke="${colors.accent1}" stroke-width="3" />
    </g>`
      : type === "closed"
        ? `
    <circle cx="100" cy="80" r="40" fill="${colors.accent1}" opacity="0.3" />
    <rect x="200" y="60" width="120" height="100" fill="${colors.accent1}" opacity="0.2" rx="8" />
    <line x1="150" y1="200" x2="300" y2="200" stroke="${colors.accent1}" stroke-width="2" opacity="0.3" />`
        : `
    <g opacity="0.25">
      <circle cx="80" cy="100" r="50" fill="${colors.accent1}" />
      <rect x="150" y="50" width="80" height="120" fill="${colors.accent1}" />
      <polygon points="300,80 350,180 250,180" fill="${colors.accent1}" />
    </g>`;

  return `<svg width="400" height="300" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:${colors.bg};stop-opacity:1" />
      <stop offset="100%" style="stop-color:${colors.accent2};stop-opacity:1" />
    </linearGradient>
  </defs>
  <rect width="400" height="300" fill="url(#grad1)" />
  ${shapes}
  <text x="200" y="260" font-size="24" font-weight="bold" text-anchor="middle" fill="${colors.textColor}" opacity="0.8">${truncatedName}</text>
  <text x="200" y="285" font-size="12" text-anchor="middle" fill="${colors.textColor}" opacity="0.5">${type.toUpperCase()}</text>
</svg>`;
}

const locations = [
  { id: 1, name: "Alte Stahlfabrik", type: "abandoned" },
  { id: 2, name: "Krankenhaus St. Helena", type: "closed" },
  { id: 3, name: "Kraftwerk Nord", type: "industrial" },
  { id: 4, name: "Verlassene Textilfabrik", type: "abandoned" },
  { id: 5, name: "Bahnbetriebswerk Ost", type: "abandoned" },
  { id: 6, name: "Schwimmbad Neptun", type: "closed" },
  { id: 7, name: "Zementwerk Grauen", type: "industrial" },
  { id: 8, name: "Gaswerk Südstadt", type: "abandoned" },
  { id: 9, name: "Kino Palast Aurora", type: "closed" },
  { id: 10, name: "Militärkaserne West", type: "abandoned" },
  { id: 11, name: "Papierfabrik Elster", type: "industrial" },
  { id: 12, name: "Bergwerk Silbergrund", type: "abandoned" },
];

const outputDir = path.join(__dirname, "../public/images");

// Create output directory if it doesn't exist
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Generate SVG files for each location
locations.forEach((location) => {
  const svg = generateLocationSVG(location.name, location.type);
  const filename = `location-${String(location.id).padStart(2, "0")}.svg`;
  const filepath = path.join(outputDir, filename);

  fs.writeFileSync(filepath, svg);
  console.log(`✓ Created ${filename}`);
});

console.log(`\n✅ Generated ${locations.length} location images`);
