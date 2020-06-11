const themeOptions = {
  siteName: 'Troubleshoot Docs',
  pageTitle: 'Troubleshoot Docs',
  menuTitle: 'Troubleshoot',
  baseDir: 'analyze',
  contentDir: 'source',
};

module.exports = {
  pathPrefix: '/analyze',
  siteMetadata: {
    title: "Troubleshoot analyzers"
  },
  plugins: [
    {
      resolve: '../gatsby-theme-troubleshoot',
      options: {
        ...themeOptions,
        root: __dirname,
        subtitle: 'Troubleshoot Analyzers',
        description: 'The Official Troubleshoot Documentation',
        githubRepo: 'replicatedhq/troubleshoot',
        sidebarCategories: {
          null: [
            'index',
            'reference/analyzers',
          ],
          Analyze: [
            'node-resources',
            'cluster-version',
            'distribution',
            'container-runtime',
            'node-resources',
            'deployment-status',
            'statefulset-status',
            'image-pull-secrets',
            'ingress',
            'storage-class',
            'secrets',
            'crd',
            'regex',
          ],
        },
      },
    },
  ],
};
