"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

function norm(v) {
  return String(v ?? "").trim();
}

function normLower(v) {
  return norm(v).toLowerCase();
}

function normStatus(v) {
  return normLower(v);
}

function money(n) {
  const num = Number(n);
  if (!Number.isFinite(num)) return "";
  return num.toLocaleString("uk-UA") + " грн";
}

function safeDate(v) {
  const d = new Date(v);
  if (Number.isNaN(d.getTime())) return null;
  return d;
}

function cmpStr(a, b) {
  return String(a ?? "").localeCompare(String(b ?? ""), "uk-UA", { sensitivity: "base" });
}

function uniqueSorted(values) {
  const arr = Array.from(new Set(values.filter((x) => norm(x) !== "")));
  arr.sort((a, b) => cmpStr(a, b));
  return arr;
}

export default function ApplicationsClient({ initialNeeds }) {
  const needs = Array.isArray(initialNeeds) ? initialNeeds : [];

  // ====== опції для фільтрів ======
  const categories = useMemo(
    () => uniqueSorted(needs.map((x) => x.category)),
    [needs]
  );
  const communities = useMemo(
    () => uniqueSorted(needs.map((x) => x.community)),
    [needs]
  );
  const statuses = useMemo(() => {
    // типові: published/draft/archived — але беремо те, що реально є
    const raw = uniqueSorted(needs.map((x) => normStatus(x.status)));
    return raw.length ? raw : ["published", "draft"];
  }, [needs]);

  // ====== state ======
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("");
  const [community, setCommunity] = useState("");
  const [priority, setPriority] = useState(""); // "1".."5"
  const [q, setQ] = useState("");
  const [sort, setSort] = useState("updated_desc"); // updated_desc | budget_desc | budget_asc | priority_desc | title_asc

  // пагінація
  const [page, setPage] = useState(1);
  const pageSize = 6;

  // ====== apply filters ======
  const filtered = useMemo(() => {
    const qq = normLower(q);

    let arr = needs.filter((x) => {
      if (category && norm(x.category) !== category) return false;
      if (community && norm(x.community) !== community) return false;
      if (status && normStatus(x.status) !== status) return false;
      if (priority && String(x.priority ?? "") !== priority) return false;

      if (qq) {
        const hay = [
          x.id,
          x.title,
          x.description,
          x.community,
          x.category,
          x.status,
        ]
          .map((v) => normLower(v))
          .join(" | ");
        if (!hay.includes(qq)) return false;
      }

      return true;
    });

    // ====== sorting ======
    arr = [...arr];
    arr.sort((a, b) => {
      if (sort === "updated_desc") {
        const da = safeDate(a.updated_at)?.getTime() ?? 0;
        const db = safeDate(b.updated_at)?.getTime() ?? 0;
        return db - da;
      }
      if (sort === "budget_desc") return Number(b.budget_uah ?? b.budget ?? 0) - Number(a.budget_uah ?? a.budget ?? 0);
      if (sort === "budget_asc") return Number(a.budget_uah ?? a.budget ?? 0) - Number(b.budget_uah ?? b.budget ?? 0);
      if (sort === "priority_desc") return Number(b.priority ?? 0) - Number(a.priority ?? 0);
      if (sort === "title_asc") return cmpStr(a.title, b.title);
      return 0;
    });

    return arr;
  }, [needs, category, community, status, priority, q, sort]);

  // reset page when filters change
  const total = filtered.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const currentPage = Math.min(page, totalPages);

  const slice = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filtered.slice(start, start + pageSize);
  }, [filtered, currentPage]);

  function resetFilters() {
    setCategory("");
    setStatus("");
    setCommunity("");
    setPriority("");
    setQ("");
    setSort("updated_desc");
    setPage(1);
  }

  function onApplySearch(e) {
    e?.preventDefault?.();
    setPage(1);
  }

  return (
    <div>
      {/* панель фільтрів */}
      <div className="rounded-2xl border border-white/10 bg-white/5 p-5 md:p-6 shadow-[0_0_60px_rgba(0,0,0,0.35)]">
        <form onSubmit={onApplySearch} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
            <select
              className="w-full rounded-xl bg-black/30 border border-white/10 px-4 py-3 outline-none"
              value={category}
              onChange={(e) => {
                setCategory(e.target.value);
                setPage(1);
              }}
            >
              <option value="">Всі категорії</option>
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>

            <select
              className="w-full rounded-xl bg-black/30 border border-white/10 px-4 py-3 outline-none"
              value={status}
              onChange={(e) => {
                setStatus(e.target.value);
                setPage(1);
              }}
            >
              <option value="">Всі статуси</option>
              {statuses.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>

            <select
              className="w-full rounded-xl bg-black/30 border border-white/10 px-4 py-3 outline-none"
              value={community}
              onChange={(e) => {
                setCommunity(e.target.value);
                setPage(1);
              }}
            >
              <option value="">Всі громади</option>
              {communities.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>

            <select
              className="w-full rounded-xl bg-black/30 border border-white/10 px-4 py-3 outline-none"
              value={priority}
              onChange={(e) => {
                setPriority(e.target.value);
                setPage(1);
              }}
            >
              <option value="">Пріоритет (будь-який)</option>
              <option value="5">5 (найвищий)</option>
              <option value="4">4</option>
              <option value="3">3</option>
              <option value="2">2</option>
              <option value="1">1 (найнижчий)</option>
            </select>

            <button
              type="button"
              onClick={resetFilters}
              className="w-full rounded-xl bg-white/10 hover:bg-white/15 border border-white/10 px-4 py-3 transition"
            >
              Скинути
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-[1fr_220px_160px] gap-3">
            <input
              className="w-full rounded-xl bg-black/30 border border-white/10 px-4 py-3 outline-none"
              placeholder="Пошук"
              value={q}
              onChange={(e) => setQ(e.target.value)}
            />

            <select
              className="w-full rounded-xl bg-black/30 border border-white/10 px-4 py-3 outline-none"
              value={sort}
              onChange={(e) => {
                setSort(e.target.value);
                setPage(1);
              }}
            >
              <option value="updated_desc">Сортування: новіші</option>
              <option value="budget_desc">Бюджет: спадання</option>
              <option value="budget_asc">Бюджет: зростання</option>
              <option value="priority_desc">Пріоритет: високий</option>
              <option value="title_asc">Назва: А-Я</option>
            </select>

            <button
              type="submit"
              className="w-full rounded-xl bg-orange-500 hover:bg-orange-400 text-black font-semibold px-4 py-3 transition"
            >
              Пошук
            </button>
          </div>

          <div className="text-white/70 text-sm">Знайдено: {total}</div>
        </form>
      </div>

      {/* карточки */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        {slice.map((x) => (
          <div
            key={x.id}
            className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-[0_0_50px_rgba(0,0,0,0.3)]"
          >
            <div className="flex items-start justify-between gap-4">
              <h2 className="text-xl md:text-2xl font-semibold leading-snug">{x.title}</h2>
              <span className="shrink-0 rounded-full bg-white/10 px-3 py-1 text-xs">
                priority {x.priority ?? "—"}
              </span>
            </div>

            <p className="mt-3 text-white/80 line-clamp-3">
              {x.description || "—"}
            </p>

            <div className="mt-4 grid grid-cols-[120px_1fr] gap-y-2 text-sm">
              <div className="text-white/50">Громада</div>
              <div>{x.community || "—"}</div>

              <div className="text-white/50">Категорія</div>
              <div>{x.category || "—"}</div>

              <div className="text-white/50">Бюджет</div>
              <div className="font-semibold">{money(x.budget_uah ?? x.budget)}</div>
            </div>

            <div className="mt-5 flex items-center justify-between">
              <span className="text-white/60 text-sm">{normStatus(x.status) || "—"}</span>
              <Link
                href={`/applications/${encodeURIComponent(String(x.id))}`}
                className="rounded-xl bg-emerald-400 hover:bg-emerald-300 text-black font-semibold px-5 py-2 transition"
              >
                Відкрити
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* пагінація */}
      <div className="mt-8 flex items-center justify-between text-sm text-white/70">
        <div>
          Сторінка {currentPage} / {totalPages}
        </div>
        <div className="flex gap-2">
          <button
            className="rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 px-4 py-2 transition disabled:opacity-40"
            disabled={currentPage <= 1}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
          >
            ← Назад
          </button>
          <button
            className="rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 px-4 py-2 transition disabled:opacity-40"
            disabled={currentPage >= totalPages}
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          >
            Далі →
          </button>
        </div>
      </div>
    </div>
  );
}