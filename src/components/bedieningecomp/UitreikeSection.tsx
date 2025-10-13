"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const images = [
  "/images/Uitreik/uirteik1.jpg",
  "/images/Uitreik/uitreike2.jpg",
  "/images/Uitreik/uitreike3.jpg",
  "/images/Uitreik/uitreike4.jpg",
  "/images/Uitreik/uitreike5.jpg",
  "/images/Uitreik/uitreike6.jpg",
];

export default function UitreikeSection() {
  const [index, setIndex] = useState(0);

  // Auto-switch every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="flex flex-col md:flex-row items-center justify-between bg-gradient-to-r from-blue-50 to-blue-100 py-16 px-6 md:px-20">
      {/* Content */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="md:w-1/2 mb-10 md:mb-0 md:pr-12 text-center md:text-left"
      >
        <h2 className="text-3xl font-bold text-blue-800 mb-4">Uitreike</h2>
        <p className="text-lg text-gray-700 mb-6 leading-relaxed">
          Ons Uitreike-bediening is die hartklop van ons gemeente —
          waar ons die liefde van Christus uitdra na die gemeenskap en verder.
          Elke uitstappie is ’n kans om hoop te bring en mense te bedien in
          praktyk en waarheid.
        </p>
        <button className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-700 transition-all">
          Kontak bediening
        </button>
      </motion.div>

      {/* Image Carousel */}
      <div className="relative w-full md:w-1/2 aspect-square overflow-hidden rounded-2xl shadow-xl">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0"
          >
            <Image
              src={images[index]}
              alt="Uitreike"
              fill
              className="object-cover object-center"
              priority
            />
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
