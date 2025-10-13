"use client";
import { useState } from "react";
import Image from "next/image";
import WoordskoolForm from "@/components/WoordskoolForm";

export default function WoordskoolSection() {
  const [showInfo, setShowInfo] = useState(false);
  const [showForm, setShowForm] = useState(false);

  return (
    <section className="flex flex-col md:flex-row items-center justify-between w-full bg-blue-50 py-16 px-8 md:px-24">
      {/* Left Image */}
      <div className="md:w-1/2 mb-8 md:mb-0">
        <Image
          src="/IMG_0269.jpg"
          alt="Woordskool"
          width={600}
          height={400}
          className="rounded-2xl shadow-lg object-cover"
        />
      </div>

      {/* Right Content */}
      <div className="md:w-1/2 text-center md:text-left space-y-4">
        <h2 className="text-3xl font-extrabold text-blue-900">Woordskool</h2>
        <p className="text-gray-700 leading-relaxed">
          Leer die Woord saam met ons — ons Woordskool is ontwerp om jou geloof
          te versterk en jou kennis van die Bybel te verdiep.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
          <button
            onClick={() => setShowInfo(true)}
            className="bg-blue-900 text-white font-semibold px-6 py-2 rounded-full shadow hover:bg-blue-800 transition"
          >
            Meer inligting
          </button>

          <button
            onClick={() => setShowForm(true)}
            className="bg-yellow-400 text-blue-900 font-semibold px-6 py-2 rounded-full shadow hover:bg-yellow-300 transition"
          >
            Kontak Bedieningsleier
          </button>
        </div>
      </div>

      {/* --- INFO POPUP --- */}
      {showInfo && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-8 overflow-y-auto max-h-[80vh]">
            <h3 className="text-2xl font-bold text-blue-900 mb-4 text-center">
              📚 Meer oor die Woordskool
            </h3>
            <p className="text-gray-700 leading-relaxed space-y-4">
              Die Woordskool is ’n opwindende bediening vir almal wat hul kennis
              van die Bybel en Bybelaspekte wil verdiep en ’n sterker fondasie
              in die Woord te wil bou. Die skool vind Maandae-aande plaas en
              fokus op praktiese en teologiese insigte, sodat leerders nie net
              weet wat in die Skrif staan nie, maar dit ook kan verstaan en kan
              toepas in hul alledaagse lewe (2 Timótheüs 3:16-17).
              <br />
              <br />
              Elke sessie bied interaktiewe leer, geleentheid vir vrae, en die
              ruimte om saam te reflekteer oor God se Woord. Dit is geskik vir
              nuwe gelowiges wat wil begin verstaan, sowel as vir meer ervare
              Christene wat hul kennis wil verdiep.
              <br />
              <br />
              Om deel te wees van die Woordskool, kontak asseblief vir Marietjie
              Olckers 0829299378 om jou plek te bespreek. Kom ontdek hoe die
              Woord nie net ’n boek is nie, maar ’n lewende gids vir jou geloof
              en jou lewe.
              <br />
              <br />
              “Laat die woord van Christus ryklik in julle woon in alle wysheid.
              Leer en vermaan mekaar met psalms en lofsange en geestelike
              liedere, en sing in julle hart met dankbaarheid tot eer van die
              Here.” — Kolossense 3:16
            </p>
            <button
              onClick={() => setShowInfo(false)}
              className="mt-6 bg-blue-900 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-800 transition w-full"
            >
              Maak toe
            </button>
          </div>
        </div>
      )}

      {/* --- FORM POPUP --- */}
      {showForm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50 px-4">
          <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full">
            <WoordskoolForm onSuccess={() => setShowForm(false)} />
            <button
              onClick={() => setShowForm(false)}
              className="mt-4 bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300 w-full"
            >
              Maak toe
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
