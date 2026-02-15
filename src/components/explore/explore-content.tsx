"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { useLocations } from "@/lib/api/queries";
import { FilterSidebar } from "@/components/explore/filter-sidebar";
import { SearchBar } from "@/components/explore/search-bar";
import { MapView } from "@/components/explore/map-view";
import { LocationCard } from "@/components/explore/location-card";
import type { LocationFilters } from "@/lib/types";
import { Loader } from "lucide-react";

export function ExploreContent() {
  const searchParams = useSearchParams();
  const [selectedLocationId, setSelectedLocationId] = useState<string | undefined>();
  const [filters, setFilters] = useState<LocationFilters>({
    search: searchParams.get("search") || undefined,
  });

  const { data: locations = [], isLoading } = useLocations(filters);

  // Staggered animation for result cards
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Top Search Bar */}
      <div className="sticky top-16 z-30 border-b border-border/50 glass backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <SearchBar
            value={filters.search || ""}
            onChange={(value) =>
              setFilters({ ...filters, search: value || undefined })
            }
            placeholder="Search locations, tags, or keywords..."
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Filter */}
          <FilterSidebar filters={filters} onFiltersChange={setFilters} />

          {/* Map + Results */}
          <div className="lg:col-span-3 space-y-6">
            {isLoading ? (
              <div className="flex items-center justify-center h-96">
                <motion.div animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity }}>
                  <Loader className="h-8 w-8 text-primary" />
                </motion.div>
              </div>
            ) : (
              <>
                {/* Map */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="h-96 rounded-lg overflow-hidden"
                >
                  <MapView
                    locations={locations}
                    selectedLocationId={selectedLocationId}
                    onLocationSelect={setSelectedLocationId}
                  />
                </motion.div>

                {/* Results Count */}
                <div className="flex items-center justify-between">
                  <p className="text-sm text-muted-foreground">
                    Showing <span className="font-semibold text-foreground">{locations.length}</span> location
                    {locations.length !== 1 ? "s" : ""}
                  </p>
                </div>

                {/* Results List */}
                {locations.length > 0 ? (
                  <motion.div
                    variants={container}
                    initial="hidden"
                    animate="show"
                    className="space-y-3"
                  >
                    {locations.map((location) => (
                      <motion.div key={location.id} variants={item}>
                        <LocationCard
                          location={location}
                          isSelected={selectedLocationId === location.id}
                          onClick={() => setSelectedLocationId(location.id)}
                        />
                      </motion.div>
                    ))}
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex flex-col items-center justify-center py-12"
                  >
                    <p className="text-muted-foreground text-center">
                      No locations found matching your filters. Try adjusting your search.
                    </p>
                  </motion.div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
