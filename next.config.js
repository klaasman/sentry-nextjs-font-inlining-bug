// @ts-check

const { withSentryConfig } = require("@sentry/nextjs");

/**
 * @type {import('next').NextConfig}
 **/
const nextConfig = {
  reactStrictMode: true,
};

module.exports = withSentryConfig(
  {
    ...nextConfig,
    sentry: {
      /**
       * Setting this value to `false` fixes an issue where next.js doesn't
       * inline fonts in production builds anymore.
       */
      autoInstrumentServerFunctions: false,
    },
  },
  undefined
);
