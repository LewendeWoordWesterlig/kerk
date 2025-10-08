"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface AfspraakFormProps {
  onSuccess?: () => void; // ✅ optional callback from parent
}

export default function AfspraakForm({ onSuccess }: AfspraakFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    type: "Berading",
    message: "",
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

        // ✅ Close modal if parent provided onSuccess
        if (onSuccess) {
          setTimeout(() => onSuccess(), 1500);
        } else {
          // ✅ Else fallback: redirect home
          setTimeout(() => {
            router.push("/");
          }, 3000);
        }
      } else {
        setStatus("error");
      }
    } catch (err) {
      setStatus("error");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        name="name"
        placeholder="Jou Naam"
        value={formData.name}
        onChange={handleChange}
        required
        className="w-full p-2 border rounded"
      />
      <input
        type="email"
        name="email"
        placeholder="Jou E-pos"
        value={formData.email}
        onChange={handleChange}
        required
        className="w-full p-2 border rounded"
      />
      <input
        type="text"
        name="phone"
        placeholder="Jou Selfoonnommer"
        value={formData.phone}
        onChange={handleChange}
        required
        className="w-full p-2 border rounded"
      />
      <select
        name="type"
        value={formData.type}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      >
        <option>Berading</option>
        <option>Huweliksberading</option>
        <option>Kinderberading (6–16 jaar)</option>
      </select>
      <textarea
        name="message"
        placeholder="Jou Boodskap"
        value={formData.message}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      />

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        disabled={status === "loading"}
      >
        {status === "loading" ? "Stuur..." : "Stuur"}
      </button>

      {status === "loading" && (
        <p className="text-gray-600">📨 Besig om te stuur...</p>
      )}
      {status === "success" && (
        <p className="text-green-600">
          ✅ Jou afspraak is gestuur! {onSuccess ? "Die venster gaan toe..." : "Jy word terug gestuur na die tuisblad..."}
        </p>
      )}
      {status === "error" && (
        <p className="text-red-600">❌ Kon nie stuur nie. Probeer asseblief weer.</p>
      )}
    </form>
  );
}
