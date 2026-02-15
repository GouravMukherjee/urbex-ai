"use client";

import { Suspense } from "react";
import { ExploreContent } from "@/components/explore/explore-content";

export default function ExplorePage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background" />}>
      <ExploreContent />
    </Suspense>
  );
}