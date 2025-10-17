/*
  Sales Summary App
  - Sets document.title to "Sales Summary ${seed}" when window.seed is available.
  - Fetches data.csv from the same directory (attachments) and sums its `sales` column.
  - Displays total in the #total-sales element.
*/

(function () {
  "use strict";

  // DOM references
  const titleEl = document.getElementById("page-title");
  const statusEl = document.getElementById("status");
  const totalEl = document.getElementById("total-sales");
  const rowCountEl = document.getElementById("row-count");

  // Update page title based on window.seed if present
  function setTitleFromSeed() {
    const hasSeed = typeof window !== "undefined" && Object.prototype.hasOwnProperty.call(window, "seed");
    if (hasSeed) {
      const t = `Sales Summary ${window.seed}`;
      document.title = t;
      if (titleEl) titleEl.textContent = t;
    } else {
      // Fallback if seed is not provided
      const t = "Sales Summary";
      document.title = t;
      if (titleEl) titleEl.textContent = t;
    }
  }

  // Lightweight CSV parser that supports quoted fields and escaped quotes
  function parseCSV(text) {
    const rows = [];
    let cur = [];
    let field = "";
    let inQuotes = false;

    // Normalize line endings and strip BOM if present
    text = text.replace(/^\uFEFF/, "");

    for (let i = 0; i < text.length; i++) {
      const char = text[i];
      const next = text[i + 1];

      if (inQuotes) {
        if (char === '"') {
          if (next === '"') {
            field += '"';
            i++; // skip escaped quote
          } else {
            inQuotes = false;
          }
        } else {
          field += char;
        }
      } else {
        if (char === ',') {
          cur.push(field);
          field = "";
        } else if (char === '\n') {
          cur.push(field);
          rows.push(cur);
          cur = [];
          field = "";
        } else if (char === '\r') {
          // Ignore \r (CR); handle possible \r\n by letting \n branch handle row end
        } else if (char === '"') {
          inQuotes = true;
        } else {
          field += char;
        }
      }
    }

    // push last field/row
    if (field.length > 0 || inQuotes || cur.length > 0) {
      cur.push(field);
      rows.push(cur);
    }

    // Remove trailing empty rows
    while (rows.length && rows[rows.length - 1].every(v => v === "")) rows.pop();

    return rows;
  }

  function toNumber(val) {
    if (val == null) return NaN;
    const cleaned = String(val).trim().replace(/,/g, "");
    const n = parseFloat(cleaned);
    return Number.isFinite(n) ? n : NaN;
  }

  async function loadAndSum() {
    try {
      statusEl.textContent = "Loading data.csv…";
      const resp = await fetch("data.csv", { cache: "no-store" });
      if (!resp.ok) throw new Error(`Failed to fetch data.csv (status ${resp.status})`);
      const text = await resp.text();

      const rows = parseCSV(text);
      if (!rows.length) throw new Error("CSV appears empty");

      // Identify header and sales column
      const header = rows[0].map(h => String(h || "").trim());
      let salesIdx = header.findIndex(h => h.toLowerCase() === "sales");

      // If header isn't labeled, but there's only one column, assume it's sales
      let dataStart = 1;
      if (salesIdx === -1) {
        if (header.length === 1 && header[0] !== "") {
          salesIdx = 0;
          dataStart = 1; // treat first row as header anyway
        } else {
          // If first row isn't a header, try treating all rows as data and use col 0
          salesIdx = 0;
          dataStart = 0;
        }
      }

      let total = 0;
      let count = 0;
      for (let r = dataStart; r < rows.length; r++) {
        const row = rows[r];
        if (!row || row.length <= salesIdx) continue;
        const n = toNumber(row[salesIdx]);
        if (Number.isFinite(n)) {
          total += n;
          count++;
        }
      }

      // Update UI
      totalEl.textContent = total.toFixed(2);
      if (rowCountEl) rowCountEl.textContent = count ? `${count} rows` : "0 rows";
      statusEl.textContent = "";
    } catch (err) {
      console.error(err);
      statusEl.textContent = `Error: ${err.message}`;
      // Leave total as-is to avoid misleading results
    }
  }

  // Initialize
  setTitleFromSeed();
  // Re-apply title shortly after load in case seed becomes available late
  // (harmless if already set correctly)
  window.addEventListener("load", setTitleFromSeed);
  loadAndSum();
})();
