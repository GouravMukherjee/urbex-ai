# Urbex.ai

A modern, dark-themed SaaS web application for researching and verifying abandoned and historical locations responsibly. Built with Next.js 16, React 19, and a premium design aesthetic inspired by Vercel/Linear/Notion.

---

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Navigate to [http://localhost:3000](http://localhost:3000) to view the application.

---

## Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| **Next.js** | 16.1.6 | App Router, SSR/SSG, routing |
| **React** | 19.2.3 | UI components |
| **TypeScript** | 5.x | Type safety |
| **Tailwind CSS** | 4.x | Utility-first styling |
| **Framer Motion** | 12.x | Animations & transitions |
| **TanStack Query** | 5.x | Data fetching & caching |
| **MapLibre GL** | 5.x | Interactive maps (OpenStreetMap) |
| **Radix UI** | Latest | Accessible primitives |
| **Zod** | 4.x | Schema validation |
| **Sonner** | 2.x | Toast notifications |
| **next-themes** | 0.4.x | Dark/light theme switching |

---

## Project Structure

```
src/
├── app/                      # Next.js App Router pages
│   ├── page.tsx              # Landing page (/)
│   ├── explore/page.tsx      # Explore page (/explore)
│   ├── locations/[id]/       # Location detail (/locations/[id])
│   ├── about/page.tsx        # About page (/about)
│   ├── community/page.tsx    # Community page (/community)
│   ├── layout.tsx            # Root layout
│   ├── globals.css           # Global styles & design tokens
│   └── providers.tsx         # React context providers
│
├── components/
│   ├── ui/                   # Reusable UI primitives
│   │   ├── button.tsx        # Button with variants
│   │   ├── input.tsx         # Form input
│   │   ├── textarea.tsx      # Multi-line input
│   │   ├── dialog.tsx        # Modal dialog
│   │   ├── select.tsx        # Dropdown select
│   │   ├── checkbox.tsx      # Checkbox input
│   │   ├── accordion.tsx     # Expandable sections
│   │   ├── progress.tsx      # Progress bar
│   │   ├── badge.tsx         # Status badges
│   │   └── label.tsx         # Form labels
│   │
│   ├── layout/
│   │   └── navbar.tsx        # Navigation bar
│   │
│   ├── explore/
│   │   ├── explore-content.tsx  # Main explore content
│   │   ├── search-bar.tsx       # Search input
│   │   ├── filter-sidebar.tsx   # Filter controls
│   │   ├── location-card.tsx    # Location result card
│   │   └── map-view.tsx         # MapLibre GL map
│   │
│   ├── location/
│   │   └── evidence-accordion.tsx  # Evidence & notes display
│   │
│   └── shared/
│       └── feedback-modal.tsx   # User feedback form
│
├── lib/
│   ├── types.ts              # TypeScript domain types
│   ├── data.ts               # Mock location database
│   ├── utils.ts              # Utility functions (cn)
│   └── api/
│       ├── client.ts         # API client (mock → real)
│       └── queries.ts        # TanStack Query hooks
│
public/
└── images/                   # Location placeholder images
    ├── location-01.svg
    ├── location-02.svg
    └── ... (12 total)
```

---

## Pages

| Route | Description |
|-------|-------------|
| `/` | Landing page with hero, search, filter chips, safety callout |
| `/explore` | Map + results view with filtering sidebar |
| `/locations/[id]` | Location detail with evidence, notes, feedback |
| `/about` | Mission, values, and features |
| `/community` | Stats, contributors, community standards |

---

## Design System

### Colors (oklch color space)

```css
/* Dark Theme (default) */
--background: oklch(0.13 0.012 220);      /* Deep dark blue-gray */
--foreground: oklch(0.93 0.005 220);      /* Near white */
--primary: oklch(0.72 0.11 185);          /* Muted teal (research) */
--warning: oklch(0.75 0.12 75);           /* Soft amber (legal) */
--muted: oklch(0.45 0.02 220);            /* Subtle gray */
```

### Glass Effect

```css
.glass {
  backdrop-filter: blur(16px);
  background: oklch(0.16 0.015 220 / 0.6);
  border: 1px solid oklch(0.25 0.02 220);
}
```

### Animations

- **Page transitions**: Fade + subtle vertical shift
- **Card hover**: Lift + shadow enhancement
- **List stagger**: Sequential item reveal
- **Accordion**: Smooth expand/collapse with chevron rotation

---

## Backend Integration Guide

The application is **backend-ready**. All data fetching is abstracted through a simple API layer that can be swapped from mock data to real endpoints.

### API Client (`src/lib/api/client.ts`)

Replace the mock implementations with real HTTP calls:

```typescript
// BEFORE (mock)
export async function getLocations(filters?: LocationFilters): Promise<UrbexLocation[]> {
  await new Promise((resolve) => setTimeout(resolve, 300));
  let result = [...mockLocations];
  // ... filtering logic
  return result;
}

// AFTER (real API)
export async function getLocations(filters?: LocationFilters): Promise<UrbexLocation[]> {
  const params = new URLSearchParams();
  if (filters?.search) params.set("search", filters.search);
  if (filters?.types?.length) params.set("types", filters.types.join(","));
  // ... add other filters
  
  const response = await fetch(`${API_BASE_URL}/locations?${params}`);
  if (!response.ok) throw new Error("Failed to fetch locations");
  return response.json();
}
```

### Functions to Replace

| Function | Endpoint | Method |
|----------|----------|--------|
| `getLocations(filters)` | `/api/locations` | GET |
| `getLocationById(id)` | `/api/locations/:id` | GET |
| `submitFeedback(payload)` | `/api/feedback` | POST |

### Environment Variables

Create a `.env.local` file:

```env
NEXT_PUBLIC_API_BASE_URL=https://api.urbex.ai
NEXT_PUBLIC_MAP_STYLE_URL=https://tiles.example.com/style.json
```

### TanStack Query Configuration

Query hooks are already set up in `src/lib/api/queries.ts` with:
- 5-minute stale time
- Automatic refetch on window focus (disabled)
- Error handling built-in

---

## Data Schema

### UrbexLocation

```typescript
interface UrbexLocation {
  id: string;
  name: string;
  type: "abandoned" | "closed" | "industrial";
  status: "verified" | "unverified" | "unknown";
  difficulty: "easy" | "moderate" | "hard";
  description: string;
  latitude: number;
  longitude: number;
  confidence: number;           // 0-100
  lastUpdated: string;          // ISO 8601
  tags: string[];
  heroImage: string;
  thumbnailImage: string;
  evidence: EvidenceSource[];
  communityNotes: CommunityNote[];
}

interface EvidenceSource {
  title: string;
  type: string;
  year: number;
}

interface CommunityNote {
  username: string;
  message: string;
  timestamp: string;            // ISO 8601
}
```

---

## Development

### Adding New UI Components

1. Create component in `src/components/ui/`
2. Use Radix UI primitives for accessibility
3. Style with Tailwind + CVA for variants
4. Export from component file

### Adding New Pages

1. Create folder in `src/app/`
2. Add `page.tsx` with default export
3. Use `"use client"` directive if client-side features needed
4. Wrap with Suspense if using `useSearchParams()`

### Testing Locally

```bash
npm run dev      # Start dev server
npm run build    # Build for production (checks types)
npm run lint     # Run ESLint
```

---

## Deployment

### Vercel (Recommended)

```bash
npx vercel
```

### Docker

```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
CMD ["npm", "start"]
```

### Static Export

```bash
# In next.config.ts, add:
# output: 'export'

npm run build
# Deploy .next/out/ to any static host
```

---

## License

Private / Internal Use Only

---

## Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

---

Built with responsibility and preservation in mind. 🏚️
