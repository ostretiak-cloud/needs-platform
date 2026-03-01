// app/page.js
import Link from "next/link";

export const dynamic = "force-dynamic";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-black via-slate-950 to-slate-950 text-white">
      <div className="mx-auto max-w-6xl px-4 py-14">
        {/* HERO */}
        <div className="rounded-3xl border border-white/10 bg-white/5 p-8 md:p-12 shadow-[0_0_80px_rgba(0,0,0,0.45)]">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm text-white/80">
              Платформа “Потреби громад”
            </div>

            <h1 className="mt-6 text-4xl md:text-6xl font-semibold tracking-tight">
              Каталог потреб громад Харківщини
            </h1>

            <p className="mt-4 text-white/70 text-base md:text-lg">
              Публічний каталог потреб + сторінка заявок із фільтрами, пошуком та деталями.
            </p>

            {/* CTA buttons */}
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <Link
                href="/applications"
                className="inline-flex items-center justify-center rounded-2xl bg-orange-500 hover:bg-orange-400 text-black font-semibold px-6 py-4 transition"
              >
                Відкрити каталог / заявки
              </Link>

              <Link
                href="/admin"
                className="inline-flex items-center justify-center rounded-2xl bg-white/10 hover:bg-white/15 border border-white/10 text-white font-semibold px-6 py-4 transition"
              >
                Адмінка (керування потребами)
              </Link>
            </div>

            <div className="mt-4 text-sm text-white/50">
              Публічна сторінка: <span className="text-white/70">/applications</span> •
              Адмінка: <span className="text-white/70">/admin</span>
            </div>
          </div>
        </div>

        {/* SECTIONS */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <div className="text-lg font-semibold">Каталог</div>
            <div className="mt-2 text-white/70 text-sm">
              Публічний перегляд усіх опублікованих потреб з фільтрами та пошуком.
            </div>
            <Link
              href="/applications"
              className="mt-4 inline-flex text-sm font-semibold text-emerald-300 hover:text-emerald-200"
            >
              Перейти → 
            </Link>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <div className="text-lg font-semibold">Деталі заявки</div>
            <div className="mt-2 text-white/70 text-sm">
              Детальна сторінка кожної потреби: опис, бюджет, контакти, оновлення.
            </div>
            <Link
              href="/applications/NEED-0001"
              className="mt-4 inline-flex text-sm font-semibold text-emerald-300 hover:text-emerald-200"
            >
              Приклад (NEED-0001) → 
            </Link>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <div className="text-lg font-semibold">Адміністрування</div>
            <div className="mt-2 text-white/70 text-sm">
              Додавання/редагування/публікація потреб через Google Sheet / Apps Script.
            </div>
            <Link
              href="/admin"
              className="mt-4 inline-flex text-sm font-semibold text-emerald-300 hover:text-emerald-200"
            >
              Перейти → 
            </Link>
          </div>
        </div>

        {/* FOOTER */}
        <div className="mt-12 text-center text-xs text-white/40">
          Needs Platform • Kharkiv OVA
        </div>
      </div>
    </main>
  );
}