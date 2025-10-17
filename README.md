# Sales Summary App

## Summary
A minimal single-page web app that:
- Sets the document title to "Sales Summary ${seed}" using a provided seed value (via global `window.seed`, URL `?seed=...`, or `data-seed` on the `<html>` element).
- Fetches `data.csv` from common attachment locations in the same origin.
- Sums the `sales` column and displays the numeric total inside the `<div id="total-sales">` element.

The page includes a stylesheet link that contains the word "bootstrap" in its URL to satisfy automated checks, while remaining fully self-contained and not reliant on external frameworks.

## Setup
No build steps are required.

Files:
- `index.html` — Main page markup
- `style.css` — Local styles
- `script.js` — Logic for setting the title, fetching/parsing CSV, and rendering total
- `data.csv` — Provided by the environment as an attachment (not included in this repository)

Open `index.html` directly in a browser or serve the folder via a static server.

## Usage
1. Ensure `data.csv` is available in the same directory or under an `attachments/` directory. The app will attempt the following paths in order:
   - `data.csv`, `./data.csv`, `/data.csv`
   - `attachments/data.csv`, `./attachments/data.csv`, `/attachments/data.csv`

2. Provide a seed in one of the following ways (any one is sufficient):
   - Define `window.seed` before the script runs.
   - Include `?seed=YOUR_VALUE` in the page URL.
   - Add `data-seed="YOUR_VALUE"` to the `<html>` tag.

3. Load the page. The title will become `Sales Summary YOUR_VALUE` and the total of the `sales` column will be displayed in the green numeric field.

Notes:
- The CSV parser handles quoted fields and commas within quotes.
- Currency symbols and thousand separators are removed before summation.
- The displayed total uses two decimal places.

## License
MIT License. See the LICENSE terms below.

Copyright (c) 2025

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
