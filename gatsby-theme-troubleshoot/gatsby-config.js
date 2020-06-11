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
          "Troubleshoot Basics": {
            url: "/overview",
            description: "Get started with the basics of what Troubleshoot is and how to use to successfully with your application.",
            omitLandingPage: true,
            main: true
          },
          "Collect": {
            url: "/collect",
            description: "Write specs to collect data from your application.",
          },
          "Redact": {
            url: "/redact",
            description: "Redact sensitive information from support bundles.",
          },
          "Analyze": {
            url: "/analyze",
            description: "Analyze data collected by your support bundles.",
          }
        },
        footerNavConfig: {
          Explore: {
            href: "https://troubleshoot.sh/explore/",
            target: "_blank",
            rel: "noopener noreferrer"
          },
          Installing: {
            href: ""
          },
          Kots: {
            href: "https://kots.io",
            target: "_blank",
            rel: "noopener noreferrer"
          }
        },
        algoliaApiKey: "cc18e896d9ebbcfbef43c3146b9f13ac",
        algoliaIndexName: "prod_troubleshoot",
        baseUrl: "https://troubleshoot.sh",
        logoLink: "https://troubleshoot.sh",
        // gaTrackingId: "UA-74643563-13",
        ...options,
      }
    }]
});
