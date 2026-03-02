"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

function NavLink({ href, children }) {
  const pathname = usePathname();
  const active =
    pathname === href || (href !== "/" && pathname?.startsWith(href));

  return (
    <Link
      href={href}
      prefetch
      className={[
        "inline-flex h-10 items-center justify-center rounded-xl px-4 text-sm font-semibold transition",
        active
          ? "bg-white/15 text-white"
          : "text-white/80 hover:bg-white/10 hover:text-white",
      ].join(" ")}
    >
      {children}
    </Link>
  );
}

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-black/40 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        {/* Left: Logo + brand */}
        <Link href="/" prefetch className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl border border-white/10 bg-white/5">
            <Image
              src="/kharkiv-ova-logo.svg"
              alt="Харківська ОВА"
              width={32}
              height={32}
              priority
            />
          </div>

          <div className="leading-tight">
            <div className="text-sm font-bold text-white">єПотреба</div>
            <div className="text-xs text-white/60">Потреби громад</div>
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
          <div className="hidden items-center rounded-xl border border-white/10 bg-white/5 p-1 md:flex">
            <button
              type="button"
              className="h-9 rounded-lg px-3 text-xs font-semibold text-white/80 hover:bg-white/10 hover:text-white"
              title="Українська"
            >
              UA
            </button>
            <button
              type="button"
              className="h-9 rounded-lg px-3 text-xs font-semibold text-white/80 hover:bg-white/10 hover:text-white"
              title="English"
            >
              EN
            </button>
          </div>

          <Link
            href="/admin"
            prefetch
            className="inline-flex h-10 items-center justify-center rounded-xl bg-orange-500 px-5 text-sm font-semibold text-black hover:bg-orange-400"
          >
            Вхід
          </Link>
        </div>
      </div>

      {/* Mobile nav */}
      <div className="mx-auto max-w-6xl px-4 pb-3 md:hidden">
        <div className="flex gap-2">
          <NavLink href="/applications">Каталог заявок</NavLink>
          <NavLink href="/about">Про проєкт</NavLink>
        </div>
      </div>
    </header>
  );
}