import Link from "next/link";
import HomeSearchBar from "@/components/HomeSearchBar";
import { fetchNeeds } from "@/app/lib/needs";

function norm(v) {
  return String(v ?? "").trim();
}
function normLower(v) {
  return norm(v).toLowerCase();
}
function isPublished(x) {
  return normLower(x?.status) === "published";
}
function safeTime(v) {
  const d = new Date(v);
  if (Number.isNaN(d.getTime())) return 0;
  return d.getTime();
}

function buildPopular(needs, topN = 6) {
  // групуємо по category+title і рахуємо повтори
  const map = new Map();

  for (const item of needs) {
    const title = norm(item?.title);
    const category = norm(item?.category);
    if (!title) continue;

    const key = `${category}||${title}`.toLowerCase();

    const prev = map.get(key);
    const updated = safeTime(item?.updated_at);

    if (!prev) {
      map.set(key, {
        title,
        category,
        count: 1,
        // представник (щоб можна було показати бюджет/опис якщо захочете)
        sample: item,
        newest: updated,
      });
    } else {
      prev.count += 1;
      if (updated > prev.newest) {
        prev.newest = updated;
        prev.sample = item;
      }
    }
  }

  const arr = Array.from(map.values());
  // спочатку по кількості, потім по “свіжості”
  arr.sort((a, b) => (b.count - a.count) || (b.newest - a.newest));
  return arr.slice(0, topN);
}

export default async function Home() {
  const all = await fetchNeeds();
  const published = all.filter(isPublished);

  const latest = [...published]
    .sort((a, b) => safeTime(b.updated_at) - safeTime(a.updated_at))
    .slice(0, 6);

  const popular = buildPopular(published, 6);

  return (
    <main className="min-h-screen bg-gradient-to-b from-black via-slate-950 to-slate-900">
      <section className="mx-auto max-w-6xl px-4 pt-10">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 md:p-10">
          <h1 className="text-3xl font-bold text-white md:text-4xl">єПотреба</h1>
          <p className="mt-3 max-w-2xl text-white/70">
            Єдиний каталог потреб громад. Публікуйте та знаходьте заявки за категоріями, громадами й пріоритетами.
          </p>

          <div className="mt-6">
            <HomeSearchBar />
          </div>

        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-16 pt-10 space-y-10">
        {/* ОСТАННІ */}
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
          <div className="flex items-end justify-between gap-4">
            <div>
              <h2 className="text-xl font-semibold text-white">Останні публікації потреб</h2>
              <p className="mt-1 text-sm text-white/60">
                Нові або оновлені заявки зі статусом <span className="text-white/80">published</span>.
              </p>
            </div>

            <Link href="/applications" prefetch className="text-sm font-semibold text-white/80 hover:text-white">
              Дивитись все →
            </Link>
          </div>

          <div className="mt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {latest.map((x) => (
              <div key={x.id} className="rounded-2xl border border-white/10 bg-black/20 p-4">
                <div className="text-xs text-white/60">{x.category || "—"}</div>
                <div className="mt-1 text-lg font-semibold text-white">{x.title || "Без назви"}</div>
                <div className="mt-2 text-sm text-white/70">
                  <span className="text-white/50">Громада:</span> {x.community || "—"}
                </div>

                <div className="mt-4">
                  <Link
                    href={`/applications/${encodeURIComponent(String(x.id || ""))}`}
                    prefetch
                    className="inline-flex h-10 items-center justify-center rounded-xl bg-white px-4 text-sm font-semibold text-black hover:bg-white/90"
                  >
                    Відкрити
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ПОПУЛЯРНІ */}
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
          <div>
            <h2 className="text-xl font-semibold text-white">Найпопулярніші потреби</h2>
            <p className="mt-1 text-sm text-white/60">
              Рахуємо як ті, що найчастіше повторюються у таблиці (за <span className="text-white/80">категорією + назвою</span>).
            </p>
          </div>

          <div className="mt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {popular.map((p) => {
              const qs = new URLSearchParams();
              if (p.category) qs.set("category", p.category);
              qs.set("q", p.title);
              const sampleId = p.sample?.id;
              const href = sampleId
                ? `/applications/${encodeURIComponent(String(sampleId))}`
                : `/applications?${qs.toString()}`;

              return (
                <div
                  key={`${p.category}||${p.title}`}
                  className="rounded-2xl border border-white/10 bg-black/20 p-4 hover:bg-black/30"
                >
                  <div className="text-xs text-white/60">{p.category || "—"}</div>
                  <div className="mt-1 text-lg font-semibold text-white">{p.title}</div>
                  <div className="mt-2 text-sm text-white/70">
                    🔥 Зустрічається: <span className="font-semibold text-white">{p.count}</span> разів
                  </div>

                  <div className="mt-4">
                    <Link
                      href={href}
                      prefetch
                      className="inline-flex h-10 items-center justify-center rounded-xl bg-white px-4 text-sm font-semibold text-black hover:bg-white/90"
                    >
                      Відкрити
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}
