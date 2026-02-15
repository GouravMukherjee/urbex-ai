"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Calendar, ImageOff } from "lucide-react";
import type { UrbexLocation } from "@/lib/types";
import { cn } from "@/lib/utils";

interface LocationCardProps {
  location: UrbexLocation;
  isSelected?: boolean;
  onClick?: () => void;
}

export function LocationCard({
  location,
  isSelected = false,
  onClick,
}: LocationCardProps) {
  const [imageError, setImageError] = useState(false);
  const lastUpdatedDate = new Date(location.lastUpdated).toLocaleDateString(
    "en-US",
    {
      year: "numeric",
      month: "short",
      day: "numeric",
    }
  );

  return (
    <motion.div
      whileHover={{ y: -4, boxShadow: "0 12px 24px rgba(0,0,0,0.3)" }}
      whileTap={{ y: -2 }}
      onClick={onClick}
      className={cn(
        "group glass rounded-lg overflow-hidden cursor-pointer transition-all",
        isSelected && "ring-2 ring-primary"
      )}
    >
      <Link href={`/locations/${location.id}`}>
        <div className="flex gap-4 p-4 h-full">
          {/* Thumbnail */}
          <motion.div
            className="relative w-20 h-20 flex-shrink-0 rounded-md overflow-hidden bg-muted"
            whileHover={{ scale: 1.05 }}
          >
            {imageError ? (
              <div className="w-full h-full flex items-center justify-center bg-muted">
                <ImageOff className="h-6 w-6 text-muted-foreground" />
              </div>
            ) : (
              <img
                src={location.thumbnailImage}
                alt={location.name}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
                crossOrigin="anonymous"
                onError={() => setImageError(true)}
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          </motion.div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2 mb-2">
              <div className="min-w-0">
                <h3 className="font-semibold text-sm truncate hover:text-primary transition-colors">
                  {location.name}
                </h3>
                <p className="text-xs text-muted-foreground capitalize">
                  {location.type}
                </p>
              </div>
              <Badge
                variant={location.status as "verified" | "unverified" | "unknown"}
                className="flex-shrink-0 text-xs"
              >
                {location.status}
              </Badge>
            </div>

            {/* Confidence */}
            <div className="mb-3">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-muted-foreground">Confidence</span>
                <span className="text-xs font-semibold text-primary">
                  {location.confidence}%
                </span>
              </div>
              <Progress value={location.confidence} className="h-1.5" />
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <div className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                {lastUpdatedDate}
              </div>
              <div className="flex gap-1 flex-wrap justify-end">
                {location.tags.slice(0, 2).map((tag) => (
                  <span
                    key={tag}
                    className="px-1.5 py-0.5 rounded bg-secondary/50 text-xs"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
