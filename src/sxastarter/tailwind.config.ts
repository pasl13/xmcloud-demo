// const {nextui} = require("@nextui-org/react");
// import { AgoraTailwindConfig } from '@ama-pt/agora-design-system';

// /** @type {import('tailwindcss').Config} */
// module.exports = {
//   content: [
//     './src/**/*.{js,ts,jsx,tsx,mdx}',
//     // "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
//   ],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// };

import { AgoraTailwindConfig } from '@ama-pt/agora-design-system';
import type { Config } from 'tailwindcss';

const customSafelist = [
  {
    pattern: /^basis-./,
    variants: ['sm', 'md', 'lg', 'xl', '2xl'],
  },
  {
    pattern: /^grow$/,
    variants: ['sm', 'md', 'lg', 'xl', '2xl'],
  },
  {
    pattern: /^order-./,
    variants: ['sm', 'md', 'lg', 'xl', '2xl'],
  },
  {
    pattern: /^(hidden|inline|inline-block|block)$/,
    variants: ['sm', 'md', 'lg', 'xl', '2xl'],
  },
  {
    pattern: /^(table|table-row|table-cell)$/,
    variants: ['sm', 'md', 'lg', 'xl', '2xl'],
  },
  {
    pattern: /^(flex|inline-flex)$/,
    variants: ['sm', 'md', 'lg', 'xl', '2xl'],
  },
  {
    pattern: /^(ml|mr)-0$/,
    variants: ['sm', 'md', 'lg', 'xl', '2xl'],
  },
  {
    pattern: /^(ml|mr|mx)-auto$/,
    variants: ['sm', 'md', 'lg', 'xl', '2xl'],
  },
  {
    pattern: /^self-(center|end|start)$/,
    variants: ['sm', 'md', 'lg', 'xl', '2xl'],
  },
];

const customTheme = {
  theme: {
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
  },
};

const mergedTheme = {
  ...AgoraTailwindConfig.theme,
  ...customTheme.theme,
};

const TailwindConfig: Config = {
  content: ['src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: mergedTheme,
  plugins: AgoraTailwindConfig.plugins,
  // safelist: AgoraTailwindConfig.safelist,
  corePlugins: {
    preflight: false,
  },
  safelist: [...AgoraTailwindConfig.safelist, ...customSafelist],
};

export default TailwindConfig;
