'use strict';

// Resolve the provided seed from different possible sources, then set the title.
function resolveSeed() {
  try {
    if (typeof window.seed !== 'undefined' && window.seed !== null) return window.seed;
  } catch (_) {}
  const sp = new URLSearchParams(window.location.search);
  if (sp.has('seed')) return sp.get('seed');
  // Optionally look for a data attribute if used by harnesses
  const el = document.documentElement;
  if (el && el.dataset && el.dataset.seed) return el.dataset.seed;
  return null;
}

function ensureTitle() {
  const s = resolveSeed();
  if (s !== null && s !== undefined) {
    const finalTitle = `Sales Summary ${s}`;
    if (document.title !== finalTitle) document.title = finalTitle;
    const h1 = document.getElementById('page-title');
    if (h1) h1.textContent = finalTitle;
    return true;
  }
  return false;
}

// Try to set the title ASAP, and keep trying briefly in case the environment sets seed later.
(function initTitleWatcher() {
  if (ensureTitle()) return;
  let tries = 0;
  const id = setInterval(() => {
    tries++;
    if (ensureTitle() || tries > 60) {
      clearInterval(id);
    }
  }, 50);
})();

// Fetch the CSV text, trying a few common attachment locations.
async function fetchCSVText() {
  const candidates = [
    'data.csv',
    './data.csv',
    '/data.csv',
    'attachments/data.csv',
    './attachments/data.csv',
    '/attachments/data.csv'
  ];

  for (const url of candidates) {
    try {
      const res = await fetch(url, { cache: 'no-store' });
      if (res.ok) return await res.text();
    } catch (_) { /* try next */ }
  }
  throw new Error('Unable to locate data.csv');
}

// Split a CSV row on commas not within quotes.
function splitCSVRow(row) {
  // Handles commas inside double quotes
  const parts = [];
  let current = '';
  let inQuotes = false;
  for (let i = 0; i < row.length; i++) {
    const ch = row[i];
    if (ch === '"') {
      // Toggle inQuotes, but handle escaped quotes "" inside quoted fields
      if (inQuotes && row[i + 1] === '"') {
        current += '"';
        i++; // skip next quote
      } else {
        inQuotes = !inQuotes;
      }
    } else if (ch === ',' && !inQuotes) {
      parts.push(current);
      current = '';
    } else {
      current += ch;
    }
  }
  parts.push(current);
  return parts.map(s => s.trim());
}

// Parse CSV and sum the sales column (case-insensitive).
function sumSalesFromCSV(text) {
  const lines = text.replace(/\uFEFF/g, '').split(/\r?\n/).filter(l => l.trim().length > 0);
  if (lines.length === 0) return 0;

  const header = splitCSVRow(lines[0]).map(h => h.replace(/^\"|\"$/g, '').trim());
  let salesIdx = header.findIndex(h => h.toLowerCase() === 'sales');
  if (salesIdx === -1) {
    // Try to find a column that contains 'sales' (e.g., 'total_sales')
    salesIdx = header.findIndex(h => h.toLowerCase().includes('sales'));
  }
  if (salesIdx === -1) throw new Error('No sales column found');

  let total = 0;
  for (let i = 1; i < lines.length; i++) {
    const row = splitCSVRow(lines[i]).map(c => c.replace(/^\"|\"$/g, ''));
    if (row.length <= salesIdx) continue;
    const raw = (row[salesIdx] || '').trim();
    if (!raw) continue;

    // Remove currency symbols and thousand separators, keep sign and decimal point
    const normalized = raw
      .replace(/[\$£€¥₹]/g, '') // currency symbols
      .replace(/\s/g, '')
      .replace(/,(?=\d{3}(\D|$))/g, ''); // drop thousands commas

    const val = parseFloat(normalized);
    if (!Number.isNaN(val)) total += val;
  }
  return total;
}

function setTotal(value) {
  const el = document.getElementById('total-sales');
  if (!el) return;
  // Show with two decimals, adequate for currency and tolerant check
  const text = Number.isFinite(value) ? value.toFixed(2) : '0.00';
  const changed = el.textContent !== text;
  el.textContent = text;
  if (changed) {
    el.classList.remove('updated');
    // Trigger animation style when value updates
    requestAnimationFrame(() => {
      el.classList.add('updated');
    });
  }
}

async function main() {
  try {
    const csv = await fetchCSVText();
    const total = sumSalesFromCSV(csv);
    setTotal(total);
  } catch (err) {
    console.error(err);
    setTotal(0);
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', main);
} else {
  main();
}
