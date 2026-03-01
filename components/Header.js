// components/Header.js
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();

  const NavLink = ({ href, children }) => {
    const active = pathname === href || (href !== "/" && pathname?.startsWith(href));
    return (
      <Link
        href={href}
        className={[
          "rounded-xl px-3 py-2 text-sm transition",
          active
            ? "bg-white/10 text-white"
            : "text-white/75 hover:bg-white/10 hover:text-white",
        ].join(" ")}
      >
        {children}
      </Link>
    );
  };

  return (
    <header className="sticky top-0 z-50">
      {/* top glow */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-orange-500/10 to-transparent" />
      <div className="border-b border-white/10 bg-black/50 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          {/* Brand */}
          <Link href="/" className="group flex items-center gap-3">
            <div className="grid h-9 w-9 place-items-center rounded-xl bg-white/10 text-white shadow-[0_0_0_1px_rgba(255,255,255,0.06)] group-hover:bg-white/15">
              ЄП
            </div>
            <div className="leading-tight">
              <div className="text-sm font-semibold text-white">єПотреба</div>
              <div className="text-xs text-white/60">Потреби громад</div>
            </div>
          </Link>

          {/* Nav */}
          <nav className="flex items-center gap-1">
            <NavLink href="/applications">Каталог заявок</NavLink>
            <NavLink href="/about">Про проєкт</NavLink>

            {/* Мови (поки UI, без логіки) */}
            <div className="ml-2 hidden items-center gap-1 rounded-xl border border-white/10 bg-white/5 p-1 sm:flex">
              <button className="rounded-lg bg-white/10 px-2 py-1 text-xs text-white">UA</button>
              <button className="rounded-lg px-2 py-1 text-xs text-white/70 hover:bg-white/10 hover:text-white">
                EN
              </button>
            </div>

            <Link
              href="/login"
              className="ml-2 rounded-xl bg-orange-500 px-4 py-2 text-sm font-semibold text-black transition hover:bg-orange-400"
            >
              Вхід
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}