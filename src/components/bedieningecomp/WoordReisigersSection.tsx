"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

const images = [
  "/images/Woordreisigers/woord R 1.jpg",
  "/images/Woordreisigers/woord R 6.jpg",
  "/images/Woordreisigers/woord R 2.jpg",
  "/images/Woordreisigers/woord R 3.jpg",
  "/images/Woordreisigers/woord R 4.jpg",
  "/images/Woordreisigers/woord R 5.jpeg",
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
              className="bg-white rounded-2xl shadow-2xl p-8 text-left max-w-lg w-full overflow-y-auto max-h-[80vh] relative"
            >
              <button
                onClick={() => setShowInfo(false)}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              >
                <X className="w-6 h-6" />
              </button>
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
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

{/* Contact Popup - Styled like Bidgroep + WhatsApp */}
<AnimatePresence>
  {showContact && (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50"
    >
      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.9 }}
        transition={{ duration: 0.3 }}
        className="bg-white rounded-2xl shadow-2xl p-8 text-center max-w-sm w-full relative"
      >
        {/* Close button (X) */}
        <button
          onClick={() => setShowContact(false)}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          ✖
        </button>

        {/* Contact Info */}
        <h3 className="text-2xl font-semibold text-blue-900 mb-2">
          Christah Lessing 📞
        </h3>
        <p className="text-gray-700 mb-3">
          Vir enige navrae of meer inligting oor <strong>Woord Reisigers</strong>.
        </p>

        <p className="text-lg font-semibold text-blue-700 mb-2">
          073 413 3384
        </p>
        <p className="text-sm text-gray-600 mb-6">
          Beskikbaar: <strong>Donderdae om 08:30</strong>
        </p>

        {/* Buttons */}
        <div className="flex flex-col gap-3">
          {/* Call Button */}
          <a
            href="tel:+27734133384"
            className="bg-blue-800 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-900 transition-all w-full block"
          >
            Skakel nou
          </a>

          {/* WhatsApp Button */}
          <a
            href="https://wa.me/27734133384?text=Hello%Christah!%Ek%is%reg%om%my%Woord-reis%te%begin%—%vertel%my%asseblief%hoe%Woord%Reisigers%werk?."
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-green-700 transition-all w-full"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-5 h-5"
            >
              <path d="M12.04 2C6.5 2 2 6.26 2 11.69c0 2.07.68 3.97 1.82 5.52L2 22l5.02-1.75a9.88 9.88 0 0 0 5.02 1.36c5.55 0 10.04-4.26 10.04-9.69S17.59 2 12.04 2zm0 17.5c-1.59 0-3.13-.42-4.47-1.22l-.32-.19-2.98 1.04 1-3.03-.2-.31A7.47 7.47 0 0 1 4.54 11.7c0-4.1 3.37-7.43 7.5-7.43 4.14 0 7.5 3.33 7.5 7.43 0 4.1-3.36 7.43-7.5 7.43z" />
              <path d="M16.22 14.56c-.25-.13-1.46-.72-1.69-.8-.23-.09-.4-.13-.57.13-.17.25-.65.8-.8.96-.15.17-.3.19-.55.06-.25-.13-1.07-.39-2.04-1.23-.75-.66-1.26-1.47-1.4-1.72-.15-.25-.02-.38.11-.51.11-.11.25-.28.38-.42.13-.15.17-.25.25-.42.09-.17.04-.32-.02-.45-.06-.13-.57-1.37-.78-1.88-.21-.51-.42-.44-.57-.45h-.49c-.17 0-.45.06-.68.32-.23.25-.9.87-.9 2.12s.92 2.46 1.04 2.63c.13.17 1.8 2.74 4.38 3.84.61.26 1.09.42 1.46.54.61.19 1.16.16 1.6.1.49-.07 1.46-.6 1.67-1.18.21-.57.21-1.05.15-1.15-.06-.1-.23-.16-.48-.29z" />
            </svg>
            Stuur WhatsApp
          </a>
        </div>
      </motion.div>
    </motion.div>
  )}
</AnimatePresence>
    </section>
  );
}
