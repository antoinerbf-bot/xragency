/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"DM Sans"', 'sans-serif'],
        serif: ['"Playfair Display"', 'serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      colors: {
        background: '#FAFAFA',
        foreground: '#262626',
        primary: {
          DEFAULT: '#2E2E2E',
          foreground: '#FFFFFF',
        },
        muted: {
          DEFAULT: '#F1F1F1',
          foreground: '#7A7A7A',
        },
        border: '#E0E0E0',
        accent: '#EDEDED',
      },
      keyframes: {
        'marquee': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'fade-in': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'ping-slow': {
          '75%, 100%': { transform: 'scale(2)', opacity: '0' },
        },
        'accordion-down': {
          '0%': { height: '0' },
          '100%': { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          '0%': { height: 'var(--radix-accordion-content-height)' },
          '100%': { height: '0' },
        },
        'lift-subtle': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-4px)' },
        },
        'parallax-subtle': {
          '0%': { transform: 'translateY(10px)' },
          '100%': { transform: 'translateY(-10px)' },
        },
        'glow-subtle': {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(46, 46, 46, 0.1)' },
          '50%': { boxShadow: '0 0 20px 10px rgba(46, 46, 46, 0.05)' },
        },
        'pulse-glow': {
          '0%, 100%': { opacity: '1', boxShadow: '0 0 0 0 rgba(46, 46, 46, 0.3)' },
          '50%': { opacity: '0.8' },
          '100%': { boxShadow: '0 0 0 10px rgba(46, 46, 46, 0)' },
        },
      },
      animation: {
        'marquee': 'marquee 30s linear infinite',
        'fade-in': 'fade-in 0.6s ease-out forwards',
        'ping-slow': 'ping-slow 2s cubic-bezier(0, 0, 0.2, 1) infinite',
        'lift-subtle': 'lift-subtle 0.3s ease-out',
        'parallax-subtle': 'parallax-subtle 20s ease-in-out infinite',
        'glow-subtle': 'glow-subtle 3s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 2s cubic-bezier(0, 0, 0.2, 1) infinite',
      },
    },
  },
  plugins: [],
}
