import Link from "next/link";

const roleContent = {
  community: {
    title: "Кабінет громади",
    subtitle: "Подача та відстеження потреб громади",
    actions: [
      { title: "Створити нову потребу", text: "Сформуйте нову заявку з категорією, описом та бюджетом." },
      { title: "Мої активні заявки", text: "Переглядайте статуси: чернетка, верифікація, опубліковано." },
      { title: "Коментарі від ОВА", text: "Отримуйте зауваження до заявки та швидко вносьте правки." },
    ],
  },
  ova: {
    title: "Кабінет ОВА",
    subtitle: "Верифікація потреб та контроль якості заявок",
    actions: [
      { title: "Черга на верифікацію", text: "Перегляд нових заявок, які надійшли від громад." },
      { title: "Підтвердити або повернути", text: "Валідація даних, перевірка документів і бюджету." },
      { title: "Аналітика по області", text: "Моніторинг кількості потреб за категоріями та громадами." },
    ],
  },
  donor: {
    title: "Кабінет донора",
    subtitle: "Вибір потреб і фіксація закриття допомоги",
    actions: [
      { title: "Підібрати потреби", text: "Фільтруйте заявки за категоріями, бюджетом і пріоритетом." },
      { title: "Взяти в роботу", text: "Бронюйте заявку для фінансування або матеріальної підтримки." },
      { title: "Підтвердити закриття", text: "Завантажуйте підтвердження надання допомоги та звіт." },
    ],
  },
};

function RoleCard({ title, text }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/25 p-5">
      <h3 className="text-lg font-semibold text-white">{title}</h3>
      <p className="mt-2 text-sm text-white/70">{text}</p>
    </div>
  );
}

export default async function CabinetPage({ searchParams }) {
  const params = await searchParams;
  const role = params?.role || "community";
  const content = roleContent[role] || roleContent.community;

  return (
    <main className="min-h-screen bg-gradient-to-b from-black via-slate-950 to-slate-900 px-4 py-10">
      <div className="mx-auto max-w-6xl rounded-3xl border border-white/10 bg-white/5 p-6 md:p-8">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h1 className="text-3xl font-bold text-white">{content.title}</h1>
            <p className="mt-2 text-white/70">{content.subtitle}</p>
          </div>
          <Link
            href="/applications"
            className="inline-flex h-11 items-center justify-center rounded-full bg-white px-5 text-sm font-semibold text-black hover:bg-white/90"
          >
            Перейти до каталогу
          </Link>
        </div>

        <div className="mt-7 grid gap-4 md:grid-cols-3">
          {content.actions.map((action) => (
            <RoleCard key={action.title} title={action.title} text={action.text} />
          ))}
        </div>
      </div>
    </main>
  );
}
