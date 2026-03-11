/**
 * Needs Platform — Google Apps Script backend (community create + admin moderation)
 *
 * GET:
 *  - /exec?mode=public
 *  - /exec?mode=admin&key=ADMIN_KEY
 *
 * POST:
 *  - /exec?mode=community  body: { action: "create", ... }
 *  - /exec?mode=admin&key=ADMIN_KEY  body: { action: "update"|"create", ... }
 */

const SHEET_NAME = "needs";
const AUDIT_SHEET = "audit_log";

function doGet(e) {
  try {
    const mode = String(e.parameter.mode || "public").toLowerCase();

    if (mode === "admin") {
      assertAdmin_(e);
      return json_(readAll_({ includeContacts: true }));
    }

    // public mode: only published and hide contacts
    const items = readAll_({ includeContacts: false }).filter(
      (x) => String(x.status || "").toLowerCase() === "published",
    );
    return json_(items);
  } catch (err) {
    return json_({ error: String(err) });
  }
}

function doPost(e) {
  try {
    const mode = String(e.parameter.mode || "").toLowerCase();
    const body = parseJsonBody_(e);
    const action = String(body.action || "").toLowerCase();

    if (mode === "community") {
      if (action !== "create") {
        return json_({ error: "Community mode supports only action=create" });
      }
      const created = createNeed_(body);
      audit_("create-community", created.id, body);
      return json_({ ok: true, item: created });
    }

    if (mode === "admin") {
      assertAdmin_(e);

      if (action === "create") {
        const created = createNeed_(body);
        audit_("create-admin", created.id, body);
        return json_({ ok: true, item: created });
      }

      if (action === "update") {
        const updated = updateNeed_(body);
        audit_("update", updated.id, body);
        return json_({ ok: true, item: updated });
      }

      return json_({ error: "Unknown action. Use action=create|update" });
    }

    return json_({ error: "mode=community or mode=admin is required" });
  } catch (err) {
    return json_({ error: String(err) });
  }
}

/* ================== Core ================== */

function readAll_({ includeContacts }) {
  const sheet = getNeedsSheet_();
  const values = sheet.getDataRange().getValues();
  if (values.length < 2) return [];

  const headers = values[0].map((h) => String(h).trim());
  const rows = values.slice(1);

  return rows
    .filter((r) => r.some((cell) => String(cell).trim() !== ""))
    .map((r) => rowToObj_(headers, r, { includeContacts }));
}

function createNeed_(body) {
  const sheet = getNeedsSheet_();
  const headers = getHeaders_(sheet);

  const nowDate = isoDate_();
  const id = String(body.id || "").trim() || generateNextNeedId_(sheet, headers);

  if (findRowById_(id).rowIndex !== -1) {
    throw new Error("ID already exists: " + id);
  }

  const item = normalizeItem_({
    id: id,
    title: body.title,
    community: body.community,
    category: body.category,
    budget: body.budget !== undefined ? body.budget : body.budget_uah,
    status: body.status || "submitted",
    priority: body.priority || 3,
    description: body.description || "",
    contact_name: body.contact_name || "",
    contact_email: body.contact_email || "",
    updated_at: body.updated_at || nowDate,
  });

  const row = headers.map((h) => (item[h] !== undefined ? item[h] : ""));
  sheet.appendRow(row);

  return item;
}

function updateNeed_(body) {
  const id = String(body.id || "").trim();
  if (!id) throw new Error("Missing id");

  const found = findRowById_(id);
  if (found.rowIndex === -1) throw new Error("ID not found: " + id);

  const sheet = found.sheet;
  const headers = found.headers;
  const rowIndex = found.rowIndex;

  const current = rowToObj_(
    headers,
    sheet.getRange(rowIndex, 1, 1, headers.length).getValues()[0],
    { includeContacts: true },
  );

  const patch = { ...body };
  delete patch.action;

  const next = normalizeItem_({
    ...current,
    ...patch,
    id,
    updated_at: isoDate_(),
  });

  const row = headers.map((h) => (next[h] !== undefined ? next[h] : ""));
  sheet.getRange(rowIndex, 1, 1, headers.length).setValues([row]);

  return next;
}

/* ================== Helpers ================== */

function assertAdmin_(e) {
  const props = PropertiesService.getScriptProperties();
  const adminKey = props.getProperty("ADMIN_KEY");
  if (!adminKey) throw new Error("ADMIN_KEY is not set in Script Properties");

  const key = String(e.parameter.key || "").trim();
  if (!key || key !== adminKey) throw new Error("Unauthorized (bad key)");
}

function getNeedsSheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) throw new Error("Sheet not found: " + SHEET_NAME);
  return sheet;
}

function getHeaders_(sheet) {
  return sheet
    .getRange(1, 1, 1, sheet.getLastColumn())
    .getValues()[0]
    .map((h) => String(h).trim());
}

function findRowById_(id) {
  const sheet = getNeedsSheet_();
  const data = sheet.getDataRange().getValues();
  if (data.length < 2) return { rowIndex: -1, sheet, headers: [] };

  const headers = data[0].map((h) => String(h).trim());
  const idCol = headers.indexOf("id") + 1;
  if (idCol <= 0) throw new Error('Header "id" not found');

  for (let row = 2; row <= data.length; row++) {
    const value = String(sheet.getRange(row, idCol).getValue()).trim();
    if (value === id) return { rowIndex: row, sheet, headers };
  }

  return { rowIndex: -1, sheet, headers };
}

function rowToObj_(headers, row, { includeContacts }) {
  const obj = {};
  headers.forEach((h, idx) => {
    obj[h] = row[idx];
  });

  if (obj["budget"] !== undefined) obj["budget"] = numOrNull_(obj["budget"]);
  if (obj["priority"] !== undefined) obj["priority"] = numOrNull_(obj["priority"]);

  if (!includeContacts) {
    delete obj["contact_name"];
    delete obj["contact_email"];
  }

  return obj;
}

function normalizeItem_(item) {
  const out = { ...item };

  out.title = String(out.title || "").trim();
  out.community = String(out.community || "").trim();
  out.category = String(out.category || "").trim();
  out.description = String(out.description || "").trim();
  out.contact_name = String(out.contact_name || "").trim();
  out.contact_email = String(out.contact_email || "").trim();

  if (!out.title || !out.community || !out.category || !out.contact_name || !out.contact_email) {
    throw new Error("Missing required fields");
  }

  out.budget = numOrNull_(out.budget);
  if (out.budget === null || out.budget <= 0) throw new Error("Invalid budget");

  out.priority = clamp_(Number(out.priority || 3), 1, 5);
  out.status = String(out.status || "submitted").toLowerCase().trim();
  out.updated_at = String(out.updated_at || isoDate_()).slice(0, 10);

  return out;
}

function generateNextNeedId_(sheet, headers) {
  const idCol = headers.indexOf("id") + 1;
  if (idCol <= 0) throw new Error('Header "id" not found');

  const lastRow = sheet.getLastRow();
  if (lastRow < 2) return "NEED-0001";

  const values = sheet.getRange(2, idCol, lastRow - 1, 1).getValues().flat();
  let maxNum = 0;

  values.forEach((raw) => {
    const m = String(raw || "").trim().match(/^NEED-(\d{1,})$/i);
    if (!m) return;
    const n = Number(m[1]);
    if (Number.isFinite(n) && n > maxNum) maxNum = n;
  });

  const next = maxNum + 1;
  return "NEED-" + String(next).padStart(4, "0");
}

function numOrNull_(v) {
  if (v === null || v === undefined || String(v).trim() === "") return null;
  const n = Number(String(v).replace(/\s/g, "").replace(",", "."));
  return Number.isFinite(n) ? n : null;
}

function clamp_(n, min, max) {
  if (!Number.isFinite(n)) return min;
  return Math.max(min, Math.min(max, n));
}

function isoDate_() {
  return new Date().toISOString().slice(0, 10);
}

function audit_(action, id, payload) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(AUDIT_SHEET);
  if (!sheet) {
    sheet = ss.insertSheet(AUDIT_SHEET);
    sheet.appendRow(["ts", "action", "id", "payload"]);
  }
  sheet.appendRow([new Date().toISOString(), action, id, JSON.stringify(payload || {})]);
}

function parseJsonBody_(e) {
  const raw = e.postData && e.postData.contents ? e.postData.contents : "";
  if (!raw) return {};
  return JSON.parse(raw);
}

function json_(data) {
  const output = ContentService.createTextOutput(JSON.stringify(data));
  output.setMimeType(ContentService.MimeType.JSON);
  return output;
}
