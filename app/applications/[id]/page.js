import Link from "next/link";
import { fetchNeeds } from "@/app/lib/needs";
import { getServerLanguage } from "@/app/lib/server-language";

export const dynamic = "force-dynamic";

function normId(v) { return String(v ?? "").trim().replace(/[\u2010\u2011\u2012\u2013\u2014\u2212]/g, "-").replace(/\s+/g, " ").toUpperCase(); }
function normStatus(v) { return String(v ?? "").trim().toLowerCase(); }
function formatMoneyUAH(n, language) {
  const num = Number(n);
  if (!Number.isFinite(num)) return "";
  return language === "en" ? `${num.toLocaleString("en-US")} UAH` : `${num.toLocaleString("uk-UA")} грн`;
}

const COPY = {
  uk: {
    back: "← Назад до каталогу", notFound: "Не знайшов запис за ID", notPublished: "Запис не опублікований",
    idUrl: "ID у URL (нормалізований):", count: "Скільки записів прийшло:", firstIds: "Перші 30 ID, які реально прийшли:", raw: "RAW params (після await):",
    id: "ID:", status: "Статус:", priority: "Пріоритет", description: "Опис", community: "Громада", category: "Категорія", budget: "Бюджет", updated: "Оновлено", contact: "Контактна особа",
  },
  en: {
    back: "← Back to catalog", notFound: "Record not found by ID", notPublished: "Record is not published",
    idUrl: "ID in URL (normalized):", count: "Received records:", firstIds: "First 30 received IDs:", raw: "RAW params (after await):",
    id: "ID:", status: "Status:", priority: "Priority", description: "Description", community: "Community", category: "Category", budget: "Budget", updated: "Updated", contact: "Contact person",
  },
};

export default async function ApplicationDetails(props) {
  const language = await getServerLanguage();
  const copy = COPY[language] ?? COPY.uk;
  const params = (await props?.params) || {};
  const wanted = normId(params.id);
  const needs = await fetchNeeds();
  const item = needs.find((x) => normId(x.id) === wanted);

  if (!item) {
    const ids = needs.map((x) => normId(x.id)).slice(0, 30);
    return <main className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-950 to-black text-white"><div className="mx-auto max-w-4xl px-4 py-12"><Link href="/applications" className="text-sm text-white/60 transition hover:text-white">{copy.back}</Link><h1 className="mt-6 text-3xl font-semibold">{copy.notFound}</h1><div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-5 text-sm"><div className="text-white/60">{copy.idUrl}</div><div className="mt-1 break-words font-mono">{wanted || "(empty)"}</div><div className="mt-4 text-white/60">{copy.count}</div><div className="mt-1 font-mono">{needs.length}</div><div className="mt-4 text-white/60">{copy.firstIds}</div><div className="mt-1 whitespace-pre-wrap break-words font-mono">{ids.join(", ")}</div><div className="mt-4 text-white/60">{copy.raw}</div><div className="mt-1 whitespace-pre-wrap break-words font-mono">{JSON.stringify(params)}</div></div></div></main>;
  }

  if (normStatus(item.status) !== "published") {
    return <main className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-950 to-black text-white"><div className="mx-auto max-w-4xl px-4 py-12"><Link href="/applications" className="text-sm text-white/60 transition hover:text-white">{copy.back}</Link><h1 className="mt-6 text-3xl font-semibold">{copy.notPublished}</h1><div className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-5 text-sm"><div className="text-white/60">{copy.id}</div><div className="mt-1 font-mono">{item.id}</div><div className="mt-4 text-white/60">{copy.status}</div><div className="mt-1 font-mono">{String(item.status)}</div></div></div></main>;
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-950 to-black text-white">
      <div className="mx-auto max-w-4xl px-4 py-12">
        <Link href="/applications" className="text-sm text-white/60 transition hover:text-white">{copy.back}</Link>
        <h1 className="mt-6 text-4xl font-semibold leading-tight">{item.title}</h1>
        <div className="mt-4 flex flex-wrap gap-2">
          <span className="rounded-full bg-white/10 px-4 py-1 text-sm">{copy.priority} {item.priority ?? "—"}</span>
          <span className="rounded-full bg-white/10 px-4 py-1 text-sm">{copy.status} {item.status ?? "—"}</span>
          <span className="rounded-full bg-white/10 px-4 py-1 text-sm">{copy.id} {item.id}</span>
        </div>
        <div className="mt-8 space-y-6">
          <div><div className="text-sm text-white/50">{copy.description}</div><p className="mt-2 text-lg leading-relaxed">{item.description || "—"}</p></div>
          <div className="grid grid-cols-1 gap-6 text-lg md:grid-cols-2">
            <div><div className="text-sm text-white/50">{copy.community}</div><div>{item.community || "—"}</div></div>
            <div><div className="text-sm text-white/50">{copy.category}</div><div>{item.category || "—"}</div></div>
            <div><div className="text-sm text-white/50">{copy.budget}</div><div className="text-2xl font-semibold">{formatMoneyUAH(item.budget_uah ?? item.budget, language)}</div></div>
            <div><div className="text-sm text-white/50">{copy.updated}</div><div>{item.updated_at ? new Date(item.updated_at).toLocaleDateString(language === "en" ? "en-US" : "uk-UA") : "—"}</div></div>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6"><div className="text-sm text-white/50">{copy.contact}</div><div className="mt-2 text-lg">{item.contact_name || "—"}</div><div className="text-white/70">{item.contact_email || "—"}</div></div>
        </div>
      </div>
    </main>
  );
}
