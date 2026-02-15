// ---------------------------------------------------------------------------
// Image Generation Utility — Creates themed SVG placeholders
// These match the Urbex theme and will be saved as .svg files
// ---------------------------------------------------------------------------

export function generateLocationImage(
  name: string,
  type: "abandoned" | "closed" | "industrial"
): string {
  // Color scheme per type
  const colorSchemes = {
    abandoned: {
      bg: "oklch(0.16 0.012 220)",
      accent1: "oklch(0.72 0.11 185)",
      accent2: "oklch(0.20 0.012 220)",
      textColor: "oklch(0.93 0.005 220)",
    },
    closed: {
      bg: "oklch(0.14 0.012 220)",
      accent1: "oklch(0.75 0.12 75)",
      accent2: "oklch(0.55 0.18 27)",
      textColor: "oklch(0.93 0.005 220)",
    },
    industrial: {
      bg: "oklch(0.15 0.012 220)",
      accent1: "oklch(0.72 0.11 185)",
      accent2: "oklch(0.30 0.1 220)",
      textColor: "oklch(0.93 0.005 220)",
    },
  };

  const colors = colorSchemes[type];
  const truncatedName = name.substring(0, 2).toUpperCase();

  return `
<svg width="400" height="300" xmlns="http://www.w3.org/2000/svg">
  <!-- Main background -->
  <defs>
    <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:${colors.bg};stop-opacity:1" />
      <stop offset="100%" style="stop-color:${colors.accent2};stop-opacity:1" />
    </linearGradient>
    <filter id="noise">
      <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" />
      <feDisplacementMap in="SourceGraphic" scale="2" />
    </filter>
  </defs>
  
  <rect width="400" height="300" fill="url(#grad1)" />
  
  <!-- Decorative shapes -->
  ${
    type === "abandoned"
      ? `
    <rect x="50" y="40" width="80" height="120" fill="${colors.accent1}" opacity="0.3" rx="4" />
    <rect x="150" y="80" width="60" height="100" fill="${colors.accent1}" opacity="0.2" rx="4" />
    <polygon points="300,50 350,150 250,150" fill="${colors.accent1}" opacity="0.25" />
  `
      : type === "closed"
        ? `
    <circle cx="100" cy="80" r="40" fill="${colors.accent1}" opacity="0.3" />
    <rect x="200" y="60" width="120" height="100" fill="${colors.accent1}" opacity="0.2" rx="8" />
    <line x1="150" y1="200" x2="300" y2="200" stroke="${colors.accent1}" stroke-width="2" opacity="0.3" />
  `
        : `
    <g opacity="0.3">
      <rect x="30" y="50" width="25" height="150" fill="${colors.accent1}" />
      <rect x="70" y="40" width="25" height="160" fill="${colors.accent1}" />
      <rect x="110" y="60" width="25" height="140" fill="${colors.accent1}" />
      <rect x="150" y="35" width="25" height="165" fill="${colors.accent1}" />
      <rect x="190" y="55" width="25" height="145" fill="${colors.accent1}" />
      <rect x="230" y="45" width="25" height="155" fill="${colors.accent1}" />
      <rect x="270" y="60" width="25" height="140" fill="${colors.accent1}" />
      <rect x="310" y="50" width="25" height="150" fill="${colors.accent1}" />
      <line x1="20" y1="215" x2="360" y2="215" stroke="${colors.accent1}" stroke-width="3" />
    </g>
  `
  }
  
  <!-- Text label -->
  <text x="200" y="260" font-size="24" font-weight="bold" text-anchor="middle" fill="${colors.textColor}" opacity="0.8">
    ${truncatedName}
  </text>
  <text x="200" y="285" font-size="12" text-anchor="middle" fill="${colors.textColor}" opacity="0.5">
    ${type.toUpperCase()}
  </text>
</svg>
  `.trim();
}
