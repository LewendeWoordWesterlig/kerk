"use client";

import React, { useEffect, useState } from "react";
import { db } from "@/firebase";
import { ref, onValue, set } from "firebase/database";

// Browser-only jsPDF import
let jsPDF: any;
if (typeof window !== "undefined") {
  jsPDF = require("jspdf").jsPDF;
}

// ---------------- Types ----------------
type SongLibraryItem = {
  id: number;
  title: string;
  key: string;
  note?: string;
  pdfUrls?: string[];
};

type SongScheduleItem = SongLibraryItem & {
  selectedPdfIndexes?: number[];
};

// ---------------- Component ----------------
export default function SongSheetsManager({
  selectedDate,
  addScheduleSong,
}: {
  selectedDate: string;
  addScheduleSong: (song: SongScheduleItem) => void;
}) {
  const [library, setLibrary] = useState<SongLibraryItem[]>([]);
  const [newSongTitle, setNewSongTitle] = useState("");
  const [newSongKey, setNewSongKey] = useState("");
  const [newSongNote, setNewSongNote] = useState("");
  const [newPdfFiles, setNewPdfFiles] = useState<FileList | null>(null);

  // ---------- Load library ----------
  useEffect(() => {
    const libRef = ref(db, "songLibrary");
    const off = onValue(libRef, (snap) => {
      const val = snap.val();
      const arr = val ? Object.values(val) as SongLibraryItem[] : [];
      setLibrary(arr);
    });
    return () => off();
  }, []);

  // ---------- Add new song to library ----------
  const addSongToLibrary = async () => {
    if (!newSongTitle || !newSongKey) return alert("Title and key required");

    // Generate a simple unique id
    const id = Date.now();

    const pdfUrls: string[] = [];
    if (newPdfFiles) {
      // We will just store file names for demo; replace with upload to storage if needed
      for (let i = 0; i < newPdfFiles.length; i++) {
        pdfUrls.push(newPdfFiles[i].name);
      }
    }

    const newItem: SongLibraryItem = {
      id,
      title: newSongTitle,
      key: newSongKey,
      note: newSongNote,
      pdfUrls,
    };

    await set(ref(db, `songLibrary/${id}`), newItem);
    setNewSongTitle("");
    setNewSongKey("");
    setNewSongNote("");
    setNewPdfFiles(null);
  };

  // ---------- Add song to schedule ----------
  const addSongToSchedule = (song: SongLibraryItem) => {
    const songWithSelection: SongScheduleItem = {
      ...song,
      selectedPdfIndexes: [],
    };
    addScheduleSong(songWithSelection);
  };

  // ---------- Toggle PDF selection ----------
  const togglePdfSelection = (songId: number, pdfIndex: number) => {
    setLibrary((prev) =>
      prev.map((s) => {
        if (s.id !== songId) return s;
        const selected = (s as SongScheduleItem).selectedPdfIndexes || [];
        const already = selected.includes(pdfIndex);
        const updated = already
          ? selected.filter((i) => i !== pdfIndex)
          : [...selected, pdfIndex];
        return { ...s, selectedPdfIndexes: updated };
      })
    );
  };

  // ---------- Export selected PDFs for schedule ----------
  const exportSelectedPdfs = () => {
    if (!jsPDF) return alert("PDF not available in SSR.");
    const doc = new jsPDF({ unit: "pt", format: "a4" });
    let y = 40;
    doc.setFontSize(14);
    doc.text(`Song Sheets — ${selectedDate}`, 40, y);
    y += 20;

    library.forEach((song, idx) => {
      const selectedIndexes = (song as SongScheduleItem).selectedPdfIndexes || [];
      if (!selectedIndexes.length) return;

      doc.setFontSize(12);
      doc.text(`${idx + 1}. ${song.title} (Key: ${song.key})`, 40, y);
      y += 16;
      if (song.note) {
        doc.setFontSize(10);
        doc.text(`Note: ${song.note}`, 60, y);
        y += 14;
      }

      selectedIndexes.forEach((i) => {
        doc.setFontSize(10);
        doc.text(`PDF ${i + 1}: ${song.pdfUrls?.[i] || "N/A"}`, 60, y);
        y += 14;
        if (y > 720) {
          doc.addPage();
          y = 40;
        }
      });
    });

    doc.save(`SongSheets-${selectedDate}.pdf`);
  };

  return (
    <div className="mt-6 p-4 border rounded bg-white">
      <div className="font-medium mb-2">Add New Song to Library</div>
      <div className="flex flex-wrap gap-2 mb-3">
        <input
          placeholder="Title"
          className="border p-1 flex-1"
          value={newSongTitle}
          onChange={(e) => setNewSongTitle(e.target.value)}
        />
        <input
          placeholder="Key"
          className="border p-1 w-24"
          value={newSongKey}
          onChange={(e) => setNewSongKey(e.target.value)}
        />
        <input
          placeholder="Note"
          className="border p-1 w-40"
          value={newSongNote}
          onChange={(e) => setNewSongNote(e.target.value)}
        />
        <input
          type="file"
          multiple
          accept="application/pdf"
          className="border p-1"
          onChange={(e) => setNewPdfFiles(e.target.files)}
        />
        <button
          onClick={addSongToLibrary}
          className="px-3 py-1 bg-green-500 text-white rounded"
        >
          Add Song
        </button>
      </div>

      <div className="font-medium mb-2">Song Library</div>
      {library.map((song) => (
        <div
          key={song.id}
          className="border rounded p-2 flex flex-col mb-2"
        >
          <div className="flex justify-between items-center">
            <div>
              {song.title} (Key: {song.key})
            </div>
            <button
              onClick={() => addSongToSchedule(song)}
              className="px-2 py-1 bg-blue-500 text-white rounded text-sm"
            >
              Add to Schedule
            </button>
          </div>

          {song.note && <div className="text-sm">{song.note}</div>}

          <div className="flex flex-wrap gap-2 mt-1">
            {(song.pdfUrls || []).map((url, i) => (
              <label key={`${song.id}-pdf-${i}`} className="flex items-center gap-1">
                <input
                  type="checkbox"
                  checked={(song as SongScheduleItem).selectedPdfIndexes?.includes(i) || false}
                  onChange={() => togglePdfSelection(song.id, i)}
                />
                PDF {i + 1}: {url}
              </label>
            ))}
          </div>
        </div>
      ))}

      <button
        onClick={exportSelectedPdfs}
        className="mt-3 px-3 py-1 bg-slate-800 text-white rounded"
      >
        Export Selected PDFs
      </button>
    </div>
  );
}
