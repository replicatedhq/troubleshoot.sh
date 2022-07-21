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
          githubRepo: 'replicatedhq/troubleshoot.sh',
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
              'collect/copy-from-host',
              'collect/data',
              'collect/exec',
              'collect/http',
              'collect/logs',
              'collect/run-pod',
              'collect/collectd',
              'collect/configmap',
              'collect/secret',
              'collect/postgresql',
              'collect/mysql',
              'collect/redis',
              'collect/ceph',
              'collect/longhorn',
              'collect/registry-images',
              'collect/sysctl',
            ],
            "Host Collect": [
              'host-collect/host-collectors',
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
              'analyze/cluster-version',
              'analyze/cluster-pod-statuses',
              'analyze/distribution',
              'analyze/container-runtime',
              'analyze/node-resources',
              'analyze/deployment-status',
              'analyze/statefulset-status',
              'analyze/replicaset-status',
              'analyze/job-status',
              'analyze/image-pull-secrets',
              'analyze/ingress',
              'analyze/storage-class',
              'analyze/configmap',
              'analyze/secrets',
              'analyze/crd',
              'analyze/regex',
              'analyze/json-compare',
              'analyze/yaml-compare',
              'analyze/postgresql',
              'analyze/mysql',
              'analyze/ceph-status',
              'analyze/longhorn',
              'analyze/registry-images',
              'analyze/weave-report',
              'analyze/sysctl',
              "host-analyze/all",
            ],
          },
        },
      },
    ],
  };
