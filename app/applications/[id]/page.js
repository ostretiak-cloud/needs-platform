// app/applications/[id]/page.js
import Link from "next/link";

export const dynamic = "force-dynamic";

async function getNeeds() {
  // Працює і на Vercel production, і на preview
  const base =
    process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000";

  const res = await fetch(`${base}/api/needs`, { cache: "no-store" });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Failed to load needs: ${res.status}. ${text}`);
  }

  const data = await res.json();

  // На випадок, якщо колись API поверне не масив, а { data: [...] }
  if (Array.isArray(data)) return data;
  if (data && Array.isArray(data.data)) return data.data;

  return [];
}

function formatMoneyUAH(n) {
  const num = Number(n);
  if (!Number.isFinite(num)) return "";
  return num.toLocaleString("uk-UA") + " грн";
}

export default async function ApplicationDetails({ params }) {
  const id = params?.id;
  const needs = await getNeeds();

  const ids = needs.map((x) => String(x.id));
  const item = needs.find((x) => String(x.id) === String(id));

  // ✅ Замість 404 — показуємо діагностику
  if (!item) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-950 to-black text-white">
        <div className="mx-auto max-w-3xl px-4 py-12">
          <Link href="/applications" className="text-sm text-white/60 hover:text-white transition">
            ← Назад до каталогу
          </Link>

          <h1 className="mt-6 text-3xl font-semibold">Не знайдено запис</h1>

          <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-5 text-sm">
            <div className="text-white/60">Запитаний ID:</div>
            <div className="mt-1 font-mono">{String(id)}</div>

            <div className="mt-4 text-white/60">Скільки записів прийшло з API:</div>
            <div className="mt-1 font-mono">{needs.length}</div>

            <div className="mt-4 text-white/60">Перші 20 ID з API:</div>
            <div className="mt-1 font-mono whitespace-pre-wrap break-words">
              {ids.slice(0, 20).join(", ")}
            </div>

            <div className="mt-4 text-white/60">Підказка:</div>
            <div className="mt-1 text-white/80">
              Якщо тут немає NEED-0001 — значить /api/needs повертає інші дані або інший аркуш/таблицю.
            </div>
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
              <div className="text-2xl font-semibold">{formatMoneyUAH(item.budget)}</div>
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