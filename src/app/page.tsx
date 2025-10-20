"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ServiceTimes from "@/components/ServiceTimes";
import HeroCarousel from "@/components/HeroCarousel";
import WeekProgram from "@/components/WeekProgram";
import Bedieninge from "@/components/Bedieninge";
import AfspraakForm from "@/components/AfspraakForm";
import Modal from "@/components/Modal";
import YouTubeSection from "@/components/YoutubeSection"; // 👈 added import

export default function Home() {
  const [openModal, setOpenModal] = useState<"week" | "services" | "counseling" | null>(null);

  return (
    <div className="flex flex-col min-h-screen bg-[#F8F9FA]">
      {/* Navbar */}
      <Navbar onOpenModal={setOpenModal} />

      {/* Hero Section */}
      <HeroCarousel />

      {/* Service Times + Buttons */}
      <div className="p-8 max-w-4xl mx-auto text-center">
        <ServiceTimes />

        {/* Buttons with image backgrounds */}
        <section className="grid md:grid-cols-2 gap-6 mt-12">
          {/* Week Program */}
          <button
            onClick={() => setOpenModal("week")}
            className="relative h-44 rounded-2xl overflow-hidden shadow-xl group w-full border-4 border-[#C81D25]"
          >
            <img
              src="/texture-1647380.jpg"
              alt="Week Program"
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0D3B66]/70 to-transparent group-hover:from-[#0D3B66]/50 transition"></div>
            <div className="relative z-10 flex items-center justify-center h-full">
              <h3 className="text-2xl font-extrabold text-yellow-400 drop-shadow-lg tracking-wide">
                Week Program
              </h3>
            </div>
          </button>

          {/* Bedieninge */}
          <button
            onClick={() => setOpenModal("services")}
            className="relative h-44 rounded-2xl overflow-hidden shadow-xl group w-full border-4 border-[#0D3B66]"
          >
            <img
              src="/paper-7821960_1920.jpg"
              alt="Bedieninge"
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#C81D25]/70 to-transparent group-hover:from-[#C81D25]/50 transition"></div>
            <div className="relative z-10 flex items-center justify-center h-full">
              <h3 className="text-2xl font-extrabold text-white drop-shadow-lg tracking-wide">
                Bedieninge
              </h3>
            </div>
          </button>
        </section>
      </div>

      {/* 👇 New YouTube Section */}
      <section className="mt-16">
        <YouTubeSection />
      </section>

      {/* Footer */}
      <Footer />

      {/* Week Program Modal */}
      <WeekProgram isOpen={openModal === "week"} onClose={() => setOpenModal(null)} />

      {/* Bedieninge Modal */}
      <Bedieninge
        isOpen={openModal === "services"}
        onClose={() => setOpenModal(null)}
        onOpenModal={setOpenModal}
      />

      {/* Afspraak Modal */}
      <Modal isOpen={openModal === "counseling"} onClose={() => setOpenModal(null)}>
        <h1 className="text-2xl font-bold mb-4">Maak ’n Afspraak 🕊️</h1>
        <AfspraakForm onSuccess={() => setOpenModal(null)} />
      </Modal>
    </div>
  );
}
