"use client";

import { useState } from "react";
import Image from "next/image";
import Modal from "@/components/Modal";
import AfspraakForm from "@/components/AfspraakForm";

export default function Navbar() {
  const [activeModal, setActiveModal] = useState<string | null>(null);

  return (
    <header className="bg-blue-800 text-white p-4 flex justify-between items-center">
      {/* Logo + Text */}
      <div className="flex items-center space-x-3">
        <Image
          src="/logo.png"
          alt="Lewende Woord Westerlig Logo"
          width={40}
          height={40}
          className="rounded-full"
        />
        <h2 className="text-lg font-bold">Lewende Woord Westerlig</h2>
      </div>

      {/* Navbar buttons */}
      <nav className="space-x-4">
        <button
          onClick={() => setActiveModal("counseling")}
          className="hover:underline"
        >
          Afspraak
        </button>
        <button
          onClick={() => setActiveModal("courses")}
          className="hover:underline"
        >
          Kursusse
        </button>
        <button
          onClick={() => setActiveModal("contact")}
          className="hover:underline"
        >
          Kontak
        </button>
      </nav>

      {/* Afspraak Modal */}
      <Modal
        isOpen={activeModal === "counseling"}
        onClose={() => setActiveModal(null)}
      >
        <h1 className="text-2xl font-bold mb-4">Maak ’n Afspraak 🕊️</h1>
        <AfspraakForm onSuccess={() => setActiveModal(null)} />
      </Modal>

      {/* Courses Modal */}
      <Modal
        isOpen={activeModal === "courses"}
        onClose={() => setActiveModal(null)}
      >
        <h1 className="text-2xl font-bold mb-4">Kursusse 📖</h1>
        <p className="text-gray-600">
          Ons sal hier inligting deel oor ons kursusse en hoe jy kan aansluit.
        </p>
      </Modal>

      {/* Contact Modal */}
      <Modal
        isOpen={activeModal === "contact"}
        onClose={() => setActiveModal(null)}
      >
        <h1 className="text-2xl font-bold mb-4">Kontak Ons 📬</h1>
        <p className="text-gray-600 mb-4">
          Stuur vir ons ’n boodskap of besoek ons tydens diensure.
        </p>
        <div className="space-y-2">
          <p>
            <strong>Email:</strong> info@lewende-woord.co.za
          </p>
          <p>
            <strong>Tel:</strong> +27 12 345 6789
          </p>
          <p>
            <strong>Adres:</strong> 123 Kerkstraat, Westerlig
          </p>
        </div>
      </Modal>
    </header>
  );
}
