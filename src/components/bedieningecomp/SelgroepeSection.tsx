"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const images = [
  "/images/Selgroep/Selgroepe 1.jpg",
  "/images/Selgroep/Selgroepe 2.jpg",
];

export default function SelgroepeSection() {
  const [index, setIndex] = useState(0);
  const [showInfo, setShowInfo] = useState(false);

  // Auto-switch images every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="flex flex-col md:flex-row-reverse items-center justify-between bg-gradient-to-r from-yellow-50 to-yellow-100 py-16 px-6 md:px-20 relative">
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
          Selgroepe
        </h2>
        <p className="text-lg text-gray-700 mb-6 leading-relaxed">
          Waar ware gemeenskap en groei plaasvind. 
          Sluit aan by ’n groep naby jou en ervaar familie-wees.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
          <button
            onClick={() => setShowInfo(true)}
            className="bg-yellow-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-yellow-600 transition-all"
          >
            Meer inligting
          </button>

          <Link
            href="/selgroepe"
            className="bg-yellow-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-yellow-700 transition-all text-center"
          >
            Selgroep areas
          </Link>
        </div>
      </motion.div>

      {/* Info Popup */}
      <AnimatePresence>
        {showInfo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50"
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-2xl shadow-2xl p-8 text-left max-w-lg w-full overflow-y-auto max-h-[80vh]"
            >
              <h3 className="text-2xl font-semibold text-yellow-800 mb-4">
                Meer oor Selgroepe
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Ons Woensdag-selgroepe bied ’n intieme ruimte waar lede Sondae se
                preke verder kan oopbreek en saam bespreek. Dit is ’n tyd van
                dieper begrip, refleksie en gebed, waar jy kan hoor hoe God se
                Woord ander raak en kan deel wat Hy aan jou gewys het deur die
                week (Spreuke 27:17).
                <br />
                <br />
                Hier word geloof prakties geleef, vriendskappe versterk en
                mekaar aangemoedig in liefde en insig. Die selgroepe is ’n plek
                om vrae te vra, te deel en saam te groei in jou verhouding met
                God.
                <br />
                <br />
                Die groepe vind Woensdae plaas. Om aan te sluit, kontak asseblief
                <strong> Marietjie by 082 929 9378.</strong>
                <br />
                <br />
                <em>
                  "...en laat ons op mekaar ag gee om tot liefde en goeie werke
                  aan te spoor; en laat ons ons onderlinge byeenkoms nie versuim
                  soos sommige die gewoonte het nie, maar laat ons mekaar vermaan,
                  en dit des te meer namate julle die dag sien nader kom."
                </em>{" "}
                — Hebreërs 10:24-25
              </p>
              <button
                onClick={() => setShowInfo(false)}
                className="mt-6 bg-yellow-600 text-white px-5 py-2 rounded-lg hover:bg-yellow-700 transition-all w-full"
              >
                Maak toe
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
