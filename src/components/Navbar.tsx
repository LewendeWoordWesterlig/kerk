"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { MapPin, Menu, X, Copy, Home } from "lucide-react";
import Modal from "@/components/Modal";

export default function Navbar({
  onOpenModal,
}: {
  onOpenModal: (m: "week" | "services" | null) => void;
}) {
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  const bankDetails = `
Bank: FNB
Rekeningnommer: 63104010573
Takkode: 250066
Tjekrekening
Verwysing: Tiendes / Offergawes
  `;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(bankDetails.trim());
    alert("Bankbesonderhede is gekopieer! 📋");
  };

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

      {/* Desktop Navbar */}
      <nav className="hidden md:flex items-center space-x-8 text-lg font-semibold">
        {/* Home Button */}
        <Link href="/" className="relative group flex items-center space-x-1">
          <Home className="w-5 h-5" />
          <span>Tuis</span>
          <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-yellow-400 transition-all duration-300 group-hover:w-full"></span>
        </Link>

        {/* Bedieninge now links to /bedieninge */}
        <Link
          href="/bedieninge"
          className="relative group flex items-center space-x-1"
        >
          <span>Bedieninge</span>
          <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-yellow-400 transition-all duration-300 group-hover:w-full"></span>
        </Link>

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

      {/* Mobile Burger Menu */}
      <div className="md:hidden">
        <button onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {mobileOpen && (
        <div className="absolute top-16 left-0 w-full bg-gradient-to-b from-blue-900 to-blue-700 text-white shadow-lg flex flex-col items-center py-6 space-y-6 md:hidden z-40">
          <Link
            href="/"
            onClick={() => setMobileOpen(false)}
            className="text-lg font-semibold hover:text-yellow-400 flex items-center space-x-2"
          >
            <Home className="w-5 h-5" />
            <span>Tuis</span>
          </Link>

          {/* Mobile Bedieninge link */}
          <Link
            href="/bedieninge"
            onClick={() => setMobileOpen(false)}
            className="text-lg font-semibold hover:text-yellow-400"
          >
            Bedieninge
          </Link>

          <button
            onClick={() => {
              setActiveModal("contact");
              setMobileOpen(false);
            }}
            className="text-lg font-semibold hover:text-yellow-400"
          >
            Kontak ons
          </button>

          <button
            onClick={() => {
              setActiveModal("gee");
              setMobileOpen(false);
            }}
            className="text-lg font-semibold hover:text-yellow-400"
          >
            SAAI
          </button>

          <a
            href="https://www.google.com/maps/search/?api=1&query=631+Niemandt+Street,+Andeon+AH,+Pretoria"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-yellow-400 text-blue-900 font-bold px-5 py-2 rounded-full shadow-md hover:bg-yellow-300 transition-colors"
          >
            Join Ons
          </a>
        </div>
      )}

      {/* Contact Modal */}
      <Modal isOpen={activeModal === "contact"} onClose={() => setActiveModal(null)}>
        <h1 className="text-2xl font-bold mb-4">Kontak Ons 📬</h1>
        <p className="text-gray-700 mb-4">
          Stuur vir ons ’n boodskap of besoek ons tydens diensure.
        </p>
        <div className="space-y-2">
          <p><strong>Email:</strong> admin@westerlig.com</p>
          <p><strong>Tel:</strong> 082 929 9378</p>
          <p><strong>Adres:</strong> 631 Niemandt str, Andeon AH, Pretoria</p>
        </div>
      </Modal>

      {/* Gee Modal */}
      <Modal isOpen={activeModal === "gee"} onClose={() => setActiveModal(null)}>
        <h1 className="text-2xl font-bold mb-4">SAAI 🙏</h1>
        <p className="text-gray-700 mb-4">
          Dankie dat jy ons bediening ondersteun! Jy kan gee deur EFT of SnapScan:
        </p>

        <div className="space-y-2 text-center">
          <p><strong>Bank:</strong> FNB</p>
          <p><strong>Rekeningnommer:</strong> 63104010573</p>
          <p><strong>Takkode:</strong> 250066</p>
          <p><strong>Tjekrekening</strong></p>
          <p><strong>Verwysing:</strong> Tiendes / Offergawes</p>
        </div>

        <button
          onClick={copyToClipboard}
          className="mt-4 flex items-center mx-auto bg-yellow-400 text-blue-900 font-semibold px-4 py-2 rounded-full shadow hover:bg-yellow-300 transition"
        >
          <Copy className="w-5 h-5 mr-2" />
          Kopieer Bankbesonderhede
        </button>

        <div className="mt-6 text-center">
          <p className="font-semibold mb-2">Of gebruik SnapScan:</p>
          <img
            src="/snapscan.png"
            alt="SnapScan QR"
            className="w-40 mx-auto rounded-lg shadow"
          />
        </div>
      </Modal>
    </header>
  );
}
