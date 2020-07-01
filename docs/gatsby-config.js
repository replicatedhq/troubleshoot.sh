const themeOptions = {
    siteName: 'Troubleshoot Docs',
    pageTitle: 'Troubleshoot Docs',
    menuTitle: 'Troubleshoot',
    baseDir: 'docs',
    contentDir: 'source',
  };
  
  module.exports = {
    pathPrefix: '/docs',
    siteMetadata: {
      title: "Troubleshoot Docs"
    },
    plugins: [
      {
        resolve: '../gatsby-theme-troubleshoot',
        options: {
          ...themeOptions,
          root: __dirname,
          subtitle: 'Troubleshoot Docs',
          description: 'The Official Troubleshoot Documentation',
          githubRepo: 'replicatedhq/troubleshoot',
          sidebarCategories: {
            "Overview": [
              "index",
            ],
            "Preflight Checks": [
              "preflight/introduction",
              "preflight/cluster-checks",
              "preflight/node-checks",
              "preflight/next-steps",
            ],
            "Support Bundle": [
              "support-bundle/introduction",
              "support-bundle/collecting",
            ],
            Collect: [
              'collect/index',
              'collect/collectors',
              'collect/all',
              'collect/cluster-info',
              'collect/cluster-resources',
              'collect/copy',
              'collect/data',
              'collect/exec',
              'collect/http',
              'collect/logs',
              'collect/run',
              'collect/secret',
              'collect/postgresql',
              'collect/mysql',
              'collect/redis',
            ],
            "Redact": [
              "redact/index",
              "redact/redactors",
              "redact/database-connection-strings",
              "redact/aws-credentials",
              "redact/generic-connection-strings",
              "redact/ip-addresses",
              "redact/passwords",
              "redact/api-tokens",
              "redact/usernames",
            ],
            Analyze: [
              'analyze/index',
              'analyze/outcomes',
              'analyze/node-resources',
              'analyze/cluster-version',
              'analyze/distribution',
              'analyze/container-runtime',
              'analyze/node-resources',
              'analyze/deployment-status',
              'analyze/statefulset-status',
              'analyze/image-pull-secrets',
              'analyze/ingress',
              'analyze/storage-class',
              'analyze/secrets',
              'analyze/crd',
              'analyze/regex',
            ],
          },
        },
      },
    ],
  };
  