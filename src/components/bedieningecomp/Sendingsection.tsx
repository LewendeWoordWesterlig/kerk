"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const galleryImages = [
  "/images/gallery/sending1.jpg",
  "/images/gallery/sending2.jpg",
  "/images/gallery/sending3.jpg",
  "/images/gallery/sending4.jpg",
];

export default function InfoWithGallerySection() {
  const [index, setIndex] = useState(0);

  const nextImage = () =>
    setIndex((prev) => (prev + 1) % galleryImages.length);
  const prevImage = () =>
    setIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);

  return (
    <section className="bg-gradient-to-r from-yellow-50 to-yellow-100 py-16 px-6 md:px-20 rounded-2xl shadow-lg">
      {/* Header + Paragraph */}
      <div className="max-w-4xl mx-auto text-center md:text-left mb-12">
        <h2 className="text-3xl font-bold text-yellow-800 mb-6">
          Sending
        </h2>

        <p className="text-gray-800 leading-relaxed text-lg whitespace-pre-line">
          Die stigter van World Vision, Bob Pierce, het gesê:
          “Let my heart be broken with the things that break God’s heart.”

          Lewende Woord Westerlig Sending reik oor ons landsgrense uit na Zambië en Malawi. 
          Hoewel ons nie permanent in die veld is nie, ondersteun ons deur die jaar plaaslike 
          pastore, kleuterskoolonderwysers en gemeenskapswerkers met opleiding, opbouing en gebed.
<p></p>
          Ons werk saam met Judea Harvest, ’n organisasie wat in 33 Afrika-lande werksaam is. 
          Jaarliks mobiliseer ons vrywilligers uit die Westerlig-gemeente om vir ’n week of twee 
          saam met bestaande gemeentes en netwerke te dien — ’n pad wat ons al nege jaar saam stap. 
          Hierdie korttermyn-uitreike bied broodnodige ondersteuning en bemoediging aan plaaslike 
          werkers wat dikwels met groot uitdagings worstel.
<p></p>
          “Daarop hoor ek die stem van die Here wat sê: Wie sal Ek stuur? En wie sal vir ons gaan? 
          Toe antwoord ek: Hier is ek, stuur my.” — Jesaja 6:8
<p></p>
          As “stuur”-gemeente sien ons hoe Westerlig en sy gemeentelede ’n tasbare verskil maak — 
          deur gebed, finansiële bydraes en skenkings. Elke keer wat ons uitstap, ervaar ons weer dat 
          God werklik ’n God van nabyheid is — Hy maak ’n pad waar daar geen pad is nie.
<p></p>
          Ons almal het iets om te gee. Saam, deur Christus, word dit moontlik.
          Wil jy nie ook deel word hiervan nie?
          Wees geseënd,
          <p></p>
          Herman & Althea
        </p>
      </div>

      {/* Gallery Carousel */}
      <div className="max-w-3xl mx-auto relative mb-12">
        <div className="relative w-full aspect-[16/9] overflow-hidden rounded-2xl shadow-xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.7 }}
              className="absolute inset-0"
            >
              <Image
                src={galleryImages[index]}
                alt="Gallery image"
                fill
                className="object-cover"
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Controls */}
        <button
          onClick={prevImage}
          className="absolute top-1/2 left-0 -translate-y-1/2 bg-yellow-600 text-white px-4 py-2 rounded-r-lg shadow-md hover:bg-yellow-700"
        >
          ‹
        </button>
        <button
          onClick={nextImage}
          className="absolute top-1/2 right-0 -translate-y-1/2 bg-yellow-600 text-white px-4 py-2 rounded-l-lg shadow-md hover:bg-yellow-700"
        >
          ›
        </button>
      </div>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row gap-6 justify-center mt-8">
        <a
          href="https://wa.me/27829908159"
          target="_blank"
          className="bg-green-600 text-white px-8 py-4 rounded-xl shadow-lg hover:bg-green-700 transition-all text-lg font-semibold"
        >
          WhatsApp Ons
        </a>

        <a
          href="tel:27829908159"
          className="bg-yellow-600 text-white px-8 py-4 rounded-xl shadow-lg hover:bg-yellow-700 transition-all text-lg font-semibold"
        >
          Bel My
        </a>
      </div>
    </section>
  );
}
