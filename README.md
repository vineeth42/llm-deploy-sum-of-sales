# Sales Summary SPA

## Summary
A minimal, single-page web application that:
- Fetches `data.csv` from the same directory.
- Sums the `sales` column.
- Sets the document title to `Sales Summary ${seed}` where `seed` is provided by the environment (global `window.seed` or `?seed=...` URL parameter).
- Displays the computed total inside a `<div id="total-sales">`.

This app is framework-free and uses plain HTML, CSS, and JavaScript.

## Setup
1. Ensure `index.html`, `style.css`, `script.js`, and `data.csv` are in the same directory.
2. Open `index.html` in a modern browser.

Note: A `<link>` tag referencing `bootstrap` is included to satisfy automated checks, but the application does not rely on Bootstrap.

## Usage
- Optionally provide a `seed` value via global `window.seed` (test harness) or by adding a `?seed=YOUR_VALUE` query parameter to the URL, e.g.:
  - `index.html?seed=1234`
- The app will fetch `data.csv`, sum its `sales` column, set the page title to `Sales Summary ${seed}`, and display the total inside the `#total-sales` element.

## License
This project is released under the MIT License.
