// app/lib/needs.js

export const SHEETS_URL =
  "https://script.google.com/macros/s/AKfycbypMB1wcSzRSzNSxOZN1Pkl4HCgGzLCqh3R6LNAqKgmmiArr-cUABZTvcka5gjhJAejTg/exec";

function appendQuery(url, params) {
  const u = new URL(url);
  Object.entries(params).forEach(([k, v]) => {
    if (v !== undefined && v !== null && String(v) !== "") {
      u.searchParams.set(k, String(v));
    }
  });
  return u.toString();
}

function buildCreateTargets() {
  const base = process.env.SHEETS_API_URL;
  const key = process.env.ADMIN_API_KEY;

  const targets = [];

  if (base && key) {
    targets.push({
      url: appendQuery(base, { mode: "admin", key }),
      bodyExtra: {},
      name: "admin-configured",
    });
  }

  if (base) {
    targets.push({
      url: appendQuery(base, { mode: "community" }),
      bodyExtra: { mode: "community" },
      name: "community-via-sheets-api-url",
    });
  }

  targets.push({
    url: appendQuery(SHEETS_URL, { mode: "community" }),
    bodyExtra: { mode: "community" },
    name: "community-via-default-url",
  });

  targets.push({
    url: SHEETS_URL,
    bodyExtra: { mode: "community" },
    name: "default-url-no-query",
  });

  return targets;
}

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
    image_url: x.image_url ?? x.imageUrl ?? "",
    image_source: x.image_source ?? x.imageSource ?? "",
    image_meta: x.image_meta ?? x.imageMeta ?? "",
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
  const targets = buildCreateTargets();
  const errors = [];

  for (const target of targets) {
    try {
      const res = await fetch(target.url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        cache: "no-store",
        body: JSON.stringify({
          action: "create",
          ...target.bodyExtra,
          ...payload,
        }),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok || data?.error) {
        errors.push(`${target.name}: ${data?.error || `HTTP ${res.status}`}`);
        continue;
      }

      return data;
    } catch (e) {
      errors.push(`${target.name}: ${String(e)}`);
    }
  }

  throw new Error(`Create failed on all routes. ${errors.join(" | ")}`);
}
