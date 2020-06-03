const themeOptions = {
  siteName: 'Troubleshoot Docs',
  pageTitle: 'Troubleshoot Docs',
  menuTitle: 'Troubleshoot',
  baseDir: 'analyze',
  contentDir: 'source',
};

module.exports = {
  pathPrefix: '/analyzers',
  siteMetadata: {
    title: "Troubleshoot analyzers"
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
          Analyze: [
            'analyze/node-resources',
            'analyze/cluster-version',
            'analyze/container-runtime',
            'analyze/crd',
            'analyze/deployment-status',
            'analyze/distribution',
            'analyze/image-pull-secrets',
            'analyze/ingress',
            'analyze/overview',
            'analyze/reference',
            'analyze/regex',
            'analyze/secrets',
            'analyze/statefulset-status',
            'analyze/storage-class',
          ],
        },  
      },
    },
  ],
};
