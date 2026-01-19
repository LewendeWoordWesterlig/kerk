"use client";

import { useEffect, useState } from "react";
import confetti from "canvas-confetti";
import { motion } from "framer-motion";

export default function BekeerlingeCounter() {
  const souls = 76;
  const [showCelebration, setShowCelebration] = useState(false);
  const [showFloating, setShowFloating] = useState(false);
  const [displayCount, setDisplayCount] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      fireConfetti();
      setShowCelebration(true);

      // COUNT UP
      let current = 0;
      const increment = Math.ceil(souls / 60);
      const counter = setInterval(() => {
        current += increment;
        if (current >= souls) {
          current = souls;
          clearInterval(counter);
        }
        setDisplayCount(current);
      }, 25);

      setTimeout(() => {
        setShowCelebration(false);
        setShowFloating(true);
      }, 3000);
    }, 5000);

    return () => clearTimeout(timer);
  }, [souls]);

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
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
        >
          <div className="bg-yellow-400 text-blue-900 px-10 py-6 rounded-2xl shadow-2xl border-4 border-white text-center">
            <div className="text-lg sm:text-xl md:text-2xl font-extrabold tracking-widest uppercase mb-2">
              BEKEERLINGE 2026
            </div>

            {/* COUNT WITH PULSE */}
            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
              className="text-5xl sm:text-6xl md:text-7xl font-black tracking-tight"
            >
              {displayCount}
            </motion.div>
          </div>
        </motion.div>
      )}

      {/* Small Floating Counter */}
      {showFloating && (
        <div className="fixed bottom-4 right-4 left-4 md:left-auto md:right-6 z-50 flex justify-center md:justify-end">
          <div className="bg-yellow-400 text-blue-900 px-4 py-3 rounded-lg shadow-md border border-white text-center">
            <div className="text-xs font-bold tracking-widest uppercase">
              BEKEERLINGE 2026
            </div>

            <motion.div
              animate={{ scale: [1, 1.04, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="text-lg sm:text-xl font-black"
            >
              {displayCount}
            </motion.div>
          </div>
        </div>
      )}
    </>
  );
}
