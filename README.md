# Hampton Inn & Suites Gainesville-Downtown — Investment Offering Microsite

Hodges Ward Elliott offering microsite for the fee-simple sale of the 124-room
Hampton Inn & Suites Gainesville Downtown, Gainesville, Florida.

**Live:** https://hamptoninngainesvilledowntown.hodgeswardelliott.com/
**Source site:** recreated from the original Squarespace page.

## Stack

Static single page. No build step, no dependencies; two small scripts: `assets/js/reveal.js` (scale-in animation as blocks scroll into view) and `assets/js/parallax.js` (background parallax). Served by
GitHub Pages from `main`.

```
index.html            single page, all sections
CNAME                 custom domain
.nojekyll             bypass Jekyll processing
assets/
  css/site.css        all styles; desktop grid positions are in one labeled block
  js/reveal.js        scale-in reveal on scroll (skipped for reduced-motion users)
  js/parallax.js      parallax for [data-parallax] section backgrounds (Investment Highlights); the hero uses a CSS slow zoom
  js/header-fade.js   fades the fixed HWE logo out while scrolling down
  js/countup.js       counts up the big property numbers when they scroll into view
  img/*.webp          photography and logos
```

## To do

- Add the confidentiality agreement at `assets/Hampton-Inn-Gainesville-Downtown-CA.docx`
  (both "Download Confidentiality Agreement" buttons link there).
