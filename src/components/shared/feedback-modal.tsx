"use client";

import { useState } from "react";
import { z } from "zod";
import { motion } from "framer-motion";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Upload } from "lucide-react";
import { useSubmitFeedback } from "@/lib/api/queries";
import type { FeedbackType } from "@/lib/types";

interface FeedbackModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  locationId: string;
  locationName?: string;
}

const feedbackSchema = z.object({
  type: z.enum(["correction", "new-evidence", "safety-concern", "general"]),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export function FeedbackModal({
  isOpen,
  onOpenChange,
  locationId,
  locationName,
}: FeedbackModalProps) {
  const [type, setType] = useState<FeedbackType>("general");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const submitMutation = useSubmitFeedback();

  const handleSubmit = async () => {
    setErrors({});

    try {
      feedbackSchema.parse({ type, message });

      await submitMutation.mutateAsync({
        locationId,
        type,
        message,
      });

      toast.success("Feedback submitted successfully!", {
        description: "Thank you for helping improve Urbex.ai.",
      });

      setMessage("");
      setType("general");
      onOpenChange(false);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Record<string, string> = {};
        error.issues.forEach((err) => {
          const path = err.path.join(".");
          newErrors[path] = err.message;
        });
        setErrors(newErrors);
      } else {
        toast.error("Failed to submit feedback. Please try again.");
      }
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.2 }}
        >
          <DialogHeader>
            <DialogTitle>Submit Location Feedback</DialogTitle>
            {locationName && (
              <DialogDescription className="text-sm">
                Feedback for &ldquo;{locationName}&rdquo;
              </DialogDescription>
            )}
          </DialogHeader>

          <div className="space-y-4 mt-4">
            {/* Feedback Type */}
            <div className="space-y-2">
              <Label htmlFor="feedback-type" className="text-sm">
                Feedback Type
              </Label>
              <Select value={type} onValueChange={(v) => setType(v as FeedbackType)}>
                <SelectTrigger id="feedback-type">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="correction">Correction</SelectItem>
                  <SelectItem value="new-evidence">New Evidence</SelectItem>
                  <SelectItem value="safety-concern">Safety Concern</SelectItem>
                  <SelectItem value="general">General Comment</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Message */}
            <div className="space-y-2">
              <Label htmlFor="feedback-message" className="text-sm">
                Message
              </Label>
              <Textarea
                id="feedback-message"
                placeholder="Tell us more... (minimum 10 characters)"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="min-h-24 resize-none"
              />
              {errors.message && (
                <p className="text-xs text-destructive">{errors.message}</p>
              )}
            </div>

            {/* Photo Upload (UI only) */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full flex items-center justify-center gap-2 rounded-md border border-dashed border-primary/30 hover:border-primary/50 p-4 transition-colors text-sm text-muted-foreground hover:text-foreground"
            >
              <Upload className="h-4 w-4" />
              Attach photo (optional)
            </motion.button>

            {/* Actions */}
            <div className="flex gap-3 pt-4">
              <Button
                variant="outline"
                onClick={() => onOpenChange(false)}
                disabled={submitMutation.isPending}
                className="flex-1"
              >
                Cancel
              </Button>
              <motion.div className="flex-1">
                <Button
                  onClick={handleSubmit}
                  disabled={submitMutation.isPending || !message.trim()}
                  className="w-full"
                >
                  {submitMutation.isPending ? "Submitting..." : "Submit"}
                </Button>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}
