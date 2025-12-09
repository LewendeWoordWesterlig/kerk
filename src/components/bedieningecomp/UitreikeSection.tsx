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
  "/images/Uitreik/uitreike7.jpg",
  "/images/Uitreik/uitreike8.jpg",
];

export default function UitreikeSection() {
  const [index, setIndex] = useState(0);
  const [activePopup, setActivePopup] = useState<"street" | "Westerlig Uitreik" | null>(null);

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

        <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
          <button
            onClick={() => setActivePopup("street")}
            className="bg-blue-700 text-white px-6 py-3 rounded-full shadow-md hover:bg-blue-800 transition"
          >
            The Way Street Church
          </button>

          <button
            onClick={() => setActivePopup("Westerlig Uitreik")}
            className="bg-yellow-400 text-blue-900 px-6 py-3 rounded-full shadow-md hover:bg-yellow-300 transition"
          >
            Westerlig Uitreik
          </button>
        </div>
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

      {/* === POPUPS === */}

      {/* Street Church Popup */}
      {activePopup === "street" && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-2xl p-8 w-[90%] max-w-2xl relative overflow-y-auto max-h-[85vh]">
            <button
              onClick={() => setActivePopup(null)}
              className="absolute top-3 right-4 text-gray-500 hover:text-red-500 text-xl font-bold"
            >
              ✕
            </button>

            <h3 className="text-2xl font-bold text-blue-900 mb-4 text-center">
               The Way Street Church
            </h3>

            <div className="text-gray-700 space-y-4 text-justify leading-relaxed">
              <p>
                The Way Street Church is ’n unieke bediening wat saamkom om God se Woord en liefde na die mense te bring presies nét waar hulle is — óp die strate, ín die gemeenskap, en binne ín harte wat honger is na nuwe hoop. Hierdie bediening is jy welkom, ongeag agtergrond, ouderdom of lewenservaring.
              </p>
              <p>
                Ons kom elke Vrydagaand 17h30 bymekaar by die poskantoor in Vanderhoffweg vir ’n tyd van gebed, woorde van bemoediging en deel van die Woord van God. Daar is ook kos en warmte vir liggaam en siel, en die bediening is ’n veilige ruimte waar mense hulself kan wees en die liefde van Jesus ervaar (Matthéüs 25:35-36).
              </p>
              <p>
                The Way Street Church glo dat elke mens waardevol is in die oë van God, en ons streef daarna om hulle te ontmoet waar hulle is — met genade, respek en die krag van die Evangelie. Die bediening is nie net ’n oggend of aand op die kalender nie; dit is ’n leefstyl van diens, gemeenskap en voorbidding.
              </p>
              <p>
                Hier word mense nie net bedien nie, hulle word aangemoedig om self deel te wees van die bediening en die liefde van God aan ander oor te dra. Die Here gebruik die klein gebede, die warm woorde en die daaglikse klein gebare van sorg om groot dinge te doen.
              </p>
              <blockquote className="italic border-l-4 border-blue-700 pl-4 text-blue-900">
                "Laat julle lig só skyn voor die mense, dat hulle julle goeie werke kan sien en julle Vader wat in die hemele is, verheerlik." — Matthéüs 5:16
              </blockquote>
              <p>
                The Way Street Church: ’n bediening van liefde, hoop en aksie, waar elke hart getref kan word en elke siel die God van genade kan ontmoet.
              </p>

              <div className="mt-6 text-center space-y-2">
                <p className="font-semibold text-blue-900">📞 Andries de Beer</p>
                <p className="text-gray-700">082 870 7087</p>
              </div>

              <div className="flex flex-col gap-3 mt-6 text-center">
                <a
                  href="tel:+27828707087"
                  className="inline-block bg-yellow-400 text-blue-900 font-semibold px-6 py-2 rounded-full shadow hover:bg-yellow-300 transition"
                >
                  Skakel Nou
                </a>
                <a
                  href="https://wa.me/27828707087?text=Goeie%20dag%20Andries!%20Ek%20wil%20meer%20uitvind%20oor%20The%20Way%20Street%20Church.%20🙏"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-green-500 text-white font-semibold px-6 py-2 rounded-full shadow hover:bg-green-600 transition"
                >
                  WhatsApp Nou
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Westerlig Uitreik Popup */}
      {activePopup === "Westerlig Uitreik" && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-2xl p-8 w-[90%] max-w-2xl relative overflow-y-auto max-h-[85vh]">
            <button
              onClick={() => setActivePopup(null)}
              className="absolute top-3 right-4 text-gray-500 hover:text-red-500 text-xl font-bold"
            >
              ✕
            </button>

            <h3 className="text-2xl font-bold text-blue-900 mb-4 text-center">
               Westerlig Uitreikbediening
            </h3>

            <div className="text-gray-700 space-y-4 text-justify leading-relaxed">
              <p>
                Die Westerlig Uitreikbediening is die hande en voete van Jesus in aksie. Hier gaan dit oor méér as net gee — dit gaan oor ráák sien. Ons span beweeg na verskillende areas waar nood raakgesien word, waar hongermagies wag en harte dors is na hoop. Met die Woord in die een hand en kos in die ander, word mense bedien — liggaam, siel en gees.
              </p>
              <p>
                In elke straat, by elke huis en in elke gemeenskap waar ons kom, is die doel eenvoudig: om mense aan Jesus te herinner. Nie net deur woorde nie, maar deur dade wat sê: "God het jou nie vergeet nie." So word Sy liefde sigbaar in ’n warm bord kos, ’n drukkie, ’n gebed, of net iemand wat luister.
              </p>
              <blockquote className="italic border-l-4 border-yellow-500 pl-4 text-yellow-700">
                "Want Ek het honger gehad, en julle het My te ete gegee; Ek het dors gehad, en julle het My te drinke gegee; Ek was 'n vreemdeling, en julle het My herberg gegee; Ek was naak, en julle het My geklee; Ek was siek, en julle het My besoek; in die gevangenis was Ek, en julle het na My gekom." — Matthéüs 25:35–36
              </blockquote>
              <p>
                Hierdie bediening leef daardie woorde uit — nie as ’n projek nie, maar as ’n roeping.
              </p>
              <p>
                Elke uitreik is anders. Partymaal bring ons troos in ’n siekbed, ander kere lig ons ’n kind se glimlag op met ’n warm bord kos. Maar elke keer is daar dieselfde boodskap: "God is naby."
              </p>
              <p>
                Ons droom is om lig te bring waar donkerte oorheers, en om ’n verskil te maak wat verder strek as net ’n maaltyd of ’n besoek — ’n ewige verskil in mense se lewens.
              </p>
              <blockquote className="italic border-l-4 border-blue-700 pl-4 text-blue-900">
                "Laat julle lig só skyn voor die mense, dat hulle julle goeie werke kan sien en julle Vader wat in die hemele is, verheerlik." — Matthéüs 5:16
              </blockquote>

              <div className="mt-6 text-center space-y-2">
                <p className="font-semibold text-blue-900">📞 Madeleine Fowlds</p>
                <p className="text-gray-700">082 658 6354</p>
              </div>

              <div className="flex flex-col gap-3 mt-6 text-center">
                <a
                  href="tel:+27825686354"
                  className="inline-block bg-yellow-400 text-blue-900 font-semibold px-6 py-2 rounded-full shadow hover:bg-yellow-300 transition"
                >
                  Skakel Nou
                </a>
                <a
                  href="https://wa.me/27825686354?text=Goeie%20dag%20Geo!%20Ek%20wil%20meer%20uitvind%20oor%20die%20Westerlig%20Uitreikbediening.%20🙏"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-green-500 text-white font-semibold px-6 py-2 rounded-full shadow hover:bg-green-600 transition"
                >
                  WhatsApp Nou
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
