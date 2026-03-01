import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-black/40 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-3">
          <div className="grid h-9 w-9 place-items-center rounded-full bg-white/10 text-white">
            ЄП
          </div>
          <div className="leading-tight">
            <div className="text-sm font-semibold text-white">єПотреба</div>
            <div className="text-xs text-white/60">Потреби громад</div>
          </div>
        </Link>

        {/* Navigation */}
        <nav className="flex items-center gap-2">
          <Link
            href="/applications"
            className="rounded-xl px-3 py-2 text-sm text-white/80 hover:bg-white/10 hover:text-white"
          >
            Каталог заявок
          </Link>

          <Link
            href="/about"
            className="rounded-xl px-3 py-2 text-sm text-white/80 hover:bg-white/10 hover:text-white"
          >
            Про проєкт
          </Link>

          <div className="ml-2 rounded-xl bg-white/5 px-2 py-1 text-xs text-white/70">
            UA / EN
          </div>

          <Link
            href="/login"
            className="ml-2 rounded-xl bg-orange-500 px-4 py-2 text-sm font-semibold text-black hover:bg-orange-400"
          >
            Вхід
          </Link>
        </nav>
      </div>
    </header>
  );
}