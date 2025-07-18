import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

/**
 * Troubleshoot Documentation Sidebar Configuration
 * Based on actual migrated files
 */
const sidebars: SidebarsConfig = {
  docs: [
    "index",
    {
        "type": "category",
        "label": "Preflight Checks",
        "collapsed": false,
        "items": [
            "preflight/introduction",
            "preflight/cli-usage",
            "preflight/cluster-checks",
            "preflight/node-checks",
            "preflight/exit-codes",
            "preflight/next-steps"
        ]
    },
    {
        "type": "category",
        "label": "Support Bundle",
        "collapsed": false,
        "items": [
            "support-bundle/introduction",
            "support-bundle/collecting",
            "support-bundle/discover-cluster-specs",
            "support-bundle/supportbundle"
        ]
    },
    {
        "type": "category",
        "label": "Collect",
        "collapsed": false,
        "items": [
            "collect/index",
            "collect/collectors",
            "collect/all",
            "collect/certificates",
            "collect/cluster-info",
            "collect/cluster-resources",
            "collect/configmap",
            "collect/copy",
            "collect/copy-from-host",
            "collect/data",
            "collect/dns",
            "collect/etcd",
            "collect/exec",
            "collect/helm",
            "collect/http",
            "collect/logs",
            "collect/run-daemonset",
            "collect/run-pod",
            "collect/secret",
            "collect/ceph",
            "collect/collectd",
            "collect/custom-metrics",
            "collect/goldpinger",
            "collect/longhorn",
            "collect/mssql",
            "collect/mysql",
            "collect/node-metrics",
            "collect/postgresql",
            "collect/redis",
            "collect/registry-images",
            "collect/sonobuoy",
            "collect/sysctl",
            {
                "type": "category",
                "label": "Deprecated",
                "collapsed": false,
                "items": [
                    "collect/deprecated/run"
                ]
            }
        ]
    },
    {
        "type": "category",
        "label": "Analyze",
        "collapsed": false,
        "items": [
            "analyze/index",
            "analyze/analyzers",
            "analyze/outcomes",
            "analyze/certificates",
            "analyze/cluster-container-statuses",
            "analyze/cluster-pod-statuses",
            "analyze/cluster-resource",
            "analyze/cluster-version",
            "analyze/configmaps",
            "analyze/container-runtime",
            "analyze/crd",
            "analyze/deployment-status",
            "analyze/distribution",
            "analyze/event",
            "analyze/http",
            "analyze/image-pull-secrets",
            "analyze/ingress",
            "analyze/job-status",
            "analyze/json-compare",
            "analyze/node-metrics",
            "analyze/node-resources",
            "analyze/regex",
            "analyze/replicaset-status",
            "analyze/secrets",
            "analyze/statefulset-status",
            "analyze/storage-class",
            "analyze/sysctl",
            "analyze/yaml-compare",
            "analyze/ceph-status",
            "analyze/goldpinger",
            "analyze/longhorn",
            "analyze/mssql",
            "analyze/mysql",
            "analyze/postgresql",
            "analyze/redis",
            "analyze/registry-images",
            "analyze/velero",
            "analyze/weave-report"
        ]
    },
    {
        "type": "category",
        "label": "Redact",
        "collapsed": false,
        "items": [
            "redact/index",
            "redact/redactors",
            "redact/built-in",
            "redact/api-tokens",
            "redact/aws-credentials",
            "redact/database-connection-strings",
            "redact/generic-connection-strings",
            "redact/ip-addresses",
            "redact/passwords",
            "redact/usernames"
        ]
    },
    {
        "type": "category",
        "label": "Host Collect & Analyze",
        "collapsed": false,
        "items": [
            "host-collect-analyze/overview",
            "host-collect-analyze/all",
            "host-collect-analyze/blockDevices",
            "host-collect-analyze/certificate",
            "host-collect-analyze/certificatesCollection",
            "host-collect-analyze/cgroups",
            "host-collect-analyze/copy",
            "host-collect-analyze/cpu",
            "host-collect-analyze/diskUsage",
            "host-collect-analyze/dns",
            "host-collect-analyze/filesystemPerformance",
            "host-collect-analyze/hostOS",
            "host-collect-analyze/hostServices",
            "host-collect-analyze/httpLoadBalancer",
            "host-collect-analyze/ipv4Interfaces",
            "host-collect-analyze/journald",
            "host-collect-analyze/kernelConfigs",
            "host-collect-analyze/memory",
            "host-collect-analyze/networkNamespaceConnectivity",
            "host-collect-analyze/regex",
            "host-collect-analyze/run",
            "host-collect-analyze/subnetAvailable",
            "host-collect-analyze/subnetcontainsip",
            "host-collect-analyze/sysctl",
            "host-collect-analyze/systemPackages",
            "host-collect-analyze/tcpConnect",
            "host-collect-analyze/tcpLoadBalancer",
            "host-collect-analyze/tcpPortStatus",
            "host-collect-analyze/time",
            "host-collect-analyze/udpPortStatus"
        ]
    }
],
};

export default sidebars;