"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface WoordskoolFormProps {
  onSuccess?: () => void;
}

export default function WoordskoolForm({ onSuccess }: WoordskoolFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    attendance: "By Kerk",
    message: "Woordskool inskrywing",
    type: "Woordskool",
  });
  const [status, setStatus] = useState<string | null>(null);
  const router = useRouter();

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch("/api/send-mail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (data.success) {
        setStatus("success");
        setTimeout(() => {
          if (onSuccess) {
            onSuccess();
          } else {
            router.push("/");
          }
        }, 3000);
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 bg-white p-6 rounded-2xl shadow-md"
    >
      <h2 className="text-2xl font-bold text-blue-900 mb-4 text-center">
        ✉️ Woordskool Registrasie
      </h2>

      <input
        type="text"
        name="name"
        placeholder="Naam en Van"
        value={formData.name}
        onChange={handleChange}
        required
        className="w-full p-2 border rounded"
      />
      <input
        type="text"
        name="phone"
        placeholder="Nommer"
        value={formData.phone}
        onChange={handleChange}
        required
        className="w-full p-2 border rounded"
      />
      <input
        type="email"
        name="email"
        placeholder="E-pos"
        value={formData.email}
        onChange={handleChange}
        required
        className="w-full p-2 border rounded"
      />

      <select
        name="attendance"
        value={formData.attendance}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      >
        <option>By Kerk</option>
        <option>Zoom</option>
      </select>

      <button
        type="submit"
        className="w-full bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800 transition"
      >
        Stuur Inskrywing
      </button>

      {status === "loading" && (
        <p className="text-gray-600 text-center">📨 Besig om te stuur...</p>
      )}
      {status === "success" && (
        <p className="text-green-600 text-center">
          ✅ Jou inskrywing is gestuur! Jy word binnekort gekontak.
        </p>
      )}
      {status === "error" && (
        <p className="text-red-600 text-center">
          ❌ Kon nie stuur nie. Probeer asseblief weer.
        </p>
      )}
    </form>
  );
}
