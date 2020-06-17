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
            url: "/learn",
            description: "Learn how to use Troubleshoot to build preflight checks and build disconnected support processes for Kubernetes.",
            omitLandingPage: true,
            main: true
          },
          "Collect": {
            url: "/collect",
            description: "Describe the data to collect from an application running in Kubernetes.",
          },
          "Redact": {
            url: "/redact",
            description: "Redact sensitive information from the collected data.",
          },
          "Analyze": {
            url: "/analyze",
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
        gaTrackingId: "UA-61420213-14",
        ...options,
      }
    }]
});
