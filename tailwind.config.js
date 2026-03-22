/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'transport-black': '#0A0A0A',
        'transport-steel': '#1C1F26',
        'transport-iron': '#2E3340',
        'transport-amber': '#F0A500',
        'transport-signal': '#00D4AA',
        'transport-silver': '#9BA3B5',
        'transport-white': '#F5F6FA',
        'orchestra-gold': '#D4AF37',
        'orchestra-cream': '#F5F5DC',
        'orchestra-brown': '#8B4513',
        'orchestra-dark': '#0A0A0A',
        'orchestra-red': '#8B0000',
        'orchestra-navy': '#1B365D',
        'beam-gold': '#F0A500',
        'beam-bronze': '#CD7F32',
        'beam-black': '#000000',
      },
      fontFamily: {
        'display': ['var(--font-bebas-neue)', 'Bebas Neue', 'Impact', 'sans-serif'],
        'sans': ['var(--font-dm-sans)', 'DM Sans', 'system-ui', 'sans-serif'],
        'mono': ['var(--font-space-mono)', 'Space Mono', 'monospace'],
        'serif': ['var(--font-dm-sans)', 'DM Sans', 'system-ui', 'sans-serif'],
        'cursive': ['var(--font-bebas-neue)', 'Bebas Neue', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}
