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
 * Hook: Submit feedback on a location.
 */
export function useSubmitFeedback() {
  return useMutation({
    mutationFn: (payload: FeedbackPayload) => submitFeedback(payload),
  });
}
