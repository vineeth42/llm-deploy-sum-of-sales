"use strict";

// Utility: try to obtain the seed from common places (query param, globals, meta)
function getSeed() {
  try {
    const params = new URLSearchParams(window.location.search);
    const fromQuery = params.get("seed");
    if (fromQuery !== null && fromQuery !== "") return fromQuery;
  } catch (_) {}
  if (typeof window !== "undefined") {
    if (window.seed != null) return String(window.seed);
    if (window.SEED != null) return String(window.SEED);
  }
  const meta = document.querySelector('meta[name="seed"]');
  if (meta && meta.content) return meta.content;
  // Fallback
  return "0";
}

// Minimal robust CSV parser (handles commas inside quotes, RFC4180-ish)
function parseCSV(text) {
  const rows = [];
  let row = [];
  let cur = "";
  let inQuotes = false;
  let i = 0;

  // Normalize line endings
  const s = text.replace(/\r\n?/g, "\n");

  while (i < s.length) {
    const ch = s[i];
    if (inQuotes) {
      if (ch === '"') {
        if (s[i + 1] === '"') { // escaped quote
          cur += '"';
          i += 2;
          continue;
        } else {
          inQuotes = false;
          i++;
          continue;
        }
      } else {
        cur += ch;
        i++;
        continue;
      }
    } else {
      if (ch === '"') {
        inQuotes = true;
        i++;
        continue;
      }
      if (ch === ',') {
        row.push(cur);
        cur = "";
        i++;
        continue;
      }
      if (ch === '\n') {
        row.push(cur);
        rows.push(row);
        row = [];
        cur = "";
        i++;
        continue;
      }
      cur += ch;
      i++;
    }
  }
  // flush last field
  row.push(cur);
  rows.push(row);

  // drop possible trailing empty line
  if (rows.length && rows[rows.length - 1].length === 1 && rows[rows.length - 1][0] === "") {
    rows.pop();
  }
  return rows;
}

// Convert a cell string to a number. Strips currency symbols and thousands.
function toNumber(value) {
  if (value == null) return NaN;
  const s = String(value).trim();
  if (!s) return NaN;
  // Remove all except digits, minus, and dot
  const cleaned = s.replace(/[^0-9.\-]/g, "");
  // If multiple dots exist, keep the last as decimal separator
  const parts = cleaned.split(".");
  let normalized = cleaned;
  if (parts.length > 2) {
    const dec = parts.pop();
    normalized = parts.join("") + "." + dec; // remove thousands-like dots
  }
  const n = Number(normalized);
  return Number.isFinite(n) ? n : NaN;
}

async function main() {
  const seed = getSeed();
  document.title = `Sales Summary ${seed}`;
  const heading = document.getElementById("page-heading");
  if (heading) heading.textContent = document.title;

  const statusEl = document.getElementById("status");
  const totalEl = document.getElementById("total-sales");

  try {
    const res = await fetch("data.csv", { cache: "no-store" });
    if (!res.ok) throw new Error(`Failed to fetch data.csv (status ${res.status})`);
    const text = await res.text();

    // Remove BOM if present
    const csvText = text.replace(/^\uFEFF/, "");
    const rows = parseCSV(csvText).filter(r => r && r.some(c => String(c).trim() !== ""));
    if (rows.length === 0) throw new Error("CSV appears empty.");

    const header = rows[0].map(h => String(h).trim());
    const salesIdx = header.findIndex(h => h.toLowerCase() === "sales");
    if (salesIdx === -1) throw new Error("Could not find 'sales' column in header.");

    let total = 0;
    for (let r = 1; r < rows.length; r++) {
      const cell = rows[r][salesIdx];
      const n = toNumber(cell);
      if (Number.isFinite(n)) total += n;
    }

    // Display with two decimals
    totalEl.textContent = total.toFixed(2);
    if (statusEl) statusEl.textContent = "Loaded.";
  } catch (err) {
    if (statusEl) statusEl.textContent = `Error: ${err.message || err}`;
    // Keep total element visible even on error
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", main);
} else {
  main();
}
