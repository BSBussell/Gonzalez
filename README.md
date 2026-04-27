# Gonzalez Heating & Cooling

Modern single-page marketing site for Gonzalez Heating & Cooling, built with React, TypeScript, Vite, and Tailwind. The layout mirrors the patriotic flyer with a bold header band, curved hero divider, data-driven service accordions, and a Formspree-ready contact form.

## Getting Started

```bash
npm install
npm run dev
```

- `npm run dev` — start the local dev server (default http://localhost:5173).
- `npm run build` — type-check and create a production build under `dist/`.
- `npm run preview` — preview the production build locally.
- `npm run lint` — run ESLint against the project.

## Environment Variables

Add a `.env.local` (or `.env`) file to supply optional integrations:

```
VITE_FORMSPREE_ID=your_form_id
```

When the Formspree ID is present the contact form POSTs to `https://formspree.io/f/<id>`. Without it, submissions are logged to the console so you can prototype safely.

## Design Tokens & Theming

- **CSS variables** live in `src/styles/theme.css`. Update the brand palette, typography, shadows, or spacing tokens in one place to restyle the entire site.
- **Tailwind config** (`tailwind.config.ts`) mirrors the variables, exposing classes such as `bg-red`, `text-grey-600`, `font-heading`, and `shadow-subtle`.
- Global resets, fonts (Montserrat + Inter), and motion preferences are also handled in `theme.css`.

## Key Files & Structure

```
src/
  assets/                // Mascot and illustration placeholders
  components/            // UI building blocks (Header, Hero, Services, etc.)
  data/services.ts       // Service copy and accordion metadata
  styles/theme.css       // CSS variables & base styles
  App.tsx                // Page composition using the components above
```

The services section pulls from `src/data/services.ts`, making it easy to add or reorder offerings. Section separators and SVG dividers (`CurvedDivider`, `StripeSeparator`) are reusable between sections.

## Customising Visuals

- Swap in your production logo at `src/assets/logo.png` to update the header badge. Aim for a square image around 160×160px for best results.
- Replace `src/assets/heroImage.jpg` with your preferred hero photography to refresh the hero panel.
- Update `public/og-image.png` if you want bespoke social sharing imagery.

## Accessibility & UX

- Semantic landmarks (`<header>`, `<main>`, `<footer>`) and a skip link support keyboard navigation.
- Service accordions include `aria-expanded`, `aria-controls`, and keyboard toggling.
- Reduced-motion users receive simplified transitions via the global media query in `theme.css`.

## Deployment Notes

1. Run `npm run build` and host the `dist/` output on any static hosting provider.
2. Ensure `VITE_FORMSPREE_ID` is set in the production environment if you plan to receive form submissions.
3. Update DNS, analytics, or additional meta tags as needed in `index.html`.
