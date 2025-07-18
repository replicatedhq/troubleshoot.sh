#!/usr/bin/env node

/**
 * Fix Sidebar Configuration based on actual migrated files
 */

const fs = require('fs');
const path = require('path');

// Read migration log to get actual migrated files
const migrationLog = JSON.parse(fs.readFileSync('./migration-log.json', 'utf8'));

// Get all successfully migrated files
const migratedFiles = migrationLog
  .filter(item => item.status === 'success')
  .map(item => item.source.replace('.md', '').replace('.mdx', ''));

console.log('Successfully migrated files:');
migratedFiles.forEach(file => console.log(`  - ${file}`));

// Create sidebar structure based on ACTUAL migrated files
const sidebarConfig = {
  docs: [
    'intro',
    'index', // Getting Started
    {
      type: 'category',
      label: 'Preflight Checks',
      items: migratedFiles.filter(file => file.startsWith('preflight/')).sort(),
    },
    {
      type: 'category',
      label: 'Support Bundle',
      items: migratedFiles.filter(file => file.startsWith('support-bundle/')).sort(),
    },
    {
      type: 'category',
      label: 'Collect',
      items: [
        ...migratedFiles.filter(file => file.startsWith('collect/') && !file.startsWith('collect/deprecated/')).sort(),
        {
          type: 'category',
          label: 'Deprecated',
          items: migratedFiles.filter(file => file.startsWith('collect/deprecated/')).sort(),
        },
      ],
    },
    {
      type: 'category',
      label: 'Analyze',
      items: migratedFiles.filter(file => file.startsWith('analyze/')).sort(),
    },
    {
      type: 'category',
      label: 'Redact',
      items: migratedFiles.filter(file => file.startsWith('redact/')).sort(),
    },
    {
      type: 'category',
      label: 'Host Collect & Analyze',
      items: migratedFiles.filter(file => file.startsWith('host-collect-analyze/')).sort(),
    },
  ],
};

// Remove empty categories
sidebarConfig.docs = sidebarConfig.docs.filter(item => {
  if (typeof item === 'string') return true;
  return item.items && item.items.length > 0;
});

// Handle nested categories (like Deprecated)
sidebarConfig.docs.forEach(section => {
  if (section.items) {
    section.items = section.items.filter(item => {
      if (typeof item === 'string') return true;
      return item.items && item.items.length > 0;
    });
  }
});

// Generate TypeScript sidebar config
const sidebarContent = `import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

/**
 * Troubleshoot Documentation Sidebar Configuration
 * Based on actual migrated files
 */
const sidebars: SidebarsConfig = {
  docs: ${JSON.stringify(sidebarConfig.docs, null, 4)},
};

export default sidebars;`;

// Write the sidebar configuration
fs.writeFileSync('./sidebars.ts', sidebarContent);

console.log('\n✅ Fixed sidebar configuration based on actual migrated files');
console.log('📁 Updated: sidebars.ts');
console.log('🎯 Ready to test: yarn build');