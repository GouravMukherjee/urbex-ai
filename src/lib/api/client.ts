// ---------------------------------------------------------------------------
// Urbex.ai — API Layer with Mock Implementation
// Backend-ready: swap getLocations/getLocationById/submitFeedback logic
// ---------------------------------------------------------------------------

import { mockLocations } from "@/lib/data";
import type {
  UrbexLocation,
  LocationFilters,
  FeedbackPayload,
} from "@/lib/types";

// TODO: Uncomment and use after backend integration
// const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || "";

// Simulate network delay
const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

/**
 * Fetch all locations (with optional filtering).
 * Backend: POST /api/locations/search with filters
 */
export async function getLocations(filters?: LocationFilters): Promise<UrbexLocation[]> {
  await delay(300);

  let results = [...mockLocations];

  if (filters) {
    if (filters.search) {
      const q = filters.search.toLowerCase();
      results = results.filter(
        (loc) =>
          loc.name.toLowerCase().includes(q) ||
          loc.tags.some((tag) => tag.toLowerCase().includes(q))
      );
    }

    if (filters.types && filters.types.length > 0) {
      results = results.filter((loc) => filters.types!.includes(loc.type));
    }

    if (filters.statuses && filters.statuses.length > 0) {
      results = results.filter((loc) => filters.statuses!.includes(loc.status));
    }

    if (filters.difficulties && filters.difficulties.length > 0) {
      results = results.filter((loc) => filters.difficulties!.includes(loc.difficulty));
    }
  }

  return results;
}

/**
 * Fetch a single location by ID.
 * Backend: GET /api/locations/:id
 */
export async function getLocationById(id: string): Promise<UrbexLocation | null> {
  await delay(200);

  const location = mockLocations.find((loc) => loc.id === id);
  return location || null;
}

/**
 * Submit feedback on a location (correction, evidence, safety concern, etc.).
 * Backend: POST /api/feedback with FeedbackPayload
 */
export async function submitFeedback(payload: FeedbackPayload): Promise<{
  success: boolean;
  message: string;
}> {
  // In real scenario, upload photo to S3 or similar
  // For now, just validate and mock-submit
  await delay(500);

  if (!payload.locationId || !payload.message.trim()) {
    throw new Error("Location ID and message are required");
  }

  // Mock: always succeeds
  return {
    success: true,
    message: "Feedback submitted successfully. Thank you for contributing!",
  };
}
