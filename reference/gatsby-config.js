const themeOptions = {
  siteName: 'Troubleshoot Docs',
  pageTitle: 'Troubleshoot Docs',
  menuTitle: 'Troubleshoot',
  baseDir: 'reference',
  contentDir: 'source',
};

module.exports = {
  pathPrefix: '/reference',
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
            'reference/collectors',
            'reference/redactors',
            'reference/analyzers'
          ],
        },
      },
    },
  ],
};
