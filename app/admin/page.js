"use client";

import { useEffect, useState } from "react";

export default function AdminPage() {
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

      // Очікуємо, що твій Apps Script повертає масив об'єктів.
      // Якщо формат інший — підлаштуємо.
      const list = Array.isArray(data) ? data : data.items || data.data || [];
      setItems(list);
    } catch (e) {
      setError(String(e.message || e));
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  return (
    <main className="min-h-screen bg-black text-white p-10">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-3xl font-bold">Адмін-панель</h1>
          <p className="text-white/70 mt-1">Каталог потреб (Google Sheets → API)</p>
        </div>

        <button
          onClick={load}
          className="rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold hover:bg-emerald-500 transition"
        >
          Оновити
        </button>
      </div>

      <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-4">
        {loading && <div className="text-white/70">Завантаження…</div>}
        {error && (
          <div className="text-red-300">
            Помилка: {error}
            <div className="text-white/60 mt-2 text-sm">
              Перевір: чи повертає Apps Script JSON, і чи доступний URL.
            </div>
          </div>
        )}

        {!loading && !error && (
          <>
            <div className="text-sm text-white/60 mb-3">
              Записів: <span className="text-white font-semibold">{items.length}</span>
            </div>

            <div className="overflow-auto rounded-xl border border-white/10">
              <table className="min-w-[900px] w-full text-sm">
                <thead className="bg-white/5 text-white/70">
                  <tr>
                    <th className="text-left p-3">Назва</th>
                    <th className="text-left p-3">Громада</th>
                    <th className="text-left p-3">Бюджет</th>
                    <th className="text-left p-3">Статус</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((row, idx) => (
                    <tr key={idx} className="border-t border-white/10">
                      <td className="p-3">{row.title ?? row["Назва"] ?? "-"}</td>
                      <td className="p-3">{row.community ?? row["Громада"] ?? "-"}</td>
                      <td className="p-3">{row.budget ?? row["Бюджет"] ?? "-"}</td>
                      <td className="p-3">
                        {row.status ?? row["Статус"] ?? "-"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="text-xs text-white/50 mt-3">
              Якщо колонки названі інакше — скажи як саме в Google Sheets, і я піджену мапінг.
            </div>
          </>
        )}
      </div>
    </main>
  );
}