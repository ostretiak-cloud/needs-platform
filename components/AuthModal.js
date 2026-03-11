"use client";

import { useEffect, useMemo, useState } from "react";

const USERS_STORAGE_KEY = "needs-users";

const ROLE_OPTIONS = [
  { value: "community", label: "Громада (подає потребу)" },
  { value: "ova", label: "ОВА (верифікує потребу)" },
  { value: "donor", label: "Донор (закриває потребу)" },
];

const INITIAL_FORM = {
  lastName: "",
  firstName: "",
  position: "",
  organization: "",
  email: "",
  password: "",
  confirmPassword: "",
  role: "community",
};

function readUsers() {
  if (typeof window === "undefined") return [];

  const raw = window.localStorage.getItem(USERS_STORAGE_KEY);
  if (!raw) return [];

  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    window.localStorage.removeItem(USERS_STORAGE_KEY);
    return [];
  }
}

function saveUsers(users) {
  window.localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
}

export default function AuthModal({ onClose, onAuthSuccess }) {
  const [mode, setMode] = useState("login");
  const [form, setForm] = useState(INITIAL_FORM);
  const [error, setError] = useState("");

  const title = useMemo(
    () => (mode === "login" ? "Вхід до електронного кабінету" : "Реєстрація в системі"),
    [mode],
  );

  useEffect(() => {
    function handleEscape(event) {
      if (event.key === "Escape") onClose();
    }

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  const submitLabel = mode === "login" ? "Увійти" : "Зареєструватися";

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setError("");
  }

  function handleModeToggle() {
    setMode((prev) => (prev === "login" ? "register" : "login"));
    setForm(INITIAL_FORM);
    setError("");
  }

  function handleSubmit(event) {
    event.preventDefault();

    const email = form.email.trim().toLowerCase();
    const password = form.password;

    if (!email || !password) {
      setError("Вкажіть email і пароль.");
      return;
    }

    const users = readUsers();

    if (mode === "register") {
      if (
        !form.lastName.trim() ||
        !form.firstName.trim() ||
        !form.position.trim() ||
        !form.organization.trim()
      ) {
        setError("Заповніть усі обов'язкові поля.");
        return;
      }

      if (password.length < 8) {
        setError("Пароль має містити щонайменше 8 символів.");
        return;
      }

      if (password !== form.confirmPassword) {
        setError("Паролі не співпадають.");
        return;
      }

      const existing = users.find((user) => user.email === email);
      if (existing) {
        setError("Користувач із таким email вже існує.");
        return;
      }

      const newUser = {
        lastName: form.lastName.trim(),
        firstName: form.firstName.trim(),
        position: form.position.trim(),
        organization: form.organization.trim(),
        email,
        password,
        role: form.role,
      };
      saveUsers([...users, newUser]);
      onAuthSuccess(newUser);
      return;
    }

    const matchedUser = users.find((user) => user.email === email && user.password === password);

    if (!matchedUser) {
      setError("Невірний email або пароль.");
      return;
    }

    onAuthSuccess(matchedUser);
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto bg-black/65 px-4 py-6 sm:items-center sm:py-8" onClick={onClose}>
      <div
        className="w-full max-w-md rounded-3xl border border-white/10 bg-[#07121d] p-6 shadow-2xl max-h-[92vh] overflow-y-auto"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="mb-5 flex items-start justify-between gap-4">
          <h2 className="text-lg font-semibold text-white">{title}</h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full bg-white/10 px-2.5 py-1 text-sm text-white/80 hover:bg-white/20 hover:text-white"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          {mode === "register" && (
            <>
              <label className="block text-sm text-white/80">
                Прізвище
                <input
                  className="mt-1.5 w-full rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-white outline-none focus:border-[#FFD500]"
                  name="lastName"
                  type="text"
                  value={form.lastName}
                  onChange={handleChange}
                  placeholder="Вкажіть прізвище"
                  required
                />
              </label>

              <label className="block text-sm text-white/80">
                Імʼя
                <input
                  className="mt-1.5 w-full rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-white outline-none focus:border-[#FFD500]"
                  name="firstName"
                  type="text"
                  value={form.firstName}
                  onChange={handleChange}
                  placeholder="Вкажіть імʼя"
                  required
                />
              </label>

              <label className="block text-sm text-white/80">
                Посада
                <input
                  className="mt-1.5 w-full rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-white outline-none focus:border-[#FFD500]"
                  name="position"
                  type="text"
                  value={form.position}
                  onChange={handleChange}
                  placeholder="Вкажіть посаду"
                  required
                />
              </label>

              <label className="block text-sm text-white/80">
                Організація
                <input
                  className="mt-1.5 w-full rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-white outline-none focus:border-[#FFD500]"
                  name="organization"
                  type="text"
                  value={form.organization}
                  onChange={handleChange}
                  placeholder="Вкажіть організацію"
                  required
                />
              </label>
            </>
          )}

          <label className="block text-sm text-white/80">
            Електронна пошта
            <input
              className="mt-1.5 w-full rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-white outline-none focus:border-[#FFD500]"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="name@example.com"
              autoComplete="email"
              required
            />
          </label>

          <label className="block text-sm text-white/80">
            Пароль (мінімум 8 символів)
            <input
              className="mt-1.5 w-full rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-white outline-none focus:border-[#FFD500]"
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              placeholder="••••••••"
              autoComplete={mode === "login" ? "current-password" : "new-password"}
              minLength={8}
              required
            />
          </label>

          {mode === "register" && (
            <>
              <label className="block text-sm text-white/80">
                Повторіть пароль
                <input
                  className="mt-1.5 w-full rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-white outline-none focus:border-[#FFD500]"
                  name="confirmPassword"
                  type="password"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  placeholder="••••••••"
                  autoComplete="new-password"
                  minLength={8}
                  required
                />
              </label>

              <label className="block text-sm text-white/80">
                Роль
                <select
                  className="mt-1.5 w-full rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-white outline-none focus:border-[#FFD500]"
                  name="role"
                  value={form.role}
                  onChange={handleChange}
                >
                  {ROLE_OPTIONS.map((role) => (
                    <option key={role.value} value={role.value} className="bg-slate-900 text-white">
                      {role.label}
                    </option>
                  ))}
                </select>
              </label>
            </>
          )}

          {error && <p className="text-sm font-medium text-red-300">{error}</p>}

          <button
            type="submit"
            className="inline-flex h-11 w-full items-center justify-center rounded-xl bg-[#FFD500] px-4 text-sm font-extrabold text-black hover:bg-[#FFE166]"
          >
            {submitLabel}
          </button>
        </form>

        <div className="mt-4 border-t border-white/10 pt-4 text-sm text-white/70">
          {mode === "login" ? "Ще не маєте акаунта?" : "Вже зареєстровані?"}{" "}
          <button
            type="button"
            onClick={handleModeToggle}
            className="font-semibold text-[#FFD500] hover:text-[#FFE166]"
          >
            {mode === "login" ? "Зареєструватися" : "Увійти"}
          </button>
        </div>
      </div>
    </div>
  );
}
