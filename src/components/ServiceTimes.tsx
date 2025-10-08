import { Clock, MapPin } from "lucide-react";

export default function ServiceTimes() {
  return (
    <section
      id="dienste"
      className="mt-16 bg-gradient-to-r from-blue-50 to-blue-100 py-12 px-6 rounded-2xl shadow-md text-center"
    >
      <h2 className="text-3xl font-extrabold text-blue-900 mb-8 tracking-wide">
        Dienste Tye
      </h2>

      <div className="grid gap-6 md:grid-cols-2 max-w-3xl mx-auto">
        {/* Morning Service */}
        <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center hover:scale-105 transition-transform duration-300">
          <Clock className="w-10 h-10 text-blue-600 mb-4" />
          <h3 className="text-xl font-bold text-blue-800">Sondag Oggend</h3>
          <p className="text-lg text-gray-700 mt-2">08:30</p>
        </div>

        {/* Evening Service */}
        <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center hover:scale-105 transition-transform duration-300">
          <Clock className="w-10 h-10 text-blue-600 mb-4" />
          <h3 className="text-xl font-bold text-blue-800">Sondag Aanddiens</h3>
          <p className="text-lg text-gray-700 mt-2">17:00</p>
        </div>
      </div>

      {/* CTA Button */}
      <div className="mt-10">
        <a
          href="https://www.google.com/maps/search/?api=1&query=631+Niemandt+Street,+Andeon+AH,+Pretoria"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center bg-yellow-400 text-blue-900 font-bold px-6 py-3 rounded-full shadow-md hover:bg-yellow-300 transition-colors text-lg"
        >
          <MapPin className="w-5 h-5 mr-2" />
          Join Ons
        </a>
      </div>
    </section>
  );
}
