// app/applications/[id]/page.js
import Link from "next/link";
import { fetchNeeds } from "@/app/lib/needs";

export const dynamic = "force-dynamic";

function normId(v) {
  return String(v ?? "")
    .trim()
    .replace(/[\u2010\u2011\u2012\u2013\u2014\u2212]/g, "-")
    .replace(/\s+/g, " ")
    .toUpperCase();
}

function normStatus(v) {
  return String(v ?? "").trim().toLowerCase();
}

function formatMoneyUAH(n) {
  const num = Number(n);
  if (!Number.isFinite(num)) return "";
  return num.toLocaleString("uk-UA") + " грн";
}

export default async function ApplicationDetails(props) {
  // ✅ Next може передавати params як Promise → треба await
  const params = (await props?.params) || {};
  const wanted = normId(params.id);

  const needs = await fetchNeeds();
  const item = needs.find((x) => normId(x.id) === wanted);

  // якщо не знайшло — показуємо діагностику
  if (!item) {
    const ids = needs.map((x) => normId(x.id)).slice(0, 30);
    return (
      <main className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-950 to-black text-white">
        <div className="mx-auto max-w-4xl px-4 py-12">
          <Link href="/applications" className="text-sm text-white/60 hover:text-white transition">
            ← Назад до каталогу
          </Link>

          <h1 className="mt-6 text-3xl font-semibold">Не знайшов запис за ID</h1>

          <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-5 text-sm">
            <div className="text-white/60">ID у URL (нормалізований):</div>
            <div className="mt-1 font-mono break-words">{wanted || "(порожньо)"}</div>

            <div className="mt-4 text-white/60">Скільки записів прийшло:</div>
            <div className="mt-1 font-mono">{needs.length}</div>

            <div className="mt-4 text-white/60">Перші 30 ID, які реально прийшли:</div>
            <div className="mt-1 font-mono whitespace-pre-wrap break-words">{ids.join(", ")}</div>

            <div className="mt-4 text-white/60">RAW params (після await):</div>
            <div className="mt-1 font-mono whitespace-pre-wrap break-words">
              {JSON.stringify(params)}
            </div>
          </div>
        </div>
      </main>
    );
  }

  // статус
  const st = normStatus(item.status);
  if (st !== "published") {
    return (
      <main className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-950 to-black text-white">
        <div className="mx-auto max-w-4xl px-4 py-12">
          <Link href="/applications" className="text-sm text-white/60 hover:text-white transition">
            ← Назад до каталогу
          </Link>

          <h1 className="mt-6 text-3xl font-semibold">Запис не опублікований</h1>
          <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-5 text-sm">
            <div className="text-white/60">ID:</div>
            <div className="mt-1 font-mono">{item.id}</div>

            <div className="mt-4 text-white/60">Статус:</div>
            <div className="mt-1 font-mono">{String(item.status)}</div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-950 to-black text-white">
      <div className="mx-auto max-w-4xl px-4 py-12">
        <Link href="/applications" className="text-sm text-white/60 hover:text-white transition">
          ← Назад до каталогу
        </Link>

        <h1 className="mt-6 text-4xl font-semibold leading-tight">{item.title}</h1>

        <div className="mt-4 flex flex-wrap gap-2">
          <span className="rounded-full bg-white/10 px-4 py-1 text-sm">
            Пріоритет {item.priority ?? "—"}
          </span>
          <span className="rounded-full bg-white/10 px-4 py-1 text-sm">
            Статус: {item.status ?? "—"}
          </span>
          <span className="rounded-full bg-white/10 px-4 py-1 text-sm">ID: {item.id}</span>
        </div>

        <div className="mt-8 space-y-6">
          <div>
            <div className="text-white/50 text-sm">Опис</div>
            <p className="mt-2 text-lg leading-relaxed">{item.description || "—"}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-lg">
            <div>
              <div className="text-white/50 text-sm">Громада</div>
              <div>{item.community || "—"}</div>
            </div>

            <div>
              <div className="text-white/50 text-sm">Категорія</div>
              <div>{item.category || "—"}</div>
            </div>

            <div>
              <div className="text-white/50 text-sm">Бюджет</div>
              <div className="text-2xl font-semibold">
                {formatMoneyUAH(item.budget_uah ?? item.budget)}
              </div>
            </div>

            <div>
              <div className="text-white/50 text-sm">Оновлено</div>
              <div>
                {item.updated_at ? new Date(item.updated_at).toLocaleDateString("uk-UA") : "—"}
              </div>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
            <div className="text-white/50 text-sm">Контактна особа</div>
            <div className="mt-2 text-lg">{item.contact_name || "—"}</div>
            <div className="text-white/70">{item.contact_email || "—"}</div>
          </div>
        </div>
      </div>
    </main>
  );
}