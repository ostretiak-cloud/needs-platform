"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

function IconContrast({ className = "" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <path d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z" stroke="currentColor" strokeWidth="2"/>
      <path d="M12 3v18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  );
}

function IconAccessibility({ className = "" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <path d="M12 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" fill="currentColor"/>
      <path d="M4 8.5c2.6 1.3 5.3 2 8 2s5.4-.7 8-2" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <path d="M10 22l2-8 2 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <path d="M12 14V10.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  );
}

function NavLink({ href, children }) {
  const pathname = usePathname();
  const active = pathname === href || (href !== "/" && pathname?.startsWith(href));

  return (
    <Link
      href={href}
      className={[
        "inline-flex h-10 items-center justify-center rounded-full px-4 text-sm font-semibold transition",
        active ? "bg-white/10 text-white" : "text-white/75 hover:bg-white/10 hover:text-white",
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
      className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/[0.07] text-white/90 hover:bg-white/[0.11] ring-1 ring-white/10 transition"
      title={title}
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
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B0B0F] to-[#121218]" />
        <div className="absolute inset-0 bg-white/[0.07] backdrop-blur-3xl" />
        <div className="absolute inset-0 bg-black/25" />

        <div
          className="pointer-events-none absolute inset-0 opacity-30 mix-blend-overlay"
          style={{ backgroundImage: noiseBg }}
        />

        <div className="relative shadow-[0_20px_60px_-40px_rgba(0,0,0,0.95)] outline outline-1 outline-white/5">
          <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3">

            {/* LEFT */}
            <Link href="/" className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/[0.08] ring-1 ring-white/10">
                
                {/* ОФІЦІЙНИЙ ГЕРБ */}
                <img
                  src="/coat.svg"
                  alt="Герб України"
                  className="h-7 w-7 object-contain"
                  style={{ filter: "brightness(0) invert(1)" }}
                />
              </div>

              <div className="leading-tight">
                <div className="text-[16px] font-semibold">
                  Харківська обласна
                </div>
                <div className="text-[16px] font-semibold">
                  військова адміністрація
                </div>
              </div>
            </Link>

            {/* CENTER */}
            <nav className="hidden md:flex gap-1">
              <NavLink href="/about">Про проєкт</NavLink>
              <NavLink href="/applications">Каталог заявок</NavLink>
            </nav>

            {/* RIGHT */}
            <div className="flex items-center gap-2">
              <RoundIconButton title="Контраст">
                <IconContrast className="h-5 w-5" />
              </RoundIconButton>

              <RoundIconButton title="Доступність">
                <IconAccessibility className="h-5 w-5" />
              </RoundIconButton>

              <Link
                href="/admin"
                className="ml-1 inline-flex h-11 items-center justify-center rounded-full px-5 text-sm font-extrabold bg-[#FFD500] text-black hover:bg-[#FFE166] transition"
              >
                Вхід
              </Link>
            </div>

          </div>
        </div>
      </div>
    </header>
  );
}