// app/lib/needs.js

export const SHEETS_URL =
  "https://script.google.com/macros/s/AKfycbypMB1wcSzRSzNSxOZN1Pkl4HCgGzLCqh3R6LNAqKgmmiArr-cUABZTvcka5gjhJAejTg/exec";

function appendQuery(url, params) {
  const u = new URL(url);
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && String(value).trim() !== "") {
      u.searchParams.set(key, String(value));
    }
  });
  return u.toString();
}

function toHumanCreateError(rawError) {
  const text = String(rawError || "");
  if (text.toLowerCase().includes("mode=admin is required")) {
    return "Сервіс подачі заявок для громади ще не увімкнено на Apps Script (community mode). Зверніться до адміністратора платформи.";
  }
  if (text.toLowerCase().includes("unauthorized") || text.toLowerCase().includes("bad key")) {
    return "Сервіс подачі заявок тимчасово недоступний через помилку авторизації.";
  }
  return "Не вдалося подати заявку. Спробуйте ще раз або зверніться до адміністратора.";
}

// приводимо назви полів до єдиного формату
export function normalizeNeed(x) {
  return {
    id: x.id ?? "",
    title: x.title ?? "",
    community: x.community ?? "",
    category: x.category ?? "",
    budget_uah: x.budget_uah ?? x.budget ?? "",
    budget: x.budget ?? x.budget_uah ?? "",
    status: x.status ?? "",
    priority: x.priority ?? "",
    description: x.description ?? "",
    contact_name: x.contact_name ?? x.contactName ?? "",
    contact_email: x.contact_email ?? x.contactEmail ?? "",
    image_url: x.image_url ?? x.imageUrl ?? "",
    image_source: x.image_source ?? x.imageSource ?? "",
    image_meta: x.image_meta ?? x.imageMeta ?? "",
    updated_at: x.updated_at ?? x.updatedAt ?? "",
  };
}

export async function fetchNeeds() {
  const res = await fetch(appendQuery(SHEETS_URL, { mode: "public" }), { cache: "no-store" });

  if (!res.ok) {
    const txt = await res.text().catch(() => "");
    throw new Error(`Failed to fetch sheets: ${res.status} ${txt}`);
  }

  const raw = await res.json();
  const arr = Array.isArray(raw) ? raw : (raw?.data ?? []);
  return arr.map(normalizeNeed);
}

export async function createNeed(payload) {
  const url = appendQuery(SHEETS_URL, { mode: "community" });

  const res = await fetch(url, {
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
    const rawError = data?.error || `HTTP ${res.status}`;
    throw new Error(toHumanCreateError(rawError));
  }

  return data?.item ?? data;
}
