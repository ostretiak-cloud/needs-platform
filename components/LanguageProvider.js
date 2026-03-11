"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { LANGUAGE_COOKIE_KEY, LANGUAGE_STORAGE_KEY, normalizeLanguage } from "@/app/lib/language";

const LanguageContext = createContext({
  language: "uk",
  setLanguage: () => {},
});

export function LanguageProvider({ initialLanguage = "uk", children }) {
  const [language, setLanguage] = useState(() => {
    if (typeof window === "undefined") return normalizeLanguage(initialLanguage);
    return normalizeLanguage(window.localStorage.getItem(LANGUAGE_STORAGE_KEY) || initialLanguage);
  });

  useEffect(() => {
    if (typeof window === "undefined") return;

    const normalized = normalizeLanguage(language);
    window.localStorage.setItem(LANGUAGE_STORAGE_KEY, normalized);
    document.documentElement.lang = normalized;
    document.cookie = `${LANGUAGE_COOKIE_KEY}=${normalized}; path=/; max-age=31536000; samesite=lax`;
  }, [language]);

  const value = useMemo(
    () => ({
      language,
      setLanguage: (nextLanguage) => setLanguage(normalizeLanguage(nextLanguage)),
    }),
    [language],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  return useContext(LanguageContext);
}
