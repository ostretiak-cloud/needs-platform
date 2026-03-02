"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

function UkraineTrident({ className = "" }) {
  // Stylized Tryzub (recognizable silhouette) — currentColor
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 64 64"
      role="img"
      aria-label="Герб України"
    >
      <path
        fill="currentColor"
        d="M32 6c2.9 4.4 7.3 7.2 12.2 9.6v6.9c0 2.6-.6 5.1-1.9 7.3 2.9 1.8 4.7 4.9 4.7 8.4 0 2.9-1.1 5.6-3.1 7.6-2.1 2.1-5.1 3.4-8.5 3.4-2.6 0-4.9-.7-6.7-2-.5.4-1 .8-1.6 1.2l-1.6-2.2c1.9-1.3 3.2-2.6 4-3.9.7-1.1 1-2.3 1-3.8V12.7c-.9-.8-1.8-1.7-2.6-2.7-3 3.7-7.3 6.5-12.1 8.9v17.7c0 1.5.3 2.8 1 3.9.8 1.3 2.1 2.6 4 3.9l-1.6 2.2c-.6-.4-1.1-.8-1.6-1.2-1.9 1.3-4.2 2-6.7 2-3.4 0-6.4-1.3-8.5-3.4-2-2-3.1-4.7-3.1-7.6 0-3.5 1.8-6.6 4.7-8.4-1.3-2.2-1.9-4.7-1.9-7.3v-6.9C24.7 13.2 29.1 10.4 32 6Zm-6.8 26.6c-1.5 1.7-3.8 2.8-6.3 2.8-1.9 0-3.6-.6-4.9-1.6-1.6 1-2.6 2.8-2.6 4.8 0 1.5.6 2.9 1.7 4 1.2 1.2 2.9 2 4.9 2 1.7 0 3.2-.5 4.3-1.3-.4-.9-.7-1.8-.9-2.8-.6-3.2.5-7 3.8-9.9Zm13.6 0c3.3 2.9 4.4 6.7 3.8 9.9-.2 1-.5 1.9-.9 2.8 1.1.8 2.6 1.3 4.3 1.3 2 0 3.7-.8 4.9-2 1.1-1.1 1.7-2.5 1.7-4 0-2-1-3.8-2.6-4.8-1.3 1-3 1.6-4.9 1.6-2.5 0-4.8-1.1-6.3-2.8ZM32 26.3c-2.4 2.5-4.9 3.7-7.8 4.2v6.2c0 2.9 1 5.4 3 7.3 1.3 1.3 2.9 2.2 4.8 2.8 1.9-.6 3.5-1.5 4.8-2.8 2-1.9 3-4.4 3-7.3v-6.2c-2.9-.5-5.4-1.7-7.8-4.2Z"
        opacity="0.95"
      />
    </svg>
  );
}

function IconContrast({ className = "" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path d="M12 3v18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function IconAccessibility({ className = "" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" fill="currentColor" />
      <path
        d="M4 8.5c2.6 1.3 5.3 2 8 2s5.4-.7 8-2"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path d="M10 22l2-8 2 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M12 14V10.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function NavLink({ href, children }) {
  const pathname = usePathname();
  const active = pathname === href || (href !== "/" && pathname?.startsWith(href));

  return (
    <Link
      href={href}
      prefetch
      className={[
        "inline-flex h-10 items-center justify-center rounded-full px-4 text-sm font-semibold transition",
        active ? "bg-white/10 text-white" : "text-white/75 hover:bg-white/10 hover:text-white",
        "focus:outline-none focus:ring-2 focus:ring-white/25",
      ].join(" ")}
    >
      {children}
    </Link>
  );
}

function RoundIconButton({ title, children }) {
  return (
    <button
      type="button"
      className={[
        "inline-flex h-11 w-11 items-center justify-center rounded-full transition",
        "bg-white/[0.07] text-white/90 hover:bg-white/[0.11] hover:text-white",
        "ring-1 ring-white/10",
        "focus:outline-none focus:ring-2 focus:ring-white/25",
      ].join(" ")}
      title={title}
      aria-label={title}
    >
      {children}
    </button>
  );
}

export default function Header() {
  const noiseBg =
    "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='160' height='160' filter='url(%23n)' opacity='.20'/%3E%3C/svg%3E\")";

  return (
    <header className="sticky top-0 z-50">
      <div className="relative">
        {/* base graphite gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B0B0F] to-[#121218]" />
        {/* glass layers */}
        <div className="absolute inset-0 bg-white/[0.07] backdrop-blur-3xl" />
        <div className="absolute inset-0 bg-black/25" />
        {/* noise */}
        <div
          className="pointer-events-none absolute inset-0 opacity-30 mix-blend-overlay"
          style={{ backgroundImage: noiseBg }}
        />
        {/* subtle top highlight */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-white/10" />
        {/* soft bottom fade */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-8 bg-gradient-to-b from-transparent via-black/10 to-black/25" />
        {/* soft shadow down */}
        <div className="pointer-events-none absolute -bottom-6 inset-x-0 h-8 bg-gradient-to-b from-black/35 to-transparent blur-md opacity-70" />

        <div
          className={[
            "relative",
            "shadow-[0_20px_60px_-40px_rgba(0,0,0,0.95)]",
            "outline outline-1 outline-white/5",
          ].join(" ")}
        >
          <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3">
            {/* Left */}
            <Link href="/" prefetch className="flex items-center gap-3 min-w-0">
              <div className="relative flex h-11 w-11 items-center justify-center rounded-2xl bg-white/[0.08] ring-1 ring-white/10 shadow-[0_16px_50px_-30px_rgba(0,0,0,0.9)]">
                <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-b from-white/12 to-transparent" />
                <span className="relative text-white">
                  {/* Герб України (Тризуб) */}
                  <UkraineTrident className="h-7 w-7 drop-shadow-[0_6px_14px_rgba(0,0,0,0.55)]" />
                </span>
              </div>

              {/* Назва більшою + у 2 строки */}
              <span className="text-white/92 leading-tight">
                <span className="block text-[15px] font-semibold sm:text-[16px]">
                  Харківська обласна
                </span>
                <span className="block text-[15px] font-semibold sm:text-[16px]">
                  військова адміністрація
                </span>
              </span>
            </Link>

            {/* Center nav */}
            <nav className="hidden items-center justify-center gap-1 md:flex">
              <NavLink href="/about">Про проєкт</NavLink>
              <NavLink href="/applications">Каталог заявок</NavLink>
            </nav>

            {/* Right */}
            <div className="flex items-center gap-2">
              <RoundIconButton title="Контраст">
                <IconContrast className="h-5 w-5" />
              </RoundIconButton>

              <RoundIconButton title="Доступність">
                <IconAccessibility className="h-5 w-5" />
              </RoundIconButton>

              <Link
                href="/admin"
                prefetch
                className={[
                  "ml-1 inline-flex h-11 items-center justify-center rounded-full px-5 text-sm font-extrabold transition",
                  "bg-[#FFD500] text-black hover:bg-[#FFE166]",
                  "shadow-[0_16px_40px_-24px_rgba(255,213,0,0.9)]",
                  "focus:outline-none focus:ring-2 focus:ring-[#FFD500]/40",
                ].join(" ")}
              >
                Вхід
              </Link>
            </div>
          </div>

          {/* Mobile nav */}
          <div className="mx-auto max-w-6xl px-4 pb-3 md:hidden">
            <div className="flex gap-2">
              <NavLink href="/about">Про проєкт</NavLink>
              <NavLink href="/applications">Каталог</NavLink>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}