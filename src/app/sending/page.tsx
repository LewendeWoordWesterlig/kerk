"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Sendingsection from "@/components/bedieningecomp/Sendingsection"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-[#F8F9FA]">
      
      {/* Navbar */}
      <Navbar onOpenModal={() => {}} />


      {/* ----------- YOUR NEW COMPONENTS GO HERE ----------- */}
      <main className="flex-1 px-6 py-16">
        {/* Add your new components here */}
      </main>
      {/* ---------------------------------------------------- */}
    <Sendingsection />
      {/* Footer */}
      <Footer />
    </div>
  );
}
