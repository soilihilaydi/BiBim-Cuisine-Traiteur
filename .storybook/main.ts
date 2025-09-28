import type { StorybookConfig } from "@storybook/nextjs";

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: ["@storybook/addon-links", "@storybook/addon-docs"],

  framework: {
    name: "@storybook/nextjs",
    options: {
      fastRefresh: false,
    },
  },

  staticDirs: ['../public'],

  webpackFinal: async (config) => {
    // Mock react-leaflet
    if (config.resolve) {
      config.resolve.alias = {
        ...config.resolve.alias,
        'react-leaflet': require.resolve('./__mocks__/react-leaflet.js'),
      };
    }

    // Forcefully remove ReactRefreshWebpackPlugin
    if (config.plugins) {
      config.plugins = config.plugins.filter(
        (plugin) => plugin.constructor.name !== 'ReactRefreshPlugin'
      );
    }

    return config;
  }
};

export default config;
