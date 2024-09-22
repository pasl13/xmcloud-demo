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
// import { AgoraTailwindConfig } from '@ama-pt/agora-design-system';
// import type { Config } from 'tailwindcss';
// import withMT from '@material-tailwind/react/utils/withMT';

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
  {
    pattern: /^w-(\d+|auto|full|min|max)$/,
    variants: ['sm', 'md', 'lg', 'xl', '2xl'],
  },
  {
    pattern: /^h-(\d+|auto|full|min|max)$/,
    variants: ['sm', 'md', 'lg', 'xl', '2xl'],
  },
  // 'w-12', // Add this explicitly
  // 'h-12', // Add this explicitly
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

// const mergedTheme = {
//   ...AgoraTailwindConfig.theme,
//   ...customTheme.theme,
// };

// ////////////////////////////////////////////////////////
// const TailwindConfig: Config = withMT({
//   content: [
//     './src/**/*.{js,ts,jsx,tsx,mdx}',
//     // './node_modules/@material-tailwind/react/**/*.{js,ts,jsx,tsx,mdx}',
//     // './node_modules/@material-tailwind/react/components/**/*.{js,ts,jsx,tsx}',
//     // './node_modules/@material-tailwind/react/theme/components/**/*.{js,ts,jsx,tsx}',
//   ],
//   safelist: [...AgoraTailwindConfig.safelist, ...customSafelist],
//   theme: mergedTheme,
//   plugins: [...AgoraTailwindConfig.plugins],
//   corePlugins: {
//     preflight: false,
//   },
// }) as Config;

// export default TailwindConfig;
///////////////////////////////////////////////////////////////////////

// FINAL TAILWIND CONFIG STEP-BY-STEP
import type { Config } from 'tailwindcss';
import withMT from '@material-tailwind/react/utils/withMT';
import { AgoraTailwindConfig } from '@ama-pt/agora-design-system';

const config: Config = withMT({
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  safelist: [...AgoraTailwindConfig.safelist, ...customSafelist],
  theme: {
    extend: {
      ...AgoraTailwindConfig.theme,
      screens: customTheme.theme.screens,
    },
  },
  plugins: [...AgoraTailwindConfig.plugins],
  corePlugins: {
    preFlight: false,
  },
}) as Config;

export default config;
