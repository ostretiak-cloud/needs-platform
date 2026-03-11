// app/api/needs/route.js
import { SHEETS_URL, createNeed, fetchNeeds, normalizeNeed } from "@/app/lib/needs";

const MAX_IMAGE_SIZE_BYTES = 5 * 1024 * 1024;
const ALLOWED_IMAGE_TYPES = new Set(["image/jpeg", "image/png", "image/webp"]);

function todayISODate() {
  return new Date().toISOString().slice(0, 10);
}

async function fetchAllNeedsForCabinets() {
  const base = process.env.SHEETS_API_URL || SHEETS_URL;
  const key = process.env.ADMIN_API_KEY;

  if (!key) {
    throw new Error("ADMIN_API_KEY не налаштовано");
  }

  const url = `${base}?mode=admin&key=${encodeURIComponent(key)}`;
  const res = await fetch(url, { cache: "no-store" });
  const data = await res.json().catch(() => ({}));

  if (!res.ok || data?.error) {
    throw new Error(data?.error || "Admin fetch failed");
  }

  const list = Array.isArray(data) ? data : data?.items || data?.data || [];
  return list.map(normalizeNeed);
}

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const scope = String(searchParams.get("scope") || "public").toLowerCase();

    const needs = scope === "all" ? await fetchAllNeedsForCabinets() : await fetchNeeds();
    return Response.json(needs, { status: 200 });
  } catch (e) {
    return Response.json({ error: "Не вдалося завантажити список потреб." }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const body = await req.json();

    const title = String(body?.title ?? "").trim();
    const community = String(body?.community ?? "").trim();
    const category = String(body?.category ?? "").trim();
    const description = String(body?.description ?? "").trim();
    const contact_name = String(body?.contact_name ?? "").trim();
    const contact_email = String(body?.contact_email ?? "").trim().toLowerCase();
    const budget = Number(body?.budget ?? body?.budget_uah ?? 0);
    const priority = Number(body?.priority ?? 3);

    const image_url = String(body?.image_url ?? "").trim();
    const image_source = String(body?.image_source ?? "community").trim();
    const image_meta = body?.image_meta && typeof body.image_meta === "object" ? body.image_meta : null;

    if (!title || !community || !category || !description || !contact_name || !contact_email) {
      return Response.json({ error: "Будь ласка, заповніть усі обов'язкові поля форми." }, { status: 400 });
    }

    if (!Number.isFinite(budget) || budget <= 0) {
      return Response.json({ error: "Бюджет має бути числом, більшим за 0." }, { status: 400 });
    }

    if (!Number.isInteger(priority) || priority < 1 || priority > 5) {
      return Response.json({ error: "Пріоритет має бути від 1 до 5." }, { status: 400 });
    }

    if (image_meta) {
      const mimeType = String(image_meta?.mimeType ?? "").trim().toLowerCase();
      const sizeBytes = Number(image_meta?.sizeBytes ?? 0);
      if (!ALLOWED_IMAGE_TYPES.has(mimeType)) {
        return Response.json({ error: "Дозволені формати зображення: JPG, PNG, WEBP." }, { status: 400 });
      }
      if (!Number.isFinite(sizeBytes) || sizeBytes <= 0 || sizeBytes > MAX_IMAGE_SIZE_BYTES) {
        return Response.json({ error: "Максимальний розмір зображення — 5MB." }, { status: 400 });
      }
    }

    const created = await createNeed({
      title,
      community,
      category,
      budget,
      budget_uah: budget,
      status: "submitted",
      priority,
      description,
      contact_name,
      contact_email,
      updated_at: todayISODate(),
      image_url,
      image_source,
      image_meta: image_meta ? JSON.stringify(image_meta) : "",
    });

    return Response.json({ ok: true, item: created }, { status: 201 });
  } catch (e) {
    return Response.json({ error: String(e?.message || e) }, { status: 500 });
  }
}
