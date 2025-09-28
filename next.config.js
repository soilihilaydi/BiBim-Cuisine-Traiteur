const { withSentryConfig } = require('@sentry/nextjs');

const nextConfig = {
  /* config options here */
};

const sentryWebpackPluginOptions = {
  // For all available options, see: https://github.com/getsentry/sentry-webpack-plugin#options
  silent: true, // Suppresses all error messages from Sentry Webpack Plugin
  org: process.env.SENTRY_ORG,
  project: process.env.SENTRY_PROJECT,
};

// Make sure adding Sentry options is the last code to run before exporting
module.exports = withSentryConfig(nextConfig, sentryWebpackPluginOptions);
// module.exports = nextConfig; // withSentryConfig disabled for Storybook debugging
