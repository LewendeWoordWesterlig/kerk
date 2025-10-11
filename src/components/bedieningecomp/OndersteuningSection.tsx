"use client";

import { useState } from "react";
import Image from "next/image";
import Modal from "@/components/Modal";
import AfspraakForm from "@/components/AfspraakForm";

export default function OndersteuningSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section className="flex flex-col md:flex-row-reverse items-center justify-between w-full bg-blue-50 py-16 px-8 md:px-24">
      {/* Image */}
      <div className="md:w-1/2 mb-8 md:mb-0">
        <Image
          src="/images/Ondersteuning/ondersteuning 1.jpg"
          alt="Ondersteuning"
          width={600}
          height={400}
          className="rounded-2xl shadow-lg object-cover"
        />
      </div>

      {/* Text + Button */}
      <div className="md:w-1/2 text-center md:text-left space-y-4">
        <h2 className="text-3xl font-extrabold text-blue-900">Ondersteuning ❤️</h2>
        <p className="text-gray-700 leading-relaxed">
          Ons is hier om te help — of jy begeleiding, gebed of raad nodig het.
          Ons ondersteuningspan is gereed om saam met jou te bid en te gesels.
        </p>
        <button
          onClick={() => setIsModalOpen(true)}
          className="inline-block bg-blue-900 text-white font-semibold px-6 py-2 rounded-full shadow hover:bg-blue-800 transition"
        >
          Maak ’n Afspraak
        </button>
      </div>

      {/* Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h2 className="text-2xl font-bold mb-4 text-blue-900">Maak ’n Afspraak 🙏</h2>
        <AfspraakForm />
      </Modal>
    </section>
  );
}
