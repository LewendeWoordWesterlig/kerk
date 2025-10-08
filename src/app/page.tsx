import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ServiceTimes from "@/components/ServiceTimes";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center flex-1">
        <div
          className="
            relative w-full h-[400px] 
            bg-cover 
            bg-center md:bg-bottom   /* show bottom half on desktop */
            flex items-center justify-center 
            filter grayscale
          "
          style={{ backgroundImage: "url('/IMG_3404.jpg')" }}
        >
          <h1 className="hero-title text-5xl font-bold text-white drop-shadow-lg">
            Welkom by Lewende Woord Westerlig
          </h1>
        </div>

        {/* Intro + Service Times */}
        <div className="p-8 max-w-2xl">
          <p className="mb-6 text-lg text-gray-600">
            ’n Gemeente waar geloof en familie saam groei.
          </p>
          <ServiceTimes />
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
