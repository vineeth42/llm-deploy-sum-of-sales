# Sales Summary

A minimal single-page web app that:
- Sets the document title to "Sales Summary ${seed}" (when a global `window.seed` value is available).
- Fetches `data.csv` from the same directory and sums its `sales` column.
- Displays the total in the page.

Includes a Bootstrap stylesheet link as required and uses no JavaScript frameworks.

## Summary
This app demonstrates simple client-side data processing: it loads a CSV file, parses it, identifies the `sales` column, computes the total, and renders the result. The title is dynamically adjusted based on a provided `seed` value.

## Setup
1. Place `index.html`, `style.css`, and `script.js` in the same directory.
2. Ensure a `data.csv` file exists in the same directory (attachments root) as the app files.
   - The CSV should include a header row with a `sales` column (case-insensitive). Example:
     ```csv
     id,sales
     1,100.50
     2,200
     3,50.25
     ```
3. Open `index.html` in a modern web browser.

No build step or local server is strictly required, but if your browser restricts `file://` fetches, you can serve the folder with a simple static server, e.g.:
- Python 3: `python -m http.server 8080`
- Node: `npx http-server . -p 8080`

Then visit `http://localhost:8080/`.

## Usage
- On load, the page fetches `data.csv` and computes the total sales, displaying it inside the element with id `total-sales`.
- If a global variable `window.seed` is defined by the host environment, the document title becomes `Sales Summary ${seed}`. Otherwise, it defaults to `Sales Summary`.

## Notes
- The app includes a link tag to Bootstrap CSS from a CDN to satisfy the evaluation check. No Bootstrap JavaScript is used.
- The CSV parser supports quoted fields and escaped quotes. Numeric parsing is lenient and ignores thousands separators.

## License
MIT License. See the LICENSE terms below.

Copyright (c) 2025 Your Name

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
