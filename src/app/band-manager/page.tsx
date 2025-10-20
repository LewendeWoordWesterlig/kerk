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
type Member = {
  id: number;
  name: string;
  email?: string;
  roles: string[];
};

type Song = {
  title: string;
  key: string;
  capo?: number;
  notes?: string;
};

type ConfirmationStatus = "pending" | "accepted" | "declined" | "removed";

type Section = {
  name: string;
  selectedMembers: number[];
  notes?: string;
  confirmations?: { [memberId: string]: ConfirmationStatus };
};

type Schedule = {
  date: string;
  sections: Section[];
  songs?: Song[];
  createdAt?: string;
};

// ---------------- Defaults / Helpers ----------------
const DEFAULT_ROLES = [
  "Acoustic Guitar",
  "Bass Guitar",
  "Lyrics",
  "Piano",
  "Lead Vocal",
  "Backing Vocal",
  "Sound Engineer",
  "Camera",
  "Electric Guitar",
  "Drums",
];

const todaySunday = () => {
  const d = new Date();
  const day = d.getDay();
  const diff = (7 - day) % 7; // days to next Sunday
  d.setDate(d.getDate() + diff);
  return d.toISOString().split("T")[0];
};

const safeSections = (s?: Section[]) =>
  s || DEFAULT_ROLES.map((r) => ({ name: r, selectedMembers: [], notes: "", confirmations: {} }));

const ensureSectionShape = (section: Section): Section => ({
  name: section.name,
  selectedMembers: section.selectedMembers || [],
  notes: section.notes || "",
  confirmations: section.confirmations || {},
});

// ---------------- Component ----------------
export default function BandManagerPage() {
  const [members, setMembers] = useState<Member[]>([]);
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [selectedDate, setSelectedDate] = useState(todaySunday());
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminPassword, setAdminPassword] = useState("");
  const [notice, setNotice] = useState<string | null>(null);
  const [newSong, setNewSong] = useState<Song>({ title: "", key: "", capo: undefined, notes: "" });
  const [newMemberName, setNewMemberName] = useState("");
  const [newMemberRoles, setNewMemberRoles] = useState("");

  // ---------- Firebase listeners ----------
  useEffect(() => {
    const membersRef = ref(db, "members");
    const offMembers = onValue(membersRef, (snap) => {
      const val = snap.val();
      setMembers(val ? Object.values(val) as Member[] : []);
    });

    const schedulesRef = ref(db, "schedules");
    const offSchedules = onValue(schedulesRef, (snap) => {
      const val = snap.val();
      const arr = val ? Object.values(val) as Schedule[] : [];
      setSchedules(arr.map((s) => ({
        ...s,
        sections: safeSections(s.sections).map(ensureSectionShape),
        songs: s.songs || []
      })));
    });

    return () => { offMembers(); offSchedules(); };
  }, []);

  // ---------- Admin ----------
  const enterAdmin = () => {
    if (adminPassword === "admin123") {
      setIsAdmin(true);
      setNotice("Admin mode enabled");
    } else {
      setNotice("Wrong admin password");
    }
    setTimeout(() => setNotice(null), 3000);
  };

  // ---------- Schedule ----------
  const getSchedule = (): Schedule => {
    const s = schedules.find((sc) => sc.date === selectedDate);
    if (s) return { ...s, sections: safeSections(s.sections).map(ensureSectionShape), songs: s.songs || [] };
    return {
      date: selectedDate,
      sections: DEFAULT_ROLES.map((r) => ({ name: r, selectedMembers: [], notes: "", confirmations: {} })),
      songs: [],
      createdAt: new Date().toISOString(),
    };
  };

  const updateSectionNotes = async (sectionIndex: number, notes: string) => {
    const schedule = getSchedule();
    schedule.sections[sectionIndex].notes = notes;
    await set(ref(db, `schedules/${selectedDate}`), schedule);
  };

  const toggleConfirmation = async (sectionIndex: number, memberId: number) => {
    const schedule = getSchedule();
    const confs = schedule.sections[sectionIndex].confirmations || {};
    const current = confs[String(memberId)] || "pending";
    const next = current === "pending" ? "accepted" : current === "accepted" ? "declined" : "accepted";
    confs[String(memberId)] = next;
    schedule.sections[sectionIndex].confirmations = confs;
    await set(ref(db, `schedules/${selectedDate}`), schedule);
  };

  const removeMember = async (memberId: number) => {
    if (!isAdmin) { setNotice("Admin required"); setTimeout(() => setNotice(null), 2000); return; }
    await set(ref(db, `members/${memberId}`), null);
    setNotice("Member removed");
    setTimeout(() => setNotice(null), 2000);
  };

  const addMember = async () => {
    if (!newMemberName) return;
    const id = Date.now();
    const rolesArray = newMemberRoles.split(",").map(r => r.trim()).filter(r => r);
    const newM: Member = { id, name: newMemberName, roles: rolesArray };
    await set(ref(db, `members/${id}`), newM);
    setNewMemberName("");
    setNewMemberRoles("");
    setNotice(`Member "${newMemberName}" added`);
    setTimeout(() => setNotice(null), 2000);
  };

  // ---------- Global song management ----------
  const addGlobalSong = async () => {
    if (!newSong.title || !newSong.key) return;
    const schedule = getSchedule();
    schedule.songs = schedule.songs || [];
    schedule.songs.push({ ...newSong });
    await set(ref(db, `schedules/${selectedDate}`), schedule);
    setNewSong({ title: "", key: "", capo: undefined, notes: "" });
  };

  // ---------- Export only accepted ----------
  const exportSchedulePDF = () => {
    if (!jsPDF) return alert("PDF not available in SSR.");
    const schedule = getSchedule();
    const doc = new jsPDF({ unit: "pt", format: "a4" });
    let y = 40;
    doc.setFontSize(14);
    doc.text(`Band Schedule — ${schedule.date}`, 40, y);
    y += 20;

    schedule.sections.forEach((section, idx) => {
      const acceptedMembers = (section.selectedMembers || []).filter(
        id => section.confirmations?.[String(id)] === "accepted"
      );
      if (!acceptedMembers.length) return;
      doc.setFontSize(12);
      doc.text(`${idx + 1}. ${section.name}`, 40, y); y += 16;
      doc.setFontSize(10);
      doc.text(`Assigned: ${acceptedMembers.map(id => members.find(m => m.id === id)?.name || id).join(", ")}`, 60, y); y += 14;
      if (section.notes) { doc.text(`Notes: ${section.notes}`, 60, y); y += 14; }
      if (y > 720) { doc.addPage(); y = 40; }
    });

    if (schedule.songs?.length) {
      y += 10;
      doc.setFontSize(12);
      doc.text("Songs", 40, y); y += 16;
      doc.setFontSize(10);
      schedule.songs.forEach(s => {
        doc.text(`- ${s.title} (Key: ${s.key}${s.capo ? `, Capo: ${s.capo}` : ""})${s.notes ? ` — ${s.notes}` : ""}`, 60, y);
        y += 14;
        if (y > 720) { doc.addPage(); y = 40; }
      });
    }

    doc.save(`Band-Schedule-${schedule.date}.pdf`);
  };

  // ---------- Next Sunday ----------
  const nextSunday = () => {
    const d = new Date(selectedDate);
    d.setDate(d.getDate() + 7);
    setSelectedDate(d.toISOString().split("T")[0]);
  };

  // ---------- Render ----------
  const schedule = getSchedule();

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 p-6">
      <div className="max-w-6xl mx-auto">
        <header className="flex flex-col lg:flex-row items-start lg:items-center justify-between mb-6 gap-4">
          <div>
            <h1 className="text-3xl font-bold">Church Band Manager — Services</h1>
            <p className="text-sm text-slate-600">Realtime scheduling, confirmations, and exports.</p>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-sm flex flex-col">
              <label>Date:</label>
              <input type="date" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} className="border rounded p-1" />
              <button onClick={nextSunday} className="mt-1 px-2 py-1 bg-indigo-600 text-white rounded text-sm">Next Sunday</button>
            </div>

            {!isAdmin ? (
              <div className="flex items-center gap-2">
                <input type="password" placeholder="Admin password" value={adminPassword} onChange={(e) => setAdminPassword(e.target.value)} className="border p-1 rounded" />
                <button onClick={enterAdmin} className="px-3 py-1 bg-indigo-600 text-white rounded">Admin</button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <div className="text-sm font-medium text-green-700">Admin Mode</div>
                <button onClick={() => { setIsAdmin(false); setAdminPassword(""); }} className="px-2 py-1 border rounded">Exit</button>
              </div>
            )}
          </div>
        </header>

        {notice && <div className="mb-4 p-2 bg-yellow-100 border rounded text-sm">{notice}</div>}

        <main className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Members */}
          <section className="bg-white p-4 rounded shadow">
            <h2 className="font-semibold mb-2">Members</h2>

            {isAdmin && (
              <div className="mb-3 border p-2 rounded bg-gray-50">
                <div className="font-medium text-sm mb-1">Add Member</div>
                <input
                  placeholder="Name"
                  className="border p-1 w-full mb-1"
                  value={newMemberName}
                  onChange={(e) => setNewMemberName(e.target.value)}
                />
                <input
                  placeholder="Roles (comma separated)"
                  className="border p-1 w-full mb-1"
                  value={newMemberRoles}
                  onChange={(e) => setNewMemberRoles(e.target.value)}
                />
                <button
                  onClick={addMember}
                  className="px-3 py-1 bg-green-500 text-white rounded text-sm"
                >
                  Add
                </button>
              </div>
            )}

            <ul className="max-h-60 overflow-auto space-y-2 mb-3">
              {members.map(m => (
                <li key={m.id} className="flex items-center justify-between border rounded p-2">
                  <div>
                    <div className="font-medium">{m.name}</div>
                    <div className="text-xs text-slate-400">Roles: {(m.roles || []).join(", ") || "—"}</div>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    {isAdmin && <button onClick={() => removeMember(m.id)} className="text-xs px-2 py-1 bg-red-100 text-red-700 rounded">Delete</button>}
                  </div>
                </li>
              ))}
            </ul>
          </section>

          {/* Schedule */}
          <section className="bg-white p-4 rounded shadow lg:col-span-2">
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-semibold">Schedule — {selectedDate}</h2>
              <div className="flex gap-2">
                <button onClick={exportSchedulePDF} className="px-3 py-1 bg-slate-800 text-white rounded">Export PDF</button>
              </div>
            </div>

            {schedule.sections.map((section, idx) => {
              const sec = ensureSectionShape(section);
              const sectionMembers = members.filter(m => m.roles.includes(sec.name));
              if (!sectionMembers.length) return null;
              return (
                <div key={sec.name} className="border rounded p-3 mb-3">
                  <div className="flex justify-between items-center mb-2">
                    <div><div className="font-medium">{sec.name}</div><div className="text-xs text-slate-500">{sec.notes}</div></div>
                  </div>
                  <textarea className="border p-1 w-full mb-2" placeholder="Section notes" value={sec.notes} onChange={(e) => updateSectionNotes(idx, e.target.value)} />
                  <div className="flex flex-wrap gap-2 mb-2">
                    {sectionMembers.map(m => {
                      const conf = sec.confirmations?.[String(m.id)] || "pending";
                      return (
                        <button key={m.id} onClick={() => toggleConfirmation(idx, m.id)} className={`px-2 py-1 rounded text-sm ${conf === "accepted" ? "bg-green-500 text-white" : conf === "declined" ? "bg-red-500 text-white" : "bg-gray-100"}`}>
                          {m.name} ({conf})
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}

            {/* Global songs */}
            <div className="border rounded p-3">
              <div className="font-medium mb-2">Songs</div>
              <ul className="list-disc list-inside mb-2">
                {schedule.songs?.map((s, i) => <li key={i}>{s.title} (Key: {s.key}{s.capo ? `, Capo: ${s.capo}` : ""}) {s.notes ? `— ${s.notes}` : ""}</li>)}
              </ul>
              {isAdmin && (
                <div className="flex flex-wrap gap-2">
                  <input placeholder="Title" className="border p-1 flex-1" value={newSong.title} onChange={e => setNewSong({ ...newSong, title: e.target.value })} />
                  <input placeholder="Key" className="border p-1 w-20" value={newSong.key} onChange={e => setNewSong({ ...newSong, key: e.target.value })} />
                  <input placeholder="Capo" type="number" className="border p-1 w-20" value={newSong.capo ?? ""} onChange={e => setNewSong({ ...newSong, capo: Number(e.target.value) })} />
                  <input placeholder="Notes" className="border p-1 w-40" value={newSong.notes} onChange={e => setNewSong({ ...newSong, notes: e.target.value })} />
                  <button onClick={addGlobalSong} className="px-3 py-1 bg-yellow-500 text-white rounded">Add Song</button>
                </div>
              )}
            </div>

          </section>
        </main>
      </div>
    </div>
  );
}
