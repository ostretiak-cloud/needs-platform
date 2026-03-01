// app/page.js

function formatUAH(v) {
  const n = Number(v || 0);
  return new Intl.NumberFormat("uk-UA").format(n) + " грн";
}

function statusLabel(s) {
  const x = String(s || "").toLowerCase();
  if (x === "published") return "опубліковано";
  if (x === "draft") return "чернетка";
  if (x === "archived") return "архів";
  return s || "—";
}

async function getNeeds() {
  // ВАЖЛИВО:
  // На сервері у Next.js найнадійніше ходити у ВЛАСНИЙ API через абсолютний URL.
  // Тому використовуємо VERCEL_URL (на проді) і localhost (локально).
  const host =
    process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : "http://localhost:3000";

  const res = await fetch(`${host}/api/needs`, { cache: "no-store" });
  if (!res.ok) return [];
  const data = await res.json();

  // нормалізуємо поле budget (у тебе може бути budget або budget_uah)
  return (Array.isArray(data) ? data : []).map((x) => ({
    ...x,
    budget_uah: x.budget_uah ?? x.budget ?? 0,
  }));
}

export default async function Home() {
  const all = await getNeeds();

  // На головній показуємо тільки published
  const published = all
    .filter((x) => String(x.status).toLowerCase() === "published")
    .sort((a, b) => Number(b.priority || 0) - Number(a.priority || 0));

  const top = published.slice(0, 6);

  return (
    <main>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="h-full w-full bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 opacity-60" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.12),transparent_45%),radial-gradient(circle_at_70%_30%,rgba(245,158,11,0.12),transparent_40%)]" />
        </div>

        <div className="relative mx-auto max-w-6xl px-4 py-14 md:py-20">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-7xl font-semibold tracking-tight">
              Потреби громад
            </h1>
            <p className="mt-4 text-white/70 text-base md:text-lg">
              Єдиний каталог потреб громад. Швидко знайдіть запит за категорією,
              громадою або ключовими словами.
            </p>

            {/* Пошук як у Spilnota */}
            <form
              action="/applications"
              method="GET"
              className="mt-8 flex w-full max-w-2xl items-center gap-2 rounded-2xl border border-white/10 bg-black/30 p-2 backdrop-blur"
            >
              <input
                name="q"
                placeholder="Пошук…"
                className="h-12 flex-1 rounded-xl bg-transparent px-4 text-white placeholder:text-white/40 outline-none"
              />
              <button
                type="submit"
                className="h-12 rounded-xl bg-amber-500 px-5 font-semibold text-black hover:bg-amber-400 transition"
              >
                Пошук
              </button>
            </form>

            {/* CTA */}
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="/applications"
                className="rounded-xl bg-white/10 px-4 py-2 text-sm text-white hover:bg-white/15 transition"
              >
                Перейти до каталогу →
              </a>
              <a
                href="/admin"
                className="rounded-xl bg-white/10 px-4 py-2 text-sm text-white hover:bg-white/15 transition"
              >
                Адмін-панель
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* BLOCK: ПОТРЕБИ */}
      <section className="mx-auto max-w-6xl px-4 py-10">
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-3xl md:text-4xl font-semibold">Потреби</h2>
          <a
            href="/applications"
            className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80 hover:bg-white/10 hover:text-white transition"
          >
            Дивитись все →
          </a>
        </div>

        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {top.length === 0 ? (
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-white/70">
              Поки немає опублікованих потреб (status=published).
            </div>
          ) : (
            top.map((x) => (
              <div
                key={x.id}
                className="overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-[0_20px_60px_-30px_rgba(0,0,0,0.8)]"
              >
                {/* “зображення” як у Spilnota (поки без реальних фото) */}
                <div className="relative aspect-[4/3] bg-gradient-to-br from-white/10 via-white/5 to-transparent">
                  <div className="absolute left-4 top-4 rounded-full bg-emerald-400 px-3 py-1 text-xs font-semibold text-black">
                    Відкрита
                  </div>

                  <div className="absolute bottom-3 left-4 right-4 text-white/70 text-xs">
                    {x.community || "—"} • {x.category || "—"}
                  </div>
                </div>

                <div className="p-5">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="text-lg font-semibold leading-snug">
                      {x.title || "Без назви"}
                    </h3>
                    <span className="shrink-0 rounded-full bg-white/10 px-3 py-1 text-xs text-white/80">
                      priority {x.priority ?? "—"}
                    </span>
                  </div>

                  <div className="mt-3 text-sm text-white/70 line-clamp-3">
                    {x.description || "—"}
                  </div>

                  <div className="mt-4 flex items-end justify-between gap-3">
                    <div>
                      <div className="text-xs text-white/50">Бюджет</div>
                      <div className="text-lg font-semibold">
                        {formatUAH(x.budget_uah)}
                      </div>
                      <div className="mt-1 text-xs text-white/50">
                        Статус: {statusLabel(x.status)}
                      </div>
                    </div>

                    <a
                      href={`/applications/${encodeURIComponent(x.id)}`}
                      className="rounded-xl bg-emerald-400 px-4 py-2 text-sm font-semibold text-black hover:bg-emerald-300 transition"
                    >
                      Детальніше
                    </a>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </section>
    </main>
  );
}