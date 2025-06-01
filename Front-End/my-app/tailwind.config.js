/** @type {import('tailwindcss').Config} */
import { fontFamily } from 'tailwindcss/defaultTheme'

module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
     fontFamily: {
      geist: ['Geist', 'sans-serif'],
      geistMono: ['Geist Mono', 'monospace'],
      GeneralSans:['GeneralSans','sans-serif'],
      Author:['Author','sans-serif']
    },
    screens: {
      'sm': '480px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
     backgroundImage: {
        'dashboard-gradient': 'linear-gradient(135deg, #0f1114, #1e1f24)',
      },
    },
  },
  plugins: [],
}
