import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.astro',
    './src/components/**/*.astro',
    './src/layouts/**/*.astro',

  ],
  theme: {
    screen:{
      "sm":{"min":"576px"},
      "md":{"min":"768px"},
      "lg":{"min":"992px"},
      "xl":{"min":"1200px"},
    }
  },
  plugins: [],
};
export default config;
