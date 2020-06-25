const themeOptions = {
  siteName: 'Troubleshoot Docs',
  pageTitle: 'Troubleshoot Docs',
  menuTitle: 'Troubleshoot',
  baseDir: 'reference',
  contentDir: 'source',
};

module.exports = {
  pathPrefix: '/api-reference',
  siteMetadata: {
    title: "Troubleshoot Reference Documentation"
  },
  plugins: [
    {
      resolve: '../gatsby-theme-troubleshoot',
      options: {
        ...themeOptions,
        root: __dirname,
        subtitle: 'Troubleshoot Reference',
        description: 'The Official Troubleshoot Documentation',
        githubRepo: 'replicatedhq/troubleshoot',
        sidebarCategories: {
          null: [
            'collect',
            'redact',
            'analyze'
          ],
        },
      },
    },
  ],
};
