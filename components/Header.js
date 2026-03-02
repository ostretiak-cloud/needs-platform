"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

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
    "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='180' height='180' filter='url(%23n)' opacity='.45'/%3E%3C/svg%3E\")";

  return (
    <header className="sticky top-0 z-50">
      <div className="relative">
        {/* ✅ NEW: navy -> deep green gradient (як на твоєму скріні) */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#071427] via-[#071A22] to-[#071E12]" />

        {/* додатковий “внутрішній” радіальний тон зверху (наві) */}
        <div className="absolute inset-0 bg-[radial-gradient(1100px_320px_at_50%_-120px,rgba(40,90,255,0.18),transparent_60%)]" />

        {/* додатковий “внутрішній” радіальний тон знизу (зелений) */}
        <div className="absolute inset-0 bg-[radial-gradient(900px_360px_at_55%_140%,rgba(0,170,90,0.16),transparent_55%)]" />

        {/* glass layers */}
        <div className="absolute inset-0 bg-white/[0.06] backdrop-blur-3xl" />
        <div className="absolute inset-0 bg-black/25" />

        {/* noise */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.18] mix-blend-overlay"
          style={{ backgroundImage: noiseBg }}
        />

        {/* subtle top highlight */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-white/10" />

        {/* soft bottom fade (no hard line) */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-10 bg-gradient-to-b from-transparent via-black/10 to-black/30" />

        {/* soft shadow down */}
        <div className="pointer-events-none absolute -bottom-6 inset-x-0 h-10 bg-gradient-to-b from-black/35 to-transparent blur-md opacity-70" />

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

                {/* Герб: mask (працює з твоїм “обрізаним” coat.svg) */}
                <span
                  aria-hidden="true"
                  className="relative h-7 w-7"
                  style={{
                    backgroundColor: "rgba(255,255,255,0.96)",
                    WebkitMaskImage: "url(/coat.svg)",
                    WebkitMaskRepeat: "no-repeat",
                    WebkitMaskPosition: "center",
                    WebkitMaskSize: "contain",
                    maskImage: "url(/coat.svg)",
                    maskRepeat: "no-repeat",
                    maskPosition: "center",
                    maskSize: "contain",
                    filter: "drop-shadow(0 6px 14px rgba(0,0,0,0.55))",
                  }}
                />
                <span className="sr-only">Герб України</span>
              </div>

              {/* Title */}
              <div className="leading-tight">
                <div className="text-[16px] font-semibold text-white sm:text-[17px]">
                  Харківська обласна
                </div>
                <div className="text-[16px] font-semibold text-white sm:text-[17px]">
                  військова адміністрація
                </div>
              </div>
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