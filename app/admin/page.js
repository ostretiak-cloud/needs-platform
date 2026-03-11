"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "@/components/LanguageProvider";

const COPY = {
  uk: {
    title: "Адмін-панель", subtitle: "Каталог потреб (Google Sheets → API)", refresh: "Оновити", loading: "Завантаження…",
    error: "Помилка:", errorHint: "Перевір: чи повертає Apps Script JSON, і чи доступний URL.", records: "Записів:",
    name: "Назва", community: "Громада", budget: "Бюджет", status: "Статус", hint: "Якщо колонки названі інакше — скажи як саме в Google Sheets, і я піджену мапінг.",
  },
  en: {
    title: "Admin panel", subtitle: "Needs catalog (Google Sheets → API)", refresh: "Refresh", loading: "Loading…",
    error: "Error:", errorHint: "Check whether Apps Script returns JSON and whether URL is accessible.", records: "Records:",
    name: "Title", community: "Community", budget: "Budget", status: "Status", hint: "If your columns are named differently in Google Sheets, share them and I will adjust mapping.",
  },
};

export default function AdminPage() {
  const { language } = useLanguage();
  const copy = COPY[language] ?? COPY.uk;
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);
  const [error, setError] = useState("");

  async function load() {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/needs", { cache: "no-store" });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "API error");
      setItems(Array.isArray(data) ? data : data.items || data.data || []);
    } catch (e) {
      setError(String(e.message || e));
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, []);

  return (
    <main className="min-h-screen bg-black p-10 text-white">
      <div className="flex flex-wrap items-center justify-between gap-4"><div><h1 className="text-3xl font-bold">{copy.title}</h1><p className="mt-1 text-white/70">{copy.subtitle}</p></div><button onClick={load} className="rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold transition hover:bg-emerald-500">{copy.refresh}</button></div>
      <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-4">
        {loading && <div className="text-white/70">{copy.loading}</div>}
        {error && <div className="text-red-300">{copy.error} {error}<div className="mt-2 text-sm text-white/60">{copy.errorHint}</div></div>}
        {!loading && !error && (
          <>
            <div className="mb-3 text-sm text-white/60">{copy.records} <span className="font-semibold text-white">{items.length}</span></div>
            <div className="overflow-auto rounded-xl border border-white/10">
              <table className="min-w-[900px] w-full text-sm"><thead className="bg-white/5 text-white/70"><tr><th className="p-3 text-left">{copy.name}</th><th className="p-3 text-left">{copy.community}</th><th className="p-3 text-left">{copy.budget}</th><th className="p-3 text-left">{copy.status}</th></tr></thead><tbody>{items.map((row, idx) => <tr key={idx} className="border-t border-white/10"><td className="p-3">{row.title ?? row["Назва"] ?? "-"}</td><td className="p-3">{row.community ?? row["Громада"] ?? "-"}</td><td className="p-3">{row.budget ?? row["Бюджет"] ?? "-"}</td><td className="p-3">{row.status ?? row["Статус"] ?? "-"}</td></tr>)}</tbody></table>
            </div>
            <div className="mt-3 text-xs text-white/50">{copy.hint}</div>
          </>
        )}
      </div>
    </main>
  );
}
