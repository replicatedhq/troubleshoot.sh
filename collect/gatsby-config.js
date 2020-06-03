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
        subtitle: 'Troubleshoot Documentation',
        description: 'The Official Troubleshoot Documentation',
        githubRepo: 'replicatedhq/troubleshoot',
        sidebarCategories: {
          Collectors: [
            'collect/cluster-info',
            'collect/cluster-resources',
            'collect/copy',
            'collect/data',
            'collect/exec',
            'collect/http',
            'collect/logs',
            'collect/overview',
            'collect/reference',
            'collect/run',
            'collect/secret',
          ],
        },  
      },
    },
  ],
};
