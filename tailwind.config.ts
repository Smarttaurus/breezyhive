import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#FDB022',
        primaryDark: '#F7931E',
        secondary: '#F15A24',
        accent: '#FFC85C',
      },
    },
  },
  plugins: [],
}
export default config
