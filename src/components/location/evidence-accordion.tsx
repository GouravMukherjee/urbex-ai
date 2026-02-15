"use client";

import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { FileText } from "lucide-react";
import type { EvidenceSource, CommunityNote } from "@/lib/types";

interface EvidenceAccordionProps {
  evidence: EvidenceSource[];
  communityNotes: CommunityNote[];
}

export function EvidenceAccordion({
  evidence,
  communityNotes,
}: EvidenceAccordionProps) {
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
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      className="space-y-6"
    >
      {/* Evidence Sources */}
      {evidence.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-lg font-semibold">Evidence & Sources</h3>
          <Accordion type="single" collapsible defaultValue="sources">
            <AccordionItem value="sources" className="border">
              <AccordionTrigger className="hover:no-underline">
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  <span className="font-medium">
                    {evidence.length} Source{evidence.length !== 1 ? "s" : ""}
                  </span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pt-4">
                <motion.div
                  className="space-y-3"
                  variants={container}
                  initial="hidden"
                  animate="show"
                >
                  {evidence.map((src, idx) => (
                    <motion.div
                      key={idx}
                      variants={item}
                      className="glass rounded-lg p-3"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm">{src.title}</p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {src.type} • {src.year}
                          </p>
                        </div>
                        <Badge variant="secondary" className="text-xs flex-shrink-0">
                          {src.year}
                        </Badge>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      )}

      {/* Community Notes */}
      {communityNotes.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-lg font-semibold">Community Notes</h3>
          <Accordion type="single" collapsible defaultValue="notes">
            <AccordionItem value="notes" className="border">
              <AccordionTrigger className="hover:no-underline">
                <span className="font-medium">
                  {communityNotes.length} Note{communityNotes.length !== 1 ? "s" : ""}
                </span>
              </AccordionTrigger>
              <AccordionContent className="pt-4">
                <motion.div
                  className="space-y-3"
                  variants={container}
                  initial="hidden"
                  animate="show"
                >
                  {communityNotes.map((note, idx) => {
                    const noteDate = new Date(note.timestamp).toLocaleDateString(
                      "en-US",
                      {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      }
                    );
                    return (
                      <motion.div
                        key={idx}
                        variants={item}
                        className="glass rounded-lg p-3"
                      >
                        <div className="flex items-center justify-between mb-2 gap-2">
                          <p className="font-medium text-sm text-primary">
                            @{note.username}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {noteDate}
                          </p>
                        </div>
                        <p className="text-sm text-foreground/80">
                          {note.message}
                        </p>
                      </motion.div>
                    );
                  })}
                </motion.div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      )}
    </motion.div>
  );
}
