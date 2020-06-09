const themeOptions = {
  siteName: 'Troubleshoot Docs',
  pageTitle: 'Troubleshoot Docs',
  menuTitle: 'Troubleshoot',
  baseDir: 'collect',
  contentDir: 'source',
};

module.exports = {
  pathPrefix: '/collectors',
  siteMetadata: {
    title: "Troubleshoot collectors"
  },
  plugins: [
    {
      resolve: '../gatsby-theme-troubleshoot',
      options: {
        ...themeOptions,
        root: __dirname,
        subtitle: 'Troubleshoot Collectors',
        description: 'The Official Troubleshoot Documentation',
        githubRepo: 'replicatedhq/troubleshoot',
        sidebarCategories: {
          Root: [
            'index',
            'collectors',
          ],
          Collectors: [
            'cluster-info',
            'cluster-resources',
            'copy',
            'data',
            'exec',
            'http',
            'logs',
            'run',
            'secret',
            'postgresql',
            'mysql',
            'redis',
          ],
          Reference: [
            'reference/collectors'
          ]
        },
      },
    },
  ],
};
