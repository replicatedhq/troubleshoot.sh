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
              "preflight/cli-usage",
              "preflight/exit-codes"
            ],
            "Support Bundle": [
              "support-bundle/introduction",
              "support-bundle/collecting",
              "support-bundle/supportbundle",
              "support-bundle/discover-cluster-specs",
            ],
            Collect: [
              'collect/index',
              'collect/collectors',
              'collect/all',
              'collect/ceph',
              'collect/cluster-info',
              'collect/cluster-resources',
              'collect/collectd',
              'collect/copy',
              'collect/copy-from-host',
              'collect/exec',
              'collect/http',
              'collect/configmap',
              'collect/custom-metrics',
              'collect/secret',
              'collect/longhorn',
              'collect/mssql',
              'collect/mysql',
              'collect/logs',
              'collect/postgresql',
              'collect/redis',
              'collect/registry-images',
              'collect/run-pod',
              'collect/data',
              'collect/sysctl',
              'collect/helm',
            ],
            "Redact": [
              "redact/index",
              "redact/redactors",
              "redact/api-tokens",
              "redact/aws-credentials",
              "redact/generic-connection-strings",
              "redact/database-connection-strings",
              "redact/ip-addresses",
              "redact/passwords",
              "redact/usernames",
            ],
            Analyze: [
              'analyze/index',
              'analyze/outcomes',
              'analyze/ceph-status',
              'analyze/certificates',
              'analyze/cluster-pod-statuses',
              'analyze/cluster-resource',
              'analyze/cluster-version',
              'analyze/container-runtime',
              'analyze/crd',
              'analyze/deployment-status',
              'analyze/image-pull-secrets',
              'analyze/ingress',
              'analyze/job-status',
              'analyze/json-compare',
              'analyze/distribution',
              'analyze/secrets',
              'analyze/longhorn',
              'analyze/mssql',
              'analyze/mysql',
              'analyze/node-resources',
              'analyze/postgresql',
              'analyze/regex',
              'analyze/replicaset-status',
              'analyze/storage-class',
              'analyze/configmap',
              'analyze/yaml-compare',
              'analyze/registry-images',
              'analyze/weave-report',
              'analyze/statefulset-status',
              'analyze/sysctl',
              "host-analyze/all",
            ],
            "Host Collect and Analyze": [
              'host-collect-analyze/overview',
              'host-collect-analyze/all',
              'host-collect-analyze/blockDevices',
              'host-collect-analyze/copy',
              'host-collect-analyze/cpu',
              'host-collect-analyze/certificate',
              'host-collect-analyze/certificatesCollection',
              'host-collect-analyze/diskUsage',
              'host-collect-analyze/filesystemPerformance',
              'host-collect-analyze/hostOS',
              'host-collect-analyze/hostServices',
              'host-collect-analyze/http',
              'host-collect-analyze/httpLoadBalancer',
              'host-collect-analyze/ipv4Interfaces',
              'host-collect-analyze/memory',
              'host-collect-analyze/regex',
              'host-collect-analyze/run',
              'host-collect-analyze/certificatesCollection',
              'host-collect-analyze/subnetAvailable',
              'host-collect-analyze/systemPackages',
              'host-collect-analyze/tcpConnect',
              'host-collect-analyze/tcpLoadBalancer',
              'host-collect-analyze/tcpPortStatus',
              'host-collect-analyze/time',
              'host-collect-analyze/udpPortStatus',
            ],
          },
        },
      },
    ],
  };
