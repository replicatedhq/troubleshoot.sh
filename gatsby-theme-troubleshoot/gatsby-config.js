require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`
})

module.exports = options => ({
  plugins: [
    {
      resolve: "gatsby-plugin-google-fonts",
      options: {
        fonts: [
          "Roboto Mono\:400,500,700",
        ],
        display: "swap"
      }
    },
    {
      resolve: `gatsby-theme-apollo-docs`,
      options: {
        navConfig: {
          "Getting Started": {
            url: "/docs",
            description: "Learn how to use Troubleshoot to build preflight checks and build disconnected support processes for Kubernetes.",
            omitLandingPage: true,
            main: true
          },
          "Collect": {
            url: "/docs/collect",
            description: "Describe the data to collect from an application running in Kubernetes.",
          },
          "Redact": {
            url: "/docs/redact",
            description: "Redact sensitive information from the collected data.",
          },
          "Analyze": {
            url: "/docs/analyze",
            description: "Perform analysis to identify common problems with the collected data.",
          }
        },
        footerNavConfig: {
          Explore: {
            href: "/explore/",
            target: "_blank",
            rel: "noopener noreferrer"
          },
          KOTS: {
            href: "https://kots.io",
            target: "_blank",
            rel: "noopener noreferrer"
          },
          // Changelog: {
          //   href: "https://troubleshoot.io/docs/changelog",
          //   target: "_blank",
          //   rel: "noopener noreferrer"
          // }
        },
        algoliaApiKey: "04e0447a5b04544cadccdbd4357bc18b",
        algoliaIndexName: "troubleshoot-algolia-config",
        algoliaAppId: "NHTIKUBZ4C",
        baseUrl: "https://troubleshoot.sh",
        logoLink: "https://troubleshoot.sh",
        gaTrackingId: process.env.GA_TRACKING_ID,
        ...options,
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/images/`,
      },
    },
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
  ]
});
