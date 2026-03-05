"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";

type Ad = {
  id: number;
  image: string;
  title: string;
  description?: string;
  link?: string;
};

const ads: Ad[] = [
  {
    id: 1,
    image: "/images/ads1/Mannekamp.jpg",
    title: "Mannekamp",
    description: "Skryf in vir die volgende Mannekamp",
    link: "https://forms.gle/E69DnYsLTR7QrY6L7",
  },
   {
    id: 2,
    image: "/images/ads1/manneoggend.jpg",
    title: "Manne-oggend",
    description: "Kontak gerus vir Brits en boek jou plek vir die Manne-oggend !",
    // no link
  },
  {
    id: 3,
    image: "/images/ads1/biblebash.jpeg",
    title: "Bible BASH",
    description: "Kontak gerus vir Mike en boek jou plek vir die Bible BASH!",
    // no link
  },
];

export default function AdvertisementCarousel() {
  const [current, setCurrent] = useState(0);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % ads.length);
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + ads.length) % ads.length);
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="mt-16 bg-gradient-to-r from-[#0D3B66] to-[#1E4D80] py-12 px-6 rounded-2xl shadow-md text-white text-center">

      <h2 className="text-3xl font-extrabold mb-10 tracking-wide text-[#FFD166]">
        Gemeente Aankondigings
      </h2>

      <div className="relative max-w-4xl mx-auto">

        {/* Slide */}
        <div className="bg-white rounded-xl shadow-xl overflow-hidden text-[#0D3B66]">

          <div className="relative w-full h-[300px] md:h-[380px]">

            {/* blurred background */}
            <Image
              src={ads[current].image}
              alt="blur"
              fill
              className="object-cover blur-xl scale-110 opacity-40"
            />

            {/* main image */}
            <Image
              src={ads[current].image}
              alt={ads[current].title}
              fill
              className="object-contain relative z-10"
            />

          </div>

          <div className="p-6">

            <h3 className="text-2xl font-bold mb-2">
              {ads[current].title}
            </h3>

            {ads[current].description && (
              <p className="text-gray-600 mb-4">
                {ads[current].description}
              </p>
            )}

            {ads[current].link && (
              <a
                href={ads[current].link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center bg-[#FFD166] text-[#0D3B66] font-bold px-6 py-3 rounded-full shadow-md hover:bg-[#FCD34D] transition-colors"
              >
                Vul Vorm In
                <ExternalLink className="ml-2 w-5 h-5" />
              </a>
            )}

          </div>
        </div>

        {/* Left arrow */}
        <button
          onClick={prevSlide}
          className="absolute top-1/2 -translate-y-1/2 left-[-20px] bg-white text-[#0D3B66] p-3 rounded-full shadow-md hover:scale-110 transition"
        >
          <ChevronLeft size={22} />
        </button>

        {/* Right arrow */}
        <button
          onClick={nextSlide}
          className="absolute top-1/2 -translate-y-1/2 right-[-20px] bg-white text-[#0D3B66] p-3 rounded-full shadow-md hover:scale-110 transition"
        >
          <ChevronRight size={22} />
        </button>

        {/* Dots */}
        <div className="flex justify-center mt-6 gap-2">

          {ads.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrent(index)}
              className={`w-3 h-3 rounded-full ${
                index === current
                  ? "bg-[#FFD166]"
                  : "bg-white/40"
              }`}
            />
          ))}

        </div>
      </div>
    </section>
  );
}