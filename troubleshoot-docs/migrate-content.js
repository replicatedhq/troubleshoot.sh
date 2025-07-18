#!/usr/bin/env node

/**
 * Content Migration Script for Troubleshoot Docs
 * Migrates all 122 docs pages from Gatsby to Docusaurus format
 */

const fs = require('fs');
const path = require('path');

// Configuration
const sourceDir = '../content/docs';
const targetDir = './docs';
const migrationLog = [];

// Frontmatter conversion mapping
const frontmatterMapping = {
  // Direct mappings
  'title': 'title',
  'description': 'description',
  
  // New Docusaurus fields
  'tags': (content, relativePath) => {
    // Auto-generate tags based on directory structure
    const pathParts = relativePath.split('/');
    const tags = pathParts.slice(0, -1).filter(part => part !== ''); // Remove filename, keep directories
    return tags.length > 0 ? tags : ['documentation'];
  },
  
  'sidebar_position': (content, relativePath) => {
    // Auto-assign sidebar position based on file structure
    const filename = path.basename(relativePath, '.md');
    
    // Special positioning for key files
    if (filename === 'index' || filename === 'introduction' || filename === 'overview') return 1;
    if (filename === 'installation' || filename === 'getting-started') return 2;
    if (filename === 'examples' || filename === 'troubleshooting') return 99;
    
    // Default positioning
    return undefined;
  }
};

// Directory structure mapping
const directoryMapping = {
  'support-bundle': 'support-bundle',
  'preflight': 'preflight',
  'collect': 'collect',
  'analyze': 'analyze',
  'redact': 'redact',
  'host-collect-analyze': 'host-collect-analyze',
  'reference': 'reference'
};

/**
 * Parse frontmatter from markdown content
 */
function parseFrontmatter(content) {
  const frontmatterRegex = /^---\n([\s\S]*?)\n---\n([\s\S]*)$/;
  const match = content.match(frontmatterRegex);
  
  if (!match) {
    return { frontmatter: {}, content: content };
  }
  
  const frontmatterText = match[1];
  const bodyContent = match[2];
  
  // Parse YAML-like frontmatter
  const frontmatter = {};
  const lines = frontmatterText.split('\n');
  
  for (const line of lines) {
    const colonIndex = line.indexOf(':');
    if (colonIndex > 0) {
      const key = line.substring(0, colonIndex).trim();
      const value = line.substring(colonIndex + 1).trim().replace(/^["']|["']$/g, '');
      frontmatter[key] = value;
    }
  }
  
  return { frontmatter, content: bodyContent };
}

/**
 * Convert frontmatter to Docusaurus format
 */
function convertFrontmatter(originalFrontmatter, relativePath) {
  const converted = {};
  
  // Apply direct mappings
  for (const [newKey, mapping] of Object.entries(frontmatterMapping)) {
    if (typeof mapping === 'string') {
      if (originalFrontmatter[mapping]) {
        converted[newKey] = originalFrontmatter[mapping];
      }
    } else if (typeof mapping === 'function') {
      const result = mapping(originalFrontmatter, relativePath);
      if (result !== undefined) {
        converted[newKey] = result;
      }
    }
  }
  
  // Ensure required fields
  if (!converted.title) {
    // Generate title from filename
    const filename = path.basename(relativePath, '.md');
    converted.title = filename.split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  }
  
  return converted;
}

/**
 * Process content for Docusaurus compatibility
 */
function processContent(content, relativePath) {
  let processedContent = content;
  
  // Fix relative image paths
  processedContent = processedContent.replace(
    /!\[([^\]]*)\]\(([^)]+)\)/g,
    (match, alt, src) => {
      if (src.startsWith('../') || src.startsWith('./')) {
        // Convert relative paths to absolute paths from static directory
        const newSrc = `/img/${path.basename(src)}`;
        return `![${alt}](${newSrc})`;
      }
      return match;
    }
  );
  
  // Convert Apollo-style admonitions to Docusaurus format
  processedContent = processedContent.replace(
    /> (.+)/g,
    (match, content) => {
      // Simple blockquote to admonition conversion
      if (content.toLowerCase().includes('note:') || content.toLowerCase().includes('important:')) {
        return `:::info\n${content}\n:::`;
      }
      return match;
    }
  );
  
  // Fix internal links to use new structure
  processedContent = processedContent.replace(
    /\[([^\]]+)\]\(([^)]+)\.md\)/g,
    (match, text, link) => {
      if (!link.startsWith('http')) {
        // Convert relative markdown links to docusaurus format
        const cleanLink = link.replace(/^\.\//, '').replace(/^\.\.\//, '');
        return `[${text}](${cleanLink})`;
      }
      return match;
    }
  );
  
  return processedContent;
}

/**
 * Generate frontmatter string
 */
function generateFrontmatter(frontmatter) {
  const lines = ['---'];
  
  for (const [key, value] of Object.entries(frontmatter)) {
    if (Array.isArray(value)) {
      lines.push(`${key}: [${value.map(v => `"${v}"`).join(', ')}]`);
    } else {
      lines.push(`${key}: "${value}"`);
    }
  }
  
  lines.push('---');
  return lines.join('\n');
}

/**
 * Recursively process directory
 */
function processDirectory(sourceDir, targetDir, relativePath = '') {
  const files = fs.readdirSync(sourceDir);
  
  for (const file of files) {
    const sourcePath = path.join(sourceDir, file);
    const targetPath = path.join(targetDir, file);
    const currentRelativePath = path.join(relativePath, file);
    
    const stat = fs.statSync(sourcePath);
    
    if (stat.isDirectory()) {
      // Create directory if it doesn't exist
      if (!fs.existsSync(targetPath)) {
        fs.mkdirSync(targetPath, { recursive: true });
      }
      
      // Process subdirectory
      processDirectory(sourcePath, targetPath, currentRelativePath);
    } else if (file.endsWith('.md') || file.endsWith('.mdx')) {
      // Process markdown file
      try {
        const content = fs.readFileSync(sourcePath, 'utf8');
        const { frontmatter, content: bodyContent } = parseFrontmatter(content);
        
        // Convert frontmatter
        const convertedFrontmatter = convertFrontmatter(frontmatter, currentRelativePath);
        
        // Process content
        const processedContent = processContent(bodyContent, currentRelativePath);
        
        // Generate new file content
        const newFrontmatter = generateFrontmatter(convertedFrontmatter);
        const newContent = `${newFrontmatter}\n\n${processedContent}`;
        
        // Write to target
        fs.writeFileSync(targetPath, newContent);
        
        migrationLog.push({
          source: currentRelativePath,
          target: targetPath,
          status: 'success',
          title: convertedFrontmatter.title
        });
        
        console.log(`✅ Migrated: ${currentRelativePath} -> ${convertedFrontmatter.title}`);
      } catch (error) {
        migrationLog.push({
          source: currentRelativePath,
          target: targetPath,
          status: 'error',
          error: error.message
        });
        
        console.error(`❌ Error migrating ${currentRelativePath}:`, error.message);
      }
    }
  }
}

/**
 * Main migration function
 */
function migrateContent() {
  console.log('🚀 Starting Troubleshoot content migration...');
  console.log(`📁 Source: ${sourceDir}`);
  console.log(`📁 Target: ${targetDir}`);
  
  // Ensure target directory exists
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }
  
  // Start migration
  processDirectory(sourceDir, targetDir);
  
  // Generate migration report
  const successCount = migrationLog.filter(item => item.status === 'success').length;
  const errorCount = migrationLog.filter(item => item.status === 'error').length;
  
  console.log('\n📊 Migration Summary:');
  console.log(`✅ Successfully migrated: ${successCount} files`);
  console.log(`❌ Errors: ${errorCount} files`);
  
  if (errorCount > 0) {
    console.log('\n❌ Files with errors:');
    migrationLog
      .filter(item => item.status === 'error')
      .forEach(item => console.log(`  - ${item.source}: ${item.error}`));
  }
  
  // Write migration log
  fs.writeFileSync('./migration-log.json', JSON.stringify(migrationLog, null, 2));
  console.log('\n📄 Migration log saved to migration-log.json');
  
  console.log('\n🎉 Migration complete!');
  console.log('Next steps:');
  console.log('1. Review migrated content');
  console.log('2. Update sidebar configuration');
  console.log('3. Test build: yarn build');
  console.log('4. Test locally: yarn start');
}

// Run migration
if (require.main === module) {
  migrateContent();
}

module.exports = { migrateContent, processContent, convertFrontmatter };