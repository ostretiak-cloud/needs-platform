import { useMemo, useState, useEffect } from "react";

const needsDemo = [
  {
    id: "n1",
    title: "Генератор 15 кВт",
    community: "Територіальна громада",
    budgetUAH: 70000,
    status: "Потреба в каталозі",
    category: "Енергозабезпечення",
    qty: 1,
    justification:
      "Потрібен для резервного живлення критичної інфраструктури під час відключень електроенергії.",
    contact: "info@kharkiv-digital.gov.ua",
    updatedAt: "2026-02-28",
  },
  {
    id: "n2",
    title: "Ноутбуки для ЦНАП",
    community: "Територіальна громада",
    budgetUAH: 50000,
    status: "Потреба в каталозі",
    category: "Цифровізація / ЦНАП",
    qty: 5,
    justification:
      "Оновлення робочих місць адміністраторів для стабільного надання послуг та роботи реєстрів.",
    contact: "info@kharkiv-digital.gov.ua",
    updatedAt: "2026-02-28",
  },
  {
    id: "n3",
    title: "Сонячна панель",
    community: "Територіальна громада",
    budgetUAH: 100000,
    status: "Потреба в каталозі",
    category: "Енергонезалежність",
    qty: 1,
    justification:
      "Для часткового покриття енергоспоживання критичних точок доступу та зменшення навантаження на генератори.",
    contact: "info@kharkiv-digital.gov.ua",
    updatedAt: "2026-02-28",
  },
];

const STATUS_OPTIONS = ["Усі", "Потреба в каталозі", "На верифікації", "Підтримано", "Закрито"];

export default function Home() {
  // якщо захочеш увімкнути реальні дані — постав тут true і додай /api/needs
  const USE_API = false;

  const [items, setItems] = useState(needsDemo);
  const [q, setQ] = useState("");
  const [status, setStatus] = useState("Усі");
  const [sort, setSort] = useState("newest"); // newest | budgetAsc | budgetDesc
  const [active, setActive] = useState(null);

  useEffect(() => {
    if (!USE_API) return;

    let ignore = false;
    (async () => {
      try {
        const res = await fetch("/api/needs");
        const data = await res.json();
        if (!ignore) setItems(Array.isArray(data) ? data : []);
      } catch (e) {
        // у демо не ламаємо UI
        if (!ignore) setItems(needsDemo);
      }
    })();

    return () => {
      ignore = true;
    };
  }, [USE_API]);

  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();

    let out = items.filter((n) => {
      const okStatus = status === "Усі" ? true : n.status === status;
      const okQuery = !query
        ? true
        : [n.title, n.community, n.category, n.status].some((x) =>
            String(x || "").toLowerCase().includes(query)
          );
      return okStatus && okQuery;
    });

    if (sort === "budgetAsc") out = out.sort((a, b) => (a.budgetUAH || 0) - (b.budgetUAH || 0));
    if (sort === "budgetDesc") out = out.sort((a, b) => (b.budgetUAH || 0) - (a.budgetUAH || 0));
    if (sort === "newest")
      out = out.sort((a, b) => new Date(b.updatedAt || 0) - new Date(a.updatedAt || 0));

    return out;
  }, [items, q, status, sort]);

  return (
    <main className="min-h-screen bg-gradient-to-b from-black via-slate-950 to-slate-900 text-white">
      {/* Top */}
      <header className="px-6 pt-10">
        <div className="mx-auto max-w-6xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-2xl bg-white/10 border border-white/10 flex items-center justify-center">
              <span className="text-lg">🏛️</span>
            </div>
            <div className="leading-tight">
              <div className="font-semibold">Єдина цифрова платформа потреб громад</div>
              <div className="text-xs text-white/60">Пілотний проєкт • Харківська область</div>
            </div>
          </div>

          <a
            href="#contacts"
            className="rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold hover:bg-emerald-500 transition"
          >
            Стати партнером
          </a>
        </div>
      </header>

      {/* Hero */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-6xl grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
              Прозора вітрина потреб громад <span className="text-emerald-400">в одному місці</span>
            </h1>
            <p className="mt-5 text-lg text-white/70">
              Єдиний електронний майданчик для централізованого збору та моніторингу потреб,
              усунення дублювання, пріоритезації та ефективного залучення донорської й інвестиційної підтримки.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#catalog"
                className="rounded-xl bg-white/10 border border-white/10 px-5 py-3 font-semibold hover:bg-white/15 transition"
              >
                Переглянути потреби
              </a>
              <a
                href="#how"
                className="rounded-xl bg-emerald-600 px-5 py-3 font-semibold hover:bg-emerald-500 transition"
              >
                Як це працює
              </a>
            </div>

            <div className="mt-8 grid sm:grid-cols-3 gap-4">
              <Stat title="Централізація" text="Єдиний реєстр потреб" />
              <Stat title="Верифікація" text="Модерація/перевірка" />
              <Stat title="Прозорість" text="Статуси та звітність" />
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <div className="text-sm text-white/60 mb-3">Ключова мета</div>
            <div className="text-xl font-semibold">
              Створення єдиного електронного майданчика для прозорого розміщення потреб громад та ефективного залучення підтримки.
            </div>

            <div className="mt-6 grid gap-3">
              <MiniPoint>Єдина точка входу для міжнародних партнерів</MiniPoint>
              <MiniPoint>Автоматизований принцип «потреба — донор»</MiniPoint>
              <MiniPoint>Пріоритезація та усунення дублювання</MiniPoint>
            </div>

            <div className="mt-6 rounded-2xl bg-black/30 border border-white/10 p-4 text-sm text-white/70">
              * Демо-режим: нижче вже є пошук/фільтри. Далі підключимо реальний каталог (Sheets/БД).
            </div>
          </div>
        </div>
      </section>

      {/* Advantages */}
      <section className="px-6 py-14 bg-black/20">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold">Переваги</h2>
          <div className="mt-8 grid md:grid-cols-2 gap-6">
            <Card title="Централізований збір і моніторинг потреб">
              Єдиний реєстр потреб громад області для прозорого обліку та аналізу.
            </Card>
            <Card title="Усунення дублювання та пріоритезація">
              Стандартизована форма, перевірка та пріоритети за критеріями.
            </Card>
            <Card title="Автоматизований принцип «потреба — донор»">
              Підбір потреб під профіль підтримки, бюджет та тематику.
            </Card>
            <Card title="Єдина точка входу для партнерів">
              Зручний онлайн-доступ до актуальних потреб та статусів.
            </Card>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="px-6 py-14">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold">Як це працює</h2>
          <div className="mt-8 grid md:grid-cols-4 gap-5">
            <Step n="1" title="Подання потреби">
              Громада заповнює стандартну форму: опис, кількість, бюджет, обґрунтування.
            </Step>
            <Step n="2" title="Верифікація">
              Перевірка та уточнення даних (модерація/координація).
            </Step>
            <Step n="3" title="Публікація">
              Потреба потрапляє у відкритий каталог зі статусами.
            </Step>
            <Step n="4" title="Підтримка та звітність">
              Донор/партнер закриває потребу — додаються підтвердження та результати.
            </Step>
          </div>
        </div>
      </section>

      {/* Catalog */}
      <section id="catalog" className="px-6 py-14 bg-black/20">
        <div className="mx-auto max-w-6xl">
          <div className="flex items-end justify-between gap-4 flex-wrap">
            <div>
              <h2 className="text-3xl font-bold">Каталог потреб {USE_API ? "" : "(демо)"}</h2>
              <p className="mt-2 text-white/70">
                Пошук, фільтр статусу, сортування. Далі — підключимо реальні дані.
              </p>
            </div>
            <a
              href="#contacts"
              className="rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold hover:bg-emerald-500 transition"
            >
              Запросити демо / презентацію
            </a>
          </div>

          {/* Filters */}
          <div className="mt-6 grid gap-3 md:grid-cols-3">
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              className="w-full rounded-xl bg-black/30 border border-white/10 px-4 py-3 outline-none"
              placeholder="Пошук: назва / громада / категорія / статус…"
            />

            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full rounded-xl bg-black/30 border border-white/10 px-4 py-3 outline-none"
            >
              {STATUS_OPTIONS.map((s) => (
                <option key={s} value={s} className="bg-slate-950">
                  {s}
                </option>
              ))}
            </select>

            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="w-full rounded-xl bg-black/30 border border-white/10 px-4 py-3 outline-none"
            >
              <option value="newest" className="bg-slate-950">
                Спочатку оновлені
              </option>
              <option value="budgetAsc" className="bg-slate-950">
                Бюджет: за зростанням
              </option>
              <option value="budgetDesc" className="bg-slate-950">
                Бюджет: за спаданням
              </option>
            </select>
          </div>

          <div className="mt-4 text-sm text-white/60">
            Знайдено: <span className="text-white/80 font-semibold">{filtered.length}</span>
          </div>

          {/* Cards */}
          <div className="mt-6 grid md:grid-cols-3 gap-6">
            {filtered.map((n) => (
              <div key={n.id} className="rounded-2xl border border-white/10 bg-white/5 p-6">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="text-xs text-white/60">{n.community}</div>
                    <div className="mt-2 text-lg font-semibold">{n.title}</div>
                    <div className="mt-1 text-xs text-white/60">{n.category}</div>
                  </div>
                  <div className="text-xs text-white/50 whitespace-nowrap">
                    {formatDateUA(n.updatedAt)}
                  </div>
                </div>

                <div className="mt-4 space-y-2 text-sm">
                  <Row label="Кількість" value={String(n.qty ?? "-")} />
                  <Row label="Бюджет" value={formatUAH(n.budgetUAH)} strong />
                </div>

                <div className="mt-4 inline-flex items-center rounded-full bg-emerald-500/15 border border-emerald-400/20 px-3 py-1 text-xs text-emerald-200">
                  {n.status}
                </div>

                <button
                  onClick={() => setActive(n)}
                  className="mt-5 w-full rounded-xl bg-white/10 border border-white/10 py-2 text-sm font-semibold hover:bg-white/15 transition"
                >
                  Детальніше
                </button>
              </div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-6 text-white/70">
              Нічого не знайдено за заданими фільтрами.
            </div>
          )}
        </div>
      </section>

      {/* Contacts */}
      <section id="contacts" className="px-6 py-16">
        <div className="mx-auto max-w-6xl grid lg:grid-cols-2 gap-8">
          <div>
            <h2 className="text-3xl font-bold">Контакти</h2>
            <p className="mt-3 text-white/70">
              Департамент цифрової трансформації Харківської ОВА.
              Для партнерів можемо надати презентацію, доступ до демо-каталогу та правила верифікації.
            </p>

            <div className="mt-6 space-y-2 text-white/80">
              <div>📍 Харківська область</div>
              <div>
                ✉️ <span className="text-white/60">Email:</span> info@kharkiv-digital.gov.ua
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <div className="text-lg font-semibold">Заявка партнера</div>
            <p className="mt-2 text-sm text-white/70">
              (Поки що форма-демо. Далі можемо підключити Google Form або внутрішню форму з надсиланням на пошту.)
            </p>

            <div className="mt-5 grid gap-3">
              <input
                className="w-full rounded-xl bg-black/30 border border-white/10 px-4 py-3 outline-none"
                placeholder="Ім'я / організація"
              />
              <input
                className="w-full rounded-xl bg-black/30 border border-white/10 px-4 py-3 outline-none"
                placeholder="Email"
              />
              <textarea
                className="w-full rounded-xl bg-black/30 border border-white/10 px-4 py-3 outline-none"
                rows="4"
                placeholder="Коротко: якого типу підтримка / інтерес"
              ></textarea>

              <button className="rounded-xl bg-emerald-600 px-5 py-3 font-semibold hover:bg-emerald-500 transition">
                Надіслати
              </button>
            </div>
          </div>
        </div>

        <footer className="mx-auto max-w-6xl pt-10 text-xs text-white/50">
          © {new Date().getFullYear()} • Єдина цифрова платформа потреб громад • Харківська область
        </footer>
      </section>

      {/* Modal */}
      {active && (
        <div
          className="fixed inset-0 z-50 bg-black/70 px-4 py-10 overflow-auto"
          onClick={() => setActive(null)}
        >
          <div
            className="mx-auto max-w-2xl rounded-3xl border border-white/10 bg-slate-950 p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="text-xs text-white/60">{active.community}</div>
                <div className="mt-1 text-2xl font-bold">{active.title}</div>
                <div className="mt-2 flex flex-wrap gap-2">
                  <Badge>{active.category}</Badge>
                  <Badge tone="emerald">{active.status}</Badge>
                </div>
              </div>

              <button
                onClick={() => setActive(null)}
                className="rounded-xl bg-white/10 border border-white/10 px-3 py-2 text-sm hover:bg-white/15 transition"
                aria-label="Закрити"
              >
                ✕
              </button>
            </div>

            <div className="mt-6 grid sm:grid-cols-2 gap-4">
              <Info title="Бюджет">{formatUAH(active.budgetUAH)}</Info>
              <Info title="Кількість">{String(active.qty ?? "-")}</Info>
              <Info title="Оновлено">{formatDateUA(active.updatedAt)}</Info>
              <Info title="Контакт">{active.contact || "—"}</Info>
            </div>

            <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-4">
              <div className="text-sm font-semibold">Обґрунтування</div>
              <div className="mt-2 text-sm text-white/70">
                {active.justification || "—"}
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="#contacts"
                onClick={() => setActive(null)}
                className="rounded-xl bg-emerald-600 px-5 py-3 font-semibold hover:bg-emerald-500 transition"
              >
                Хочу підтримати цю потребу
              </a>
              <button
                onClick={() => setActive(null)}
                className="rounded-xl bg-white/10 border border-white/10 px-5 py-3 font-semibold hover:bg-white/15 transition"
              >
                Повернутися до каталогу
              </button>
            </div>

            <div className="mt-6 text-xs text-white/50">
              ID потреби: <span className="text-white/70">{active.id}</span>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

/* UI building blocks */

function Stat({ title, text }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
      <div className="text-sm font-semibold">{title}</div>
      <div className="mt-1 text-sm text-white/60">{text}</div>
    </div>
  );
}

function MiniPoint({ children }) {
  return (
    <div className="flex gap-3 items-start">
      <span className="mt-1 h-2 w-2 rounded-full bg-emerald-400" />
      <div className="text-white/80">{children}</div>
    </div>
  );
}

function Card({ title, children }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
      <div className="text-lg font-semibold">{title}</div>
      <div className="mt-2 text-white/70">{children}</div>
    </div>
  );
}

function Step({ n, title, children }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
      <div className="flex items-center gap-3">
        <div className="h-9 w-9 rounded-xl bg-emerald-500/15 border border-emerald-400/20 flex items-center justify-center font-bold text-emerald-200">
          {n}
        </div>
        <div className="font-semibold">{title}</div>
      </div>
      <div className="mt-3 text-sm text-white/70">{children}</div>
    </div>
  );
}

function Row({ label, value, strong }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-white/70">{label}</span>
      <span className={strong ? "font-semibold" : ""}>{value}</span>
    </div>
  );
}

function Badge({ children, tone = "slate" }) {
  const cls =
    tone === "emerald"
      ? "bg-emerald-500/15 border-emerald-400/20 text-emerald-200"
      : "bg-white/5 border-white/10 text-white/70";
  return (
    <span className={`inline-flex items-center rounded-full border px-3 py-1 text-xs ${cls}`}>
      {children}
    </span>
  );
}

function Info({ title, children }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
      <div className="text-xs text-white/60">{title}</div>
      <div className="mt-1 text-sm font-semibold">{children}</div>
    </div>
  );
}

/* helpers */

function formatUAH(v) {
  const n = Number(v);
  if (!Number.isFinite(n)) return "—";
  return new Intl.NumberFormat("uk-UA").format(n) + " грн";
}

function formatDateUA(v) {
  if (!v) return "—";
  const d = new Date(v);
  if (Number.isNaN(d.getTime())) return String(v);
  return new Intl.DateTimeFormat("uk-UA", { year: "numeric", month: "2-digit", day: "2-digit" }).format(d);
}