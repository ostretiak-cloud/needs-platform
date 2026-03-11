import { getServerLanguage } from "@/app/lib/server-language";

const COPY = {
  uk: {
    title: "Про проєкт «єПотреба»",
    intro1: "«єПотреба» — це цифрова платформа для збору, структурування та публікації потреб територіальних громад.",
    intro2: "Вона дозволяє громадам швидко подавати заявки, а партнерам, державним органам та донорам — знаходити пріоритетні потреби для підтримки та відновлення.",
    mission: "Місія платформи",
    missionText: "Створити єдину цифрову систему, яка дозволяє громадам відкрито формувати перелік своїх потреб, а партнерам швидко знаходити та підтримувати важливі проєкти.",
    vision: "Візія",
    visionText: "Побудувати прозору екосистему взаємодії між громадами, державними органами та партнерами для швидкого відновлення та розвитку територій.",
    how: "Як працює платформа",
    advantages: "Переваги платформи",
    steps: [
      ["Громада формує потребу", "Описує проєкт, бюджет, категорію та пріоритет."],
      ["Потреба публікується у каталозі", "Вона стає доступною для пошуку."],
      ["Партнери знаходять потребу", "За категоріями, громадами та пріоритетами."],
      ["Підтримка та реалізація", "Потреба отримує підтримку та переходить до реалізації."],
    ],
    pros: [
      ["Прозорість", "Всі потреби зібрані у єдиному каталозі."],
      ["Структурованість", "Єдина структура заявок: категорія, громада, бюджет, пріоритет."],
      ["Швидкий пошук", "Фільтри та пошук по каталогу."],
    ],
    step: "Крок",
  },
  en: {
    title: "About the eNeed project",
    intro1: "eNeed is a digital platform for collecting, structuring, and publishing community needs.",
    intro2: "It allows communities to submit requests quickly, while partners, authorities, and donors can find priority needs for support and recovery.",
    mission: "Platform mission",
    missionText: "Create a unified digital system that helps communities openly define their needs and enables partners to quickly find and support important projects.",
    vision: "Vision",
    visionText: "Build a transparent collaboration ecosystem between communities, authorities, and partners for rapid recovery and development.",
    how: "How the platform works",
    advantages: "Platform advantages",
    steps: [
      ["Community creates a need", "Describes project, budget, category, and priority."],
      ["Need is published in catalog", "It becomes available for discovery."],
      ["Partners find the need", "By category, community, and priority."],
      ["Support and implementation", "The need receives support and moves to implementation."],
    ],
    pros: [
      ["Transparency", "All needs are collected in one catalog."],
      ["Structured format", "Unified request structure: category, community, budget, priority."],
      ["Fast search", "Filtering and search across the catalog."],
    ],
    step: "Step",
  },
};

export default async function AboutPage() {
  const language = await getServerLanguage();
  const copy = COPY[language] ?? COPY.uk;

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-950 to-black text-white">
      <div className="mx-auto max-w-6xl px-4 py-12 md:py-16">
        <section className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/10 via-white/5 to-transparent p-8 md:p-12">
          <h1 className="text-3xl font-extrabold tracking-tight md:text-5xl">{copy.title}</h1>
          <p className="mt-6 max-w-4xl text-base leading-relaxed text-white/75 md:text-lg">{copy.intro1}</p>
          <p className="mt-4 max-w-4xl text-base leading-relaxed text-white/75 md:text-lg">{copy.intro2}</p>
        </section>

        <section className="grid gap-6 py-16 md:grid-cols-2">
          <article className="rounded-2xl border border-white/10 bg-white/5 p-6 md:p-8"><h2 className="text-2xl font-bold">{copy.mission}</h2><p className="mt-4 text-white/75">{copy.missionText}</p></article>
          <article className="rounded-2xl border border-white/10 bg-white/5 p-6 md:p-8"><h2 className="text-2xl font-bold">{copy.vision}</h2><p className="mt-4 text-white/75">{copy.visionText}</p></article>
        </section>

        <section className="py-16">
          <h2 className="text-2xl font-bold md:text-3xl">{copy.how}</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {copy.steps.map((step, index) => (
              <article key={step[0]} className="rounded-2xl border border-white/10 bg-white/5 p-5">
                <div className="text-sm font-medium text-cyan-300">{copy.step} {index + 1}</div>
                <h3 className="mt-2 text-lg font-semibold">{step[0]}</h3>
                <p className="mt-3 text-sm leading-relaxed text-white/70">{step[1]}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="py-16">
          <h2 className="text-2xl font-bold md:text-3xl">{copy.advantages}</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {copy.pros.map((item) => (
              <article key={item[0]} className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/10 via-white/5 to-transparent p-6">
                <h3 className="text-lg font-semibold">{item[0]}</h3>
                <p className="mt-3 text-sm leading-relaxed text-white/70">{item[1]}</p>
              </article>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
