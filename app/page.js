export default function Home() {
  const advantages = [
    "Централізований збір і моніторинг потреб",
    "Усунення дублювання та пріоритезація",
    "Автоматизований принцип «потреба — донор»",
    "Єдина точка входу для міжнародних партнерів (онлайн «РОМС»)",
    "Формування позитивного іміджу області як прозорого партнера",
  ];

  return (
    <main className="min-h-screen bg-[#05070C] text-white">
      {/* Top bar */}
      <header className="px-6 pt-10">
        <div className="mx-auto max-w-6xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-2xl bg-white/10 border border-white/10 flex items-center justify-center">
              <span className="text-lg">🏛️</span>
            </div>
            <div className="leading-tight">
              <div className="font-semibold">
                Єдина цифрова платформа потреб громад
              </div>
              <div className="text-xs text-white/60">
                Новий проєкт • Харківська область
              </div>
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

      {/* Title */}
      <section className="px-6 pt-10 pb-6">
        <div className="mx-auto max-w-6xl">
          <h1 className="text-3xl sm:text-4xl font-bold">
            Новий проєкт «Єдина цифрова платформа потреб громад»
          </h1>
        </div>
      </section>

      {/* Main block (as on slide) */}
      <section className="px-6 pb-16">
        <div className="mx-auto max-w-6xl grid lg:grid-cols-2 gap-6">
          {/* Left column: Goal + preview */}
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <div className="rounded-2xl bg-emerald-700/40 border border-emerald-500/20 p-5">
              <div className="text-2xl font-bold mb-3">Мета</div>
              <p className="text-white/85 leading-relaxed">
                Створення єдиного електронного майданчика для прозорого
                розміщення потреб громад та ефективного залучення донорської й
                інвестиційної підтримки
              </p>
            </div>

            <div className="mt-6 rounded-2xl bg-black/30 border border-white/10 p-4">
              <div className="text-sm text-white/60 mb-3">Приклад каталогу</div>

              {/* Fake “catalog” preview block to mimic the slide */}
              <div className="grid grid-cols-3 gap-3">
                <Card title="Мобільна валіза" price="150 000 грн" />
                <Card title="Tesla PowerWall" price="500 000 грн" />
                <Card title="Пристрої" price="45 000 грн" />
                <Card title="Генератор" price="70 000 грн" />
                <Card title="Сонячна панель" price="100 000 грн" />
                <Card title="Ноутбуки" price="50 000 грн" />
              </div>

              <div className="mt-4 text-xs text-white/50">
                * Демонстраційний вигляд. Далі підключимо реальні дані (Sheets/БД).
              </div>
            </div>
          </div>

          {/* Right column: Advantages */}
          <div className="rounded-3xl border border-white/10 bg-[#06122C]/60 p-8">
            <div className="text-4xl font-extrabold mb-8">Переваги</div>

            <ul className="space-y-5">
              {advantages.map((a) => (
                <li key={a} className="flex gap-3 items-start">
                  <span className="mt-1 text-white/70">→</span>
                  <span className="text-lg text-white/85 leading-relaxed">
                    {a}
                  </span>
                </li>
              ))}
            </ul>

            <div className="mt-10 rounded-2xl bg-white/5 border border-white/10 p-5">
              <div className="text-sm text-white/60">Далі можемо додати</div>
              <div className="mt-2 text-white/85">
                Фільтри потреб, статуси (нове / в роботі / закрито), пошук, підбір
                «потреба—донор», та інтеграцію з Google Sheets.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contacts */}
      <section id="contacts" className="px-6 pb-16">
        <div className="mx-auto max-w-6xl rounded-3xl border border-white/10 bg-white/5 p-8">
          <h2 className="text-2xl font-bold">Контакти</h2>
          <p className="mt-2 text-white/70">
            Департамент цифрової трансформації Харківської ОВА
          </p>
          <div className="mt-5 grid md:grid-cols-3 gap-4 text-white/80">
            <div className="rounded-2xl bg-black/30 border border-white/10 p-4">
              📍 Харківська область
            </div>
            <div className="rounded-2xl bg-black/30 border border-white/10 p-4">
              ✉️ info@kharkiv-digital.gov.ua
            </div>
            <div className="rounded-2xl bg-black/30 border border-white/10 p-4">
              🤝 Для партнерів: демо + презентація
            </div>
          </div>
        </div>
      </section>

      <footer className="px-6 pb-10">
        <div className="mx-auto max-w-6xl text-xs text-white/40">
          © {new Date().getFullYear()} • Єдина цифрова платформа потреб громад
        </div>
      </footer>
    </main>
  );
}

function Card({ title, price }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-3">
      <div className="h-14 rounded-lg bg-white/10 border border-white/10" />
      <div className="mt-2 text-sm font-semibold">{title}</div>
      <div className="text-xs text-white/60">{price}</div>
      <button className="mt-2 w-full rounded-lg bg-white/10 border border-white/10 py-1 text-xs hover:bg-white/15 transition">
        Детальніше
      </button>
    </div>
  );
}