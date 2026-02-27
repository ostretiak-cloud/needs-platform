const needsDemo = [
  { title: "Генератор 15 кВт", community: "Територіальна громада", budget: "70 000 грн", status: "Потреба в каталозі" },
  { title: "Ноутбуки для ЦНАП", community: "Територіальна громада", budget: "50 000 грн", status: "Потреба в каталозі" },
  { title: "Сонячна панель", community: "Територіальна громада", budget: "100 000 грн", status: "Потреба в каталозі" },
];

export default function Home() {
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
              * Демонстраційний вигляд. Можемо підключити реальний каталог з Google Sheets / бази даних.
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
              <h2 className="text-3xl font-bold">Каталог потреб (демо)</h2>
              <p className="mt-2 text-white/70">
                Приклад структури карток. Далі підключимо реальні дані.
              </p>
            </div>
            <a
              href="#contacts"
              className="rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold hover:bg-emerald-500 transition"
            >
              Запросити демо / презентацію
            </a>
          </div>

          <div className="mt-8 grid md:grid-cols-3 gap-6">
            {needsDemo.map((n) => (
              <div key={n.title} className="rounded-2xl border border-white/10 bg-white/5 p-6">
                <div className="text-xs text-white/60">{n.community}</div>
                <div className="mt-2 text-lg font-semibold">{n.title}</div>
                <div className="mt-3 flex items-center justify-between text-sm">
                  <span className="text-white/70">Бюджет</span>
                  <span className="font-semibold">{n.budget}</span>
                </div>
                <div className="mt-4 inline-flex items-center rounded-full bg-emerald-500/15 border border-emerald-400/20 px-3 py-1 text-xs text-emerald-200">
                  {n.status}
                </div>
                <button className="mt-5 w-full rounded-xl bg-white/10 border border-white/10 py-2 text-sm font-semibold hover:bg-white/15 transition">
                  Детальніше
                </button>
              </div>
            ))}
          </div>
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
              <div>✉️ <span className="text-white/60">Email:</span> info@kharkiv-digital.gov.ua</div>
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <div className="text-lg font-semibold">Заявка партнера</div>
            <p className="mt-2 text-sm text-white/70">
              (Поки що форма-демо. Далі можемо підключити Google Form або внутрішню форму з надсиланням на пошту.)
            </p>

            <div className="mt-5 grid gap-3">
              <input className="w-full rounded-xl bg-black/30 border border-white/10 px-4 py-3 outline-none" placeholder="Ім'я / організація" />
              <input className="w-full rounded-xl bg-black/30 border border-white/10 px-4 py-3 outline-none" placeholder="Email" />
              <textarea className="w-full rounded-xl bg-black/30 border border-white/10 px-4 py-3 outline-none" rows="4" placeholder="Коротко: якого типу підтримка / інтерес"></textarea>

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
    </main>
  );
}

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