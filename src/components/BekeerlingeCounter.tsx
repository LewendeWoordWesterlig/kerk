"use client";

import { useEffect, useState } from "react";
import confetti from "canvas-confetti";
import { motion } from "framer-motion";

export default function BekeerlingeCounter() {
  const souls = 427; // 👈 update this manually
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
    }, 10000);

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
          animate={{ scale: 1.5, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-50 flex items-center justify-center"
        >
          <div className="bg-yellow-400 text-blue-900 font-extrabold px-8 py-6 rounded-2xl shadow-2xl text-4xl border-4 border-white">
            🎉 BEKEERLINGE: {souls}
          </div>
        </motion.div>
      )}

      {/* Small Floating Counter */}
      {showFloating && (
        <div className="fixed bottom-4 right-4 left-4 md:left-auto md:right-6 z-50 flex justify-center md:justify-end">
          <div className="bg-yellow-400 text-blue-900 font-extrabold px-3 py-2 rounded-lg shadow-md text-sm md:text-base border border-white">
            🙌 BEKEERLINGE: {souls}
          </div>
        </div>
      )}
    </>
  );
}
