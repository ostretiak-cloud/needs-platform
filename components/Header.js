"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

function LogoHOVA({ className = "" }) {
  // SVG інлайном, щоб НЕ додавати нові файли в repo/public і не ламати структуру
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1553.37 227.08"
      role="img"
      aria-label="Харківська ОВА"
    >
      <defs>
        <style>{`.cls-1{fill:currentColor;}`}</style>
      </defs>
      <g>
        <g>
          <g>
            <path
              className="cls-1"
              d="M271.76,78.53l-18.77-26.62-18.39,26.62h-16.86l26.81-37.35-25.28-35.43h16.85l17.24,24.52,17.43-24.52h16.28l-25.09,35.24,26.62,37.54h-16.86Z"
            />
            <path
              className="cls-1"
              d="M347.41,66.65v11.88c-.96.19-2.49.38-4.98.38-7.09,0-10.72-2.68-11.68-8.81-4.22,5.74-11.68,9.38-20.11,9.38-11.11,0-18.77-6.7-18.77-16.86,0-14.56,13.79-17.43,24.71-18.77,7.47-.96,12.26-1.92,12.26-5.75,0-4.02-4.21-6.7-11.11-6.7-6.13,0-11.68,2.49-16.28,7.09l-8.24-8.62c6.7-6.32,15.13-9.77,25.28-9.77,14.56,0,23.17,7.28,23.17,19.15v23.94c0,2.3,1.15,3.45,3.45,3.45h2.3ZM328.44,56.31v-5.94c-2.3,1.34-5.55,1.92-10.34,2.68-6.51,1.15-12.83,2.11-12.83,8.43,0,4.41,3.06,7.09,8.24,7.09,8.24,0,14.94-5.55,14.94-12.26Z"
            />
            <path
              className="cls-1"
              d="M416.16,49.8c0,17.81-10.15,29.69-24.71,29.69-7.66,0-13.98-2.87-18.39-8.24v26.43h-13.79V21.07h12.26l.77,8.62c4.4-6.13,11.11-9.58,19.15-9.58,14.94,0,24.71,11.68,24.71,29.69ZM402.18,49.8c0-11.11-5.75-18.2-14.94-18.2s-14.75,7.09-14.75,18.2,5.55,18.2,14.75,18.2,14.94-7.09,14.94-18.2Z"
            />
            <path
              className="cls-1"
              d="M450.25,53.24l-7.85,7.47v17.81h-13.79V21.07h13.79v24.13l23.56-24.13h17.24l-23.37,22.6,24.32,34.86h-16.47l-17.43-25.28Z"
            />
            <path
              className="cls-1"
              d="M493.34,1.15h14.94v12.26h-14.94V1.15ZM493.91,21.07h13.79v57.46h-13.79V21.07Z"
            />
            <path
              className="cls-1"
              d="M574.54,62.82c0,10.15-7.85,15.7-20.88,15.7h-28.35V21.07h26.24c13.41,0,21.45,4.79,21.45,15.13,0,6.32-3.26,10.72-8.24,12.83,6.32,2.11,9.77,6.9,9.77,13.79ZM538.34,44.24h13.22c5.55,0,8.04-1.91,8.04-6.51,0-4.02-2.68-6.32-7.66-6.32h-13.6v12.83ZM560.75,61.1c0-4.4-3.26-7.09-8.81-7.09h-13.6v13.98h13.98c5.36,0,8.43-2.68,8.43-6.9Z"
            />
            <path
              className="cls-1"
              d="M582.77,49.8c0-17.81,11.88-29.69,29.3-29.69,12.83,0,22.98,6.32,26.24,17.24l-13.22,4.02c-2.11-6.13-6.7-9.77-13.22-9.77-9.19,0-14.94,7.09-14.94,18.2s5.75,18.2,14.94,18.2c6.51,0,11.11-3.64,13.41-9.77l13.02,4.02c-3.26,10.92-13.41,17.24-26.24,17.24-17.43,0-29.3-11.88-29.3-29.69Z"
            />
            <path
              className="cls-1"
              d="M698.84,59.95c0,11.49-8.43,18.58-21.64,18.58h-28.15V21.07h13.79v20.3h14.36c13.41,0,21.64,7.09,21.64,18.58ZM684.85,59.76c0-4.98-3.45-7.66-9.58-7.66h-12.45v15.51h12.45c6.13,0,9.58-2.68,9.58-7.85Z"
            />
          </g>
        </g>
      </g>
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
        "inline-flex h-10 items-center justify-center rounded-xl px-4 text-sm font-semibold transition",
        "focus:outline-none focus:ring-2 focus:ring-white/70 focus:ring-offset-2 focus:ring-offset-transparent",
        active
          ? "bg-white text-[#0B4AA2] shadow-[0_10px_30px_-18px_rgba(255,255,255,0.65)]"
          : "text-white/90 hover:bg-white/15 hover:text-white",
      ].join(" ")}
    >
      {children}
    </Link>
  );
}

export default function Header() {
  return (
    <header className="sticky top-0 z-50">
      {/* Мінцифровий верхній бар */}
      <div className="relative border-b border-white/15 bg-gradient-to-r from-[#0B4AA2] via-[#0EA5E9] to-[#2563EB]">
        {/* легкий glass-шар */}
        <div className="absolute inset-0 bg-white/5 backdrop-blur" />
        {/* декоративний світлий блік */}
        <div className="pointer-events-none absolute -top-24 left-1/2 h-48 w-[520px] -translate-x-1/2 rounded-full bg-white/15 blur-3xl" />

        <div className="relative mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
          {/* Left: Logo + brand */}
          <Link href="/" prefetch className="group flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/20 bg-white/10 shadow-[0_10px_30px_-18px_rgba(0,0,0,0.6)]">
              <span className="text-white">
                <LogoHOVA className="h-7 w-auto" />
              </span>
            </div>

            <div className="leading-tight">
              <div className="text-sm font-extrabold tracking-tight text-white">
                єПотреба
                <span className="ml-2 inline-flex items-center rounded-full bg-[#FFD500] px-2 py-0.5 text-[10px] font-extrabold text-[#0B4AA2]">
                  beta
                </span>
              </div>
              <div className="text-xs text-white/85">Потреби громад</div>
            </div>
          </Link>

          {/* Center: nav */}
          <nav className="hidden items-center gap-2 md:flex">
            <NavLink href="/applications">Каталог заявок</NavLink>
            <NavLink href="/about">Про проєкт</NavLink>
          </nav>

          {/* Right: lang + login */}
          <div className="flex items-center gap-2">
            {/* Мова (UI, поки без i18n) */}
            <div className="hidden items-center rounded-2xl border border-white/20 bg-white/10 p-1 md:flex">
              <button
                type="button"
                className="h-9 rounded-xl px-3 text-xs font-bold text-white/90 hover:bg-white/15 hover:text-white"
                title="Українська"
              >
                UA
              </button>
              <button
                type="button"
                className="h-9 rounded-xl px-3 text-xs font-bold text-white/90 hover:bg-white/15 hover:text-white"
                title="English"
              >
                EN
              </button>
            </div>

            <Link
              href="/admin"
              prefetch
              className={[
                "inline-flex h-10 items-center justify-center rounded-2xl px-5 text-sm font-extrabold transition",
                "bg-[#FFD500] text-[#0B4AA2] hover:bg-[#FFE166]",
                "shadow-[0_16px_40px_-24px_rgba(255,213,0,0.9)]",
                "focus:outline-none focus:ring-2 focus:ring-white/70 focus:ring-offset-2 focus:ring-offset-transparent",
              ].join(" ")}
            >
              Вхід
            </Link>
          </div>
        </div>

        {/* Mobile nav */}
        <div className="relative mx-auto max-w-6xl px-4 pb-3 md:hidden">
          <div className="flex gap-2">
            <NavLink href="/applications">Каталог заявок</NavLink>
            <NavLink href="/about">Про проєкт</NavLink>
          </div>
        </div>
      </div>
    </header>
  );
}