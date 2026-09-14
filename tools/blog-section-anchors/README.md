# Blog Section-Anchor Link Tool

A lightweight marketing operations browser utility that extracts section-specific deep links from published Capte blog posts ([capte.co/blog/*](https://www.capte.co)).

> **Scope**: Personal browser utility (Bookmarklet & DevTools Console script). Does not alter Webflow templates or runtime code; only inspects the live rendered DOM in the user's browser.

---

## 🎯 Purpose & Marketing Strategy

Capte's long-form technical articles (transit telematics, precision positioning, IoT gateway architecture) contain multiple discrete value points. Using heading deep-links (`capte.co/blog/[slug]#[heading-id]`), marketing can:

1. **Multiply Post Reach (3x–5x Content Extension)**: Turn a single 2,500-word article into 3–5 tailored social posts (LinkedIn, X, technical newsletters), each highlighting a specific section.
2. **Direct Intent Matching**: Send readers directly to the exact paragraph or architecture breakdown they clicked for, lowering bounce rates and accelerating time-to-value.
3. **Automate Extraction**: Eliminate manual "Inspect Element" copying of slug IDs.

---

## 🚀 How to Install & Use

### Option A: 1-Click Bookmarklet (Recommended for Marketing)

1. Open [`tools/blog-section-anchors/bookmarklet.html`](bookmarklet.html) in your web browser.
2. Drag the **`🔗 Capte Section Links`** button up into your browser's **Bookmarks Bar**.
3. Visit any published post on [capte.co/blog](https://www.capte.co).
4. Click **`🔗 Capte Section Links`** in your bookmarks bar.
5. All section links are automatically generated, checked for errors, and copied to your clipboard.

### Option B: DevTools Console (For Technical / Ad-hoc Workflows)

1. Open the published blog post in your browser.
2. Right-click anywhere &rarr; select **Inspect** &rarr; open the **Console** tab.
3. Paste and run the code from [`extractor.js`](extractor.js).
4. View the formatted output in the console and paste from your clipboard.

---

## 📋 Sample Output Format

```text
--- Capte Blog Section Links (4 headings found) ---
----------------------------------------------------------------

H2: "1. Industrial Telematics Overview"
https://www.capte.co/blog/precision-transit-telematics#industrial-telematics-overview

H3: "1.1 CAN Bus High-Speed Decoding"
https://www.capte.co/blog/precision-transit-telematics#can-bus-high-speed-decoding

H3: "1.2 Dual-Frequency RTK Precision"
https://www.capte.co/blog/precision-transit-telematics#dual-frequency-rtk-precision

H2: "2. Deployment Architecture"
https://www.capte.co/blog/precision-transit-telematics#deployment-architecture
```

---

## ⚠️ Known Limitations & Technical Rules

| Limitation | Impact | Best Practice |
| :--- | :--- | :--- |
| **Heading Stability** | IDs are generated dynamically from heading text on page load. If an article's heading copy is edited in Webflow CMS post-publication, existing social links will fall back gracefully to the top of the article. | Only pull and schedule section links once an article's headings are **final**. |
| **Duplicate Headings** | Identical headings (e.g. repeated "Overview" or "Benefits" sections) produce identical IDs. The browser will only jump to the first occurrence. | The tool automatically detects and prepends `⚠️ DUPLICATE ID` to alert the user. |
| **Non-ASCII / International Characters** | Slugs strip non-alphanumeric characters. Headings in French or Dutch with extensive accents may reduce to empty IDs. | The tool detects and flags `[No ID assigned]` headings for manual review. |
| **View Source vs Inspect** | Because IDs are added by JavaScript on page load, standard "View Source" will not display them. | Always use the bookmarklet or DevTools "Inspect". |
