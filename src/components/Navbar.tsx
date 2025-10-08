"use client";

import { useState } from "react";
import Image from "next/image";
import { MapPin } from "lucide-react"; // ⬅️ added
import Modal from "@/components/Modal";
import AfspraakForm from "@/components/AfspraakForm";

export default function Navbar() {
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
        <button
          onClick={() => setActiveModal("counseling")}
          className="relative group"
        >
          Afspraak
          <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-yellow-400 transition-all duration-300 group-hover:w-full"></span>
        </button>
        <button
          onClick={() => setActiveModal("courses")}
          className="relative group"
        >
          Kursusse
          <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-yellow-400 transition-all duration-300 group-hover:w-full"></span>
        </button>
        <button
          onClick={() => setActiveModal("contact")}
          className="relative group"
        >
          Kontak
          <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-yellow-400 transition-all duration-300 group-hover:w-full"></span>
        </button>
        <button
          onClick={() => setActiveModal("gee")}
          className="relative group"
        >
          Gee
          <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-yellow-400 transition-all duration-300 group-hover:w-full"></span>
        </button>

        {/* Join Ons button (highlighted) */}
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

      {/* Hamburger button (Mobile) */}
      <div className="md:hidden">
        <button
          onClick={() => setActiveModal("menu")}
          className="text-3xl focus:outline-none"
        >
          ☰
        </button>
      </div>

      {/* Slide-In Mobile Menu */}
      {activeModal === "menu" && (
        <div className="fixed inset-0 z-50 flex">
          {/* Background overlay */}
          <div
            className="fixed inset-0 bg-black bg-opacity-50"
            onClick={() => setActiveModal(null)}
          ></div>

          {/* Slide-in panel */}
          <div className="ml-auto w-72 bg-white h-full shadow-xl transform transition-transform duration-300 ease-in-out translate-x-0">
            <div className="p-6 flex justify-between items-center border-b">
              <h2 className="text-xl font-bold text-blue-800">Menu</h2>
              <button
                onClick={() => setActiveModal(null)}
                className="text-2xl text-blue-800"
              >
                ✕
              </button>
            </div>
            <nav className="flex flex-col p-6 space-y-6 text-blue-900 font-bold text-lg">
              <button
                onClick={() => setActiveModal("counseling")}
                className="hover:text-blue-600"
              >
                Afspraak
              </button>
              <button
                onClick={() => setActiveModal("courses")}
                className="hover:text-blue-600"
              >
                Kursusse
              </button>
              <button
                onClick={() => setActiveModal("contact")}
                className="hover:text-blue-600"
              >
                Kontak
              </button>
              <button
                onClick={() => setActiveModal("gee")}
                className="hover:text-blue-600"
              >
                Gee
              </button>
              <a
                href="https://www.google.com/maps/search/?api=1&query=631+Niemandt+Street,+Andeon+AH,+Pretoria"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-yellow-400 text-blue-900 font-bold px-4 py-2 rounded-full shadow-md hover:bg-yellow-300 transition-colors flex items-center space-x-2"
              >
                <MapPin className="w-5 h-5" />
                <span>Join Ons</span>
              </a>
            </nav>
          </div>
        </div>
      )}

      {/* Modals unchanged... */}
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
        <p className="text-gray-700">
          Ons sal hier inligting deel oor ons kursusse en hoe jy kan aansluit.
        </p>
      </Modal>

      {/* Contact Modal */}
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

      {/* Gee Modal */}
      <Modal
        isOpen={activeModal === "gee"}
        onClose={() => setActiveModal(null)}
      >
        <h1 className="text-2xl font-bold mb-4">Gee 🙏</h1>
        <p className="text-gray-700 mb-4">
          Dankie dat jy ons bediening ondersteun!  
          Jy kan gee deur EFT of SnapScan:
        </p>
        <div className="space-y-2">
          <p>
            <strong>Bank:</strong> ABSA  
          </p>
          <p>
            <strong>Rekeningnommer:</strong> 123456789  
          </p>
          <p>
            <strong>Verwysing:</strong> Tiendes / Offer  
          </p>
        </div>
      </Modal>
    </header>
  );
}
