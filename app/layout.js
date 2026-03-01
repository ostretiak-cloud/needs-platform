// app/layout.js
import "./globals.css";

export const metadata = {
  title: "Needs Platform",
  description: "Каталог потреб громад",
};

export default function RootLayout({ children }) {
  return (
    <html lang="uk">
      <body className="min-h-screen bg-gradient-to-b from-black via-slate-950 to-slate-900 text-white">
        {/* Header */}
        <header className="sticky top-0 z-50 border-b border-white/10 bg-black/30 backdrop-blur">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
            <a href="/" className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-xl bg-white/10 ring-1 ring-white/15 flex items-center justify-center">
                <span className="text-sm font-bold">NP</span>
              </div>
              <div className="leading-tight">
                <div className="text-sm font-semibold">Needs Platform</div>
                <div className="text-[11px] text-white/60">Потреби громад</div>
              </div>
            </a>

            <nav className="flex items-center gap-2">
              <a
                href="/applications"
                className="rounded-xl px-3 py-2 text-sm text-white/80 hover:text-white hover:bg-white/10 transition"
              >
                Каталог
              </a>
              <a
                href="/admin"
                className="rounded-xl px-3 py-2 text-sm text-white/80 hover:text-white hover:bg-white/10 transition"
              >
                Адмін
              </a>
              <a
                href="/applications"
                className="rounded-xl bg-amber-500 px-3 py-2 text-sm font-semibold text-black hover:bg-amber-400 transition"
              >
                Дивитись заявки
              </a>
            </nav>
          </div>
        </header>

        {children}

        {/* Footer */}
        <footer className="border-t border-white/10 mt-16">
          <div className="mx-auto max-w-6xl px-4 py-8 text-sm text-white/50">
            © {new Date().getFullYear()} Needs Platform
          </div>
        </footer>
      </body>
    </html>
  );
}