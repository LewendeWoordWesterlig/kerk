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
  const [sending, setSending] = useState(false);

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
        <Link
          href="/"
          className="relative group flex items-center space-x-1"
        >
          <Home className="w-5 h-5" />
          <span>Tuis</span>
          <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-yellow-400 transition-all duration-300 group-hover:w-full" />
        </Link>

        <Link
          href="/bedieninge"
          className="relative group flex items-center space-x-1"
        >
          <span>Bedieninge</span>
          <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-yellow-400 transition-all duration-300 group-hover:w-full" />
        </Link>

        <Link
          href="/selgroepe"
          className="relative group flex items-center space-x-1"
        >
          <span>Selgroepe</span>
          <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-yellow-400 transition-all duration-300 group-hover:w-full" />
        </Link>

        <button
          onClick={() => setActiveModal("contact")}
          className="relative group"
        >
          Kontak ons
          <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-yellow-400 transition-all duration-300 group-hover:w-full" />
        </button>

        <button
          onClick={() => setActiveModal("gee")}
          className="relative group px-4 py-2 border-2 border-yellow-400 rounded-md hover:bg-yellow-400 hover:text-blue-900 transition-all duration-300"
        >
          SAAI
        </button>

        <button
          onClick={() => setActiveModal("betrokke")}
          className="relative group px-4 py-2 border-2 border-yellow-400 rounded-md hover:bg-yellow-400 hover:text-blue-900 transition-all duration-300"
        >
          Raak Betrokke
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

          <Link
            href="/bedieninge"
            onClick={() => setMobileOpen(false)}
            className="text-lg font-semibold hover:text-yellow-400"
          >
            Bedieninge
          </Link>

          <Link
            href="/selgroepe"
            onClick={() => setMobileOpen(false)}
            className="text-lg font-semibold hover:text-yellow-400"
          >
            Selgroepe
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
            className="text-lg font-semibold border-2 border-yellow-400 px-4 py-2 rounded-md hover:bg-yellow-400 hover:text-blue-900 transition-all duration-300"
          >
            SAAI
          </button>

          <button
            onClick={() => {
              setActiveModal("betrokke");
              setMobileOpen(false);
            }}
            className="text-lg font-semibold border-2 border-yellow-400 px-4 py-2 rounded-md hover:bg-yellow-400 hover:text-blue-900 transition-all duration-300"
          >
            Raak Betrokke
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
            <strong>Adres:</strong> 631 Niemandt str, Andeon AH, Pretoria
          </p>
        </div>
      </Modal>

      {/* SAAI Modal */}
      <Modal
        isOpen={activeModal === "gee"}
        onClose={() => setActiveModal(null)}
      >
        <h1 className="text-2xl font-bold mb-4">SAAI 🙏</h1>
        <p className="text-gray-700 mb-4">
          Dankie dat jy ons bediening ondersteun!
        </p>

        <div className="space-y-2 text-center">
          <p>
            <strong>Bank:</strong> FNB
          </p>
          <p>
            <strong>Rekeningnommer:</strong> 63104010573
          </p>
          <p>
            <strong>Takkode:</strong> 250066
          </p>
          <p>
            <strong>Tjekrekening</strong>
          </p>
          <p>
            <strong>Verwysing:</strong> Tiendes / Offergawes
          </p>
        </div>

        <button
          onClick={copyToClipboard}
          className="mt-4 flex items-center mx-auto bg-yellow-400 text-blue-900 font-semibold px-4 py-2 rounded-full shadow hover:bg-yellow-300 transition"
        >
          <Copy className="w-5 h-5 mr-2" />
          Kopieer Bankbesonderhede
        </button>
      </Modal>

      {/* Raak Betrokke Modal */}
      <Modal
        isOpen={activeModal === "betrokke"}
        onClose={() => setActiveModal(null)}
      >
        <h1 className="text-2xl font-bold mb-4 text-center">Raak Betrokke 🙌</h1>
        <p className="text-gray-700 mb-4 text-center">
          Vul asseblief jou besonderhede in en kies waar jy graag wil help.
        </p>

        <form
          onSubmit={async (e) => {
            e.preventDefault();
            const form = e.currentTarget as HTMLFormElement;
            setSending(true);
            const data = {
              naam: (form.naam as HTMLInputElement).value,
              epos: (form.epos as HTMLInputElement).value,
              nommer: (form.nommer as HTMLInputElement).value,
              betrokkeBy: (form.betrokkeBy as HTMLSelectElement).value,
            };

            try {
              const res = await fetch("/api/raak-betrokke", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
              });

              if (res.ok) {
                alert("Boodskap gestuur! 🙌");
                form.reset();
                setActiveModal(null);
              } else {
                alert("Daar was ’n probleem. Probeer weer.");
              }
            } catch (error) {
              console.error(error);
              alert("Daar was ’n probleem. Probeer weer.");
            } finally {
              setSending(false);
            }
          }}
          className="space-y-4"
        >
          <input
            type="text"
            name="naam"
            placeholder="Jou Naam"
            required
            disabled={sending}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-400"
          />
          <input
            type="email"
            name="epos"
            placeholder="Jou E-pos"
            required
            disabled={sending}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-400"
          />
          <input
            type="tel"
            name="nommer"
            placeholder="Jou Nommer"
            required
            disabled={sending}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-400"
          />
          <select
            name="betrokkeBy"
            required
            disabled={sending}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-400"
          >
            <option value="">Kies ’n opsie</option>
            <option value="Orkes">Orkes</option>
            <option value="Tegniese Span">Tegniese Span (Klank ens.)</option>
            <option value="Selgroep Leier">Selgroep Leier</option>
            <option value="Woordskool">Woordskool</option>
            <option value="Kinderkerk">Kinderkerk</option>
            <option value="Tienerkerk">Tienerkerk</option>
          </select>

          <button
            type="submit"
            disabled={sending}
            className="w-full bg-yellow-400 text-blue-900 font-semibold py-2 rounded-md hover:bg-yellow-300 transition"
          >
            {sending ? "Stuur..." : "Stuur"}
          </button>
        </form>
      </Modal>
    </header>
  );
}
