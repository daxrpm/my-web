/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,ts,jsx,tsx,md}'],
  theme: {
    extend: {
      colors: {
        canvas: '#0d1117',
        surface: '#161b22',
        'surface-hi': '#1c2128',
        line: '#21262d',
        'line-hi': '#30363d',
        fg: '#e6edf3',
        'fg-muted': '#8b949e',
        'fg-subtle': '#6e7681',
        // The old #00ff88 was doing too much work. Green stays the identity, but as
        // an accent that only marks what matters, not the whole page.
        accent: '#3fb950',
        'accent-hi': '#56d364',
        'accent-dim': '#1f6f3a',
        // GitHub's own contribution scale, so the graph reads as familiar on sight.
        level: {
          0: '#161b22',
          1: '#0e4429',
          2: '#006d32',
          3: '#26a641',
          4: '#39d353',
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
