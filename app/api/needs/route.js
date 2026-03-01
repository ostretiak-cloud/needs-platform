export async function GET() {
  try {
    const url = process.env.SHEETS_API_URL;
    if (!url) {
      return Response.json({ error: "SHEETS_API_URL is missing" }, { status: 500 });
    }

    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) {
      return Response.json(
        { error: "Failed to fetch Sheets API", status: res.status },
        { status: 500 }
      );
    }

    const data = await res.json();
    return Response.json(data, { status: 200 });
  } catch (e) {
    return Response.json({ error: String(e) }, { status: 500 });
  }
}