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

export async function createNeed(payload) {
  const base = process.env.SHEETS_API_URL || SHEETS_URL;

  const res = await fetch(base, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    cache: "no-store",
    body: JSON.stringify({
      action: "create",
      ...payload,
    }),
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok || data?.error) {
    throw new Error(data?.error || `Failed to create need: ${res.status}`);
  }

  return data;
}
