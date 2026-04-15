/**
 * LLM Documentation Generator
 *
 * This script generates LLM-accessible documentation files by processing all markdown
 * files in the docs/ directory. It runs automatically via the prebuild npm hook.
 *
 * Generated files (NOT tracked in git):
 * - static/llms.txt - Curated list of key documentation pages
 * - static/llms-full.txt - Complete archive of all documentation
 *
 * Requirements:
 * - Must be run via `npm run build` (or `npm run generate-llms`) to execute
 * - Netlify build command MUST be `npm run build`, not `docusaurus build` directly
 * - Generated files are excluded from git via .gitignore
 */

const fs = require('fs');
const path = require('path');

const DOCS_DIR = path.join(__dirname, "../../docs");
const STATIC_DIR = path.join(__dirname, "../../static");
const OUTPUT_FILE = path.join(STATIC_DIR, "llms.txt");
const OUTPUT_FULL_FILE = path.join(STATIC_DIR, "llms-full.txt");
const BASE_URL = "https://troubleshoot.sh/docs";

// Define static header content
const STATIC_HEADER = `# Troubleshoot Documentation

> Troubleshoot is an open-source Kubernetes diagnostics tool. It provides preflight checks for cluster validation before application deployment, and support bundle generation for post-installation diagnostics and troubleshooting. Troubleshoot uses collectors to gather cluster data, analyzers to evaluate conditions, and redactors to remove sensitive information.

`;

// Define the specific files for the curated list — key overview and getting started pages
const INCLUDED_FILES = [
    // Getting started
    'index.mdx',
    // Preflight checks
    'preflight/v1beta3-overview.md',
    'preflight/v1beta3-guide.md',
    'preflight/v1beta3-migration.md',
    'preflight/introduction.md',
    'preflight/cli-usage.md',
    'preflight/cluster-checks.md',
    'preflight/node-checks.md',
    'preflight/exit-codes.md',
    'preflight/next-steps.md',
    // Support Bundle
    'support-bundle/introduction.md',
    'support-bundle/collecting.md',
    'support-bundle/discover-cluster-specs.md',
    'support-bundle/supportbundle.md',
    // Collect — overview and common collectors
    'collect/index.mdx',
    'collect/collectors.md',
    'collect/all.md',
    'collect/cluster-info.md',
    'collect/cluster-resources.md',
    'collect/exec.md',
    'collect/http.md',
    'collect/logs.md',
    'collect/run-pod.md',
    'collect/copy.md',
    'collect/copy-from-host.md',
    'collect/data.md',
    'collect/secret.md',
    'collect/configmap.md',
    'collect/certificates.md',
    'collect/dns.md',
    'collect/helm.md',
    'collect/mysql.md',
    'collect/postgresql.md',
    'collect/redis.md',
    'collect/mssql.md',
    'collect/s3-status.md',
    'collect/node-metrics.md',
    'collect/registry-images.md',
    'collect/sysctl.md',
    // Analyze — overview and common analyzers
    'analyze/index.mdx',
    'analyze/analyzers.md',
    'analyze/outcomes.md',
    'analyze/cluster-version.md',
    'analyze/distribution.md',
    'analyze/node-resources.md',
    'analyze/deployment-status.md',
    'analyze/statefulset-status.md',
    'analyze/cluster-pod-statuses.md',
    'analyze/ingress.md',
    'analyze/storage-class.md',
    'analyze/image-pull-secrets.md',
    'analyze/regex.md',
    'analyze/json-compare.md',
    'analyze/yaml-compare.md',
    'analyze/certificates.md',
    'analyze/mysql.md',
    'analyze/postgresql.md',
    'analyze/redis.md',
    'analyze/s3-status.md',
    // Redact
    'redact/index.mdx',
    'redact/redactors.md',
    'redact/built-in.md',
    // Host Collect & Analyze — overview and common checks
    'host-collect-analyze/overview.md',
    'host-collect-analyze/all.md',
    'host-collect-analyze/cpu.md',
    'host-collect-analyze/memory.md',
    'host-collect-analyze/diskUsage.md',
    'host-collect-analyze/certificate.md',
    'host-collect-analyze/dns.md',
    'host-collect-analyze/hostOS.md',
    'host-collect-analyze/tcpConnect.md',
    'host-collect-analyze/tcpPortStatus.md',
    'host-collect-analyze/udpPortStatus.md',
    'host-collect-analyze/httpLoadBalancer.md',
];

function shouldSkipDirectory(filePath) {
    const excludedDirs = ['node_modules', '.history'];
    return excludedDirs.some(dir => filePath.includes(dir));
}

function cleanContent(content) {
    // Remove front matter
    content = content.replace(/^---[\s\S]*?---/, '');
    // Remove import statements
    content = content.replace(/^import.*$/gm, '');
    return content.trim();
}

function getAllMarkdownFiles(dir, fileList = []) {
    fs.readdirSync(dir).forEach(file => {
        const filePath = path.join(dir, file);

        if (shouldSkipDirectory(filePath)) {
            return;
        }

        if (fs.statSync(filePath).isDirectory()) {
            getAllMarkdownFiles(filePath, fileList);
        } else if ((path.extname(file) === '.md' || path.extname(file) === '.mdx') && !file.startsWith('_')) {
            const content = fs.readFileSync(filePath, 'utf8');
            const processedContent = cleanContent(content);

            const titleMatch = processedContent.match(/^#\s+(.+)$/m);
            const title = titleMatch ? titleMatch[1] : file.replace(/\.(md|mdx)$/, '');

            const relativePath = filePath
                .replace(`${DOCS_DIR}/`, '')
                .replace(/\.(md|mdx)$/, '');

            fileList.push({
                path: relativePath,
                title: title,
                content: processedContent
            });
        }
    });
    return fileList;
}

// Get the description of the page from the first sentence
function extractFirstSentence(text) {
    // Remove front matter
    text = text.replace(/^---[\s\S]*?---/, '');

    // Remove import statements
    text = text.replace(/^import.*$/gm, '');

    // Remove markdown headings
    text = text.replace(/^#+\s.*$/gm, '');

    // Find the first non-empty paragraph
    const firstParagraph = text.split('\n')
        .map(line => line.trim())
        .filter(line => line.length > 0)[0];

    if (!firstParagraph) return 'No description available.';

    // Check if a period is likely the end of a sentence
    function isEndOfSentence(text, periodIndex) {
        // Check if period is inside a URL
        if (text.lastIndexOf('http', periodIndex) > text.lastIndexOf(' ', periodIndex)) {
            return false;
        }

        // Check if period is inside a markdown link
        if (text.lastIndexOf('[', periodIndex) > text.lastIndexOf(']', periodIndex)) {
            return false;
        }

        // Check if period is followed by a space or end of string
        if (periodIndex < text.length - 1 && !/[\s\n]/.test(text[periodIndex + 1])) {
            return false;
        }

        return true;
    }

    // Find the first real sentence ending
    let index = 0;
    while (index < firstParagraph.length) {
        const char = firstParagraph[index];
        if ('.!?'.includes(char) && isEndOfSentence(firstParagraph, index)) {
            return firstParagraph.slice(0, index + 1).trim();
        }
        index++;
    }

    // If no sentence ending is found, return the whole paragraph
    return firstParagraph.trim();
}

function getCuratedFiles(dir) {
    const fileList = [];
    INCLUDED_FILES.forEach(relativePath => {
        const filePath = path.join(dir, relativePath);

        try {
            const content = fs.readFileSync(filePath, 'utf8');
            const processedContent = cleanContent(content);

            const titleMatch = processedContent.match(/^#\s+(.+)$/m);
            const title = titleMatch ? titleMatch[1] : path.basename(relativePath).replace(/\.(md|mdx)$/, '');

            const description = extractFirstSentence(processedContent);

            fileList.push({
                path: relativePath.replace(/\.(md|mdx)$/, ''),
                title: title,
                description: description,
                content: processedContent
            });
        } catch (error) {
            console.warn(`Warning: Could not process file ${relativePath}: ${error.message}`);
        }
    });
    return fileList;
}

function generateFullLLMsTxt(files) {
    const fullContent = files.map(file => {
        return `${file.content}\n\n---\n\n`;
    }).join('\n');

    fs.writeFileSync(OUTPUT_FULL_FILE, fullContent);
    console.log("✅ llms-full.txt generated!");
}

function generateLLMsTxt(files) {
    const dynamicContent = [
        "## Docs\n",
        "For a complete archive of all documentation pages, see [llms-full.txt](https://troubleshoot.sh/llms-full.txt)\n",
        ...files.map(file =>
            `- [${file.title}](${BASE_URL}/${file.path}): ${file.description}`
        )
    ].join('\n');

    const fullContent = STATIC_HEADER + dynamicContent;

    fs.writeFileSync(OUTPUT_FILE, fullContent);
    console.log("✅ llms.txt generated!");
}

// Main execution
const allFiles = getAllMarkdownFiles(DOCS_DIR);
const curatedFiles = getCuratedFiles(DOCS_DIR);

generateFullLLMsTxt(allFiles);
generateLLMsTxt(curatedFiles);
