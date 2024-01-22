import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors:{
        // background primary is color of the site's background
        backgroundPrimary: "#433679",
        // background complement is color of overlay content on the website
        backgroundComplement: "#dcf5d7",
        // primary is color of the main text
        textPrimary: "#ffffff",
        // accent is color of the secondary text
        textAccent: "#dcf5d7",
        // text complement will work with background complement
        textComplement: "#000000",
        dropShadowColor: "#49A0CD"
      }
    },
  },
  plugins: [],
};
export default config;
