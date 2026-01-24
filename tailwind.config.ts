import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './features/**/*.{js,ts,jsx,tsx,mdx}',
    './shared/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Brand colors - LinkedIn Post Pro
        primary: {
          DEFAULT: '#0A66C2', // LinkedIn blue - Primary CTAs, links
          hover: '#004182',
          light: '#70B5F9',
        },
        secondary: {
          DEFAULT: '#057642', // Professional green - Success states, badges
          hover: '#045630',
          light: '#7FC15E',
        },
        neutral: {
          dark: '#191919',    // Main text
          medium: '#666666',  // Secondary text
          light: '#F3F2EF',   // Backgrounds, cards
        },
        error: {
          DEFAULT: '#CC1016', // Errors, alerts
          light: '#F5C6C6',
        },
      },
      fontFamily: {
        sans: ['var(--font-body)', 'system-ui', 'sans-serif'],
        display: ['var(--font-display)', 'Georgia', 'serif'],
      },
      spacing: {
        // 8px grid system
        '18': '4.5rem',   // 72px
        '22': '5.5rem',   // 88px
      },
      borderRadius: {
        'xl': '12px',
        '2xl': '16px',
      },
    },
  },
  plugins: [],
}

export default config
