// @ts-check

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  //output: "export",
  transpilePackages: [
    "@acme/books-sdk",
    "@acme/books-shared",
    "@acme/common",
    "@acme/feature-flag-client",
    "@acme/helper-env",
    "@acme/helper-sdk-client",
  ],
};

module.exports = nextConfig;
