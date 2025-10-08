"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useRef, useEffect } from "react";

export default function Gallery() {
  const images = [
    "/IMG_0269.jpg",
    "/IMG_9143.jpg",
    "/IMG_0270.jpg",
    "/5.jpg",
    "/1.jpg",
    "/6.jpg",
    "/2.jpg",
  ];

  // Duplicate the array so we can loop seamlessly
  const loopedImages = [...images, ...images];

  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (scrollRef.current) {
        const container = scrollRef.current;
        const itemWidth = container.firstChild
          ? (container.firstChild as HTMLElement).clientWidth + 24 // + gap
          : 0;

        index++;
        container.scrollTo({
          left: index * itemWidth,
          behavior: "smooth",
        });

        // Reset when we reach the halfway point (original length)
        if (index >= images.length) {
          setTimeout(() => {
            container.scrollTo({ left: 0, behavior: "auto" });
            index = 0;
          }, 600); // wait until smooth scroll finishes
        }
      }
    }, 6000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <section className="mt-16 bg-gradient-to-r from-blue-50 to-blue-100 py-12 px-6 rounded-2xl shadow-lg">
      <h2 className="text-3xl font-extrabold text-blue-900 mb-8 text-center tracking-wide">
        Gemeente Moments
      </h2>

      <div
        ref={scrollRef}
        className="flex space-x-6 overflow-x-auto scrollbar-hide px-4 md:px-8 scroll-smooth"
      >
        {loopedImages.map((src, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.05 }}
            className="relative min-w-[300px] h-[200px] md:min-w-[400px] md:h-[250px] rounded-2xl overflow-hidden shadow-xl flex-shrink-0"
          >
            <Image
              src={src}
              alt={`Gallery image ${i + 1}`}
              fill
              className="object-cover"
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
