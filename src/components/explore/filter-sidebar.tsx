"use client";

import { useState } from "react";
import { FilterIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import type { LocationFilters, LocationType, LocationStatus, Difficulty } from "@/lib/types";
import { motion, AnimatePresence } from "framer-motion";
import { REGIONS } from "@/lib/data";

interface FilterSidebarProps {
  filters: LocationFilters;
  onFiltersChange: (filters: LocationFilters) => void;
}

export function FilterSidebar({ filters, onFiltersChange }: FilterSidebarProps) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const handleTypeToggle = (type: LocationType) => {
    const current = filters.types || [];
    const updated = current.includes(type)
      ? current.filter((t) => t !== type)
      : [...current, type];
    onFiltersChange({ ...filters, types: updated });
  };

  const handleStatusToggle = (status: LocationStatus) => {
    const current = filters.statuses || [];
    const updated = current.includes(status)
      ? current.filter((s) => s !== status)
      : [...current, status];
    onFiltersChange({ ...filters, statuses: updated });
  };

  const handleDifficultyToggle = (diff: Difficulty) => {
    const current = filters.difficulties || [];
    const updated = current.includes(diff)
      ? current.filter((d) => d !== diff)
      : [...current, diff];
    onFiltersChange({ ...filters, difficulties: updated });
  };

  const handleRegionChange = (region: string) => {
    onFiltersChange({
      ...filters,
      region: region === "All Regions" ? undefined : region,
    });
  };

  const content = (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
      className="glass rounded-lg p-6 space-y-6"
    >
      {/* Region Dropdown */}
      <div className="space-y-2">
        <Label className="text-xs uppercase tracking-wider text-muted-foreground">Region</Label>
        <Select value={filters.region || "All Regions"} onValueChange={handleRegionChange}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {REGIONS.map((region) => (
              <SelectItem key={region} value={region}>
                {region}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Type Filter */}
      <Accordion type="single" collapsible defaultValue="type" className="space-y-2">
        <AccordionItem value="type">
          <AccordionTrigger className="hover:no-underline text-sm font-medium">
            Location Type
          </AccordionTrigger>
          <AccordionContent className="space-y-3 pt-3">
            {(["abandoned", "closed", "industrial"] as const).map((type) => (
              <div key={type} className="flex items-center space-x-2">
                <Checkbox
                  id={`type-${type}`}
                  checked={filters.types?.includes(type) || false}
                  onCheckedChange={() => handleTypeToggle(type)}
                />
                <Label htmlFor={`type-${type}`} className="font-normal capitalize cursor-pointer">
                  {type}
                </Label>
              </div>
            ))}
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      {/* Status Filter */}
      <Accordion type="single" collapsible defaultValue="status" className="space-y-2">
        <AccordionItem value="status">
          <AccordionTrigger className="hover:no-underline text-sm font-medium">
            Verification Status
          </AccordionTrigger>
          <AccordionContent className="space-y-3 pt-3">
            {(["verified", "unverified", "unknown"] as const).map((status) => (
              <div key={status} className="flex items-center space-x-2">
                <Checkbox
                  id={`status-${status}`}
                  checked={filters.statuses?.includes(status) || false}
                  onCheckedChange={() => handleStatusToggle(status)}
                />
                <Label htmlFor={`status-${status}`} className="font-normal capitalize cursor-pointer">
                  {status}
                </Label>
              </div>
            ))}
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      {/* Difficulty Filter */}
      <Accordion type="single" collapsible defaultValue="difficulty" className="space-y-2">
        <AccordionItem value="difficulty">
          <AccordionTrigger className="hover:no-underline text-sm font-medium">
            Difficulty
          </AccordionTrigger>
          <AccordionContent className="space-y-3 pt-3">
            {(["easy", "moderate", "hard"] as const).map((diff) => (
              <div key={diff} className="flex items-center space-x-2">
                <Checkbox
                  id={`diff-${diff}`}
                  checked={filters.difficulties?.includes(diff) || false}
                  onCheckedChange={() => handleDifficultyToggle(diff)}
                />
                <Label htmlFor={`diff-${diff}`} className="font-normal capitalize cursor-pointer">
                  {diff}
                </Label>
              </div>
            ))}
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      {/* Reset Button */}
      <Button
        variant="outline"
        className="w-full"
        onClick={() => onFiltersChange({})}
      >
        Reset Filters
      </Button>
    </motion.div>
  );

  // Desktop sidebar
  return (
    <>
      <div className="hidden lg:block w-80">
        {content}
      </div>

      {/* Mobile filter button & modal */}
      <div className="lg:hidden">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="w-full"
        >
          <FilterIcon className="h-4 w-4 mr-2" />
          Filters
        </Button>

        <AnimatePresence>
          {isMobileOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute inset-0 z-40 bg-black/50 p-4"
              onClick={() => setIsMobileOpen(false)}
            >
              <div
                onClick={(e) => e.stopPropagation()}
                className="bg-background rounded-lg p-4 max-h-[80vh] overflow-y-auto"
              >
                {content}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
