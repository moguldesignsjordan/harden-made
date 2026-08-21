/** @type {import('tailwindcss').Config} */

// Colors are driven by CSS variables defined in src/index.css so that a single
// `dark` class on <html> flips the whole palette. Each variable holds raw RGB
// channels ("18 5 22") rather than a hex string, which is what lets Tailwind's
// opacity modifiers (bg-base/95, border-accent/20) keep working.
const themed = (name) => `rgb(var(--${name}) / <alpha-value>)`;

export default {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        base: themed("base"),           // page background
        surface: themed("surface"),     // alternating section background
        elevated: themed("elevated"),   // cards, drawer, inputs
        hairline: themed("hairline"),   // borders and dividers
        accent: themed("accent"),       // brand pink
        "accent-fg": themed("accent-fg"), // text that sits on top of accent
        ink: themed("ink"),             // primary text
        "ink-muted": themed("ink-muted"),   // body copy
        "ink-subtle": themed("ink-subtle"), // captions, footer
      },
    },
  },
  plugins: [],
}
