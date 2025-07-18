# Troubleshoot Documentation

This repository contains the documentation site for [Troubleshoot](https://troubleshoot.sh), a kubectl plugin providing diagnostic tools for Kubernetes applications.

## About Troubleshoot

Troubleshoot is a CLI tool that provides pre-installation cluster conformance testing and validation (preflight checks) and post-installation troubleshooting and diagnostics (support bundles).

### Preflight Checks
Preflight checks are an easy-to-run set of conformance tests that can be written to verify that specific requirements in a cluster are met.

To run a sample preflight check from a sample application, [install the preflight kubectl plugin](https://troubleshoot.sh/docs/preflight/introduction/) and run:

```shell
kubectl preflight https://preflight.replicated.com
```

### Support Bundle
A support bundle is an archive that's created in-cluster, by collecting logs, cluster information and executing various commands. After creating a support bundle, the cluster operator will normally deliver it to the application vendor for analysis and remote debugging.

To collect a sample support bundle, [install the troubleshoot kubectl plugin](https://troubleshoot.sh/docs/support-bundle/introduction/) and run:

```shell
kubectl support-bundle https://support-bundle.replicated.com
```

## Documentation Development

### Prerequisites

- Node.js 18.x or higher
- NPM (comes with Node.js)

### Quick Start

```bash
# Install dependencies
make install

# Start development server
make start

# The site will be available at http://localhost:3001
```

### Available Commands

```bash
make install               # Install dependencies
make start                 # Start development server
make build                 # Build for production
make serve                 # Serve built site locally
make test                  # Run all tests
make clean                 # Clear cache
make help                  # Show available commands
```

## Deployment

The site is automatically deployed to Netlify when changes are pushed to the main branch.

- **Build Command**: `make build`
- **Publish Directory**: `build`
- **Node Version**: 18

The deployment configuration is in `netlify.toml` and includes:
- URL redirects for legacy paths
- Caching headers for static assets
- Security headers
- SPA fallback routing

## Site Structure

This is a [Docusaurus](https://docusaurus.io/) site with the following structure:

```
├── docs/                   # Documentation content
│   ├── preflight/          # Preflight checks
│   ├── support-bundle/     # Support bundle
│   ├── collect/            # Collectors
│   ├── analyze/            # Analyzers
│   ├── redact/             # Redactors
│   └── host-collect-analyze/  # Host utilities
├── src/                    # React components and pages
│   ├── components/         # Reusable components
│   ├── css/               # Custom styling
│   └── pages/             # Custom pages
├── static/                # Static assets
├── tests/                 # Test scripts
└── .github/workflows/     # GitHub Actions
```

## Key Features

- **Custom Landing Page**: Matches the original troubleshoot.sh design
- **Responsive Design**: Mobile-friendly with proper breakpoints
- **Enhanced Code Blocks**: Syntax highlighting with copy buttons
- **Search Integration**: Algolia DocSearch with automated indexing
- **SEO Optimized**: Proper meta tags and social cards
- **Performance**: Optimized builds with caching
- **Accessibility**: WCAG compliant

## Search Setup

The site uses Algolia DocSearch for search functionality. The search is configured to:

- **Index automatically**: GitHub Actions workflow runs hourly to keep search updated
- **Use environment variables**: `ALGOLIA_APP_ID` and `ALGOLIA_API_KEY` for credentials
- **Support contextual search**: Results are filtered by section and page context

### Environment Variables

For local development with search:
```bash
export ALGOLIA_APP_ID="your_app_id"
export ALGOLIA_API_KEY="your_api_key"
```

For production deployment:
- **Netlify**: Set in Site settings > Environment variables
- **GitHub Actions**: Set in Repository secrets

## Testing

Run all tests with:
```bash
./tests/run-all-tests.sh
```

Individual tests:
```bash
./tests/build-test.sh      # Validates build process and output
./tests/test-search.sh     # Validates search configuration
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run `make test` to ensure everything works
5. Submit a pull request

## Migration Notes

This site was migrated from Gatsby to Docusaurus in 2024 while maintaining:
- All original content and structure
- URL compatibility with redirects
- Visual consistency with the brand
- Performance and SEO standards

## Support

For issues with the documentation site, please file an issue in the [Troubleshoot repository](https://github.com/replicatedhq/troubleshoot/issues).
