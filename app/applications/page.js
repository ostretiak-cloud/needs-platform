// app/applications/page.js
import ApplicationsClient from "./ui/ApplicationsClient";
import { fetchNeeds } from "@/app/lib/needs";

export const dynamic = "force-dynamic";

export default async function ApplicationsPage() {
  const needs = await fetchNeeds();

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-950 to-black text-white">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="mb-10">
          <h1 className="text-5xl md:text-6xl font-semibold tracking-tight">ЗАЯВКИ</h1>
          <p className="mt-4 text-white/70">
            Каталог потреб громад. Фільтруйте за категоріями, статусами, громадами та пріоритетом.
          </p>
        </div>

        <ApplicationsClient initialNeeds={needs} />
      </div>
    </main>
  );
}