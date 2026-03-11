import { cookies } from "next/headers";
import { LANGUAGE_COOKIE_KEY, normalizeLanguage } from "@/app/lib/language";

export async function getServerLanguage() {
  const cookieStore = await cookies();
  const cookieLanguage = cookieStore.get(LANGUAGE_COOKIE_KEY)?.value;
  return normalizeLanguage(cookieLanguage);
}
