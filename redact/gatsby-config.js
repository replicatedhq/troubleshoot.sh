const themeOptions = {
  siteName: "Troubleshoot Docs",
  pageTitle: "Troubleshoot Docs",
  menuTitle: "Troubleshoot",
  baseDir: "redact",
  contentDir: "source",
};

module.exports = {
  siteMetadata: {
    title: "Troubleshoot Redactors"
  },
  pathPrefix: "/redact",
  plugins: [
    {
      resolve: "../gatsby-theme-troubleshoot",
      options: {
        ...themeOptions,
        root: __dirname,
        subtitle: "Troubleshoot readactors",
        description: "The Official Troubleshoot Documentation",
        githubRepo: "replicatedhq/troubleshoot",
        sidebarCategories: {
          null: [
            "index",
            "reference",
          ],
          "Default Redactors": [
            "database-connection-strings",
            "aws-credentials",
          ]
        },
      },
    },
  ],
};
