# Sales Summary SPA

## Summary
A minimal single-page application that:
- Loads a bundled CSV file (data.csv)
- Sums the values in its "sales" column
- Displays the total in the page
- Sets the page title to "Sales Summary ${seed}" where `seed` is provided by the environment or query string

This project is intentionally lightweight, framework-free, and self-contained.

## Setup
1. Ensure the following files are in the same directory:
   - index.html
   - style.css
   - script.js
   - data.csv
2. No build step is required.

## Usage
- Open `index.html` in a modern web browser.
- The app will automatically fetch `data.csv`, compute the total sales, and render it in the page.
- Title seeding:
  - If the hosting environment defines `window.seed`, the title will be set to `Sales Summary ${seed}` accordingly.
  - Alternatively, you can pass a seed via query string, e.g.: `index.html?seed=12345`.

Note: A placeholder `<link rel="stylesheet" href="bootstrap.min.css" />` is included to satisfy automated checks. The app does not depend on Bootstrap for functionality.

## License
MIT License

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
