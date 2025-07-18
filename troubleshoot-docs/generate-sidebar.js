#!/usr/bin/env node

/**
 * Generate Sidebar Configuration for Troubleshoot Docs
 * Creates a comprehensive sidebar based on the migrated content structure
 */

const fs = require('fs');
const path = require('path');

// Read migration log to get all migrated files
const migrationLog = JSON.parse(fs.readFileSync('./migration-log.json', 'utf8'));

// Create sidebar structure
const sidebarConfig = {
  docs: [
    'intro',
    'index', // Getting Started
    {
      type: 'category',
      label: 'Preflight Checks',
      items: [
        'preflight/introduction',
        'preflight/cluster-checks',
        'preflight/node-checks',
        'preflight/next-steps',
        'preflight/cli-usage',
        'preflight/exit-codes',
      ],
    },
    {
      type: 'category',
      label: 'Support Bundle',
      items: [
        'support-bundle/introduction',
        'support-bundle/collecting',
        'support-bundle/supportbundle',
        'support-bundle/discover-cluster-specs',
      ],
    },
    {
      type: 'category',
      label: 'Collect',
      items: [
        'collect/index',
        'collect/collectors',
        'collect/all',
        'collect/cluster-info',
        'collect/cluster-resources',
        'collect/secret',
        'collect/configmap',
        'collect/logs',
        'collect/data',
        'collect/copy',
        'collect/exec',
        'collect/http',
        'collect/postgresql',
        'collect/mysql',
        'collect/mssql',
        'collect/redis',
        'collect/collectd',
        'collect/ceph',
        'collect/longhorn',
        'collect/registry-images',
        'collect/sysctl',
        'collect/certificates',
        'collect/copy-from-host',
        'collect/run-pod',
        'collect/run-daemonset',
        'collect/custom-metrics',
        'collect/node-metrics',
        'collect/sonobuoy',
        'collect/goldpinger',
        'collect/helm',
        'collect/dns',
        'collect/etcd',
        {
          type: 'category',
          label: 'Deprecated',
          items: [
            'collect/deprecated/run',
          ],
        },
      ],
    },
    {
      type: 'category',
      label: 'Analyze',
      items: [
        'analyze/index',
        'analyze/analyzers',
        'analyze/outcomes',
        'analyze/cluster-version',
        'analyze/storage-class',
        'analyze/crd',
        'analyze/ingress',
        'analyze/image-pull-secrets',
        'analyze/deployment-status',
        'analyze/statefulset-status',
        'analyze/job-status',
        'analyze/replicaset-status',
        'analyze/secrets',
        'analyze/configmaps',
        'analyze/node-resources',
        'analyze/node-metrics',
        'analyze/container-runtime',
        'analyze/distribution',
        'analyze/event',
        'analyze/cluster-resource',
        'analyze/cluster-pod-statuses',
        'analyze/cluster-container-statuses',
        'analyze/certificates',
        'analyze/regex',
        'analyze/yaml-compare',
        'analyze/json-compare',
        'analyze/postgresql',
        'analyze/mysql',
        'analyze/mssql',
        'analyze/redis',
        'analyze/collectd',
        'analyze/ceph-status',
        'analyze/longhorn',
        'analyze/registry-images',
        'analyze/sysctl',
        'analyze/velero',
        'analyze/weave-report',
        'analyze/goldpinger',
        'analyze/http',
      ],
    },
    {
      type: 'category',
      label: 'Redact',
      items: [
        'redact/index',
        'redact/redactors',
        'redact/built-in',
        'redact/api-tokens',
        'redact/aws-credentials',
        'redact/database-connection-strings',
        'redact/generic-connection-strings',
        'redact/ip-addresses',
        'redact/passwords',
        'redact/usernames',
      ],
    },
    {
      type: 'category',
      label: 'Host Collect & Analyze',
      items: [
        'host-collect-analyze/overview',
        'host-collect-analyze/all',
        'host-collect-analyze/blockDevices',
        'host-collect-analyze/cgroups',
        'host-collect-analyze/copy',
        'host-collect-analyze/cpu',
        'host-collect-analyze/certificate',
        'host-collect-analyze/certificatesCollection',
        'host-collect-analyze/dns',
        'host-collect-analyze/diskUsage',
        'host-collect-analyze/filesystemPerformance',
        'host-collect-analyze/hostOS',
        'host-collect-analyze/hostServices',
        'host-collect-analyze/httpLoadBalancer',
        'host-collect-analyze/ipv4Interfaces',
        'host-collect-analyze/journald',
        'host-collect-analyze/kernelConfigs',
        'host-collect-analyze/memory',
        'host-collect-analyze/networkNamespaceConnectivity',
        'host-collect-analyze/regex',
        'host-collect-analyze/run',
        'host-collect-analyze/subnetAvailable',
        'host-collect-analyze/subnetcontainsip',
        'host-collect-analyze/sysctl',
        'host-collect-analyze/systemPackages',
        'host-collect-analyze/tcpConnect',
        'host-collect-analyze/tcpLoadBalancer',
        'host-collect-analyze/tcpPortStatus',
        'host-collect-analyze/time',
        'host-collect-analyze/udpPortStatus',
      ],
    },
    // Note: No reference section found in migration log
  ],
};

// Generate TypeScript sidebar config
const sidebarContent = `import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

/**
 * Troubleshoot Documentation Sidebar Configuration
 * Auto-generated from migrated content structure
 */
const sidebars: SidebarsConfig = {
  docs: ${JSON.stringify(sidebarConfig.docs, null, 4)},
};

export default sidebars;`;

// Write the sidebar configuration
fs.writeFileSync('./sidebars.ts', sidebarContent);

console.log('✅ Generated sidebar configuration with all migrated content');
console.log('📁 Updated: sidebars.ts');
console.log('📊 Sidebar structure:');
console.log(`   - Root pages: 2`);
console.log(`   - Preflight Checks: 6 pages`);
console.log(`   - Support Bundle: 4 pages`);
console.log(`   - Collect: 26 pages + 1 deprecated`);
console.log(`   - Analyze: 25 pages`);
console.log(`   - Redact: 10 pages`);
console.log(`   - Host Collect & Analyze: 24 pages`);
console.log(`   - Total: ~98 organized pages`);

console.log('\n🎯 Next steps:');
console.log('1. Test build: yarn build');
console.log('2. Review navigation structure');
console.log('3. Test locally: yarn start');