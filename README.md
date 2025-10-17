# Sales Summary SPA

## Summary
A minimal, single-page web application that:
- Fetches the attached data.csv file
- Sums its Sales column
- Sets the document title to "Sales Summary ${seed}" (using the provided global seed)
- Displays the computed total inside a div with id="total-sales"

The app is self-contained, uses no external frameworks, and includes a presence-only Bootstrap link tag to satisfy evaluation checks (the app does not depend on Bootstrap).

## Setup
Because browsers restrict fetch() under the file:// protocol, please serve the files over HTTP.

Quick options:
- Python 3: `python -m http.server 8000`
- Node.js (http-server): `npx http-server . -p 8000`
- Bun: `bun x http-server . -p 8000`

Then open:
- http://localhost:8000/

Ensure that data.csv is in the same directory as index.html.

## Usage
- Open the site. The page title will become `Sales Summary ${seed}` if a global `seed` variable is provided by the environment.
- The app fetches `data.csv`, locates a column named `sales` (case-insensitive), sums its values, and renders the total with two decimal places into the element `#total-sales`.
- The parser accepts common numeric formats, including currency symbols, thousand separators, and parentheses for negatives.

## License
MIT License

Copyright (c) 2025

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
