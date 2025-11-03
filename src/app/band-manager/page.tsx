"use client";

import React, { useEffect, useState } from "react";
import { db } from "@/firebase";
import { ref, onValue, set } from "firebase/database";

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
  const diff = (7 - day) % 7;
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
  const [serviceType, setServiceType] = useState<"morning" | "evening">("morning");
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
      setMembers(val ? (Object.values(val) as Member[]) : []);
    });

    const schedulesRef = ref(db, serviceType === "morning" ? "schedulesMorning" : "schedulesEvening");
    const offSchedules = onValue(schedulesRef, (snap) => {
      const val = snap.val();
      const arr = val ? (Object.values(val) as Schedule[]) : [];
      setSchedules(
        arr.map((s) => ({
          ...s,
          sections: safeSections(s.sections).map(ensureSectionShape),
          songs: s.songs || [],
        }))
      );
    });

    return () => {
      offMembers();
      offSchedules();
    };
  }, [serviceType]);

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
    if (s)
      return {
        ...s,
        sections: safeSections(s.sections).map(ensureSectionShape),
        songs: s.songs || [],
      };
    return {
      date: selectedDate,
      sections: DEFAULT_ROLES.map((r) => ({
        name: r,
        selectedMembers: [],
        notes: "",
        confirmations: {},
      })),
      songs: [],
      createdAt: new Date().toISOString(),
    };
  };

  const pathForSchedule = (date: string) =>
    serviceType === "morning"
      ? `schedulesMorning/${date}`
      : `schedulesEvening/${date}`;

  const updateSectionNotes = async (sectionIndex: number, notes: string) => {
    const schedule = getSchedule();
    schedule.sections[sectionIndex].notes = notes;
    await set(ref(db, pathForSchedule(selectedDate)), schedule);
  };

  const toggleConfirmation = async (sectionIndex: number, memberId: number) => {
    const schedule = getSchedule();
    const confs = schedule.sections[sectionIndex].confirmations || {};
    const current = confs[String(memberId)] || "pending";
    const next =
      current === "pending"
        ? "accepted"
        : current === "accepted"
        ? "declined"
        : "accepted";
    confs[String(memberId)] = next;
    schedule.sections[sectionIndex].confirmations = confs;
    await set(ref(db, pathForSchedule(selectedDate)), schedule);
  };

  const removeMember = async (memberId: number) => {
    if (!isAdmin) {
      setNotice("Admin required");
      setTimeout(() => setNotice(null), 2000);
      return;
    }
    await set(ref(db, `members/${memberId}`), null);
    setNotice("Member removed");
    setTimeout(() => setNotice(null), 2000);
  };

  const addMember = async () => {
    if (!newMemberName) return;
    const id = Date.now();
    const rolesArray = newMemberRoles
      .split(",")
      .map((r) => r.trim())
      .filter((r) => r);
    const newM: Member = { id, name: newMemberName, roles: rolesArray };
    await set(ref(db, `members/${id}`), newM);
    setNewMemberName("");
    setNewMemberRoles("");
    setNotice(`Member "${newMemberName}" added`);
    setTimeout(() => setNotice(null), 2000);
  };

  // ---------- Songs ----------
  const addGlobalSong = async () => {
    if (!newSong.title || !newSong.key) return;

    const schedule = getSchedule();
    schedule.songs = schedule.songs || [];

    const cleanSong: Song = {
      title: newSong.title,
      key: newSong.key,
      capo: newSong.capo ?? undefined,
      notes: newSong.notes?.trim() || undefined,
    };

    schedule.songs.push(cleanSong);

    await set(ref(db, pathForSchedule(selectedDate)), schedule);

    setNewSong({ title: "", key: "", capo: undefined, notes: "" });
  };

  const removeSong = async (index: number) => {
    const schedule = getSchedule();
    schedule.songs = schedule.songs?.filter((_, i) => i !== index) || [];
    await set(ref(db, pathForSchedule(selectedDate)), schedule);
  };

  // ---------- Export ----------
  const exportSchedulePDF = () => {
    if (!jsPDF) return alert("PDF not available in SSR.");
    const schedule = getSchedule();
    const doc = new jsPDF({ unit: "pt", format: "a4" });
    let y = 40;
    doc.setFontSize(14);
    doc.text(
      `Band Schedule — ${schedule.date} (${serviceType === "morning" ? "Morning" : "Evening"} Service)`,
      40,
      y
    );
    y += 20;

    schedule.sections.forEach((section, idx) => {
      const sec = ensureSectionShape(section);
      const acceptedMembers = members.filter(
        (m) =>
          m.roles.includes(sec.name) &&
          sec.confirmations?.[String(m.id)] === "accepted"
      );
      if (!acceptedMembers.length) return;

      doc.setFontSize(12);
      doc.text(`${idx + 1}. ${sec.name} — ${acceptedMembers.length} accepted`, 40, y);
      y += 16;
      doc.setFontSize(10);

      acceptedMembers.forEach((m) => {
        doc.text(`- ${m.name}`, 60, y);
        y += 14;
        if (y > 720) {
          doc.addPage();
          y = 40;
        }
      });

      if (sec.notes) {
        doc.text(`Notes: ${sec.notes}`, 60, y);
        y += 14;
        if (y > 720) {
          doc.addPage();
          y = 40;
        }
      }
    });

    if (schedule.songs?.length) {
      y += 10;
      doc.setFontSize(12);
      doc.text(`Songs — ${schedule.songs.length}`, 40, y);
      y += 16;
      doc.setFontSize(10);
      schedule.songs.forEach((s) => {
        doc.text(
          `- ${s.title} (Key: ${s.key}${s.capo ? `, Capo: ${s.capo}` : ""})${
            s.notes ? ` — ${s.notes}` : ""
          }`,
          60,
          y
        );
        y += 14;
        if (y > 720) {
          doc.addPage();
          y = 40;
        }
      });
    }

    doc.save(`Band-Schedule-${schedule.date}-${serviceType}.pdf`);
  };

  // ---------- Next Sunday ----------
  const nextSunday = () => {
    const d = new Date(selectedDate);
    d.setDate(d.getDate() + 7);
    setSelectedDate(d.toISOString().split("T")[0]);
  };

  const schedule = getSchedule();

  // ---------- Dynamic Colors ----------
  const theme =
    serviceType === "morning"
      ? {
          bg: "bg-sky-50",
          card: "bg-white",
          accent: "bg-sky-600",
          text: "text-slate-900",
          buttonAlt: "bg-sky-800",
        }
      : {
          bg: "bg-indigo-950",
          card: "bg-indigo-900 text-indigo-100",
          accent: "bg-violet-600",
          text: "text-indigo-100",
          buttonAlt: "bg-indigo-700",
        };

  // ---------------- UI ----------------
  return (
    <div className={`min-h-screen ${theme.bg} ${theme.text} p-4 sm:p-6 transition-all`}>
      <div className="max-w-3xl mx-auto">
        <header className="flex flex-col gap-4 mb-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold">
              Church Band Manager — {serviceType === "morning" ? "Morning" : "Evening"} Service
            </h1>
            <p className="text-sm opacity-75">
              Realtime scheduling, confirmations, and exports.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2">
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="border rounded p-2 text-sm text-slate-800"
              />
              <button
                onClick={nextSunday}
                className={`px-4 py-2 ${theme.accent} text-white rounded text-sm sm:text-base mt-1 sm:mt-0`}
              >
                Next Sunday
              </button>
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                onClick={() =>
                  setServiceType((prev) => (prev === "morning" ? "evening" : "morning"))
                }
                className={`px-4 py-2 ${theme.buttonAlt} text-white rounded text-sm sm:text-base`}
              >
                Switch to {serviceType === "morning" ? "Evening" : "Morning"} Service
              </button>

              {!isAdmin ? (
                <>
                  <input
                    type="password"
                    placeholder="Admin password"
                    value={adminPassword}
                    onChange={(e) => setAdminPassword(e.target.value)}
                    className="border p-2 rounded text-sm text-slate-800"
                  />
                  <button
                    onClick={enterAdmin}
                    className={`px-4 py-2 ${theme.accent} text-white rounded text-sm sm:text-base`}
                  >
                    Admin
                  </button>
                </>
              ) : (
                <div className="flex gap-2 items-center">
                  <div className="text-sm font-medium text-green-400">Admin Mode</div>
                  <button
                    onClick={() => {
                      setIsAdmin(false);
                      setAdminPassword("");
                    }}
                    className="px-3 py-1 border rounded text-sm sm:text-base"
                  >
                    Exit
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {notice && (
          <div className="mb-4 p-2 bg-yellow-100 border rounded text-sm text-slate-900">
            {notice}
          </div>
        )}

        <main className="flex flex-col gap-6">
          {/* Members Section */}
          <section className={`${theme.card} p-4 rounded shadow`}>
            <h2 className="font-semibold mb-2">Members</h2>
            {isAdmin && (
              <div className="mb-3 border p-3 rounded bg-opacity-10 bg-white">
                <div className="font-medium text-sm mb-2">Add Member</div>
                <input
                  placeholder="Name"
                  className="border p-2 w-full mb-2 text-sm text-slate-800"
                  value={newMemberName}
                  onChange={(e) => setNewMemberName(e.target.value)}
                />
                <input
                  placeholder="Roles (comma separated)"
                  className="border p-2 w-full mb-2 text-sm text-slate-800"
                  value={newMemberRoles}
                  onChange={(e) => setNewMemberRoles(e.target.value)}
                />
                <button
                  onClick={addMember}
                  className={`px-4 py-2 bg-green-500 text-white rounded text-sm sm:text-base`}
                >
                  Add
                </button>
              </div>
            )}

            <ul className="max-h-64 overflow-auto space-y-2 mb-3">
              {members.map((m) => (
                <li
                  key={m.id}
                  className="flex flex-col sm:flex-row justify-between items-start sm:items-center border rounded p-3"
                >
                  <div>
                    <div className="font-medium">{m.name}</div>
                    <div className="text-xs sm:text-sm opacity-75">
                      Roles: {(m.roles || []).join(", ") || "—"}
                    </div>
                  </div>
                  {isAdmin && (
                    <button
                      onClick={() => removeMember(m.id)}
                      className="mt-2 sm:mt-0 px-3 py-1 bg-red-100 text-red-700 rounded text-sm sm:text-base"
                    >
                      Delete
                    </button>
                  )}
                </li>
              ))}
            </ul>
          </section>

          {/* Schedule Section */}
          <section className={`${theme.card} p-4 rounded shadow`}>
            <div className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-center mb-3 gap-2">
              <h2 className="font-semibold">
                Schedule — {selectedDate} ({serviceType === "morning" ? "Morning" : "Evening"} Service)
              </h2>
              {isAdmin && (
                <button
                  onClick={exportSchedulePDF}
                  className={`px-4 py-2 ${theme.buttonAlt} text-white rounded text-sm sm:text-base`}
                >
                  Export PDF
                </button>
              )}
            </div>

            {schedule.sections.map((section, idx) => {
              const sec = ensureSectionShape(section);
              const sectionMembers = members.filter((m) =>
                m.roles.includes(sec.name)
              );
              if (!sectionMembers.length) return null;

              return (
                <div key={sec.name} className="border rounded p-3 mb-3">
                  <div className="flex flex-col sm:flex-row justify-between mb-2 gap-2">
                    <div>
                      <div className="font-medium">{sec.name}</div>
                      <div className="text-xs sm:text-sm opacity-70">{sec.notes}</div>
                    </div>
                  </div>
                  <textarea
                    className="border p-2 w-full mb-2 text-sm text-slate-800"
                    placeholder="Section notes"
                    value={sec.notes}
                    onChange={(e) => updateSectionNotes(idx, e.target.value)}
                  />
                  <div className="flex flex-wrap gap-2 mb-2">
                    {sectionMembers.map((m) => {
                      const conf =
                        sec.confirmations?.[String(m.id)] || "pending";
                      return (
                        <button
                          key={m.id}
                          onClick={() => toggleConfirmation(idx, m.id)}
                          className={`px-4 py-2 rounded text-sm sm:text-base ${
                            conf === "accepted"
                              ? "bg-green-500 text-white"
                              : conf === "declined"
                              ? "bg-red-500 text-white"
                              : "bg-gray-100 text-slate-800"
                          }`}
                        >
                          {m.name} ({conf})
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}

            {/* Songs */}
            <div className="border rounded p-3">
              <div className="font-medium mb-2">Songs</div>
              <ul className="list-disc list-inside mb-2 text-sm sm:text-base">
                {schedule.songs?.map((s, i) => (
                  <li key={i} className="flex justify-between items-center">
                    <span>
                      {s.title} (Key: {s.key}
                      {s.capo ? `, Capo: ${s.capo}` : ""}){" "}
                      {s.notes ? `— ${s.notes}` : ""}
                    </span>
                    {isAdmin && (
                      <button
                        onClick={() => removeSong(i)}
                        className="ml-3 text-red-400 text-xs underline"
                      >
                        Remove
                      </button>
                    )}
                  </li>
                ))}
              </ul>

              {isAdmin && (
                <div className="mt-3 border-t pt-3">
                  <div className="text-sm font-medium mb-2">Add Song</div>
                  <input
                    placeholder="Title"
                    className="border p-2 w-full mb-2 text-sm text-slate-800"
                    value={newSong.title}
                    onChange={(e) =>
                      setNewSong({ ...newSong, title: e.target.value })
                    }
                  />
                  <input
                    placeholder="Key"
                    className="border p-2 w-full mb-2 text-sm text-slate-800"
                    value={newSong.key}
                    onChange={(e) =>
                      setNewSong({ ...newSong, key: e.target.value })
                    }
                  />
                  <input
                    placeholder="Capo (optional)"
                    className="border p-2 w-full mb-2 text-sm text-slate-800"
                    value={newSong.capo || ""}
                    onChange={(e) =>
                      setNewSong({
                        ...newSong,
                        capo: e.target.value ? parseInt(e.target.value) : undefined,
                      })
                    }
                  />
                  <input
                    placeholder="Notes (optional)"
                    className="border p-2 w-full mb-2 text-sm text-slate-800"
                    value={newSong.notes || ""}
                    onChange={(e) =>
                      setNewSong({ ...newSong, notes: e.target.value })
                    }
                  />
                  <button
                    onClick={addGlobalSong}
                    className="px-4 py-2 bg-green-500 text-white rounded text-sm sm:text-base"
                  >
                    Add Song
                  </button>
                </div>
              )}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
