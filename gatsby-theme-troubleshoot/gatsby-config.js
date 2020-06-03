module.exports = options => ({
  plugins: [
    {
    resolve: `gatsby-theme-apollo-docs`,
    options: {
      navConfig: {
        'Troubleshoot Basics': {
          url: '',
          description: "Get started with the basics of what Troubleshoot is and how to use to successfully with your application.",
          omitLandingPage: true
        },
        'Collectors': {
          url: '',
          description: "Get started with the basics of what Troubleshoot is and how to use to successfully with your application.",
        },
        'Analyzers': {
          url: '',
          description: "Get started with the basics of what Troubleshoot is and how to use to successfully with your application.",
        },
        'Redactors': {
          url: '',
          description: "Get started with the basics of what Troubleshoot is and how to use to successfully with your application.",
        },
      },
      footerNavConfig: {
        Changelog: {
          href: 'https://troubleshoot.io/docs/changelog',
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
