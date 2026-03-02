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
        active ? "bg-white/10 text-white" : "text-white/80 hover:bg-white/10 hover:text-white",
        "focus:outline-none focus:ring-2 focus:ring-white/30",
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
        "bg-white/10 text-white/90 hover:bg-white/15 hover:text-white",
        "focus:outline-none focus:ring-2 focus:ring-white/30",
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
        "bg-white/10 text-white/90 hover:bg-white/15 hover:text-white",
        "focus:outline-none focus:ring-2 focus:ring-white/30",
      ].join(" ")}
      title={title}
      aria-label={title}
    >
      {children}
    </button>
  );
}

export default function Header() {
  return (
    <header className="sticky top-0 z-50">
      <div className="border-b border-white/10 bg-black/70 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3">
          {/* Лого як у Мінцифри: знак у квадратику + Beta */}
          <Link href="/" prefetch className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10 ring-1 ring-white/10">
              <span className="text-white">
                <TridentMark className="h-6 w-6" />
              </span>
            </div>
            <span className="inline-flex items-center rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white/90 ring-1 ring-white/10">
              Beta
            </span>
          </Link>

          {/* Меню по центру (pill-стиль) */}
          <nav className="hidden items-center justify-center gap-1 md:flex">
            <NavLink href="/about">Про нас</NavLink>
            <NavLink href="/applications">Каталог заявок</NavLink>
          </nav>

          {/* Праворуч: іконки + CTA */}
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

        {/* Mobile меню */}
        <div className="mx-auto max-w-6xl px-4 pb-3 md:hidden">
          <div className="flex gap-2">
            <NavLink href="/about">Про нас</NavLink>
            <NavLink href="/applications">Каталог</NavLink>
          </div>
        </div>
      </div>
    </header>
  );
}