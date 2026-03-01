// app/applications/page.js
import ApplicationsClient from "./ui/ApplicationsClient";
import { headers } from "next/headers";

export const dynamic = "force-dynamic";

async function getNeeds() {
  const h = headers();
  const host = h.get("host");
  const proto = process.env.VERCEL ? "https" : "http"; // на Vercel завжди https

  const res = await fetch(`${proto}://${host}/api/needs`, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to load needs");
  return res.json();
}

export default async function ApplicationsPage() {
  const needs = await getNeeds();

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-950 to-black text-white">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="mb-8">
          <h1 className="text-5xl md:text-6xl font-semibold tracking-tight">ЗАЯВКИ</h1>
          <p className="mt-3 text-white/70">
            Каталог потреб громад. Фільтруйте за категоріями, громадами та пріоритетом.
          </p>
        </div>

        <ApplicationsClient initialNeeds={needs} />
      </div>
    </main>
  );
}