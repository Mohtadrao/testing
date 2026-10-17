# Clearpath — precise client revision

**Baseline:** the newly uploaded `testing-main.zip`. No content, style, or asset from either inner site was copied wholesale from the earlier revision.

## Landing page ONLY
- `index.html`: desktop visual prompts now read **EPC Management →** on the left and **← Oil & Gas Manufacturing** on the right. Prompts are bold and larger, and the official Clearpath logo is displayed.
- `js/script.js`: **left click opens `oilngas/index.html`**; **right click opens `manufacturing/index.html`**. The matching swipe-preview then tap-to-enter paths use the same corrected routing.
- `css/style.css`: larger arrows, labels and official landing logo. For tablet widths 1024 px and below the **original vertical swipe layout** appears, without desktop arrows or the previous revision's stacked entry controls.
- `assets/logo.png`, `assets/favicon.png`, `assets/logo-horizontal.svg`: official Clearpath identity derived from the supplied EPC vector artwork.

## Manufacturing pages: ONLY IMAGE AND LOGO FILES replaced
- `manufacturing/` HTML, JavaScript, CSS and all visible wording: **byte-for-byte identical** to `testing-main.zip`.
- `manufacturing/images/Logo.svg`, `Home-2-logo.svg`, `Brand-White.svg`, `favicon.svg`, `webclip.svg`: official client logo artwork replaces the mismatched placeholder artwork.
- Existing homepage hero / service photos: machining/metalwork, reverse engineering (`DSC09558`), sand casting, mold making (vertical milling), CNC machinery.
- Existing services photos: laser cutting, steel fabrication, finishing (`DSC09581`), maintenance (`DSC09450`).
- Existing product grid: all 8 original slots use the first eight higher-quality photographs from the client's purple-products collection. **The product names and descriptions were intentionally not edited, per instructions.** Please ensure the existing names correspond to the new photographs before public launch.
- Existing workshop/industrial five-tab photos and three small about photos replaced with client imagery. `srcset` thumbnails were also replaced at their existing filenames to prevent old images appearing at some screen sizes.
- The client-supplied `CPP-1860EC-01.png` technical schematic was *not* placed over the CNC machine photograph because it depicts an oilfield centralizer drawing rather than a workshop CNC machine; it is retained in the source package, not this deployed website.

## EPC `oilngas/`: ZERO CHANGES
The entire `oilngas/` folder is preserved byte-for-byte from `testing-main.zip`, including every HTML, CSS, JavaScript, logo, image, original responsiveness and word of text.

No new global CSS, navigation overlays, responsiveness patches, added product cards, changed titles/descriptions, or redesigns are present. The landing page is the only location with HTML/CSS/JS edits.

**Verify before publishing:** check site routes on desktop and swipe previews on tablet and phone; check image-to-product-label compatibility, and review landing sizes in a real browser. Source checks cannot guarantee pixel-perfect visual layout across all devices.
