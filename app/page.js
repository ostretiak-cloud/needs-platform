import Link from "next/link";

const publishedDemo = [
  {
    id: "1",
    title: "Генератор 30 кВт для лікарні",
    community: "Купʼянська ТГ",
    budget: "450 000 грн",
    status: "published",
    priority: 5,
  },
  {
    id: "2",
    title: "Ноутбуки для ЦНАП",
    community: "Ізюмська ТГ",
    budget: "320 000 грн",
    status: "published",
    priority: 4,
  },
];

export default function Home() {
  return (
    <main className="min-h-screen">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-slate-950 to-slate-900" />
        <div className="absolute inset-0 opacity-30 [background:radial-gradient(60%_60%_at_50%_20%,rgba(255,140,0,0.25),transparent_60%)]" />

        <div className="relative mx-auto max-w-6xl px-4 py-20">
          <h1 className="text-5xl font-extrabold tracking-tight md:text-6xl">
            Потреби громад
          </h1>

          <p className="mt-4 max-w-2xl text-lg text-white/70">
            Єдиний каталог потреб громад. Швидко знаходьте заявки за категорією,
            громадою та ключовими словами.
          </p>

          <div className="mt-8 flex w-full max-w-2xl items-center gap-2 rounded-2xl border border-white/10 bg-white/5 p-2 backdrop-blur">
            <input
              placeholder="Пошук…"
              className="h-11 flex-1 rounded-xl bg-transparent px-3 text-sm text-white placeholder:text-white/40 outline-none"
            />
            <Link
              href="/applications"
              className="grid h-11 place-items-center rounded-xl bg-orange-500 px-5 text-sm font-semibold text-black hover:bg-orange-400"
            >
              Пошук
            </Link>
          </div>

          <div className="mt-5 flex gap-3">
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

      <section className="mx-auto max-w-6xl px-4 py-12">
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-2xl font-bold">Опубліковані заявки</h2>
          <Link
            href="/applications"
            className="rounded-xl bg-white/10 px-4 py-2 text-sm text-white hover:bg-white/15"
          >
            Дивитись все →
          </Link>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {publishedDemo.map((item) => (
            <div
              key={item.id}
              className="rounded-2xl border border-white/10 bg-white/5 p-5"
            >
              <div className="flex items-start justify-between gap-3">
                <h3 className="text-lg font-semibold">{item.title}</h3>
                <span className="rounded-full bg-white/10 px-3 py-1 text-xs text-white/70">
                  priority {item.priority}
                </span>
              </div>

              <div className="mt-4 text-sm text-white/70">
                {item.community} • {item.budget}
              </div>

              <div className="mt-5 flex justify-end">
                <Link
                  href={`/applications/${item.id}`}
                  className="rounded-xl bg-emerald-400 px-4 py-2 text-sm font-semibold text-black hover:bg-emerald-300"
                >
                  Відкрити
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}