export const LANGUAGE_STORAGE_KEY = "needs-lang";
export const LANGUAGE_COOKIE_KEY = "needs-lang";
export const SUPPORTED_LANGUAGES = ["uk", "en"];

export function normalizeLanguage(value) {
  return SUPPORTED_LANGUAGES.includes(value) ? value : "uk";
}
