"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { MapPin, ArrowLeft, Loader, ImageOff, Sparkles } from "lucide-react";
import { useLocation, useLocationSummary } from "@/lib/api/queries";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { EvidenceAccordion } from "@/components/location/evidence-accordion";
import { FeedbackModal } from "@/components/shared/feedback-modal";

export default function LocationDetailPage() {
  const params = useParams();
  const locationId = params.id as string;
  const { data: location, isLoading } = useLocation(locationId);
  const { data: aiSummary, isLoading: isSummaryLoading } = useLocationSummary(locationId);
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);
  const [heroError, setHeroError] = useState(false);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <motion.div animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity }}>
          <Loader className="h-8 w-8 text-primary" />
        </motion.div>
      </div>
    );
  }

  if (!location) {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Link href="/explore">
            <Button variant="ghost" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Explore
            </Button>
          </Link>
          <div className="mt-12 text-center">
            <p className="text-muted-foreground">Location not found.</p>
          </div>
        </div>
      </div>
    );
  }

  const hasHeroImage = !!location.heroImage;
  const lastUpdatedDate = location.lastUpdated
    ? new Date(location.lastUpdated).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "";

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen bg-background"
    >
      {/* Back Button */}
      <div className="sticky top-16 z-20 border-b border-border/50 glass backdrop-blur-xl">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <Link href="/explore">
            <Button variant="ghost" size="sm" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Explore
            </Button>
          </Link>
        </div>
      </div>

      {/* Hero Image */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="relative h-80 overflow-hidden bg-muted"
      >
        {!hasHeroImage || heroError ? (
          <div className="w-full h-full flex items-center justify-center bg-muted">
            <ImageOff className="h-16 w-16 text-muted-foreground" />
          </div>
        ) : (
          <img
            src={location.heroImage}
            alt={location.name}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
            crossOrigin="anonymous"
            onError={() => setHeroError(true)}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      </motion.div>

      {/* Content */}
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
      >
        {/* Header */}
        <motion.div variants={item} className="space-y-4 mb-8">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <h1 className="text-4xl font-bold mb-2">{location.name}</h1>
              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>
                  {location.latitude.toFixed(3)}, {location.longitude.toFixed(3)}
                </span>
              </div>
            </div>
            <Badge variant={location.status as "verified" | "unverified" | "unknown"} className="text-lg py-1 px-3">
              {location.status.charAt(0).toUpperCase() + location.status.slice(1)}
            </Badge>
          </div>

          {/* Type & Difficulty */}
          <div className="flex items-center gap-2 flex-wrap">
            <Badge variant="secondary" className="capitalize">
              {location.type}
            </Badge>
            <Badge variant="outline" className="capitalize">
              {location.difficulty} difficulty
            </Badge>
          </div>
        </motion.div>

        {/* Confidence */}
        <motion.div variants={item} className="glass rounded-lg p-6 mb-8">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-sm uppercase tracking-wide text-muted-foreground">
                Verification Confidence
              </h3>
              <span className="text-2xl font-bold text-primary">{location.confidence}%</span>
            </div>
            <Progress value={location.confidence} className="h-2" />
            {lastUpdatedDate && (
              <p className="text-xs text-muted-foreground">
                Last updated {lastUpdatedDate}
              </p>
            )}
          </div>
        </motion.div>

        {/* Description */}
        {location.description && (
          <motion.div variants={item} className="prose prose-invert max-w-none mb-8">
            <p className="text-lg text-foreground/90 leading-relaxed">{location.description}</p>
          </motion.div>
        )}

        {/* AI Summary */}
        <motion.div variants={item} className="glass rounded-lg p-6 mb-12 border border-primary/20">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="h-4 w-4 text-primary" />
            <h3 className="font-semibold text-sm uppercase tracking-wide text-primary">
              AI Description
            </h3>
          </div>
          {isSummaryLoading ? (
            <div className="flex items-center gap-3 text-muted-foreground">
              <motion.div animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity }}>
                <Loader className="h-4 w-4" />
              </motion.div>
              <span className="text-sm">Generating summary...</span>
            </div>
          ) : aiSummary ? (
            <div className="space-y-3 text-foreground/85 leading-relaxed">
              {aiSummary.split("\n\n").map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">Summary unavailable.</p>
          )}
        </motion.div>

        {/* Tags */}
        {location.tags && location.tags.length > 0 && (
          <motion.div variants={item} className="mb-12">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground mb-3">
              Tags
            </h3>
            <div className="flex flex-wrap gap-2">
              {location.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="capitalize">
                  {tag}
                </Badge>
              ))}
            </div>
          </motion.div>
        )}

        {/* Evidence & Community Notes */}
        {((location.evidence && location.evidence.length > 0) ||
          (location.communityNotes && location.communityNotes.length > 0)) && (
          <motion.div variants={item} className="mb-12">
            <EvidenceAccordion
              evidence={location.evidence || []}
              communityNotes={location.communityNotes || []}
            />
          </motion.div>
        )}

        {/* Safety Callout */}
        <motion.div
          variants={item}
          className="glass rounded-lg p-6 border border-warning/30 mb-12"
        >
          <p className="text-sm text-foreground/80">
            <strong className="text-warning">⚠️ Safety & Legal Notice:</strong> Always respect
            local laws, property rights, and regulations. Research locations thoroughly before
            visiting. This platform is for documentation and research only, not for
            encouraging trespassing.
          </p>
        </motion.div>

        {/* Feedback Actions */}
        <motion.div
          variants={item}
          className="space-y-4"
        >
          <h3 className="font-semibold text-lg">Help Verify This Location</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <Button
              variant="outline"
              onClick={() => setIsFeedbackOpen(true)}
              className="gap-2"
            >
              Confirm
            </Button>
            <Button
              variant="outline"
              onClick={() => setIsFeedbackOpen(true)}
              className="gap-2"
            >
              Not Sure
            </Button>
            <Button
              variant="destructive"
              onClick={() => setIsFeedbackOpen(true)}
              className="gap-2"
            >
              Report Issue
            </Button>
          </div>
        </motion.div>
      </motion.div>

      {/* Feedback Modal */}
      <FeedbackModal
        isOpen={isFeedbackOpen}
        onOpenChange={setIsFeedbackOpen}
        locationId={location.id}
        locationName={location.name}
      />
    </motion.div>
  );
}