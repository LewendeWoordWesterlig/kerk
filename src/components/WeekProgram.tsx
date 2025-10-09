"use client";

import Modal from "@/components/Modal";

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
      <h1 className="text-2xl font-bold mb-6 text-blue-900">Weekprogram 📅</h1>

      <div className="space-y-4">
        {program.map((item, i) => (
          <div
            key={i}
            className="flex justify-between items-center bg-blue-50 rounded-lg p-4 shadow"
          >
            <span className="font-bold text-blue-900">{item.day}</span>
            <span className="text-gray-700">{item.time}</span>
            <span className="text-blue-700 font-semibold">
              {item.activity}
            </span>
          </div>
        ))}
      </div>
    </Modal>
  );
}
