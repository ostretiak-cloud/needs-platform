// app/page.js
"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

function pickImageUrl(item) {
  // Підхоплюємо різні можливі назви колонок з Google Sheets / Apps Script
  return (
    item?.imageUrl ||
    item?.image ||
    item?.photo ||
    item?.cover ||
    item?.coverUrl ||
    item?.img ||
    item?.imgUrl ||
    ""
  );
}

function isPublished(item) {
  const s = String(item?.status || item?.state || "").toLowerCase();
  return s === "published" || s === "опубліковано" || s === "опублікована" || s === "опублікована заявка";
}

export default function Home() {
  const [query, setQuery] = useState("");
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // Беремо дані з твого існуючого API (він вже працює, бо /applications працює)
  useEffect(() => {
    let cancelled = false;

    async function run() {
      try {
        setLoading(true);
        const res = await fetch("/api/applications", { cache: "no-store" });
        const data = await res.json();

        // Підтримуємо обидва варіанти: або масив, або {items:[...]}
        const list = Array.isArray(data) ? data : data?.items || [];
        if (!cancelled) setItems(list);
      } catch (e) {
        if (!cancelled) setItems([]);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    run();
    return () => {
      cancelled = true;
    };
  }, []);

  const published = useMemo(() => items.filter(isPublished), [items]);

  const filteredPublished = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return published;
    return published.filter((x) => {
      const t = `${x?.title || ""} ${x?.community || ""} ${x?.category || ""} ${x?.description || ""}`.toLowerCase();
      return t.includes(q);
    });
  }, [published, query]);

  const preview = filteredPublished.slice(0, 6);

  return (
    <main className="min-h-screen">
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-slate-950 to-slate-900" />
        <div className="absolute inset-0 opacity-30 [background:radial-gradient(60%_60%_at_50%_20%,rgba(255,140,0,0.25),transparent_60%)]" />

        <div className="relative mx-auto max-w-6xl px-4 py-20">
          <h1 className="text-5xl font-extrabold tracking-tight md:text-6xl">
            єПотреба
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-white/70">
            Єдиний каталог потреб громад. Публікуйте та знаходьте заявки за категоріями, громадами й пріоритетами.
          </p>

          {/* Пошук на головній (фільтрує published тут + може вести в каталог) */}
          <div className="mt-8 w-full max-w-2xl rounded-2xl border border-white/10 bg-white/5 p-2 backdrop-blur">
            <div className="flex items-center gap-2">
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Пошук опублікованих заявок…"
                className="h-11 flex-1 rounded-xl bg-transparent px-3 text-sm text-white placeholder:text-white/40 outline-none"
              />
              <Link
                href={`/applications${query.trim() ? `?q=${encodeURIComponent(query.trim())}` : ""}`}
                className="grid h-11 place-items-center rounded-xl bg-orange-500 px-5 text-sm font-semibold text-black hover:bg-orange-400"
              >
                У каталог
              </Link>
            </div>
          </div>

          <div className="mt-5 flex flex-wrap gap-3">
            <Link
              href="/applications"
              className="rounded-xl bg-white/10 px-4 py-2 text-sm text-white hover:bg-white/15"
            >
              Перейти до каталогу →
            </Link>
            <Link
              href="/about"
              className="rounded-xl px-4 py-2 text-sm text-white/70 hover:bg-white/10 hover:text-white"
            >
              Про проєкт
            </Link>
          </div>
        </div>
      </section>

      {/* PREVIEW published */}
      <section className="mx-auto max-w-6xl px-4 py-12">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="text-2xl font-bold">Опубліковані заявки</h2>
            <p className="mt-1 text-sm text-white/60">
              {loading ? "Завантаження…" : `Знайдено: ${filteredPublished.length}`}
            </p>
          </div>

          <Link
            href="/applications"
            className="rounded-xl bg-white/10 px-4 py-2 text-sm text-white hover:bg-white/15"
          >
            Дивитись все →
          </Link>
        </div>

        {/* Стан: loading/empty */}
        {loading ? (
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {[1, 2, 3].map((k) => (
              <div key={k} className="h-72 rounded-2xl border border-white/10 bg-white/5 animate-pulse" />
            ))}
          </div>
        ) : preview.length === 0 ? (
          <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-6 text-white/70">
            Немає опублікованих заявок за вашим пошуком. Спробуйте інші ключові слова або відкрийте каталог.
          </div>
        ) : (
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {preview.map((item) => {
              // ВАЖЛИВО: тут має бути реальний id з API. Саме тому "Відкрити" тепер працюватиме.
              const id = item?.id || item?._id || item?.rowId || item?.uuid;
              const img = pickImageUrl(item);

              return (
                <article
                  key={String(id)}
                  className="overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-[0_0_0_1px_rgba(255,255,255,0.03)]"
                >
                  {/* Image */}
                  <div className="relative h-40 w-full bg-black/30">
                    {img ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={img}
                        alt={item?.title || "Заявка"}
                        className="h-full w-full object-cover"
                        onError={(e) => {
                          e.currentTarget.style.display = "none";
                        }}
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-sm text-white/40">
                        Немає зображення
                      </div>
                    )}

                    {item?.priority ? (
                      <div className="absolute right-3 top-3 rounded-full bg-black/60 px-3 py-1 text-xs text-white">
                        priority {item.priority}
                      </div>
                    ) : null}
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <h3 className="line-clamp-2 text-base font-semibold text-white">
                      {item?.title || "Без назви"}
                    </h3>

                    <div className="mt-3 space-y-2 text-sm">
                      <div className="flex items-center justify-between gap-3">
                        <span className="text-white/50">Громада</span>
                        <span className="text-white/85 line-clamp-1">
                          {item?.community || item?.hromada || "—"}
                        </span>
                      </div>

                      <div className="flex items-center justify-between gap-3">
                        <span className="text-white/50">Бюджет</span>
                        <span className="text-white/85">
                          {item?.budget || item?.amount || "—"}
                        </span>
                      </div>

                      <div className="flex items-center justify-between gap-3">
                        <span className="text-white/50">Категорія</span>
                        <span className="text-white/85 line-clamp-1">
                          {item?.category || "—"}
                        </span>
                      </div>
                    </div>

                    <div className="mt-5 flex justify-end">
                      <Link
                        href={id ? `/applications/${id}` : "/applications"}
                        className="rounded-xl bg-emerald-400 px-4 py-2 text-sm font-semibold text-black hover:bg-emerald-300"
                      >
                        Відкрити
                      </Link>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>
    </main>
  );
}