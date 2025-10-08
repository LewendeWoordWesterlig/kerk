"use client";

import Image from "next/image";
import { useState } from "react";
import Modal from "./Modal";

export default function Footer() {
  const [activeModal, setActiveModal] = useState<string | null>(null);

  return (
    <footer className="bg-blue-700 text-white p-6 mt-12">
      <div className="flex flex-col items-center space-y-6">
        {/* Logo */}
        <Image
          src="/logo.png"
          alt="Lewende Woord Westerlig Logo"
          width={50}
          height={50}
          className="rounded-full"
        />

        {/* Church name */}
        <h2 className="text-lg font-bold">Lewende Woord Westerlig</h2>

        {/* Quick Links - responsive layout */}
        <nav className="flex flex-col sm:flex-row sm:space-x-6 space-y-3 sm:space-y-0 text-center">
          <button
            onClick={() => setActiveModal("counseling")}
            className="hover:underline"
          >
            Berading
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

        {/* Contact Info */}
        <div className="text-center text-sm space-y-1">
          <p>Email: info@lewende-woord.co.za</p>
          <p>Tel: +27 12 345 6789</p>
          <p>Adres: 123 Kerkstraat, Westerlig</p>
        </div>

        {/* Copyright */}
        <p className="text-xs text-gray-300 mt-4 text-center">
          © {new Date().getFullYear()} Lewende Woord Westerlig. Alle regte voorbehou.
        </p>
      </div>

      {/* Counseling Modal */}
      <Modal
        isOpen={activeModal === "counseling"}
        onClose={() => setActiveModal(null)}
      >
        <h1 className="text-2xl font-bold mb-4">Boek Berading 🕊️</h1>
        <p className="text-gray-600">
          Binnekort sal jy hier ’n afspraak kan maak vir berading.
        </p>
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
          <p><strong>Email:</strong> info@lewende-woord.co.za</p>
          <p><strong>Tel:</strong> +27 12 345 6789</p>
          <p><strong>Adres:</strong> 123 Kerkstraat, Westerlig</p>
        </div>
      </Modal>
    </footer>
  );
}
