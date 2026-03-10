export const metadata = {
  title: "Про проєкт — єПотреба",
};

const processSteps = [
  {
    title: "Громада формує потребу",
    text: "Описує проєкт, бюджет, категорію та пріоритет.",
  },
  {
    title: "Потреба публікується у каталозі",
    text: "Вона стає доступною для пошуку.",
  },
  {
    title: "Партнери знаходять потребу",
    text: "За категоріями, громадами та пріоритетами.",
  },
  {
    title: "Підтримка та реалізація",
    text: "Потреба отримує підтримку та переходить до реалізації.",
  },
];

const advantages = [
  {
    title: "Прозорість",
    text: "Всі потреби зібрані у єдиному каталозі.",
  },
  {
    title: "Структурованість",
    text: "Єдина структура заявок: категорія, громада, бюджет, пріоритет.",
  },
  {
    title: "Швидкий пошук",
    text: "Фільтри та пошук по каталогу.",
  },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-950 to-black text-white">
      <div className="mx-auto max-w-6xl px-4 py-12 md:py-16">
        <section className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/10 via-white/5 to-transparent p-8 md:p-12">
          <h1 className="text-3xl font-extrabold tracking-tight md:text-5xl">
            Про проєкт «єПотреба»
          </h1>
          <p className="mt-6 max-w-4xl text-base leading-relaxed text-white/75 md:text-lg">
            «єПотреба» — це цифрова платформа для збору, структурування та
            публікації потреб територіальних громад.
          </p>
          <p className="mt-4 max-w-4xl text-base leading-relaxed text-white/75 md:text-lg">
            Вона дозволяє громадам швидко подавати заявки, а партнерам,
            державним органам та донорам — знаходити пріоритетні потреби для
            підтримки та відновлення.
          </p>
        </section>

        <section className="grid gap-6 py-16 md:grid-cols-2">
          <article className="rounded-2xl border border-white/10 bg-white/5 p-6 md:p-8">
            <h2 className="text-2xl font-bold">Місія платформи</h2>
            <p className="mt-4 text-white/75">
              Створити єдину цифрову систему, яка дозволяє громадам відкрито
              формувати перелік своїх потреб, а партнерам швидко знаходити та
              підтримувати важливі проєкти.
            </p>
          </article>

          <article className="rounded-2xl border border-white/10 bg-white/5 p-6 md:p-8">
            <h2 className="text-2xl font-bold">Візія</h2>
            <p className="mt-4 text-white/75">
              Побудувати прозору екосистему взаємодії між громадами, державними
              органами та партнерами для швидкого відновлення та розвитку
              територій.
            </p>
          </article>
        </section>

        <section className="py-16">
          <h2 className="text-2xl font-bold md:text-3xl">Як працює платформа</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {processSteps.map((step, index) => (
              <article
                key={step.title}
                className="rounded-2xl border border-white/10 bg-white/5 p-5"
              >
                <div className="text-sm font-medium text-cyan-300">
                  Крок {index + 1}
                </div>
                <h3 className="mt-2 text-lg font-semibold">{step.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-white/70">
                  {step.text}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="py-16">
          <h2 className="text-2xl font-bold md:text-3xl">Переваги платформи</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {advantages.map((item) => (
              <article
                key={item.title}
                className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/10 via-white/5 to-transparent p-6"
              >
                <h3 className="text-lg font-semibold">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-white/70">
                  {item.text}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="py-16">
          <h2 className="text-2xl font-bold md:text-3xl">Архітектура платформи</h2>
          <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-6 md:p-8">
            <div className="grid gap-3 text-sm font-medium text-white/85 md:grid-cols-7 md:items-center md:text-base">
              <div className="rounded-xl border border-white/10 bg-black/20 p-3 text-center">
                Громади
              </div>
              <div className="hidden text-center text-cyan-300 md:block">→</div>
              <div className="rounded-xl border border-white/10 bg-black/20 p-3 text-center">
                Платформа
              </div>
              <div className="hidden text-center text-cyan-300 md:block">→</div>
              <div className="rounded-xl border border-white/10 bg-black/20 p-3 text-center">
                Каталог
              </div>
              <div className="hidden text-center text-cyan-300 md:block">→</div>
              <div className="rounded-xl border border-white/10 bg-black/20 p-3 text-center">
                Партнери
              </div>
            </div>
            <p className="mt-6 text-white/75">
              Громади подають заявки → система формує каталог → партнери
              знаходять потреби для підтримки.
            </p>
          </div>
        </section>

        <section className="pb-8 pt-16">
          <article className="rounded-2xl border border-white/10 bg-gradient-to-br from-cyan-500/10 via-white/5 to-transparent p-6 md:p-8">
            <h2 className="text-2xl font-bold md:text-3xl">
              Цифрова інфраструктура для підтримки громад
            </h2>
            <p className="mt-4 max-w-4xl text-white/75">
              Платформа «єПотреба» створюється як інструмент цифрової
              трансформації регіону, який дозволяє системно працювати з
              потребами територіальних громад та формувати прозорий каталог
              запитів.
            </p>
          </article>
        </section>
      </div>
    </main>
  );
}
