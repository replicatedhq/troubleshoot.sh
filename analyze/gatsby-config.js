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
          ],
          Analyze: [
            'node-resources',
            'cluster-version',
            'container-runtime',
            'crd',
            'deployment-status',
            'distribution',
            'image-pull-secrets',
            'ingress',
            'regex',
            'secrets',
            'statefulset-status',
            'storage-class',
          ],
          Reference: [
            'reference/analyzers'
          ]
        },
      },
    },
  ],
};
