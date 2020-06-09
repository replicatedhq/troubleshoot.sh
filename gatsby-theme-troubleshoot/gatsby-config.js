module.exports = options => ({
  plugins: [
    {
    resolve: `gatsby-theme-apollo-docs`,
    options: {
      navConfig: {
        'Troubleshoot Basics': {
          url: '/docs',
          description: "Get started with the basics of what Troubleshoot is and how to use to successfully with your application.",
          omitLandingPage: true
        },
        'Collectors': {
          url: '/collect',
          description: "Get started with the basics of what Troubleshoot is and how to use to successfully with your application.",
        },
        'Analyzers': {
          url: '/analyze',
          description: "Get started with the basics of what Troubleshoot is and how to use to successfully with your application.",
        },
        'Redactors': {
          url: '/redact',
          description: "Get started with the basics of what Troubleshoot is and how to use to successfully with your application.",
        },
      },
      footerNavConfig: {
        Changelog: {
          href: '/changelog',
        },
      },
      algoliaApiKey: 'cc18e896d9ebbcfbef43c3146b9f13ac',
      algoliaIndexName: 'prod_troubleshoot',
      baseUrl: 'https://troubleshoot.sh',
      logoLink: 'https://troubleshoot.sh',
        // gaTrackingId: 'UA-74643563-13',
      ...options,
    }
  }]
});
