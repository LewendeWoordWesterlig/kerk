"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const images = [
  "/images/Woordreisigers/woord R 1.jpg",
  "/images/Woordreisigers/woord R 2.jpg",
  "/images/Woordreisigers/woord R 3.jpg",
  "/images/Woordreisigers/woord R 4.jpg",
];

export default function WoordReisigersSection() {
  const [index, setIndex] = useState(0);
  const [showContact, setShowContact] = useState(false);
  const [showInfo, setShowInfo] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="flex flex-col md:flex-row items-center justify-between bg-gradient-to-r from-blue-50 to-blue-100 py-16 px-6 md:px-20 relative">
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
          Woord reisigers
        </h2>
        <p className="text-lg text-gray-700 mb-6 leading-relaxed">
          ’n Reis van geloof waar ons saam deur die Woord stap en groei in Sy
          genade. Elke week ontdek ons iets nuuts uit God se Woord. 🌿
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
          <button
            onClick={() => setShowInfo(true)}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-700 transition-all"
          >
            Meer inligting
          </button>
          <button
            onClick={() => setShowContact(true)}
            className="bg-blue-800 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-900 transition-all"
          >
            Kontak bediening
          </button>
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
              <h3 className="text-2xl font-semibold text-blue-900 mb-4">
                Meer oor Woord Reisigers
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Woord Reisigers is nie net ’n groep mense nie — dit is ’n reis
                van hárte wat saam stap deur die Woord van God. Elke reisiger
                bring sy of haar eie storie, vrae en verwondering saam, en saam
                ontdek ons die krag van Sy lewende Woord wat altyd nuut spreek
                (Hebreërs 4:12).
                <br />
                <br />
                Ons glo dat die Woord nie nét gelees moet word nie, maar erváár
                en gelééf moet word. Tussen ons byeenkomste raak elkeen deur die
                week stil voor God — in hul eie tyd, in hul eie ruimte op hul eie
                ritme — om sélf Sy stem te hoor (Spreuke 3:6). Wanneer ons
                saamkom, deel ons wat Hy vir ons gewys het of op ons harte kom lê
                het.
                <br />
                <br />
                By Woord Reisigers is daar plek vir álmal: vir dié wat nuut stap,
                vir dié wat lank reis, en vir dié wat net weer moed moet skep om
                aan te sluit. Hier word niemand beoordeel nie; elkeen word
                ontmoet — met aanvaarding, begrip en egtheid (Romeine 15:7).
                <br />
                <br />
                Ons stap saam deur die Skrif met oop harte en oop ore, en ontdek
                elke week opnuut dat dit nie swaar of vervelig hoef te wees om ’n
                Christen te wees nie — dit is vol vreugde, avontuur en geloof
                (Filippense 4:4)!
              </p>
              <button
                onClick={() => setShowInfo(false)}
                className="mt-6 bg-blue-800 text-white px-5 py-2 rounded-lg hover:bg-blue-900 transition-all w-full"
              >
                Maak toe
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Contact Popup */}
      <AnimatePresence>
        {showContact && (
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
              className="bg-white rounded-2xl shadow-2xl p-8 text-center max-w-sm w-full"
            >
              <h3 className="text-2xl font-semibold text-blue-900 mb-4">
                Christah Lessing 📞
              </h3>
              <p className="text-gray-700 mb-3">
                Vir enige navrae of meer inligting oor Woord Reisigers.
              </p>
              <a
                href="tel:+2734133384"
                className="block text-lg font-semibold text-blue-700 hover:underline mb-3"
              >
                073 413 3384
              </a>
              <p className="text-sm text-gray-600">
                Beskikbaar: <strong>Donderdae om 08:30</strong>
              </p>
              <button
                onClick={() => setShowContact(false)}
                className="mt-6 bg-blue-800 text-white px-5 py-2 rounded-lg hover:bg-blue-900 transition-all"
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
