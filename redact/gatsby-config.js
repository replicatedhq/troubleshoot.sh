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
        subtitle: "Troubleshoot Readactors",
        description: "The Official Troubleshoot Documentation",
        githubRepo: "replicatedhq/troubleshoot",
        sidebarCategories: {
          null: [
            "index",
          ],
          "Redactors": [
            "database-connection-strings",
            "aws-credentials",
            "generic-connection-strings",
            "ip-addresses",
            "passwords",
            "api-tokens",
            "usernames",
          ],
          "Reference": [
            "reference",
          ]
        },
      },
    },
  ],
};
