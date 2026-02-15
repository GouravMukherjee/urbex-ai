"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  MessageSquare,
  Users2,
  TrendingUp,
  Award,
  ArrowRight,
  Heart,
} from "lucide-react";

export default function CommunityPage() {
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

  const stats = [
    { label: "Active Members", value: "2,847", icon: Users2 },
    { label: "Locations Documented", value: "12,300+", icon: TrendingUp },
    { label: "Community Notes", value: "45,629", icon: MessageSquare },
    { label: "Verified Locations", value: "8,456", icon: Award },
  ];

  const recentContributors = [
    {
      name: "@urbanhistorian",
      contribution: "Added 3 new evidence sources",
      ago: "2 hours",
      contribution_type: "evidence"
    },
    {
      name: "@preservationwarrior",
      contribution: "Submitted safety concerns for Alte Stahlfabrik",
      ago: "5 hours",
      contribution_type: "feedback"
    },
    {
      name: "@photoexplorer",
      contribution: "Uploaded comprehensive documentation set",
      ago: "1 day",
      contribution_type: "documentation"
    },
    {
      name: "@architectureseeker",
      contribution: "Verified status of Kino Palast Aurora",
      ago: "2 days",
      contribution_type: "verification"
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
            Our Community
          </motion.h1>

          <motion.p
            variants={item}
            className="text-xl text-muted-foreground max-w-2xl mx-auto"
          >
            Urbex.ai thrives because of its passionate community of researchers,
            historians, explorers, and preservationists working together.
          </motion.p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16"
        >
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                variants={item}
                className="glass rounded-lg p-4 text-center"
              >
                <Icon className="h-6 w-6 text-primary mx-auto mb-2" />
                <p className="text-2xl font-bold text-primary mb-1">
                  {stat.value}
                </p>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="mb-16"
        >
          <motion.h2 variants={item} className="text-3xl font-bold mb-6">
            Recent Contributions
          </motion.h2>

          <div className="space-y-3">
            {recentContributors.map((contributor, idx) => (
              <motion.div
                key={idx}
                variants={item}
                className="glass rounded-lg p-4 hover:bg-primary/5 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="font-semibold text-sm text-primary">
                      {contributor.name}
                    </p>
                    <p className="text-sm text-foreground/70 mt-1">
                      {contributor.contribution}
                    </p>
                  </div>
                  <p className="text-xs text-muted-foreground whitespace-nowrap ml-4">
                    {contributor.ago}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Getting Involved */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="mb-16"
        >
          <motion.h2 variants={item} className="text-3xl font-bold mb-6">
            Get Involved
          </motion.h2>

          <div className="space-y-4">
            <motion.div
              variants={item}
              className="glass rounded-lg p-6 border border-primary/20"
            >
              <div className="flex gap-4 items-start">
                <MessageSquare className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-lg mb-2">
                    Share Knowledge
                  </h3>
                  <p className="text-foreground/70 text-sm">
                    Submit location feedback, add evidence sources, and contribute
                    verified information to our growing database.
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              variants={item}
              className="glass rounded-lg p-6 border border-primary/20"
            >
              <div className="flex gap-4 items-start">
                <Heart className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-lg mb-2">
                    Support the Mission
                  </h3>
                  <p className="text-foreground/70 text-sm">
                    Help us preserve architectural heritage and support responsible
                    documentation of historical locations.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Code of Conduct */}
        <motion.div
          variants={item}
          className="glass rounded-lg p-6 border border-warning/30 mb-16"
        >
          <p className="text-sm text-foreground/80">
            <strong>Community Standards:</strong> Our community prioritizes legal,
            ethical, and respectful behavior. We do not tolerate trespassing
            encouragement, vandalism promotion, or disrespectful content. All
            contributions should align with responsible preservation practices.
          </p>
        </motion.div>

        {/* CTA */}
        <motion.div
          variants={item}
          className="text-center"
        >
          <Link href="/explore">
            <Button size="lg" className="gap-2">
              Start Contributing
              <ArrowRight className="h-5 w-5" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
}