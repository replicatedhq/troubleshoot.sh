module.exports = {
  siteMetadata: {
    title: "Troubleshoot.sh"
  },
  pathPrefix: '/',
  flags: {
    FAST_DEV: false,
    DEV_SSR: false,
    PRESERVE_WEBPACK_CACHE: false,
    PRESERVE_FILE_DOWNLOAD_CACHE: false,
    PARALLEL_SOURCING: false
  },
  plugins: [
    {
      resolve: '../gatsby-theme-marketing',
    },
  ],
};
