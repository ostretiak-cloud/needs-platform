export async function PATCH(req, { params }) {
  try {
    const base = process.env.SHEETS_API_URL;
    const key = process.env.ADMIN_API_KEY;

    if (!base) return Response.json({ error: "SHEETS_API_URL is missing" }, { status: 500 });
    if (!key) return Response.json({ error: "ADMIN_API_KEY is missing" }, { status: 500 });

    const id = params?.id;
    if (!id) return Response.json({ error: "Missing id in route" }, { status: 400 });

    const patch = await req.json();

    const url = `${base}?mode=admin&key=${encodeURIComponent(key)}`;
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
      body: JSON.stringify({
        action: "update",
        id,
        ...patch,
      }),
    });

    const data = await res.json();

    if (!res.ok || data?.error) {
      return Response.json({ error: data?.error || "Admin update failed" }, { status: 500 });
    }

    return Response.json(data, { status: 200 });
  } catch (e) {
    return Response.json({ error: String(e) }, { status: 500 });
  }
}