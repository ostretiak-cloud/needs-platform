"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

const AUTH_STORAGE_KEY = "needs-auth-user";

const CATEGORY_OPTIONS = [
  "Енергетика",
  "Медицина",
  "Освіта",
  "Транспорт",
  "Вода та санітарія",
  "Безпека",
  "Гуманітарна допомога",
  "Інше",
];

const roleContent = {
  community: {
    title: "Кабінет громади",
    subtitle: "Подача та відстеження потреб громади",
  },
  ova: {
    title: "Кабінет ОВА",
    subtitle: "Верифікація потреб та контроль якості заявок",
  },
  donor: {
    title: "Кабінет донора",
    subtitle: "Вибір потреб і фіксація закриття допомоги",
  },
};

const initialForm = {
  title: "",
  category: CATEGORY_OPTIONS[0],
  budget_uah: "",
  priority: "3",
  description: "",
};

function formatMoney(value) {
  const num = Number(value);
  if (!Number.isFinite(num)) return "—";
  return `${num.toLocaleString("uk-UA")} грн`;
}

function statusLabel(status) {
  const s = String(status ?? "").trim().toLowerCase();
  if (s === "draft") return "Чернетка";
  if (s === "verification") return "На верифікації";
  if (s === "published") return "Опубліковано";
  if (s === "rejected") return "Повернено";
  return status || "—";
}

export default function CabinetClient({ role = "community" }) {
  const content = roleContent[role] || roleContent.community;
  const [authUser, setAuthUser] = useState(null);
  const [isBootstrapping, setBootstrapping] = useState(true);

  const [form, setForm] = useState(initialForm);
  const [submitError, setSubmitError] = useState("");
  const [submitOk, setSubmitOk] = useState("");
  const [isSubmitting, setSubmitting] = useState(false);

  const [needs, setNeeds] = useState([]);
  const [isLoadingNeeds, setLoadingNeeds] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const raw = window.localStorage.getItem(AUTH_STORAGE_KEY);
    if (!raw) {
      setBootstrapping(false);
      return;
    }

    try {
      const user = JSON.parse(raw);
      setAuthUser(user);
    } catch {
      window.localStorage.removeItem(AUTH_STORAGE_KEY);
    } finally {
      setBootstrapping(false);
    }
  }, []);

  async function loadMyNeeds(email) {
    setLoadingNeeds(true);
    try {
      const res = await fetch("/api/needs", { cache: "no-store" });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Помилка завантаження заявок");

      const filtered = (Array.isArray(data) ? data : []).filter(
        (item) => String(item?.contact_email ?? "").trim().toLowerCase() === email,
      );
      setNeeds(filtered);
    } catch {
      setNeeds([]);
    } finally {
      setLoadingNeeds(false);
    }
  }

  useEffect(() => {
    if (role !== "community") return;
    const email = String(authUser?.email ?? "").trim().toLowerCase();
    if (!email) return;
    loadMyNeeds(email);
  }, [authUser, role]);

  const canCreateNeed = useMemo(() => {
    return role === "community" && authUser?.role === "community";
  }, [authUser, role]);

  async function onSubmit(e) {
    e.preventDefault();
    if (!canCreateNeed) return;

    setSubmitting(true);
    setSubmitError("");
    setSubmitOk("");

    try {
      const res = await fetch("/api/needs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          budget_uah: Number(form.budget_uah),
          priority: Number(form.priority),
          community: authUser.organization,
          contact_name: `${authUser.lastName} ${authUser.firstName}`.trim(),
          contact_email: authUser.email,
        }),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data?.error || "Не вдалося створити потребу");

      setSubmitOk("Заявку створено та передано у систему.");
      setForm(initialForm);
      await loadMyNeeds(String(authUser.email).trim().toLowerCase());
    } catch (error) {
      setSubmitError(String(error?.message || error));
    } finally {
      setSubmitting(false);
    }
  }

  if (isBootstrapping) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-black via-slate-950 to-slate-900 px-4 py-10 text-white">
        <div className="mx-auto max-w-6xl">Завантаження…</div>
      </main>
    );
  }

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

        {canCreateNeed ? (
          <div className="mt-7 grid gap-5 lg:grid-cols-2">
            <form onSubmit={onSubmit} className="rounded-2xl border border-white/10 bg-black/25 p-5">
              <h2 className="text-xl font-semibold text-white">Створити нову потребу</h2>
              <p className="mt-1 text-sm text-white/70">Організація: {authUser.organization}</p>

              <div className="mt-4 space-y-3">
                <input
                  className="h-11 w-full rounded-xl border border-white/10 bg-black/20 px-3 text-sm text-white"
                  placeholder="Назва потреби"
                  value={form.title}
                  onChange={(e) => setForm((prev) => ({ ...prev, title: e.target.value }))}
                  required
                />

                <select
                  className="h-11 w-full rounded-xl border border-white/10 bg-black/20 px-3 text-sm text-white"
                  value={form.category}
                  onChange={(e) => setForm((prev) => ({ ...prev, category: e.target.value }))}
                >
                  {CATEGORY_OPTIONS.map((option) => (
                    <option key={option} value={option} className="bg-slate-900 text-white">
                      {option}
                    </option>
                  ))}
                </select>

                <div className="grid grid-cols-2 gap-3">
                  <input
                    className="h-11 w-full rounded-xl border border-white/10 bg-black/20 px-3 text-sm text-white"
                    placeholder="Бюджет, грн"
                    type="number"
                    min="1"
                    value={form.budget_uah}
                    onChange={(e) => setForm((prev) => ({ ...prev, budget_uah: e.target.value }))}
                    required
                  />
                  <select
                    className="h-11 w-full rounded-xl border border-white/10 bg-black/20 px-3 text-sm text-white"
                    value={form.priority}
                    onChange={(e) => setForm((prev) => ({ ...prev, priority: e.target.value }))}
                  >
                    <option value="5">Пріоритет 5</option>
                    <option value="4">Пріоритет 4</option>
                    <option value="3">Пріоритет 3</option>
                    <option value="2">Пріоритет 2</option>
                    <option value="1">Пріоритет 1</option>
                  </select>
                </div>

                <textarea
                  className="min-h-32 w-full rounded-xl border border-white/10 bg-black/20 px-3 py-2 text-sm text-white"
                  placeholder="Опис потреби"
                  value={form.description}
                  onChange={(e) => setForm((prev) => ({ ...prev, description: e.target.value }))}
                  required
                />
              </div>

              {submitError && <div className="mt-3 text-sm text-red-300">{submitError}</div>}
              {submitOk && <div className="mt-3 text-sm text-emerald-300">{submitOk}</div>}

              <button
                type="submit"
                disabled={isSubmitting}
                className="mt-4 inline-flex h-11 items-center justify-center rounded-xl bg-[#FFD500] px-4 text-sm font-extrabold text-black hover:bg-[#FFE166] disabled:opacity-60"
              >
                {isSubmitting ? "Збереження…" : "Подати заявку"}
              </button>
            </form>

            <section className="rounded-2xl border border-white/10 bg-black/25 p-5">
              <h2 className="text-xl font-semibold text-white">Мої активні заявки</h2>
              <p className="mt-1 text-sm text-white/70">Заявки, привʼязані до вашого email</p>

              <div className="mt-4 space-y-3">
                {isLoadingNeeds && <div className="text-sm text-white/70">Завантаження…</div>}
                {!isLoadingNeeds && needs.length === 0 && (
                  <div className="text-sm text-white/60">Ще немає жодної заявки.</div>
                )}

                {needs.map((item) => (
                  <div key={`${item.id}-${item.updated_at}`} className="rounded-xl border border-white/10 bg-white/5 p-3">
                    <div className="text-sm font-semibold text-white">{item.title || "Без назви"}</div>
                    <div className="mt-1 text-xs text-white/60">
                      {item.category || "—"} · {formatMoney(item.budget_uah ?? item.budget)}
                    </div>
                    <div className="mt-1 text-xs text-white/60">Статус: {statusLabel(item.status)}</div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        ) : (
          <div className="mt-7 rounded-2xl border border-white/10 bg-black/25 p-6 text-white/85">
            {role !== authUser?.role
              ? "Доступ обмежено: роль у профілі не відповідає обраному кабінету."
              : "Функціонал для цієї ролі буде підключено наступним кроком."}
          </div>
        )}
      </div>
    </main>
  );
}
