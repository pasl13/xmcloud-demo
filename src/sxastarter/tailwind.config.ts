// const {nextui} = require("@nextui-org/react");

// /** @type {import('tailwindcss').Config} */
// module.exports = {
//   content: [
//     "./src/**/*.{js,ts,jsx,tsx,mdx}",
//     "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
//   ],
//   theme: {
//     extend: {},
//   },
//   plugins: [nextui()],
// }

import { AgoraTailwindConfig } from '@ama-pt/agora-design-system';
import type { Config } from 'tailwindcss';

const TailwindConfig: Config = {
  content: ['src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: AgoraTailwindConfig.theme,
  plugins: AgoraTailwindConfig.plugins,
  safelist: AgoraTailwindConfig.safelist,
  corePlugins: {
    preflight: false,
  },
};

export default TailwindConfig;
