const themeOptions = {
  siteName: 'Troubleshoot Docs',
  pageTitle: 'Troubleshoot Docs',
  menuTitle: 'Troubleshoot',
  baseDir: 'redact',
  contentDir: 'source',
};

module.exports = {
  siteMetadata: {
    title: "Troubleshoot redactors"
  },
  pathPrefix: '/redactors',
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
          Redact: [
            'redact/overview',
            'redact/reference',
          ],
        },  
      },
    },
  ],
};
