"use client";

import { useQuery, useMutation } from "@tanstack/react-query";
import {
  getLocations,
  getLocationById,
  submitFeedback,
} from "./client";
import type { LocationFilters, FeedbackPayload } from "@/lib/types";

// Query key factories
export const locationKeys = {
  all: ["locations"] as const,
  lists: () => [...locationKeys.all, "list"] as const,
  list: (filters?: LocationFilters) =>
    [...locationKeys.lists(), { ...filters }] as const,
  details: () => [...locationKeys.all, "detail"] as const,
  detail: (id: string) => [...locationKeys.details(), id] as const,
  summary: (id: string) => [...locationKeys.all, "summary", id] as const,
};

/**
 * Hook: Fetch all locations with optional filtering.
 */
export function useLocations(filters?: LocationFilters) {
  return useQuery({
    queryKey: locationKeys.list(filters),
    queryFn: () => getLocations(filters),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

/**
 * Hook: Fetch a single location by ID.
 */
export function useLocation(id: string) {
  return useQuery({
    queryKey: locationKeys.detail(id),
    queryFn: () => getLocationById(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  });
}

/**
 * Hook: Fetch an AI-generated summary for a location.
 */
export function useLocationSummary(id: string) {
  return useQuery({
    queryKey: locationKeys.summary(id),
    queryFn: async () => {
      const res = await fetch(`/api/locations/${encodeURIComponent(id)}/summary`);
      if (!res.ok) throw new Error("Failed to fetch summary");
      const data = await res.json();
      return data.summary as string;
    },
    enabled: !!id,
    staleTime: 30 * 60 * 1000, // 30 minutes — summaries don't change often
  });
}

/**
 * Hook: Submit feedback on a location.
 */
export function useSubmitFeedback() {
  return useMutation({
    mutationFn: (payload: FeedbackPayload) => submitFeedback(payload),
  });
}
