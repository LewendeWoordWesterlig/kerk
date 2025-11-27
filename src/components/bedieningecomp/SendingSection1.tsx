"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";


export default function BidgroepSection() {
  const [showPopup, setShowPopup] = useState(false);
  const [showContact, setShowContact] = useState(false);

  return (
    <section className="relative flex flex-col md:flex-row items-center justify-between w-full bg-gray-50 py-16 px-8 md:px-24">
      {/* Image Section */}
      <div className="md:w-1/2 mb-8 md:mb-0">
        <Image
          src="/images/gallery/sending1.jpg"
          alt="Bidgroep"
          width={600}
          height={400}
          className="rounded-2xl shadow-lg object-cover"
        />
      </div>

      {/* Text Section */}
      <div className="md:w-1/2 text-center md:text-left space-y-4">
        <h2 className="text-3xl font-extrabold text-blue-900">Sending</h2>
        <p className="text-gray-700 leading-relaxed">
          Reik uit na die buite wereld
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
         <Link href="/sending">
         <span className="inline-block bg-blue-700 text-white font-semibold px-6 py-2 rounded-full shadow hover:bg-blue-800 transition cursor-pointer">
         Meer inligting
         </span>
         </Link>
          

          <button
            onClick={() => setShowContact(true)}
            className="inline-block bg-yellow-400 text-blue-900 font-semibold px-6 py-2 rounded-full shadow hover:bg-yellow-300 transition"
          >
            Kontak Bedieningsleier
          </button>
        </div>
      </div>

      {/* Contact Popup (with WhatsApp link added) */}
      {showContact && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
          <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-[90%] relative text-center">
            <button
              onClick={() => setShowContact(false)}
              className="absolute top-3 right-4 text-gray-500 hover:text-red-500 text-xl font-bold"
            >
              ✕
            </button>
            <h3 className="text-2xl font-bold text-blue-900 mb-4">
              📞 Herman Pretoriuos
            </h3>
            <p className="text-gray-700 mb-4">
              Kontak ons Bedieningsleier vir meer inligting oor Sending.
            </p>
            <div className="space-y-2">
              <p className="font-semibold text-blue-900">📱 082 990 8159</p>
            </div>

            {/* Buttons */}
            <div className="flex flex-col gap-3 mt-6">
              <a
                href="tel:+27829908159"
                className="inline-block bg-yellow-400 text-blue-900 font-semibold px-6 py-2 rounded-full shadow hover:bg-yellow-300 transition"
              >
                Skakel Nou
              </a>

              <a
                href="https://wa.me/27829908159?text=Goeie%20dag%20Brits!%20Ek%20wil%20graag%20meer%20uitvind%20oor%20die%20sending%20by%20Westerlig%20kerk🙏."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-green-500 text-white font-semibold px-6 py-2 rounded-full shadow hover:bg-green-600 transition"
              >
                Stuur 'n Whatsapp
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
