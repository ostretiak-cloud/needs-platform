// app/api/needs/route.js
import { createNeed, fetchNeeds } from "@/app/lib/needs";

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

    if (!title || !community || !category || !description || !contact_name || !contact_email) {
      return Response.json({ error: "Заповніть усі обов'язкові поля." }, { status: 400 });
    }

    if (!Number.isFinite(budget_uah) || budget_uah <= 0) {
      return Response.json({ error: "Бюджет має бути більше 0." }, { status: 400 });
    }

    if (!Number.isInteger(priority) || priority < 1 || priority > 5) {
      return Response.json({ error: "Пріоритет має бути від 1 до 5." }, { status: 400 });
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
    });

    return Response.json(created, { status: 201 });
  } catch (e) {
    return Response.json({ error: String(e) }, { status: 500 });
  }
}
