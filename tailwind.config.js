/** @type {import('tailwindcss').Config} */

// Colours resolve through CSS variables (see src/styles/global.css), so switching theme
// is a variable swap rather than a second set of classes on every element. The
// `<alpha-value>` placeholder keeps opacity modifiers (bg-surface/80) working.
const v = (name) => `rgb(var(--${name}) / <alpha-value>)`;

export default {
  content: ['./src/**/*.{astro,html,js,ts,jsx,tsx,md}'],
  darkMode: ['selector', '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        canvas: v('canvas'),
        surface: v('surface'),
        'surface-hi': v('surface-hi'),
        line: v('line'),
        'line-hi': v('line-hi'),
        fg: v('fg'),
        'fg-muted': v('fg-muted'),
        'fg-subtle': v('fg-subtle'),
        accent: v('accent'),
        'accent-hi': v('accent-hi'),
        'accent-dim': v('accent-dim'),
        level: {
          0: v('level-0'),
          1: v('level-1'),
          2: v('level-2'),
          3: v('level-3'),
          4: v('level-4'),
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'monospace'],
      },
      maxWidth: {
        content: '58rem',
      },
    },
  },
  plugins: [],
};
