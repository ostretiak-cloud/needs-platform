"use client";

import Link from "next/link";
import { useState } from "react";

function TridentMark({ className = "" }) {
  // мінімалістичний знак (білий) — як у Мінцифри
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 64 64"
      role="img"
      aria-label="Україна"
    >
      <path
        fill="currentColor"
        d="M32 6c7.6 6.3 15.5 8.8 24 9.8v12.8c0 16.8-10.2 27.9-24 32.4C18.2 56.5 8 45.4 8 28.6V15.8C16.5 14.8 24.4 12.3 32 6Zm0 7.2C25.8 17.4 19 19.4 12 20.4v8.2c0 13.5 8 22.5 20 26.2 12-3.7 20-12.7 20-26.2v-8.2c-7-1-13.8-3-20-7.2Z"
      />
      <path
        fill="currentColor"
        d="M32 20c3 2.9 5.8 4.1 9 4.9v4.7c0 6.8-4.1 11.4-9 13-4.9-1.6-9-6.2-9-13v-4.7c3.2-.8 6-2 9-4.9Zm0 5.6c-1.6 1.1-3.1 1.8-5 2.2v1.8c0 4.6 2.4 7.6 5 8.8 2.6-1.2 5-4.2 5-8.8v-1.8c-1.9-.4-3.4-1.1-5-2.2Z"
      />
    </svg>
  );
}

function IconSearch({ className = "" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M10.5 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15Z"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        d="M16.5 16.5 21 21"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function IconMenu({ className = "" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M4 7h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M4 12h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M4 17h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function IconCalendar({ className = "" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M7 3v3M17 3v3M4.5 8.5h15"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M6 6h12a2 2 0 0 1 2 2v11a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3V8a2 2 0 0 1 2-2Z"
        stroke="currentColor"
        strokeWidth="2"
      />
    </svg>
  );
}

function IconClock({ className = "" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        d="M12 7v6l4 2"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function Header() {
  const [open, setOpen] = useState(false);

  // легка “noise” текстура — data-uri (без додаткових файлів)
  const noiseBg =
    "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='160' height='160' filter='url(%23n)' opacity='.22'/%3E%3C/svg%3E\")";

  return (
    <header className="sticky top-0 z-50">
      <div className="relative">
        {/* ФОН: глибокий графітовий градієнт */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B0B0F] to-[#121218]" />

        {/* GLASS: дві “плівки” + сильний blur (як у Мінцифри) */}
        <div className="absolute inset-0 bg-white/[0.06] backdrop-blur-2xl" />
        <div className="absolute inset-0 bg-black/20" />

        {/* NOISE: делікатна текстура */}
        <div
          className="pointer-events-none absolute inset-0 opacity-30 mix-blend-overlay"
          style={{ backgroundImage: noiseBg }}
        />

        {/* м’яка нижня тінь замість різкої межі */}
        <div className="pointer-events-none absolute -bottom-4 left-0 right-0 h-6 bg-gradient-to-b from-black/35 to-transparent" />

        <div className="relative mx-auto max-w-6xl px-4 py-4">
          {/* Верхній ряд */}
          <div className="flex items-start justify-between gap-4">
            {/* Ліво: лого + Beta */}
            <div className="flex items-center gap-3">
              <Link
                href="/"
                prefetch
                className="group flex h-12 w-12 items-center justify-center rounded-2xl bg-white/[0.08] ring-1 ring-white/10 shadow-[0_16px_50px_-30px_rgba(0,0,0,0.9)]"
                aria-label="На головну"
              >
                {/* глянець */}
                <div className="absolute h-12 w-12 rounded-2xl bg-gradient-to-b from-white/10 to-transparent opacity-80" />
                <span className="relative text-white">
                  <TridentMark className="h-6 w-6 drop-shadow-[0_6px_14px_rgba(0,0,0,0.55)]" />
                </span>
              </Link>

              <span className="inline-flex items-center rounded-full bg-white/[0.08] px-3 py-1 text-xs font-semibold text-white/85 ring-1 ring-white/10">
                Beta
              </span>
            </div>

            {/* Центр: заголовок + мета */}
            <div className="flex-1 text-center">
              <div className="text-[18px] font-extrabold tracking-tight text-white md:text-[20px]">
                єПотреба
              </div>

              <div className="mt-1 flex items-center justify-center gap-3 text-xs text-white/60">
                <span className="inline-flex items-center gap-1.5">
                  <IconCalendar className="h-4 w-4 opacity-70" />
                  Оновлюється з Google Sheets
                </span>
                <span className="h-3 w-px bg-white/15" />
                <span className="inline-flex items-center gap-1.5">
                  <IconClock className="h-4 w-4 opacity-70" />1 хв
                </span>
              </div>
            </div>

            {/* Право: pill пошук + hamburger */}
            <div className="flex items-center gap-2">
              <Link
                href="/applications"
                prefetch
                className="inline-flex h-11 items-center gap-2 rounded-full bg-white/[0.08] px-4 text-sm font-semibold text-white/90 ring-1 ring-white/10 transition hover:bg-white/[0.12]"
                aria-label="Пошук у каталозі"
              >
                <IconSearch className="h-5 w-5" />
                <span className="hidden sm:inline">Пошук</span>
              </Link>

              <button
                type="button"
                onClick={() => setOpen((v) => !v)}
                className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-white/[0.08] text-white/90 ring-1 ring-white/10 transition hover:bg-white/[0.12]"
                aria-label="Меню"
              >
                <IconMenu className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Нижній ряд: кнопка як у промті */}
          <div className="mt-4 flex justify-center md:justify-end">
            <Link
              href="/applications"
              prefetch
              className="inline-flex h-11 items-center justify-center rounded-full bg-white/[0.06] px-5 text-sm font-semibold text-white/85 ring-1 ring-white/10 transition hover:bg-white/[0.10] hover:text-white"
            >
              До всіх оновлень
            </Link>
          </div>

          {/* Випадаюче меню (з hamburger) */}
          {open && (
            <div className="mt-4 rounded-3xl bg-white/[0.06] p-3 ring-1 ring-white/10 backdrop-blur-2xl">
              <div className="grid gap-2 md:grid-cols-3">
                <Link
                  href="/applications"
                  prefetch
                  className="rounded-2xl bg-white/[0.06] px-4 py-3 text-sm font-semibold text-white/90 ring-1 ring-white/10 hover:bg-white/[0.10]"
                  onClick={() => setOpen(false)}
                >
                  Каталог заявок
                </Link>

                <Link
                  href="/about"
                  prefetch
                  className="rounded-2xl bg-white/[0.06] px-4 py-3 text-sm font-semibold text-white/90 ring-1 ring-white/10 hover:bg-white/[0.10]"
                  onClick={() => setOpen(false)}
                >
                  Про проєкт
                </Link>

                <Link
                  href="/admin"
                  prefetch
                  className="rounded-2xl bg-[#FFD500] px-4 py-3 text-sm font-extrabold text-black hover:bg-[#FFE166]"
                  onClick={() => setOpen(false)}
                >
                  Вхід
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}