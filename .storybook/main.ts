import type { StorybookConfig } from '@storybook/angular-vite';

const config: StorybookConfig = {
  "stories": [
    "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-vitest",
    "@storybook/addon-a11y",
    "@storybook/addon-docs"
  ],
  "framework": "@storybook/angular-vite",
  viteFinal: (viteConfig) => ({ ...viteConfig, build: { ...viteConfig.build, cssMinify: 'esbuild' } }),
};
export default config;