// app/about/page.js
import Link from "next/link";

export const metadata = {
  title: "Про проєкт — єПотреба",
};

export default function AboutPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <section className="rounded-3xl border border-white/10 bg-white/5 p-8">
        <h1 className="text-3xl font-extrabold">Про проєкт «єПотреба»</h1>
        <p className="mt-4 max-w-3xl text-white/70">
          «єПотреба» — це єдиний каталог заявок (потреб) від громад, який дозволяє
          швидко публікувати, структурувати та знаходити пріоритетні запити для
          підтримки та відновлення.
        </p>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
            <div className="text-sm text-white/60">1) Прозорість</div>
            <div className="mt-2 text-base font-semibold">Єдиний реєстр потреб</div>
            <p className="mt-2 text-sm text-white/70">
              Уніфікований формат заявок: категорія, громада, бюджет, пріоритет, статус.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
            <div className="text-sm text-white/60">2) Швидкий пошук</div>
            <div className="mt-2 text-base font-semibold">Фільтри та сортування</div>
            <p className="mt-2 text-sm text-white/70">
              Пошук за ключовими словами + фільтри за статусом, громадою, категорією та пріоритетом.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
            <div className="text-sm text-white/60">3) Просте адміністрування</div>
            <div className="mt-2 text-base font-semibold">Google Sheets + Apps Script</div>
            <p className="mt-2 text-sm text-white/70">
              Дані зберігаються в таблиці, а сайт працює через API-ендпоїнти, підключені до Apps Script.
            </p>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/applications"
            className="rounded-xl bg-orange-500 px-5 py-2 text-sm font-semibold text-black hover:bg-orange-400"
          >
            Перейти до каталогу
          </Link>
          <Link
            href="/"
            className="rounded-xl bg-white/10 px-5 py-2 text-sm text-white hover:bg-white/15"
          >
            На головну
          </Link>
        </div>
      </section>
    </main>
  );
}