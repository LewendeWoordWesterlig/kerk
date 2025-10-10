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
    { day: "Dinsdag", time: "-", activity: "Geen program" },
    { day: "Woensdag", time: "-", activity: "Selgroepe" },
    { day: "Donderdag", time: "18:30", activity: "Orkes Oefening" },
    { day: "Vrydag", time: "-", activity: "Uitreike" },
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
        className="p-8 rounded-3xl bg-white/70 backdrop-blur-lg shadow-2xl border border-white/30 max-w-lg mx-auto"
      >
        <motion.h1
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="text-3xl font-extrabold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-indigo-500 flex items-center gap-3"
        >
          <CalendarDays className="w-7 h-7 text-blue-600" />
          Weekprogram 📅
        </motion.h1>

        <div className="space-y-4">
          {program.map((item, i) => (
            <motion.div
              key={i}
              initial={{ y: 15, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: i * 0.05 }}
              className="flex items-center justify-between rounded-xl p-4 bg-gradient-to-r from-blue-50 to-indigo-50 hover:shadow-lg hover:scale-[1.02] transition-all cursor-pointer"
            >
              <span className="flex items-center gap-2 font-bold text-blue-900">
                <CalendarDays className="w-5 h-5 text-blue-500" />
                {item.day}
              </span>

              <span className="flex items-center gap-2 text-gray-700 font-medium">
                <Clock className="w-4 h-4 text-indigo-500" />
                {item.time}
              </span>

              <span className="flex items-center gap-2 text-indigo-700 font-semibold">
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
