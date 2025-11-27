"use client";

import { motion } from "framer-motion";
import Modal from "@/components/Modal";
import { CalendarDays, Clock, Activity } from "lucide-react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export default function WeekProgram({ isOpen, onClose }: Props) {
  const program = [
    { day: "Maandag", time: "19:00", activity: "Woordskool" },
    { day: "Dinsdag", time: "", activity: "Geen program" },
    { day: "Woensdag", time: "", activity: "Selgroepe" },
    { day: "Donderdag", time: "08:30", activity: "Woord reisigers" },
    { day: "Vrydag", time: "17:30", activity: "Uitreike" },
    { day: "Saterdag", time: "06:00", activity: "Bidgroep" },
    { day: "Sondag", time: "08:30 & 17:00", activity: "Dienste" },
  ];

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.25 }}
        className="p-6 sm:p-8 rounded-3xl bg-white/70 backdrop-blur-lg shadow-2xl border border-white/30 w-[90%] max-w-lg mx-auto max-h-[80vh] overflow-y-auto scrollbar-thin scrollbar-thumb-blue-200"
      >
        <motion.h1
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="text-2xl sm:text-3xl font-extrabold mb-6 sm:mb-8 text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-indigo-500 flex items-center gap-3 sticky top-0 bg-white/80 backdrop-blur-md py-2 z-10"
        >
          <CalendarDays className="w-6 h-6 sm:w-7 sm:h-7 text-blue-600" />
          Weeklikse program
        </motion.h1>

        <div className="space-y-4 pb-2">
          {program.map((item, i) => (
            <motion.div
              key={i}
              initial={{ y: 15, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: i * 0.05 }}
              className="flex flex-col md:flex-row md:items-center md:justify-between rounded-xl p-4 bg-gradient-to-r from-blue-50 to-indigo-50 hover:shadow-lg hover:scale-[1.02] transition-all cursor-pointer text-center md:text-left"
            >
              <span className="flex justify-center md:justify-start items-center gap-2 font-bold text-blue-900">
                <CalendarDays className="w-5 h-5 text-blue-500" />
                {item.day}
              </span>

              <span className="flex justify-center md:justify-start items-center gap-2 text-gray-700 font-medium mt-1 md:mt-0">
                <Clock className="w-4 h-4 text-indigo-500" />
                {item.time}
              </span>

              <span className="flex justify-center md:justify-start items-center gap-2 text-indigo-700 font-semibold mt-1 md:mt-0">
                <Activity className="w-5 h-5 text-indigo-600" />
                {item.activity}
              </span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </Modal>
  );
}
