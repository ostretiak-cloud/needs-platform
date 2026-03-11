import Link from "next/link";
import HomeSearchBar from "@/components/HomeSearchBar";
import { fetchNeeds } from "@/app/lib/needs";
import { getServerLanguage } from "@/app/lib/server-language";

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
  const map = new Map();
  for (const item of needs) {
    const title = norm(item?.title);
    const category = norm(item?.category);
    if (!title) continue;
    const key = `${category}||${title}`.toLowerCase();
    const prev = map.get(key);
    const updated = safeTime(item?.updated_at);
    if (!prev) map.set(key, { title, category, count: 1, sample: item, newest: updated });
    else {
      prev.count += 1;
      if (updated > prev.newest) {
        prev.newest = updated;
        prev.sample = item;
      }
    }
  }
  return Array.from(map.values()).sort((a, b) => (b.count - a.count) || (b.newest - a.newest)).slice(0, topN);
}

const COPY = {
  uk: {
    subtitle: "Єдиний каталог потреб громад. Публікуйте та знаходьте заявки за категоріями, громадами й пріоритетами.",
    latestTitle: "Останні публікації потреб",
    latestText: "Нові або оновлені заявки зі статусом",
    viewAll: "Дивитись все →",
    open: "Відкрити",
    community: "Громада:",
    untitled: "Без назви",
    popularTitle: "Найпопулярніші потреби",
    popularText: "Рахуємо як ті, що найчастіше повторюються у таблиці (за",
    popularMeta: "категорією + назвою",
    appears: "🔥 Зустрічається:",
    times: "разів",
  },
  en: {
    subtitle: "Unified catalog of community needs. Publish and find requests by categories, communities, and priority.",
    latestTitle: "Latest published needs",
    latestText: "New or updated requests with status",
    viewAll: "View all →",
    open: "Open",
    community: "Community:",
    untitled: "Untitled",
    popularTitle: "Most popular needs",
    popularText: "Calculated as the needs repeated most frequently in the table (by",
    popularMeta: "category + title",
    appears: "🔥 Appears:",
    times: "times",
  },
};

export default async function Home() {
  const language = await getServerLanguage();
  const copy = COPY[language] ?? COPY.uk;
  const all = await fetchNeeds();
  const published = all.filter(isPublished);
  const latest = [...published].sort((a, b) => safeTime(b.updated_at) - safeTime(a.updated_at)).slice(0, 6);
  const popular = buildPopular(published, 6);

  return (
    <main className="min-h-screen bg-gradient-to-b from-black via-slate-950 to-slate-900">
      <section className="mx-auto max-w-6xl px-4 pt-10">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 md:p-10">
          <h1 className="text-3xl font-bold text-white md:text-4xl">єПотреба</h1>
          <p className="mt-3 max-w-2xl text-white/70">{copy.subtitle}</p>
          <div className="mt-6"><HomeSearchBar language={language} /></div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl space-y-10 px-4 pb-16 pt-10">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
          <div className="flex items-end justify-between gap-4">
            <div>
              <h2 className="text-xl font-semibold text-white">{copy.latestTitle}</h2>
              <p className="mt-1 text-sm text-white/60">{copy.latestText} <span className="text-white/80">published</span>.</p>
            </div>
            <Link href="/applications" prefetch className="text-sm font-semibold text-white/80 hover:text-white">{copy.viewAll}</Link>
          </div>

          <div className="mt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {latest.map((x) => (
              <div key={x.id} className="rounded-2xl border border-white/10 bg-black/20 p-4">
                <div className="text-xs text-white/60">{x.category || "—"}</div>
                <div className="mt-1 text-lg font-semibold text-white">{x.title || copy.untitled}</div>
                <div className="mt-2 text-sm text-white/70"><span className="text-white/50">{copy.community}</span> {x.community || "—"}</div>
                <div className="mt-4">
                  <Link href={`/applications/${encodeURIComponent(String(x.id || ""))}`} prefetch className="inline-flex h-10 items-center justify-center rounded-xl bg-white px-4 text-sm font-semibold text-black hover:bg-white/90">{copy.open}</Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
          <h2 className="text-xl font-semibold text-white">{copy.popularTitle}</h2>
          <p className="mt-1 text-sm text-white/60">{copy.popularText} <span className="text-white/80">{copy.popularMeta}</span>).</p>
          <div className="mt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {popular.map((p) => {
              const qs = new URLSearchParams();
              if (p.category) qs.set("category", p.category);
              qs.set("q", p.title);
              return (
                <Link key={`${p.category}||${p.title}`} href={`/applications?${qs.toString()}`} prefetch className="group rounded-2xl border border-white/10 bg-black/20 p-4 hover:bg-black/30">
                  <div className="text-xs text-white/60">{p.category || "—"}</div>
                  <div className="mt-1 text-lg font-semibold text-white group-hover:text-white/90">{p.title}</div>
                  <div className="mt-2 text-sm text-white/70">{copy.appears} <span className="font-semibold text-white">{p.count}</span> {copy.times}</div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}
