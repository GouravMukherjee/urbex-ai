// ---------------------------------------------------------------------------
// Urbex.ai — API Layer (PostgreSQL-backed)
// ---------------------------------------------------------------------------

import type {
  UrbexLocation,
  LocationFilters,
  FeedbackPayload,
} from "@/lib/types";

/**
 * Fetch all locations (with optional filtering).
 */
export async function getLocations(filters?: LocationFilters): Promise<UrbexLocation[]> {
  const params = new URLSearchParams();

  if (filters?.search) {
    params.set("search", filters.search);
  }
  if (filters?.types && filters.types.length > 0) {
    params.set("types", filters.types.join(","));
  }
  if (filters?.difficulties && filters.difficulties.length > 0) {
    params.set("difficulties", filters.difficulties.join(","));
  }
  if (filters?.region) {
    params.set("region", filters.region);
  }

  const qs = params.toString();
  const url = `/api/locations${qs ? `?${qs}` : ""}`;

  const res = await fetch(url);
  if (!res.ok) {
    throw new Error("Failed to fetch locations");
  }
  return res.json();
}

/**
 * Fetch a single location by ID.
 */
export async function getLocationById(id: string): Promise<UrbexLocation | null> {
  const res = await fetch(`/api/locations/${encodeURIComponent(id)}`);
  if (res.status === 404) {
    return null;
  }
  if (!res.ok) {
    throw new Error("Failed to fetch location");
  }
  return res.json();
}

/**
 * Submit feedback on a location.
 */
export async function submitFeedback(payload: FeedbackPayload): Promise<{
  success: boolean;
  message: string;
}> {
  if (!payload.locationId || !payload.message.trim()) {
    throw new Error("Location ID and message are required");
  }

  // TODO: Wire up to a real feedback API endpoint
  return {
    success: true,
    message: "Feedback submitted successfully. Thank you for contributing!",
  };
}
