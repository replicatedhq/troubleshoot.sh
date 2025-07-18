# Troubleshoot Documentation

This is the new Docusaurus-based documentation site for [Troubleshoot](https://troubleshoot.sh), migrated from the original Gatsby-based site.

## Development

### Prerequisites

- Node.js 18.x or higher
- Yarn 1.22.x

### Local Development

```bash
# Install dependencies
yarn install

# Start development server
yarn start
# or
yarn dev

# The site will be available at http://localhost:3001
```

### Building

```bash
# Build the site for production
yarn build

# Serve the built site locally
yarn serve:build
```

### Useful Commands

```bash
# Clear Docusaurus cache
yarn clear

# Type check
yarn typecheck

# Bundle analyzer
yarn build:analyze

# Generate heading IDs
yarn write-heading-ids
```

## Deployment

### Netlify

The site is configured to deploy automatically on Netlify with the following settings:

- **Build Command**: `yarn build`
- **Publish Directory**: `build`
- **Node Version**: 18

The deployment configuration is in `netlify.toml` and includes:
- URL redirects for legacy paths
- Caching headers for static assets
- Security headers
- SPA fallback routing

### Manual Deployment

```bash
# Build and deploy to GitHub Pages
yarn deploy
```

## Site Structure

```
src/
├── components/          # React components
│   ├── TroubleshootLifecycle.tsx
│   └── ReplicatedBanner.tsx
├── css/
│   └── custom.css      # Custom Docusaurus theme
├── pages/
│   └── index.tsx       # Custom landing page
└── theme/
    └── Root.tsx        # Theme customizations

docs/                   # Documentation content
├── preflight/          # Preflight checks docs
├── support-bundle/     # Support bundle docs
├── collect/            # Collectors docs
├── analyze/            # Analyzers docs
├── redact/             # Redactors docs
└── host-collect-analyze/  # Host utilities docs

static/                 # Static assets
└── img/               # Images and icons
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

### Testing Search

```bash
# Test search configuration
./test-search.sh

# Test with environment variables
ALGOLIA_APP_ID=xxx ALGOLIA_API_KEY=xxx ./test-search.sh
```

## Migration Notes

This site replaces the original Gatsby-based documentation while maintaining:
- All original content and structure
- URL compatibility with redirects
- Visual consistency with the brand
- Performance and SEO standards

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run `yarn typecheck` and `yarn build` to ensure everything works
5. Submit a pull request

## Support

For issues with the documentation site, please file an issue in the [Troubleshoot repository](https://github.com/replicatedhq/troubleshoot/issues).
