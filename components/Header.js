"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

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

function A11yMenuButton({ title, onClick, children, expanded = false }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "inline-flex h-11 w-11 items-center justify-center rounded-full transition",
        "bg-white/[0.07] text-white/90 hover:bg-white/[0.11] hover:text-white",
        "ring-1 ring-white/10",
        "focus:outline-none focus:ring-2 focus:ring-white/25",
      ].join(" ")}
      title={title}
      aria-label={title}
      aria-haspopup="dialog"
      aria-expanded={expanded}
    >
      {children}
    </button>
  );
}

const A11Y_STORAGE_KEY = "needs-a11y-settings";
const DEFAULT_SETTINGS = {
  highContrast: false,
  largerText: false,
  reduceMotion: false,
  underlineLinks: false,
};

function applyA11ySettings(settings) {
  if (typeof document === "undefined") return;

  const root = document.documentElement;
  root.classList.toggle("a11y-high-contrast", settings.highContrast);
  root.classList.toggle("a11y-larger-text", settings.largerText);
  root.classList.toggle("a11y-reduce-motion", settings.reduceMotion);
  root.classList.toggle("a11y-underline-links", settings.underlineLinks);
}

function A11yToggle({ id, label, checked, onChange }) {
  return (
    <label htmlFor={id} className="flex cursor-pointer items-start justify-between gap-4 rounded-xl bg-white/[0.03] px-3 py-2 text-sm">
      <span className="pt-0.5 text-white/90">{label}</span>
      <span className="relative mt-0.5 inline-flex items-center">
        <input
          id={id}
          type="checkbox"
          className="peer sr-only"
          checked={checked}
          onChange={onChange}
        />
        <span className="h-5 w-10 rounded-full bg-white/20 transition peer-checked:bg-[#FFD500]" />
        <span className="pointer-events-none absolute left-0.5 h-4 w-4 rounded-full bg-white transition peer-checked:translate-x-5" />
      </span>
    </label>
  );
}

export default function Header() {
  const [isA11yMenuOpen, setA11yMenuOpen] = useState(false);
  const [a11ySettings, setA11ySettings] = useState(() => {
    if (typeof window === "undefined") return DEFAULT_SETTINGS;

    const savedSettings = window.localStorage.getItem(A11Y_STORAGE_KEY);
    if (!savedSettings) return DEFAULT_SETTINGS;

    try {
      return { ...DEFAULT_SETTINGS, ...JSON.parse(savedSettings) };
    } catch {
      window.localStorage.removeItem(A11Y_STORAGE_KEY);
      return DEFAULT_SETTINGS;
    }
  });
  const menuRef = useRef(null);
  const noiseBg =
    "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='180' height='180' filter='url(%23n)' opacity='.45'/%3E%3C/svg%3E\")";

  useEffect(() => {
    applyA11ySettings(a11ySettings);
    if (typeof window !== "undefined") {
      window.localStorage.setItem(A11Y_STORAGE_KEY, JSON.stringify(a11ySettings));
    }
  }, [a11ySettings]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (!menuRef.current || menuRef.current.contains(event.target)) return;
      setA11yMenuOpen(false);
    }

    function handleEscape(event) {
      if (event.key === "Escape") {
        setA11yMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const toggleSetting = (key) => {
    setA11ySettings((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <header className="sticky top-0 z-50">
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-b from-[#071427] via-[#071A22] to-[#071E12]" />
        <div className="absolute inset-0 bg-[radial-gradient(1100px_320px_at_50%_-120px,rgba(40,90,255,0.18),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(900px_360px_at_55%_140%,rgba(0,170,90,0.16),transparent_55%)]" />
        <div className="absolute inset-0 bg-white/[0.06] backdrop-blur-3xl" />
        <div className="absolute inset-0 bg-black/25" />

        <div
          className="pointer-events-none absolute inset-0 opacity-[0.18] mix-blend-overlay"
          style={{ backgroundImage: noiseBg }}
        />

        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-white/10" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-10 bg-gradient-to-b from-transparent via-black/10 to-black/30" />
        <div className="pointer-events-none absolute -bottom-6 inset-x-0 h-10 bg-gradient-to-b from-black/35 to-transparent blur-md opacity-70" />

        <div
          className={[
            "relative",
            "shadow-[0_20px_60px_-40px_rgba(0,0,0,0.95)]",
            "outline outline-1 outline-white/5",
          ].join(" ")}
        >
          <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3">
            <Link href="/" prefetch className="flex items-center gap-3 min-w-0">
              <div className="relative flex h-11 w-11 items-center justify-center rounded-2xl bg-white/[0.08] ring-1 ring-white/10 shadow-[0_16px_50px_-30px_rgba(0,0,0,0.9)]">
                <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-b from-white/12 to-transparent" />
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

              <div className="leading-tight">
                <div className="text-[16px] font-semibold text-white sm:text-[17px]">Харківська обласна</div>
                <div className="text-[16px] font-semibold text-white sm:text-[17px]">
                  військова адміністрація
                </div>
              </div>
            </Link>

            <nav className="hidden items-center justify-center gap-1 md:flex">
              <NavLink href="/about">Про проєкт</NavLink>
              <NavLink href="/applications">Каталог заявок</NavLink>
            </nav>

            <div className="relative flex items-center gap-2" ref={menuRef}>
              <A11yMenuButton
                title="Контраст та доступність"
                onClick={() => setA11yMenuOpen((open) => !open)}
                expanded={isA11yMenuOpen}
              >
                <span className="relative inline-flex">
                  <IconAccessibility className="h-5 w-5" />
                  <IconContrast className="-ml-1 h-5 w-5 opacity-90" />
                </span>
              </A11yMenuButton>

              {isA11yMenuOpen && (
                <div className="absolute right-0 top-14 z-50 w-72 rounded-2xl border border-white/10 bg-[#081421]/95 p-3 shadow-2xl backdrop-blur-md">
                  <div className="mb-2 px-1 text-sm font-semibold text-white">Налаштування доступності</div>
                  <div className="space-y-2">
                    <A11yToggle
                      id="highContrast"
                      label="Високий контраст"
                      checked={a11ySettings.highContrast}
                      onChange={() => toggleSetting("highContrast")}
                    />
                    <A11yToggle
                      id="largerText"
                      label="Збільшений розмір тексту"
                      checked={a11ySettings.largerText}
                      onChange={() => toggleSetting("largerText")}
                    />
                    <A11yToggle
                      id="reduceMotion"
                      label="Зменшення анімацій"
                      checked={a11ySettings.reduceMotion}
                      onChange={() => toggleSetting("reduceMotion")}
                    />
                    <A11yToggle
                      id="underlineLinks"
                      label="Підкреслювати посилання"
                      checked={a11ySettings.underlineLinks}
                      onChange={() => toggleSetting("underlineLinks")}
                    />
                  </div>
                </div>
              )}

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
