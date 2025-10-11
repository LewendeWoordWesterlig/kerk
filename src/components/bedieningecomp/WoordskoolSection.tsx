"use client";
import Image from "next/image";

export default function WoordskoolSection() {
  return (
    <section className="flex flex-col md:flex-row items-center justify-between w-full bg-blue-50 py-16 px-8 md:px-24">
      <div className="md:w-1/2 mb-8 md:mb-0">
        <Image
          src="/IMG_0269.jpg"
          alt="Woordskool"
          width={600}
          height={400}
          className="rounded-2xl shadow-lg object-cover"
        />
      </div>
      <div className="md:w-1/2 text-center md:text-left space-y-4">
        <h2 className="text-3xl font-extrabold text-blue-900">Woordskool 📖</h2>
        <p className="text-gray-700 leading-relaxed">
          Leer die Woord saam met ons — ons Woordskool is ontwerp om jou geloof
          te versterk en jou kennis van die Bybel te verdiep.
        </p>
        <a
          href="tel:+27829299378"
          className="inline-block bg-yellow-400 text-blue-900 font-semibold px-6 py-2 rounded-full shadow hover:bg-yellow-300 transition"
        >
          Kontak Bedieningsleier
        </a>
      </div>
    </section>
  );
}
