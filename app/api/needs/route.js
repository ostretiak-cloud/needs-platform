export async function GET() {
  try {
    const base = process.env.SHEETS_API_URL;
    if (!base) return Response.json({ error: "SHEETS_API_URL is missing" }, { status: 500 });

    const url = `${base}?mode=public`;
    const res = await fetch(url, { cache: "no-store" });

    if (!res.ok) {
      return Response.json({ error: "Failed to fetch public data", status: res.status }, { status: 500 });
    }

    const data = await res.json();
    return Response.json(data, { status: 200 });
  } catch (e) {
    return Response.json({ error: String(e) }, { status: 500 });
  }
}