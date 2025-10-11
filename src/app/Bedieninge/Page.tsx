"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { motion } from "framer-motion";

import Navbar from "@/components/Navbar";
import WoordskoolSection from "@/components/bedieningecomp/WoordskoolSection";
import SelgroepeSection from "@/components/bedieningecomp/SelgroepeSection";
import WoordReisigersSection from "@/components/bedieningecomp/WoordReisigersSection";
import UitreikeSection from "@/components/bedieningecomp/UitreikeSection";
import BidgroepSection from "@/components/bedieningecomp/BidgroepSection";
import OndersteuningSection from "@/components/bedieningecomp/OndersteuningSection";

export default function BedieningePage() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Show button when scrolling down
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="flex flex-col w-full scroll-smooth">
      {/* Navbar */}
      <Navbar />

      {/* Hero Intro */}
      <section
        id="hero"
        className="h-[60vh] bg-gradient-to-r from-blue-900 to-blue-700 flex items-center justify-center text-center text-white"
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl px-6"
        >
          <h1 className="text-5xl font-extrabold mb-4 hero-title">Bedieninge 🙌</h1>
          <p className="text-lg text-blue-100">
            Ontdek die verskillende bedieninge van Lewende Woord Westerlig.
            Elke bediening dra by tot die groei en ondersteuning van ons gemeente.
          </p>
        </motion.div>
      </section>

      {/* Sections */}
      <section id="woordskool">
        <WoordskoolSection />
      </section>

      <section id="selgroepe">
        <SelgroepeSection />
      </section>

      <section id="woordreisigers">
        <WoordReisigersSection />
      </section>

      <section id="uitreike">
        <UitreikeSection />
      </section>

      <section id="bidgroep">
        <BidgroepSection />
      </section>

      <section id="ondersteuning">
        <OndersteuningSection />
      </section>

      {/* Spacing at end */}
      <div className="h-20"></div>

      {/* Back to Top Button */}
      {showScrollTop && (
        <motion.button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-24 right-6 bg-blue-900 text-white p-3 rounded-full shadow-lg hover:bg-blue-800 hover:shadow-blue-500/50 transition-all duration-300 animate-pulse-slow z-40"
          aria-label="Back to top"
        >
          <ArrowUp className="w-5 h-5" />
        </motion.button>
      )}
    </div>
  );
}
