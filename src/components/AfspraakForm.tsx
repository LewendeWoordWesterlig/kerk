"use client";
import { useState } from "react";

export default function AfspraakForm({ onSuccess }: { onSuccess?: () => void }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    type: "Berading",
    message: "",
  });
  const [status, setStatus] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("Stuur...");

    const res = await fetch("/api/send-mail", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    if (data.success) {
      setStatus("✅ Jou afspraak is gestuur!");
      setForm({ name: "", email: "", phone: "", type: "Berading", message: "" });

      // Auto-close modal after 2s
      setTimeout(() => {
        if (onSuccess) onSuccess();
        setStatus("");
      }, 2000);
    } else {
      setStatus("❌ Kon nie stuur nie. Probeer weer.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-2">
      <div>
        <label className="block mb-1">Naam:</label>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded text-black"
        />
      </div>

      <div>
        <label className="block mb-1">E-pos:</label>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded text-black"
        />
      </div>

      <div>
        <label className="block mb-1">Selfoon:</label>
        <input
          type="tel"
          name="phone"
          value={form.phone}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded text-black"
        />
      </div>

      <div>
        <label className="block mb-1">Afspraak Tipe:</label>
        <select
          name="type"
          value={form.type}
          onChange={handleChange}
          className="w-full p-2 border rounded text-black"
        >
          <option>Berading</option>
          <option>Huweliksberading</option>
          <option>Kinderberading (6–16 jaar)</option>
        </select>
      </div>

      <div>
        <label className="block mb-1">Boodskap:</label>
        <textarea
          name="message"
          value={form.message}
          onChange={handleChange}
          rows={3}
          className="w-full p-2 border rounded text-black"
        />
      </div>

      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
      >
        Stuur
      </button>

      {status && <p className="text-sm mt-2">{status}</p>}
    </form>
  );
}
