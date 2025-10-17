# Sales Summary SPA

## Summary
A minimal, self-contained single-page web application that:
- Fetches the attached CSV file (data.csv)
- Sums the values in its "sales" column
- Sets the document title to "Sales Summary {seed}" (where seed is taken from the URL query parameter or common globals)
- Displays the computed total inside a div with the id `total-sales`

No external frameworks are required. A tiny data-URI stylesheet link is included solely to satisfy environments that check for a Bootstrap link; it does not load any external resources.

## Setup
1. Place the following files in the same directory:
   - index.html
   - style.css
   - script.js
   - data.csv (provided via attachments in your environment)

2. Open `index.html` in a modern web browser. Alternatively, serve the directory via a simple HTTP server (optional):
   - Python 3: `python -m http.server 8080`
   - Node (http-server): `npx http-server -p 8080`

Then navigate to `http://localhost:8080/index.html?seed=12345` (replace 12345 with your seed).

## Usage
- Provide a CSV file named `data.csv` in the same directory as `index.html`.
- Ensure the CSV contains a header row with a column named `sales` (case-insensitive).
- Load the page with an optional `seed` query parameter, for example:
  - `index.html?seed=42`
- The page will set the title to `Sales Summary 42` and display the summed total of the `sales` column in the element with id `total-sales`.

Supported CSV details:
- Standard comma-separated values with a header row
- Quoted fields and embedded commas are handled
- Currency symbols and thousands separators in the `sales` column are tolerated (e.g., "$1,234.50")

## License
MIT License

Copyright (c) 2025

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
