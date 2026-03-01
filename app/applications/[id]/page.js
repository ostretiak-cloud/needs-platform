// app/applications/[id]/page.js
import { notFound } from "next/navigation";
import Link from "next/link";
import { fetchNeeds } from "@/app/lib/needs";

export const dynamic = "force-dynamic";

function formatMoneyUAH(n) {
  const num = Number(n);
  if (!Number.isFinite(num)) return "";
  return num.toLocaleString("uk-UA") + " грн";
}

export default async function ApplicationDetails({ params }) {
  const id = params?.id;

  const needs = await fetchNeeds();
  const item = needs.find((x) => String(x.id) === String(id));

  if (!item) return notFound();
  if (String(item.status).toLowerCase() !== "published") return notFound();

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
                {formatMoneyUAH(item.budget_uah)}
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