# kitsvzla — Landing Page

A landing page for **@kitsvzla**, a volunteer group in Caracas & La Guaira, Venezuela assembling
and delivering relief backpacks ("bultos") to hospital patients and families in shelters affected
by the earthquake. The page is bilingual (Spanish primary, English secondary).

Built as a React app with Vite.

## What's in this package

- `src/App.jsx` — page composition (nav, hero, and all sections)
- `src/data.js` — kit categories and payment methods
- `src/icons.jsx` — inline SVG icon components
- `src/index.css` — all styling, using CSS custom properties defined in `:root`

## How to run / preview

```bash
npm install
npm run dev
```

## How to build

```bash
npm run build
```

Outputs a static site to `dist/`, deployable to any static host (Netlify, Cloudflare Pages,
GitHub Pages, Vercel, etc.).

## Sections (in order)

1. **Hero** — intro + Instagram / donate CTAs
2. **Quiénes somos** — who they are (volunteers, not an official foundation)
3. **Empezamos por el morral** — what they do & why, plus a highlighted "belonging" banner
4. **Armamos cada kit según la necesidad** — the supply list, organized into 7 categories:
   Higiene personal, Emergencia y salud, Artículos esenciales, Abrigo y descanso, Niños,
   Protección, Apoyo emocional
5. **Donar** — payment methods (Zelle, Venmo, Bizum, IBAN, Bolívares, PayPal)
6. **Footer / contacto**

## Key details

- **PayPal pool link** (live, in the donate section):
  https://www.paypal.com/pool/9qnYFaMCCZ?sr=ancr
- **Instagram:** https://www.instagram.com/kitsvzla
- Design system uses CSS custom properties (`:root` variables in `src/index.css`) — colors and
  fonts are defined once. Signature visual element is the dashed "stitch" divider (echoes
  backpack seam stitching).

## Notes for the next developer

- There's a `.gallery` CSS block in `src/index.css` for a two-photo gallery that was built and
  then removed at the client's request. Left in so it can be re-added quickly later.
- **Photo/privacy note:** if a photo gallery is added later, be careful with images showing
  identifiable minors or backpacks with people's full names written on labels. The client's
  preference has been to only publish photos of the packed bags and of volunteers (adults posing
  willingly), and to strip EXIF/GPS metadata from any uploaded image. Please preserve that.
- Content is bilingual: Spanish is the primary voice; English appears in the italic `.en` class.

## Possible next steps (not yet done)

- Custom domain + DNS
- Replace the "DM us" placeholders for IBAN and Bolívares with real details if/when available
- Optional: analytics, an OG/social share image + meta tags, favicon
- Optional: re-add the photo gallery (see privacy note above)
