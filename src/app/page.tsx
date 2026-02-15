"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, ArrowRight } from "lucide-react";
import { useState } from "react";

export default function Home() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(
      `/explore?search=${encodeURIComponent(searchQuery)}`
    );
  };

  const filterChips = [
    "Abandoned Factory",
    "Closed Hospital",
    "Industrial Site",
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
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
      transition={{ duration: 0.5 }}
      className="min-h-screen relative overflow-hidden"
    >
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('https://www.noupe.com/wp-content/uploads/2020/12/florian-olivo-gQ5I9EaFeEA-unsplash-1024x683.jpg')",
        }}
      />
      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/80" />
      
      {/* Accent glows */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-10 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-accent/20 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 pt-20 pb-20 text-center">
        {/* Hero Section */}
        <motion.div variants={container} initial="hidden" animate="show">
          <motion.h1
            variants={item}
            className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-primary via-foreground to-primary bg-clip-text text-transparent mb-6"
          >
            Discover Abandoned Places
          </motion.h1>

          <motion.p
            variants={item}
            className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto"
          >
            Urbex.ai is a research and verification platform for exploring historical
            and abandoned locations responsibly. Always respect laws and property rights.
          </motion.p>

          {/* Search Bar */}
          <motion.form
            variants={item}
            onSubmit={handleSearch}
            className="mb-12"
          >
            <div className="relative max-w-xl mx-auto group">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 rounded-lg blur opacity-75 group-hover:opacity-100 transition" />
              <div className="relative flex gap-2 bg-background border border-primary/30 rounded-lg p-1">
                <Search className="h-5 w-5 text-muted-foreground ml-3 my-auto" />
                <Input
                  type="text"
                  placeholder="Search locations or tags..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="border-0 placeholder:text-muted-foreground focus-visible:ring-0 bg-transparent"
                />
                <Button
                  type="submit"
                  variant="default"
                  className="mr-1 gap-2"
                >
                  Search
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </motion.form>

          {/* Filter Chips */}
          <motion.div
            variants={item}
            className="flex flex-wrap gap-3 justify-center"
          >
            {filterChips.map((chip) => (
              <motion.button
                key={chip}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() =>
                  router.push(
                    `/explore?search=${encodeURIComponent(chip)}`
                  )
                }
                className="px-4 py-2 rounded-full glass border border-primary/30 text-sm hover:border-primary/60 transition-all"
              >
                {chip}
              </motion.button>
            ))}
          </motion.div>

          {/* CTA Button */}
          <motion.div variants={item} className="mt-16">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => router.push("/explore")}
              className="inline-flex items-center gap-2 px-8 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
            >
              Explore Map
              <ArrowRight className="h-5 w-5" />
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Safety Notice */}
        <motion.div
          variants={item}
          className="mt-20 p-6 glass rounded-lg border border-warning/30 max-w-2xl mx-auto"
        >
          <p className="text-sm text-foreground/80">
            <strong>⚠️ Safety & Legal Notice:</strong> Always respect laws, property
            rights, and local regulations. Trespassing is illegal. Urbex.ai is a
            research platform for documentation only.
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}
