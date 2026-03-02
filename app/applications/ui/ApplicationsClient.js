"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

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
  return String(a ?? "").localeCompare(String(b ?? ""), "uk-UA", {
    sensitivity: "base",
  });
}
function uniqueSorted(values) {
  const arr = Array.from(new Set(values.filter((x) => norm(x) !== "")));
  arr.sort((a, b) => cmpStr(a, b));
  return arr;
}

export default function ApplicationsClient({ initialNeeds }) {
  const needs = Array.isArray(initialNeeds) ? initialNeeds : [];

  // ====== URL params -> initial filters ======
  const searchParams = useSearchParams();

  const urlQ = searchParams?.get("q") ?? "";
  const urlCategory = searchParams?.get("category") ?? "";
  const urlCommunity = searchParams?.get("community") ?? "";
  const urlStatus = searchParams?.get("status") ?? "";
  const urlPriority = searchParams?.get("priority") ?? "";
  const urlSort = searchParams?.get("sort") ?? "";

  // ====== опції для фільтрів ======
  const categories = useMemo(() => uniqueSorted(needs.map((x) => x.category)), [needs]);
  const communities = useMemo(() => uniqueSorted(needs.map((x) => x.community)), [needs]);
  const statuses = useMemo(() => {
    const raw = uniqueSorted(needs.map((x) => normStatus(x.status)));
    return raw.length ? raw : ["published", "draft"];
  }, [needs]);

  // ====== state ======
  const [category, setCategory] = useState(urlCategory);
  const [status, setStatus] = useState(urlStatus);
  const [community, setCommunity] = useState(urlCommunity);
  const [priority, setPriority] = useState(urlPriority); // "1".."5"
  const [q, setQ] = useState(urlQ);
  const [sort, setSort] = useState(urlSort || "updated_desc"); // updated_desc | budget_desc | budget_asc | priority_desc | title_asc

  // пагінація
  const [page, setPage] = useState(1);
  const pageSize = 6;

  // Якщо користувач відкрив /applications?.... і далі міняє URL (або переходить з головної),
  // синхронізуємо фільтри з URL.
  useEffect(() => {
    setCategory(urlCategory);
    setStatus(urlStatus);
    setCommunity(urlCommunity);
    setPriority(urlPriority);
    setQ(urlQ);
    setSort(urlSort || "updated_desc");
    setPage(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [urlQ, urlCategory, urlCommunity, urlStatus, urlPriority, urlSort]);

  // ====== apply filters ======
  const filtered = useMemo(() => {
    const qq = normLower(q);

    let arr = needs.filter((x) => {
      if (category && norm(x.category) !== category) return false;
      if (community && norm(x.community) !== community) return false;
      if (status && normStatus(x.status) !== normStatus(status)) return false;
      if (priority && String(x.priority ?? "") !== String(priority)) return false;

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
      if (sort === "budget_desc")
        return (
          Number(b.budget_uah ?? b.budget ?? 0) -
          Number(a.budget_uah ?? a.budget ?? 0)
        );
      if (sort === "budget_asc")
        return (
          Number(a.budget_uah ?? a.budget ?? 0) -
          Number(b.budget_uah ?? b.budget ?? 0)
        );
      if (sort === "priority_desc") return Number(b.priority ?? 0) - Number(a.priority ?? 0);
      if (sort === "title_asc") return cmpStr(a.title, b.title);
      return 0;
    });

    return arr;
  }, [needs, category, community, status, priority, q, sort]);

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
    <div className="space-y-6">
      {/* панель фільтрів */}
      <form onSubmit={onApplySearch} className="rounded-2xl border border-white/10 bg-white/5 p-4">
        <div className="grid gap-3 md:grid-cols-5">
          <select
            className="h-11 rounded-xl border border-white/10 bg-black/20 px-3 text-sm text-white"
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
            className="h-11 rounded-xl border border-white/10 bg-black/20 px-3 text-sm text-white"
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
            className="h-11 rounded-xl border border-white/10 bg-black/20 px-3 text-sm text-white"
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
            className="h-11 rounded-xl border border-white/10 bg-black/20 px-3 text-sm text-white"
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
            className="h-11 rounded-xl border border-white/10 bg-white/10 px-3 text-sm text-white hover:bg-white/15"
          >
            Скинути
          </button>
        </div>

        <div className="mt-3 grid gap-3 md:grid-cols-3">
          <input
            className="h-11 rounded-xl border border-white/10 bg-black/20 px-3 text-sm text-white placeholder:text-white/40"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Пошук… (ID, назва, опис, громада, категорія)"
          />

          <select
            className="h-11 rounded-xl border border-white/10 bg-black/20 px-3 text-sm text-white"
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
            className="h-11 rounded-xl bg-white px-4 text-sm font-semibold text-black hover:bg-white/90"
          >
            Пошук
          </button>
        </div>

        <div className="mt-3 text-sm text-white/70">Знайдено: {total}</div>
      </form>

      {/* карточки */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {slice.map((x) => (
          <div key={x.id} className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <div className="mb-2 flex items-center justify-between">
              <div className="text-xs text-white/60">{normStatus(x.status) || "—"}</div>
              <div className="text-xs text-white/60">priority {x.priority ?? "—"}</div>
            </div>

            <h2 className="text-lg font-semibold text-white">{x.title}</h2>

            <p className="mt-2 line-clamp-3 text-sm text-white/75">{x.description || "—"}</p>

            <div className="mt-3 space-y-1 text-sm text-white/75">
              <div>
                <span className="text-white/50">Громада:</span> {x.community || "—"}
              </div>
              <div>
                <span className="text-white/50">Категорія:</span> {x.category || "—"}
              </div>
              <div>
                <span className="text-white/50">Бюджет:</span> {money(x.budget_uah ?? x.budget) || "—"}
              </div>
            </div>

            <div className="mt-4">
              <Link
                href={`/applications/${encodeURIComponent(String(x.id || ""))}`}
                className="inline-flex h-10 items-center justify-center rounded-xl bg-white px-4 text-sm font-semibold text-black hover:bg-white/90"
              >
                Відкрити
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* пагінація */}
      <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 p-4">
        <div className="text-sm text-white/70">
          Сторінка {currentPage} / {totalPages}
        </div>

        <div className="flex gap-2">
          <button
            className="h-10 rounded-xl border border-white/10 bg-white/10 px-4 text-sm text-white hover:bg-white/15 disabled:opacity-50"
            disabled={currentPage <= 1}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
          >
            ← Назад
          </button>

          <button
            className="h-10 rounded-xl border border-white/10 bg-white/10 px-4 text-sm text-white hover:bg-white/15 disabled:opacity-50"
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