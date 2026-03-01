// app/lib/needs.js

export const SHEETS_URL =
  "https://script.google.com/macros/s/AKfycbypMB1wcSzRSzNSxOZN1Pkl4HCgGzLCqh3R6LNAqKgmmiArr-cUABZTvcka5gjhJAejTg/exec";

// приводимо назви полів до єдиного формату
export function normalizeNeed(x) {
  return {
    id: x.id ?? "",
    title: x.title ?? "",
    community: x.community ?? "",
    category: x.category ?? "",
    budget_uah: x.budget_uah ?? x.budget ?? "",
    status: x.status ?? "",
    priority: x.priority ?? "",
    description: x.description ?? "",
    contact_name: x.contact_name ?? x.contactName ?? "",
    contact_email: x.contact_email ?? x.contactEmail ?? "",
    updated_at: x.updated_at ?? x.updatedAt ?? "",
  };
}

export async function fetchNeeds() {
  const res = await fetch(SHEETS_URL, { cache: "no-store" });

  if (!res.ok) {
    const txt = await res.text().catch(() => "");
    throw new Error(`Failed to fetch sheets: ${res.status} ${txt}`);
  }

  const raw = await res.json();

  const arr = Array.isArray(raw) ? raw : (raw?.data ?? []);
  return arr.map(normalizeNeed);
}