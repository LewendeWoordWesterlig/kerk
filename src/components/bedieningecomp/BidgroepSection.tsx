"use client";
import { useState } from "react";
import Image from "next/image";

export default function BidgroepSection() {
  const [showPopup, setShowPopup] = useState(false);
  const [showContact, setShowContact] = useState(false);

  return (
    <section className="relative flex flex-col md:flex-row items-center justify-between w-full bg-gray-50 py-16 px-8 md:px-24">
      {/* Image Section */}
      <div className="md:w-1/2 mb-8 md:mb-0">
        <Image
          src="/images/Bid/bid 1.jpg"
          alt="Bidgroep"
          width={600}
          height={400}
          className="rounded-2xl shadow-lg object-cover"
        />
      </div>

      {/* Text Section */}
      <div className="md:w-1/2 text-center md:text-left space-y-4">
        <h2 className="text-3xl font-extrabold text-blue-900">Bidgroepe</h2>
        <p className="text-gray-700 leading-relaxed">
          Saam bid ons vir ons gemeente, stad en nasie — kragtige gebed verander dinge!
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
          <button
            onClick={() => setShowPopup(true)}
            className="inline-block bg-blue-700 text-white font-semibold px-6 py-2 rounded-full shadow hover:bg-blue-800 transition"
          >
            Meer inligting
          </button>

          <button
            onClick={() => setShowContact(true)}
            className="inline-block bg-yellow-400 text-blue-900 font-semibold px-6 py-2 rounded-full shadow hover:bg-yellow-300 transition"
          >
            Kontak Bedieningsleier
          </button>
        </div>
      </div>

      {/* Description Popup */}
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
          <div className="bg-white rounded-2xl shadow-xl p-8 max-w-2xl w-[90%] relative overflow-y-auto max-h-[85vh]">
            <button
              onClick={() => setShowPopup(false)}
              className="absolute top-3 right-4 text-gray-500 hover:text-red-500 text-xl font-bold"
            >
              ✕
            </button>
            <h3 className="text-2xl font-bold text-blue-900 mb-4 text-center">
              🙏 Bidgroep
            </h3>
            <div className="text-gray-700 leading-relaxed space-y-4 text-justify">
              <p>
                Ons Bidgroepe is die hart van voorbidding in die gemeente — die plek waar gelowiges sáám staan in geloof, en God se hand beweeg deur gebed. Hier word daar nie nét oor behoeftes gepraat nie; hier word hemel en aarde verbind deur gebed wat opgaan na die troon van genade (Hebreërs 4:16).
              </p>
              <p>
                Ons bid saam vir ons gemeente, ons stad, ons nasie, ons herderspaar, al die bedieninge en vir elke siel wat nog God se reddende liefde moet leer ken. Dit is ’n heilige tyd waar ons een word in Gees, waar trane dikwels omskep word in lof, en waar hoop weer aan die brand steek.
              </p>
              <p>
                By die Bidgroepe leer ons dat gebed nie ’n laaste uitweg is nie — dit is ons eerste toevlug. Wanneer ons saam bid, gebeur iets bonatuurliks: vrede daal neer, wysheid word gegee, en God se wil word sigbaar in mense se lewens.
              </p>
              <blockquote className="italic border-l-4 border-blue-700 pl-4 text-blue-900">
                "En toe hulle gebid het, is die plek geskud waar hulle saam was, en hulle is almal vervul met die Heilige Gees en het die woord van God met vrymoedigheid gespreek." — Handelinge 4:31
              </blockquote>
              <p>
                Dit is nie nodig om ’n gebedskrywer of spreker te wees nie — ons soek net ’n hart wat glo. Elke stem, elke fluistergebed tel. Saam vorm ons ’n muur van gebed oor dié gemeente, hierdie stad, en ons land.
              </p>
              <p>
                Ons glo dat gebed nie tyd mors is nie — dit is saad saai. En God bring die oes.
              </p>
              <blockquote className="italic border-l-4 border-yellow-500 pl-4 text-yellow-700">
                "...en my volk, oor wie my Naam uitgeroep is, hulle verootmoedig en bid en my aangesig soek en hulle bekeer van hul verkeerde weë, dan sal Ék uit die hemel hoor en hulle sonde vergewe en hulle land genees." — 2 Kronieke 7:14
              </blockquote>
            </div>
          </div>
        </div>
      )}

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
              📞 Brits Van Zyl
            </h3>
            <p className="text-gray-700 mb-4">
              Kontak ons Bedieningsleier vir meer inligting oor die Bidgroep.
            </p>
            <div className="space-y-2">
              <p className="font-semibold text-blue-900">📱 061 511 2292</p>
            </div>

            {/* Buttons */}
            <div className="flex flex-col gap-3 mt-6">
              <a
                href="tel:+27615112292"
                className="inline-block bg-yellow-400 text-blue-900 font-semibold px-6 py-2 rounded-full shadow hover:bg-yellow-300 transition"
              >
                Skakel Nou
              </a>

              <a
                href="https://wa.me/27615112292?text=Goeie%20dag%20Brits!%20Ek%20wil%20graag%20meer%20uitvind%20oor%20die%20Bidgroep%20by%20Westerlig%20kerk🙏."
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
