// app/applications/ui/ApplicationsClient.js
"use client";

import { useMemo, useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

function uniqSorted(arr) {
  return Array.from(new Set(arr.filter(Boolean))).sort((a, b) =>
    String(a).localeCompare(String(b), "uk")
  );
}

function normalize(s) {
  return String(s || "").toLowerCase().trim();
}

function formatMoneyUAH(n) {
  const num = Number(n);
  if (!Number.isFinite(num)) return "";
  return num.toLocaleString("uk-UA") + " грн";
}

export default function ApplicationsClient({ initialNeeds }) {
  const router = useRouter();
  const sp = useSearchParams();

  // URL -> state
  const [q, setQ] = useState(sp.get("q") || "");
  const [category, setCategory] = useState(sp.get("category") || "all");
  const [community, setCommunity] = useState(sp.get("community") || "all");
  const [status, setStatus] = useState(sp.get("status") || "all");
  const [priority, setPriority] = useState(sp.get("priority") || "all");

  // sync state if user opens url with params
  useEffect(() => {
    setQ(sp.get("q") || "");
    setCategory(sp.get("category") || "all");
    setCommunity(sp.get("community") || "all");
    setStatus(sp.get("status") || "all");
    setPriority(sp.get("priority") || "all");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sp]);

  const categories = useMemo(
    () => uniqSorted(initialNeeds.map((x) => x.category)),
    [initialNeeds]
  );
  const communities = useMemo(
    () => uniqSorted(initialNeeds.map((x) => x.community)),
    [initialNeeds]
  );
  const statuses = useMemo(
    () => uniqSorted(initialNeeds.map((x) => x.status)),
    [initialNeeds]
  );

  const filtered = useMemo(() => {
    const nq = normalize(q);

    return initialNeeds.filter((x) => {
      if (category !== "all" && String(x.category) !== category) return false;
      if (community !== "all" && String(x.community) !== community) return false;
      if (status !== "all" && String(x.status) !== status) return false;
      if (priority !== "all" && String(x.priority) !== priority) return false;

      if (nq) {
        const hay =
          normalize(x.title) +
          " " +
          normalize(x.description) +
          " " +
          normalize(x.community) +
          " " +
          normalize(x.category);

        if (!hay.includes(nq)) return false;
      }

      return true;
    });
  }, [initialNeeds, q, category, community, status, priority]);

  function applyToUrl() {
    const params = new URLSearchParams();

    if (q.trim()) params.set("q", q.trim());
    if (category !== "all") params.set("category", category);
    if (community !== "all") params.set("community", community);
    if (status !== "all") params.set("status", status);
    if (priority !== "all") params.set("priority", priority);

    const qs = params.toString();
    router.push(qs ? `/applications?${qs}` : "/applications");
  }

  function resetFilters() {
    setQ("");
    setCategory("all");
    setCommunity("all");
    setStatus("all");
    setPriority("all");
    router.push("/applications");
  }

  return (
    <div>
      {/* Панель фільтрів */}
      <div className="rounded-2xl border border-white/10 bg-white/5 p-4 md:p-5 shadow-lg">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
          <select
            className="h-11 rounded-xl bg-black/30 border border-white/10 px-3 text-white"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="all">Всі категорії</option>
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>

          <select
            className="h-11 rounded-xl bg-black/30 border border-white/10 px-3 text-white"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="all">Всі статуси</option>
            {statuses.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>

          <select
            className="h-11 rounded-xl bg-black/30 border border-white/10 px-3 text-white"
            value={community}
            onChange={(e) => setCommunity(e.target.value)}
          >
            <option value="all">Всі громади</option>
            {communities.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>

          <select
            className="h-11 rounded-xl bg-black/30 border border-white/10 px-3 text-white"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option value="all">Пріоритет (будь-який)</option>
            <option value="5">5 (критично)</option>
            <option value="4">4</option>
            <option value="3">3</option>
            <option value="2">2</option>
            <option value="1">1</option>
          </select>

          <button
            onClick={resetFilters}
            className="h-11 rounded-xl border border-white/10 bg-white/10 hover:bg-white/15 transition"
          >
            Скинути
          </button>
        </div>

        <div className="mt-3 flex flex-col md:flex-row gap-3">
          <input
            className="h-11 flex-1 rounded-xl bg-black/30 border border-white/10 px-3 text-white placeholder:text-white/40"
            placeholder="Пошук"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") applyToUrl();
            }}
          />
          <button
            onClick={applyToUrl}
            className="h-11 md:w-36 rounded-xl bg-orange-500 hover:bg-orange-400 transition text-black font-medium"
          >
            Пошук
          </button>
        </div>

        <div className="mt-3 text-sm text-white/60">
          Знайдено: <span className="text-white">{filtered.length}</span>
        </div>
      </div>

      {/* Карточки */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        {filtered.map((x) => (
          <div
            key={x.id}
            className="rounded-2xl border border-white/10 bg-white/5 p-5 hover:bg-white/7 transition"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="text-lg font-semibold leading-snug">{x.title}</div>
              <div className="shrink-0 rounded-full bg-white/10 px-3 py-1 text-xs">
                priority {x.priority ?? "-"}
              </div>
            </div>

            <div className="mt-2 text-sm text-white/70 line-clamp-3">
              {x.description || "—"}
            </div>

            <div className="mt-4 space-y-2 text-sm text-white/75">
              <div className="flex items-center justify-between gap-3">
                <span className="text-white/50">Громада</span>
                <span className="text-right">{x.community || "—"}</span>
              </div>
              <div className="flex items-center justify-between gap-3">
                <span className="text-white/50">Категорія</span>
                <span className="text-right">{x.category || "—"}</span>
              </div>
              <div className="flex items-center justify-between gap-3">
                <span className="text-white/50">Бюджет</span>
                <span className="text-right text-white">
                  {formatMoneyUAH(x.budget)}
                </span>
              </div>
            </div>

            <div className="mt-5 flex items-center justify-between">
              <span className="text-xs text-white/50">
                {x.status ? String(x.status) : ""}
              </span>

              <Link
                href={`/applications/${x.id}`}
                className="rounded-xl bg-emerald-400 hover:bg-emerald-300 transition text-black text-sm font-medium px-4 py-2"
              >
                Відкрити
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}