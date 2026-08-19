import { competitions as fallbackCompetitions, statuses } from "./competitions.js";

const requiredColumns = ["id", "name", "subjects", "month", "phase", "department", "status"];

function parseCsv(text) {
  const rows = [];
  let row = [];
  let value = "";
  let quoted = false;

  for (let index = 0; index < text.length; index += 1) {
    const character = text[index];
    const next = text[index + 1];
    if (character === '"' && quoted && next === '"') {
      value += '"';
      index += 1;
    } else if (character === '"') {
      quoted = !quoted;
    } else if (character === "," && !quoted) {
      row.push(value.trim());
      value = "";
    } else if ((character === "\n" || character === "\r") && !quoted) {
      if (character === "\r" && next === "\n") index += 1;
      row.push(value.trim());
      if (row.some(Boolean)) rows.push(row);
      row = [];
      value = "";
    } else {
      value += character;
    }
  }
  row.push(value.trim());
  if (row.some(Boolean)) rows.push(row);
  return rows;
}

function splitList(value, fallback) {
  const items = String(value || "").split(/[|;]/).map((item) => item.trim()).filter(Boolean);
  return items.length ? items : fallback;
}

function safeUrl(value) {
  if (!value) return "";
  try {
    const url = new URL(value);
    return ["http:", "https:"].includes(url.protocol) ? url.toString() : "";
  } catch {
    return "";
  }
}

function normaliseRow(row, rowNumber) {
  const month = Number(row.month);
  if (!row.name || !Number.isInteger(month) || month < 1 || month > 12) return null;
  const status = statuses.includes(row.status) ? row.status : "Department considering";
  const phase = row.phase || "Timing needs verification";
  return {
    id: row.id || `sheet-row-${rowNumber}`,
    name: row.name,
    subjects: splitList(row.subjects, ["Needs verification"]),
    month,
    phase,
    registration: row.registration || phase,
    deadline: row.deadline || "Exact date needs verification",
    yearGroups: splitList(row.yearGroups, ["Needs verification"]),
    officialUrl: safeUrl(row.officialUrl),
    schoolLead: row.schoolLead || "TBC",
    department: row.department || "TBC",
    status,
    verification: row.verification || "Verify current dates, eligibility and entry route on the official competition website.",
  };
}

export async function loadCompetitions(sheetUrl) {
  if (!sheetUrl) return { competitions: fallbackCompetitions, source: "bundled", message: "Google Sheet not connected" };

  try {
    const response = await fetch(sheetUrl, { cache: "no-store" });
    if (!response.ok) throw new Error(`Sheet returned ${response.status}`);
    const rows = parseCsv(await response.text());
    if (rows.length < 2) throw new Error("Sheet has no competition rows");
    const headers = rows[0].map((header) => header.replace(/^\uFEFF/, "").trim());
    const missing = requiredColumns.filter((column) => !headers.includes(column));
    if (missing.length) throw new Error(`Missing columns: ${missing.join(", ")}`);

    const competitions = rows.slice(1).map((values, index) => {
      const row = Object.fromEntries(headers.map((header, headerIndex) => [header, values[headerIndex] || ""]));
      return normaliseRow(row, index + 2);
    }).filter(Boolean);
    if (!competitions.length) throw new Error("No valid rows found");
    return { competitions, source: "sheet", message: `Live Google Sheet · ${competitions.length} records` };
  } catch (error) {
    console.warn("Using bundled competition data:", error);
    return { competitions: fallbackCompetitions, source: "fallback", message: "Sheet unavailable · showing safe fallback data" };
  }
}
