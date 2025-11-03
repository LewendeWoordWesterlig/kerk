"use client";

import { useEffect, useState } from "react";
import confetti from "canvas-confetti";
import { motion } from "framer-motion";

export default function BekeerlingeCounter() {
  const souls = 454; // 👈 update manually
  const [showCelebration, setShowCelebration] = useState(false);
  const [showFloating, setShowFloating] = useState(false);

  useEffect(() => {
    // Show big celebration after 10s
    const timer = setTimeout(() => {
      fireConfetti();
      setShowCelebration(true);

      // Then shrink and dock to bottom after 3s
      setTimeout(() => {
        setShowCelebration(false);
        setShowFloating(true);
      }, 3000);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const fireConfetti = () => {
    confetti({
      particleCount: 150,
      spread: 90,
      origin: { y: 0.6 },
      colors: ["#FFD700", "#FF4500", "#0D3B66"],
    });
  };

  return (
    <>
      {/* Big Center Celebration */}
      {showCelebration && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1.2, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
        >
          <div className="relative bg-yellow-400 text-blue-900 font-extrabold px-6 py-4 rounded-2xl shadow-2xl border-4 border-white text-2xl sm:text-3xl md:text-4xl text-center overflow-hidden">
            {/* Watermark */}
            <span className="absolute inset-0 flex items-center justify-center text-blue-900/10 font-extrabold text-[70px] sm:text-[100px] md:text-[130px] leading-none select-none scale-90">
              2025
            </span>
            {/* Foreground Text */}
            <span className="relative z-10">BEKEERLINGE: {souls}</span>
          </div>
        </motion.div>
      )}

      {/* Small Floating Counter */}
      {showFloating && (
        <div className="fixed bottom-4 right-4 left-4 md:left-auto md:right-6 z-50 flex justify-center md:justify-end">
          <div className="relative bg-yellow-400 text-blue-900 font-extrabold px-3 py-2 rounded-lg shadow-md text-sm sm:text-base md:text-lg border border-white overflow-hidden">
            {/* Watermark for small block */}
            <span className="absolute inset-0 flex items-center justify-center text-blue-900/10 font-extrabold text-[40px] sm:text-[60px] md:text-[80px] leading-none select-none scale-90">
              2025
            </span>
            <span className="relative z-10">BEKEERLINGE: {souls}</span>
          </div>
        </div>
      )}
    </>
  );
}
