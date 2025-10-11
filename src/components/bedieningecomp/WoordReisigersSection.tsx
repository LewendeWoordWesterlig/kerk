"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const images = [
  "/images/woordreisigers/woord R 1.jpg",
  "/images/woordreisigers/woord R 2.jpg",
  "/images/woordreisigers/woord R 3.jpg",
  "/images/woordreisigers/woord R 4.jpg",
];

export default function WoordReisigersSection() {
  const [index, setIndex] = useState(0);

  // Automatically switch images every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="flex flex-col md:flex-row items-center justify-between bg-gradient-to-r from-blue-50 to-blue-100 py-16 px-6 md:px-20">
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
              alt="Woordreisigers"
              fill
              className="object-cover object-center"
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
        className="md:w-1/2 mt-10 md:mt-0 md:pl-12 text-center md:text-left"
      >
        <h2 className="text-3xl font-bold text-blue-900 mb-4">
          Woordreisigers ✈️
        </h2>
        <p className="text-lg text-gray-700 mb-6 leading-relaxed">
          Die Woordreisigers neem die boodskap van Christus na verskillende plekke. 
          Ons glo in groei deur ervaring en uitstappies wat geloof versterk en 
          mense nader aan God bring.
        </p>
        <button className="bg-blue-800 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-900 transition-all">
          Kontak bediening
        </button>
      </motion.div>
    </section>
  );
}
