"use client";

import { useState } from "react";
import Image from "next/image";
import { MapPin } from "lucide-react";
import Modal from "@/components/Modal";
import AfspraakForm from "@/components/AfspraakForm";

export default function Navbar({ onOpenModal }: { onOpenModal: (m: "week" | "services" | null) => void }) {
  const [activeModal, setActiveModal] = useState<string | null>(null);

  return (
    <header className="bg-gradient-to-r from-blue-900 to-blue-700 text-white px-6 py-4 flex justify-between items-center sticky top-0 z-50 shadow-lg">
      {/* Logo + Text */}
      <div className="flex items-center space-x-4">
        <Image
          src="/logo.png"
          alt="Lewende Woord Westerlig Logo"
          width={48}
          height={48}
          className="rounded-full shadow-md"
        />
        <h1 className="text-xl md:text-2xl font-extrabold tracking-wide">
          Lewende Woord Westerlig
        </h1>
      </div>

      {/* Navbar buttons (Desktop) */}
      <nav className="hidden md:flex items-center space-x-8 text-lg font-semibold">
        {/* Bedieninge (now opens same modal as homepage) */}
        <button
          onClick={() => onOpenModal("services")}
          className="relative group"
        >
          Bedieninge
          <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-yellow-400 transition-all duration-300 group-hover:w-full"></span>
        </button>

        {/* Kontak ons */}
        <button
          onClick={() => setActiveModal("contact")}
          className="relative group"
        >
          Kontak ons
          <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-yellow-400 transition-all duration-300 group-hover:w-full"></span>
        </button>

        <button
          onClick={() => setActiveModal("gee")}
          className="relative group"
        >
          SAAI
          <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-yellow-400 transition-all duration-300 group-hover:w-full"></span>
        </button>

        {/* Join Ons button */}
        <a
          href="https://www.google.com/maps/search/?api=1&query=631+Niemandt+Street,+Andeon+AH,+Pretoria"
          target="_blank"
          rel="noopener noreferrer"
          className="ml-4 bg-yellow-400 text-blue-900 font-bold px-5 py-2 rounded-full shadow-md hover:bg-yellow-300 transition-colors flex items-center space-x-2"
        >
          <MapPin className="w-5 h-5" />
          <span>Join Ons</span>
        </a>
      </nav>

      {/* Keep your other modals (contact, gee, afspraak) */}
      <Modal
        isOpen={activeModal === "contact"}
        onClose={() => setActiveModal(null)}
      >
        <h1 className="text-2xl font-bold mb-4">Kontak Ons 📬</h1>
        <p className="text-gray-700 mb-4">
          Stuur vir ons ’n boodskap of besoek ons tydens diensure.
        </p>
        <div className="space-y-2">
          <p>
            <strong>Email:</strong> admin@westerlig.com
          </p>
          <p>
            <strong>Tel:</strong> 082 929 9378
          </p>
          <p>
            <strong>Adres:</strong> 631 Niemandt str, Andeo AH, Pretoria
          </p>
        </div>
      </Modal>

      <Modal
        isOpen={activeModal === "gee"}
        onClose={() => setActiveModal(null)}
      >
        <h1 className="text-2xl font-bold mb-4">SAAI 🙏</h1>
        <p className="text-gray-700 mb-4">
          Dankie dat jy ons bediening ondersteun!
          Jy kan gee deur EFT of SnapScan:
        </p>
        <div className="space-y-2">
          <p><strong>Bank:</strong> FNB</p>
          <p><strong>Rekeningnommer:</strong> 63104010573</p>
          <p><strong>Takkode:</strong> 250066</p>
          <p><strong>Tjekrekening</strong></p>
          <p><strong>Verwysing:</strong> Tiendes / Offergawes</p>
        </div>
      </Modal>
    </header>
  );
}
