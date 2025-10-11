"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const images = [
  "/Images/Selgroep/Selgroepe 1.jpg",
  "/Images/Selgroep/Selgroepe 2.jpg",
  
];

export default function SelgroepeSection() {
  const [index, setIndex] = useState(0);

  // Auto-switch images every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="flex flex-col md:flex-row-reverse items-center justify-between bg-gradient-to-r from-yellow-50 to-yellow-100 py-16 px-6 md:px-20">
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
              alt="Selgroepe"
              fill
              className="object-cover object-center"
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
        className="md:w-1/2 mt-10 md:mt-0 md:pr-12 text-center md:text-left"
      >
        <h2 className="text-3xl font-bold text-yellow-800 mb-4">
          Selgroepe 🤝
        </h2>
        <p className="text-lg text-gray-700 mb-6 leading-relaxed">
          Ons Selgroepe is waar ware gemeenskap en groei plaasvind.
          Hier bou ons mekaar op deur die Woord, gebed, en liefdevolle ondersteuning.
          Sluit aan by ’n groep naby jou en ervaar familie-wees.
        </p>
        <button className="bg-yellow-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-yellow-700 transition-all">
          Kontak bediening
        </button>
      </motion.div>
    </section>
  );
}
