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
          Installing: {
            href: ""
          },
          KOTS: {
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
