"use client";

import Navbar from "@/components/Navbar";
import Image from "next/image";

type Group = {
  id: number;
  name: string;
  locationName: string;
  mapUrl: string;
  imageUrl: string;
  whatsappNumber: string;
  membersList: string[];
};

const groups: Group[] = [
  {
    id: 2,
    name: "Jong Volwassenes",
    locationName: "Proklamasie Heuwel",
    mapUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d380.123456789!2d28.1393644!3d-25.7531454!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1e95a1234567890%3A0xabcdef1234567890!2sProklamasie%20Heuwel%2C%20Pretoria%2C%20Gauteng%2C%20South%20Africa!5e0!3m2!1sen!2sza!4v0000000000",
    imageUrl: "/images/Selgroep/Jong volwassenes - Proklamasie Heuwel.jpg",
    whatsappNumber: "27662695633",
    membersList: ["Rivando Von Brandis", "Alica Von Brandis", "Waldo Von Brandis"],
  },
  {
    id: 3,
    name: "Proklamasie Heuwel",
    locationName: "Proklamasie Heuwel",
    mapUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d380.123456789!2d28.1393644!3d-25.7531454!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1e95a1234567890%3A0xabcdef1234567890!2sProklamasie%20Heuwel%2C%20Pretoria%2C%20Gauteng%2C%20South%20Africa!5e0!3m2!1sen!2sza!4v0000000000",
    imageUrl: "/images/Selgroep/Proklamasie Heuwel.jpg",
    whatsappNumber: "0000000002",
    membersList: ["Rudi & Natasha Von Brandis"],
  },
  {
    id: 4,
    name: "Parktown - Mayville",
    locationName: "Mayville",
    mapUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d380.123456789!2d28.1885991!3d-25.7054182!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1e95a1234567890%3A0xabcdef1234567890!2sYour%20Location%20Name!5e0!3m2!1sen!2sza!4v0000000000",
    imageUrl: "/images/Selgroep/Parktown - Mayville.jpg",
    whatsappNumber: "27845082596",
    membersList: ["Wouter & Riana Marias", "Neels & Diana"],
  },
  {
    id: 5,
    name: "Tuine",
    locationName: "Tuine",
    mapUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d380.123456789!2d28.1538615!3d-25.7247896!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1e95a1234567890%3A0xabcdef1234567890!2sProklamasie%20Heuwel%2C%20Pretoria%2C%20Gauteng%2C%20South%20Africa!5e0!3m2!1sen!2sza!4v000000000",
    imageUrl: "/images/Selgroep/Suiderberg - Mountain View.jpg",
    whatsappNumber: "27825686354",
    membersList: ["Geo & Madelein Fowlds"],
  },
  {
    id: 6,
    name: "Tuine",
    locationName: "Tuine",
    mapUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d380.123456789!2d28.1538615!3d-25.7247896!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1e95a1234567890%3A0xabcdef1234567890!2sProklamasie%20Heuwel%2C%20Pretoria%2C%20Gauteng%2C%20South%20Africa!5e0!3m2!1sen!2sza!4v0000000000",
    imageUrl: "/images/Selgroep/Brits sel.jpg",
    whatsappNumber: "27615112292",
    membersList: ["Brits & Madelein Van Zyl"],
  },
    {
    id: 6,
    name: "Kameeldrift-West",
    locationName: "Kameeldrift-West",
    mapUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3487.000000000!2d27.991684!3d-25.7118424!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1ebfd43c36b7ba1b%3A0xdd38717ca9e6ce61!2sKameeldrift%20West!5e0!3m2!1sen!2sza!4v0000000000",
    imageUrl: "/images/Selgroep/Juvan Stiemie Sel.jpg",
    whatsappNumber: "",
    membersList: ["Juvan Stimie"],
  },
];

export default function SelgroepePage() {
  return (
    <>
      {/* Navbar stays on top */}
      <div className="sticky top-0 z-50">
        <Navbar onOpenModal={() => null} />
      </div>

      {/* Page content */}
      <main className="px-4 py-10 max-w-7xl mx-auto mt-4">
        <h1 className="text-4xl font-bold text-center mb-12">Ons Selgroepe</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-10">
          {groups.map((group) => (
            <div
              key={group.id}
              className="bg-white shadow-lg rounded-xl overflow-hidden flex flex-col transform transition duration-300 hover:scale-105 hover:shadow-2xl"
            >
              {/* Selgroep Image with Gradient Overlay */}
              <div className="relative h-72 w-full overflow-hidden">
                <Image
                  src={group.imageUrl}
                  alt={group.name}
                  fill
                  className="object-cover object-[60%_0%] transition-transform duration-300 hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
              </div>

              {/* Info Section */}
              <div className="p-6 flex flex-col flex-1 relative">
                <h2 className="text-2xl font-semibold text-gray-800 mb-2">{group.name}</h2>

                {/* Members */}
                <ul className="text-gray-700 text-lg mb-3 list-disc list-inside space-y-1 pl-4">
                  {group.membersList.map((member, index) => (
                    <li key={index}>{member}</li>
                  ))}
                </ul>

                <p className="text-gray-600 mb-4">Ligging: {group.locationName}</p>

                {/* Google Maps Embed */}
                <div className="mb-4 w-full h-48 rounded-md overflow-hidden shadow-sm">
                  <iframe
                    src={group.mapUrl}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>

                {/* Buttons */}
                <div className="mt-auto flex flex-col sm:flex-row gap-3">
                  <a
                    href={`https://wa.me/${group.whatsappNumber}?text=Ons%20wil%20graag%20aansluit%20by%20U%20selgroep`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-green-500 text-white py-3 px-4 rounded-lg text-center text-lg font-medium hover:bg-green-600 transition"
                  >
                    WhatsApp Me
                  </a>
                  <a
                    href="#contact"
                    className="flex-1 bg-blue-500 text-white py-3 px-4 rounded-lg text-center text-lg font-medium hover:bg-blue-600 transition"
                  >
                    Contact Us
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </>
  );
}
