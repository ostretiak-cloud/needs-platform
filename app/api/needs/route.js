// app/api/needs/route.js
import { createNeed, fetchNeeds } from "@/app/lib/needs";

const MAX_IMAGE_SIZE_BYTES = 5 * 1024 * 1024;
const ALLOWED_IMAGE_TYPES = new Set(["image/jpeg", "image/png", "image/webp"]);

export async function GET() {
  try {
    const needs = await fetchNeeds();
    return Response.json(needs, { status: 200 });
  } catch (e) {
    return Response.json({ error: String(e) }, { status: 500 });
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
    const budget_uah = Number(body?.budget_uah ?? body?.budget ?? 0);
    const priority = Number(body?.priority ?? 3);

    const image_url = String(body?.image_url ?? "").trim();
    const image_source = String(body?.image_source ?? "community").trim();
    const image_meta = body?.image_meta && typeof body.image_meta === "object" ? body.image_meta : null;

    if (!title || !community || !category || !description || !contact_name || !contact_email) {
      return Response.json({ error: "Заповніть усі обов'язкові поля." }, { status: 400 });
    }

    if (!Number.isFinite(budget_uah) || budget_uah <= 0) {
      return Response.json({ error: "Бюджет має бути більше 0." }, { status: 400 });
    }

    if (!Number.isInteger(priority) || priority < 1 || priority > 5) {
      return Response.json({ error: "Пріоритет має бути від 1 до 5." }, { status: 400 });
    }

    if (image_meta) {
      const mimeType = String(image_meta?.mimeType ?? "").trim().toLowerCase();
      const sizeBytes = Number(image_meta?.sizeBytes ?? 0);
      if (!ALLOWED_IMAGE_TYPES.has(mimeType)) {
        return Response.json({ error: "Дозволені формати: JPG, PNG, WEBP." }, { status: 400 });
      }
      if (!Number.isFinite(sizeBytes) || sizeBytes <= 0 || sizeBytes > MAX_IMAGE_SIZE_BYTES) {
        return Response.json({ error: "Максимальний розмір зображення: 5MB." }, { status: 400 });
      }
    }

    const created = await createNeed({
      title,
      community,
      category,
      description,
      contact_name,
      contact_email,
      budget_uah,
      priority,
      status: "draft",
      image_url,
      image_source,
      image_meta: image_meta ? JSON.stringify(image_meta) : "",
    });

    return Response.json(created, { status: 201 });
  } catch (e) {
    return Response.json({ error: String(e) }, { status: 500 });
  }
}
