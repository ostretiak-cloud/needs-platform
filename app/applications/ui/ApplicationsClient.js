"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

function norm(v) { return String(v ?? "").trim(); }
function normLower(v) { return norm(v).toLowerCase(); }
function normStatus(v) { return normLower(v); }
function safeDate(v) { const d = new Date(v); return Number.isNaN(d.getTime()) ? null : d; }
function cmpStr(a, b) { return String(a ?? "").localeCompare(String(b ?? ""), "uk-UA", { sensitivity: "base" }); }
function uniqueSorted(values) {
  const arr = Array.from(new Set(values.filter((x) => norm(x) !== "")));
  arr.sort((a, b) => cmpStr(a, b));
  return arr;
}

const COPY = {
  uk: {
    allCategories: "Всі категорії", allStatuses: "Всі статуси", allCommunities: "Всі громади", anyPriority: "Пріоритет (будь-який)",
    reset: "Скинути", searchPlaceholder: "Пошук… (ID, назва, опис, громада, категорія)",
    sortUpdated: "Сортування: новіші", sortBudgetDesc: "Бюджет: спадання", sortBudgetAsc: "Бюджет: зростання", sortPriority: "Пріоритет: високий", sortTitle: "Назва: А-Я",
    search: "Пошук", found: "Знайдено:", priorityMax: "5 (найвищий)", priorityMin: "1 (найнижчий)",
    priority: "Пріоритет", community: "Громада:", category: "Категорія:", budget: "Бюджет:", open: "Відкрити",
    page: "Сторінка", back: "← Назад", next: "Далі →",
  },
  en: {
    allCategories: "All categories", allStatuses: "All statuses", allCommunities: "All communities", anyPriority: "Priority (any)",
    reset: "Reset", searchPlaceholder: "Search… (ID, title, description, community, category)",
    sortUpdated: "Sort: newest", sortBudgetDesc: "Budget: high to low", sortBudgetAsc: "Budget: low to high", sortPriority: "Priority: high", sortTitle: "Title: A-Z",
    search: "Search", found: "Found:", priorityMax: "5 (highest)", priorityMin: "1 (lowest)",
    priority: "Priority", community: "Community:", category: "Category:", budget: "Budget:", open: "Open",
    page: "Page", back: "← Back", next: "Next →",
  },
};

export default function ApplicationsClient({ initialNeeds, language = "uk" }) {
  const copy = COPY[language] ?? COPY.uk;
  const needs = useMemo(() => (Array.isArray(initialNeeds) ? initialNeeds : []), [initialNeeds]);
  const money = (n) => {
    const num = Number(n);
    if (!Number.isFinite(num)) return "";
    return language === "en" ? `${num.toLocaleString("en-US")} UAH` : `${num.toLocaleString("uk-UA")} грн`;
  };

  const searchParams = useSearchParams();
  const [category, setCategory] = useState(searchParams?.get("category") ?? "");
  const [status, setStatus] = useState(searchParams?.get("status") ?? "");
  const [community, setCommunity] = useState(searchParams?.get("community") ?? "");
  const [priority, setPriority] = useState(searchParams?.get("priority") ?? "");
  const [q, setQ] = useState(searchParams?.get("q") ?? "");
  const [sort, setSort] = useState(searchParams?.get("sort") || "updated_desc");
  const [page, setPage] = useState(1);
  const pageSize = 6;

  const categories = useMemo(() => uniqueSorted(needs.map((x) => x.category)), [needs]);
  const communities = useMemo(() => uniqueSorted(needs.map((x) => x.community)), [needs]);
  const statuses = useMemo(() => {
    const raw = uniqueSorted(needs.map((x) => normStatus(x.status)));
    return raw.length ? raw : ["published", "draft"];
  }, [needs]);


  const filtered = useMemo(() => {
    const qq = normLower(q);
    const arr = needs.filter((x) => {
      if (category && norm(x.category) !== category) return false;
      if (community && norm(x.community) !== community) return false;
      if (status && normStatus(x.status) !== normStatus(status)) return false;
      if (priority && String(x.priority ?? "") !== String(priority)) return false;
      if (qq) {
        const hay = [x.id, x.title, x.description, x.community, x.category, x.status].map((v) => normLower(v)).join(" | ");
        if (!hay.includes(qq)) return false;
      }
      return true;
    });

    return [...arr].sort((a, b) => {
      if (sort === "updated_desc") return (safeDate(b.updated_at)?.getTime() ?? 0) - (safeDate(a.updated_at)?.getTime() ?? 0);
      if (sort === "budget_desc") return Number(b.budget_uah ?? b.budget ?? 0) - Number(a.budget_uah ?? a.budget ?? 0);
      if (sort === "budget_asc") return Number(a.budget_uah ?? a.budget ?? 0) - Number(b.budget_uah ?? b.budget ?? 0);
      if (sort === "priority_desc") return Number(b.priority ?? 0) - Number(a.priority ?? 0);
      if (sort === "title_asc") return cmpStr(a.title, b.title);
      return 0;
    });
  }, [needs, category, community, status, priority, q, sort]);

  const total = filtered.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const currentPage = Math.min(page, totalPages);
  const slice = useMemo(() => filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize), [filtered, currentPage]);

  return (
    <div className="space-y-6">
      <form onSubmit={(e) => e.preventDefault()} className="rounded-2xl border border-white/10 bg-white/5 p-4">
        <div className="grid gap-3 md:grid-cols-5">
          <select className="h-11 rounded-xl border border-white/10 bg-black/20 px-3 text-sm text-white" value={category} onChange={(e) => { setCategory(e.target.value); setPage(1); }}><option value="">{copy.allCategories}</option>{categories.map((c) => <option key={c} value={c}>{c}</option>)}</select>
          <select className="h-11 rounded-xl border border-white/10 bg-black/20 px-3 text-sm text-white" value={status} onChange={(e) => { setStatus(e.target.value); setPage(1); }}><option value="">{copy.allStatuses}</option>{statuses.map((s) => <option key={s} value={s}>{s}</option>)}</select>
          <select className="h-11 rounded-xl border border-white/10 bg-black/20 px-3 text-sm text-white" value={community} onChange={(e) => { setCommunity(e.target.value); setPage(1); }}><option value="">{copy.allCommunities}</option>{communities.map((c) => <option key={c} value={c}>{c}</option>)}</select>
          <select className="h-11 rounded-xl border border-white/10 bg-black/20 px-3 text-sm text-white" value={priority} onChange={(e) => { setPriority(e.target.value); setPage(1); }}>
            <option value="">{copy.anyPriority}</option><option value="5">{copy.priorityMax}</option><option value="4">4</option><option value="3">3</option><option value="2">2</option><option value="1">{copy.priorityMin}</option>
          </select>
          <button type="button" onClick={() => { setCategory(""); setStatus(""); setCommunity(""); setPriority(""); setQ(""); setSort("updated_desc"); setPage(1); }} className="h-11 rounded-xl border border-white/10 bg-white/10 px-3 text-sm text-white hover:bg-white/15">{copy.reset}</button>
        </div>

        <div className="mt-3 grid gap-3 md:grid-cols-3">
          <input className="h-11 rounded-xl border border-white/10 bg-black/20 px-3 text-sm text-white placeholder:text-white/40" value={q} onChange={(e) => setQ(e.target.value)} placeholder={copy.searchPlaceholder} />
          <select className="h-11 rounded-xl border border-white/10 bg-black/20 px-3 text-sm text-white" value={sort} onChange={(e) => { setSort(e.target.value); setPage(1); }}>
            <option value="updated_desc">{copy.sortUpdated}</option><option value="budget_desc">{copy.sortBudgetDesc}</option><option value="budget_asc">{copy.sortBudgetAsc}</option><option value="priority_desc">{copy.sortPriority}</option><option value="title_asc">{copy.sortTitle}</option>
          </select>
          <button type="submit" className="h-11 rounded-xl bg-white px-4 text-sm font-semibold text-black hover:bg-white/90">{copy.search}</button>
        </div>
        <div className="mt-3 text-sm text-white/70">{copy.found} {total}</div>
      </form>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {slice.map((x) => (
          <div key={x.id} className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <div className="mb-2 flex items-center justify-between"><div className="text-xs text-white/60">{normStatus(x.status) || "—"}</div><div className="text-xs text-white/60">{copy.priority} {x.priority ?? "—"}</div></div>
            <h2 className="text-lg font-semibold text-white">{x.title}</h2>
            <p className="mt-2 line-clamp-3 text-sm text-white/75">{x.description || "—"}</p>
            <div className="mt-3 space-y-1 text-sm text-white/75">
              <div><span className="text-white/50">{copy.community}</span> {x.community || "—"}</div>
              <div><span className="text-white/50">{copy.category}</span> {x.category || "—"}</div>
              <div><span className="text-white/50">{copy.budget}</span> {money(x.budget_uah ?? x.budget) || "—"}</div>
            </div>
            <div className="mt-4"><Link href={`/applications/${encodeURIComponent(String(x.id || ""))}`} className="inline-flex h-10 items-center justify-center rounded-xl bg-white px-4 text-sm font-semibold text-black hover:bg-white/90">{copy.open}</Link></div>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 p-4">
        <div className="text-sm text-white/70">{copy.page} {currentPage} / {totalPages}</div>
        <div className="flex gap-2">
          <button className="h-10 rounded-xl border border-white/10 bg-white/10 px-4 text-sm text-white hover:bg-white/15 disabled:opacity-50" disabled={currentPage <= 1} onClick={() => setPage((p) => Math.max(1, p - 1))}>{copy.back}</button>
          <button className="h-10 rounded-xl border border-white/10 bg-white/10 px-4 text-sm text-white hover:bg-white/15 disabled:opacity-50" disabled={currentPage >= totalPages} onClick={() => setPage((p) => Math.min(totalPages, p + 1))}>{copy.next}</button>
        </div>
      </div>
    </div>
  );
}
