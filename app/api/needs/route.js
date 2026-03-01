// app/api/needs/route.js
import { fetchNeeds } from "@/app/lib/needs";

export async function GET() {
  try {
    const needs = await fetchNeeds();
    return Response.json(needs, { status: 200 });
  } catch (e) {
    return Response.json({ error: String(e) }, { status: 500 });
  }
}