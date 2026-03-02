"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

function TridentMark({ className = "" }) {
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

function RoundIconLink({ title, href, children }) {
  return (
    <Link
      href={href}
      prefetch
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
      {/* Без border-b: лінію прибрали. Робимо м’який “преміальний” край через тінь. */}
      <div className="relative">
        {/* base graphite gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B0B0F] to-[#121218]" />

        {/* glass layers: більш “молочний” blur як у Мінцифри */}
        <div className="absolute inset-0 bg-white/[0.07] backdrop-blur-3xl" />
        <div className="absolute inset-0 bg-black/25" />

        {/* noise */}
        <div
          className="pointer-events-none absolute inset-0 opacity-30 mix-blend-overlay"
          style={{ backgroundImage: noiseBg }}
        />

        {/* subtle top highlight */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-white/10" />

        {/* замість “білої полоски” внизу: дуже м’який внутрішній fade */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-8 bg-gradient-to-b from-transparent via-black/10 to-black/25" />

        {/* м’яка тінь вниз, щоб край не був жорсткий */}
        <div className="pointer-events-none absolute -bottom-6 inset-x-0 h-8 bg-gradient-to-b from-black/35 to-transparent blur-md opacity-70" />

        <div
          className={[
            "relative",
            "shadow-[0_20px_60px_-40px_rgba(0,0,0,0.95)]",
            "outline outline-1 outline-white/5", // дуже делікатна рамка замість бордера
          ].join(" ")}
        >
          <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3">
            {/* Left */}
            <Link href="/" prefetch className="flex items-center gap-3">
              <div className="relative flex h-11 w-11 items-center justify-center rounded-2xl bg-white/[0.08] ring-1 ring-white/10 shadow-[0_16px_50px_-30px_rgba(0,0,0,0.9)]">
                <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-b from-white/12 to-transparent" />
                <span className="relative text-white">
                  <TridentMark className="h-6 w-6 drop-shadow-[0_6px_14px_rgba(0,0,0,0.55)]" />
                </span>
              </div>

              <span className="inline-flex items-center rounded-full bg-white/[0.08] px-3 py-1 text-xs font-semibold text-white/85 ring-1 ring-white/10">
                Beta
              </span>
            </Link>

            {/* Center nav */}
            <nav className="hidden items-center justify-center gap-1 md:flex">
              <NavLink href="/about">Про нас</NavLink>
              <NavLink href="/applications">Каталог заявок</NavLink>
            </nav>

            {/* Right */}
            <div className="flex items-center gap-2">
              <RoundIconLink title="Пошук" href="/applications">
                <IconSearch className="h-5 w-5" />
              </RoundIconLink>

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
              <NavLink href="/about">Про нас</NavLink>
              <NavLink href="/applications">Каталог</NavLink>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}