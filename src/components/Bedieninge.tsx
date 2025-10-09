"use client";

import Modal from "@/components/Modal";
import {
  Church,
  Users,
  BookOpen,
  HeartHandshake,
  Group,
  LifeBuoy,
} from "lucide-react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onOpenModal: (modal: "week" | "services" | "counseling" | null) => void;
};

export default function Bedieninge({ isOpen, onClose, onOpenModal }: Props) {
  const services = [
    { title: "Dienste", description: "Sondag oggend en aanddienste", icon: Church },
    { title: "Woorskool", description: "Jeug byeenkomste en programme", icon: BookOpen },
    { title: "Selgroepe", description: "Kleingroepe vir Bybelstudie en ondersteuning", icon: Users },
    { title: "Woordreisigers", description: "Kinderbediening tydens dienste", icon: BookOpen },
    { title: "Uitreike", description: "Bedieninge buite die gemeente", icon: HeartHandshake },
    { title: "Bidgroepe", description: "Gebedsbyeenkomste vir die gemeente", icon: Group },
    {
      title: "Ondersteuning",
      description: "Persoonlike ondersteuning en begeleiding",
      icon: LifeBuoy,
      action: { label: "Afspraak Maak", modal: "counseling" as const },
    },
  ];

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="max-w-3xl w-full mx-auto h-[80vh] flex flex-col">
        {/* Fixed Header */}
        <h1 className="text-3xl font-extrabold text-blue-900 text-center py-4 border-b sticky top-0 bg-white z-10">
          Bedieninge 🙌
        </h1>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto px-4 py-6">
          <div className="grid gap-6 sm:grid-cols-2">
            {services.map((item, i) => {
              const Icon = item.icon;
              return (
                <div
                  key={i}
                  className="bg-white border border-blue-100 rounded-xl p-6 shadow-md hover:shadow-lg hover:scale-[1.02] transition flex flex-col"
                >
                  {/* Icon + Title */}
                  <div className="flex items-center space-x-3 mb-3">
                    {Icon && <Icon className="w-7 h-7 text-blue-700" />}
                    <h3 className="font-bold text-blue-900 text-lg">
                      {item.title}
                    </h3>
                  </div>

                  {/* Description */}
                  <p className="text-gray-700 flex-1">{item.description}</p>

                  {/* Action button */}
                  {item.action && (
                    <button
                      onClick={() => {
                        onClose(); // close Bedieninge
                        onOpenModal(item.action.modal); // open Afspraak modal
                      }}
                      className="mt-4 self-start bg-yellow-400 text-blue-900 font-semibold px-4 py-2 rounded-full shadow hover:bg-yellow-300 transition"
                    >
                      {item.action.label}
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Modal>
  );
}
