"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Heart,
  Users,
  BookOpen,
  Shield,
  ArrowRight,
  Lightbulb,
} from "lucide-react";

export default function AboutPage() {
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

  const features = [
    {
      icon: BookOpen,
      title: "Research & Documentation",
      description:
        "A comprehensive database of historical and abandoned locations with verified information and community contributions.",
    },
    {
      icon: Users,
      title: "Community-Driven",
      description:
        "Crowdsourced verification, evidence gathering, and preservation of urban heritage through community collaboration.",
    },
    {
      icon: Shield,
      title: "Responsible Exploration",
      description:
        "Committed to legal and ethical practices. We do not provide trespassing instructions or encourage illegal activities.",
    },
    {
      icon: Heart,
      title: "Heritage Preservation",
      description:
        "Supporting the documentation and preservation of architecturally and historically significant sites.",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-br from-background via-card to-background relative overflow-hidden"
    >
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-10 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Header */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.h1
            variants={item}
            className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-primary via-foreground to-primary bg-clip-text text-transparent mb-6"
          >
            About Urbex.ai
          </motion.h1>

          <motion.p
            variants={item}
            className="text-xl text-muted-foreground max-w-2xl mx-auto"
          >
            A research and verification platform dedicated to documenting and
            preserving historical and abandoned locations worldwide.
          </motion.p>
        </motion.div>

        {/* Mission */}
        <motion.div
          variants={item}
          className="glass rounded-lg p-8 mb-16 border border-primary/20"
        >
          <div className="flex items-start gap-4 mb-4">
            <Lightbulb className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
            <div>
              <h2 className="text-2xl font-bold mb-3">Our Mission</h2>
              <p className="text-foreground/80 text-lg leading-relaxed">
                Urbex.ai bridges the gap between urban exploration and responsible
                heritage preservation. We provide a platform for researchers, historians,
                architects, and explorers to document and share knowledge about abandoned
                and historical locations. By centralizing information and verification,
                we support the preservation of architectural heritage and cultural memory.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16"
        >
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <motion.div key={feature.title} variants={item} className="glass rounded-lg p-6">
                <Icon className="h-8 w-8 text-primary mb-3" />
                <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm">{feature.description}</p>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Values */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="mb-16"
        >
          <motion.h2 variants={item} className="text-3xl font-bold mb-6">
            Our Values
          </motion.h2>

          <div className="space-y-4">
            <motion.div variants={item} className="glass rounded-lg p-4">
              <h3 className="font-semibold text-lg mb-2">✓ Responsibility</h3>
              <p className="text-muted-foreground">
                We prioritize legal and ethical practices. Urbex.ai does not provide
                trespassing instructions or encourage illegal activities.
              </p>
            </motion.div>

            <motion.div variants={item} className="glass rounded-lg p-4">
              <h3 className="font-semibold text-lg mb-2">✓ Transparency</h3>
              <p className="text-muted-foreground">
                All information is sourced, verified, and attributed. Community
                contributions support knowledge accuracy.
              </p>
            </motion.div>

            <motion.div variants={item} className="glass rounded-lg p-4">
              <h3 className="font-semibold text-lg mb-2">✓ Preservation</h3>
              <p className="text-muted-foreground">
                We believe these sites deserve documentation and remembrance as part
                of our cultural and architectural heritage.
              </p>
            </motion.div>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          variants={item}
          className="text-center"
        >
          <Link href="/explore">
            <Button size="lg" className="gap-2">
              Start Exploring
              <ArrowRight className="h-5 w-5" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
}