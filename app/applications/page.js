import ApplicationsClient from "./ui/ApplicationsClient";
import { fetchNeeds } from "@/app/lib/needs";
import { getServerLanguage } from "@/app/lib/server-language";

export const dynamic = "force-dynamic";

const COPY = {
  uk: {
    title: "ЗАЯВКИ",
    subtitle: "Каталог потреб громад. Фільтруйте за категоріями, статусами, громадами та пріоритетом.",
  },
  en: {
    title: "APPLICATIONS",
    subtitle: "Catalog of community needs. Filter by category, status, community, and priority.",
  },
};

export default async function ApplicationsPage() {
  const language = await getServerLanguage();
  const copy = COPY[language] ?? COPY.uk;
  const needs = await fetchNeeds();

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-950 to-black text-white">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="mb-10">
          <h1 className="text-5xl font-semibold tracking-tight md:text-6xl">{copy.title}</h1>
          <p className="mt-4 text-white/70">{copy.subtitle}</p>
        </div>
        <ApplicationsClient initialNeeds={needs} language={language} />
      </div>
    </main>
  );
}
