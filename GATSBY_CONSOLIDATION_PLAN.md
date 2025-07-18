# Gatsby App Consolidation Implementation Plan

## Overview

This plan outlines the consolidation of two separate Gatsby applications (marketing and docs) into a single unified Gatsby application. The goal is to eliminate duplicate dependencies, simplify CVE patching, and streamline the build process while preserving all existing functionality and URLs.

## Prior art / background

Currently, the repository contains:
- **Marketing App**: Root landing page at `/` using Gatsby 4.20.0 with `gatsby-theme-marketing`
- **Docs App**: Documentation at `/docs` using Gatsby 2.22.15 with `gatsby-theme-troubleshoot` (theme expects Gatsby 5.14.1 but docs uses 2.22.15)

The build process uses a Makefile to:
1. Build both apps separately
2. Combine outputs into a single `public/` directory
3. Deploy via Netlify with `_redirects` handling routing

**Reference files:**
- `/Makefile` - Current build orchestration
- `/netlify.toml` - Netlify configuration
- `/static/_redirects` - URL routing between apps
- `/docs/gatsby-config.js` - Docs app configuration
- `/marketing/gatsby-config.js` - Marketing app configuration

## Requirements

1. **Unified Gatsby Version**: Consolidate to a single, modern Gatsby version (5.x) to resolve CVE issues
2. **Preserve All URLs**: Maintain existing URL structure with marketing at `/` and docs at `/docs`
3. **Content Preservation**: Migrate all docs content and assets without loss
4. **Theme Integration**: Merge functionality from both themes into a cohesive system
5. **Build Simplification**: Replace complex Makefile with standard Gatsby build
6. **Netlify Compatibility**: Ensure deployment continues to work with minimal changes
7. **Development Experience**: Maintain ability to develop both sections locally
8. **Asset Management**: Preserve all static assets, images, and generated content
9. **SEO Preservation**: Maintain existing meta tags, sitemaps, and search functionality
10. **Performance**: Ensure no degradation in build times or runtime performance

## Implementation Details

### Target Architecture
- **Single Gatsby App**: Use marketing app as base (keep Gatsby 4.20.0 during consolidation)
- **Unified Theme**: Adapt docs theme components to work with Gatsby 4.x
- **Path-based Routing**: Use Gatsby's built-in routing with `/docs/*` pages
- **Shared Components**: Extract common components (Header, Footer, SEO)
- **Content Sources**: Configure multiple content sources for marketing and docs

### Key Technical Decisions
- **Base App**: Marketing app becomes the foundation (Gatsby 4.20.0 vs docs' 2.22.15)
- **Consolidation First**: Merge at current versions before upgrading Gatsby
- **Theme Strategy**: Adapt docs theme components to work with marketing app's Gatsby 4.x
- **Content Management**: Use Gatsby's filesystem source for docs content
- **Build Process**: Standard `gatsby build` replacing Makefile orchestration
- **Asset Handling**: Consolidate all static assets into single structure

### Migration Strategy
1. **Phase 1**: Consolidate at current versions (Gatsby 4.20.0)
2. **Phase 2**: Validate consolidated app works and deploys
3. **Phase 3**: Upgrade to Gatsby 5.x as single codebase
4. **Phase 4**: Final optimization and cleanup

## Implementation Steps

The implementation steps are documented below, steps marked by a ✅ have been completed:

1. **Phase 1: Consolidation Foundation (Keep Gatsby 4.20.0)**
   - [x] Set up unified app structure using marketing as foundation
   - [x] Analyze docs theme components and identify reusable elements
   - [x] Create development environment for consolidated app

2. **Phase 2: Content and Component Migration**
   - [x] Migrate docs content structure to marketing app
   - [x] Extract and adapt docs components for Gatsby 4.x compatibility
   - [x] Migrate docs-specific assets and images
   - [x] Configure docs content sourcing in gatsby-config.js
   - [x] Update all internal links and references

3. **Phase 3: Routing and Navigation Integration**
   - [x] Implement `/docs/*` routing in consolidated app
   - [x] Create docs-specific layout components
   - [x] Update navigation to support both marketing and docs sections
   - [x] Test all existing URLs continue to work
   - [x] Fix docs page routing - prevent redirects back to homepage
   - [x] Get markdown (.md) docs pages working
   - [x] Add basic styling to docs pages
   - [ ] Add MDX support for index pages (docs/collect/, docs/analyze/, etc.)
   - [ ] Achieve full styling parity with original docs theme

4. **Phase 4: MDX Support and Content Completion**
   - [ ] Add gatsby-plugin-mdx with Gatsby 4.x compatibility
   - [ ] Update gatsby-node.js to process both .md and .mdx files
   - [ ] Create MDX template component for rendering
   - [ ] Fix all index pages (/docs/collect/, /docs/analyze/, /docs/redact/)
   - [ ] Ensure all 118+ docs pages are accessible

5. **Phase 5: Full Styling Parity**
   - [ ] Implement left sidebar navigation with docs sections
   - [ ] Add header with breadcrumbs and search functionality  
   - [ ] Integrate Algolia search (if used in original)
   - [ ] Add syntax highlighting for code blocks
   - [ ] Implement responsive design matching original
   - [ ] Add footer component with proper links
   - [ ] Style tables, lists, and other markdown elements to match original
   - [ ] Add proper typography and spacing throughout

6. **Phase 6: Build Process Simplification**
   - [x] Update root package.json for single app build
   - [x] Eliminate Makefile dependencies
   - [x] Update netlify.toml for new build process
   - [x] Verify _redirects file still works correctly
   - [x] Test consolidated app builds and deploys successfully

7. **Phase 7: Validation and Testing**
   - [ ] Comprehensive testing of all pages and functionality
   - [ ] Verify SEO metadata and search functionality
   - [ ] Test local development experience
   - [ ] Performance benchmarking against current setup
   - [ ] Staging deployment testing

8. **Phase 8: Gatsby 5.x Upgrade (Single Codebase)**
   - [ ] Upgrade consolidated app to Gatsby 5.x
   - [ ] Resolve any compatibility issues
   - [ ] Update all dependencies to latest versions
   - [ ] Test upgraded app thoroughly
   - [ ] Deploy and validate production

9. **Phase 9: Cleanup and Optimization**
   - [ ] Remove obsolete docs/ and marketing/ directories
   - [ ] Clean up unused themes and dependencies
   - [ ] Optimize bundle size and performance
   - [ ] Update development scripts and documentation
   - [ ] Update README with new development workflow

10. **Phase 10: Documentation and Handoff**
    - [ ] Update development documentation
    - [ ] Document new dependency management process
    - [ ] Update CI/CD if applicable

## Risk Mitigation

- **Incremental Approach**: Implement in phases to minimize risk
- **Testing**: Comprehensive testing at each phase
- **URL Validation**: Automated checking of all existing URLs
- **Preservation Strategy**: Keep current structure intact until validation complete

## Success Criteria

### Core Functionality
- [x] Single Gatsby app serving both marketing and docs content
- [x] All existing URLs continue to work
- [x] CVE issues resolved through unified dependency management
- [x] Build process simplified and faster
- [x] Netlify deployment continues to work seamlessly

### Content Completeness
- [x] All markdown (.md) docs pages accessible and functional
- [ ] All MDX (.mdx) docs pages accessible and functional (index pages)
- [ ] All 118+ docs pages generated and accessible
- [ ] All assets, images, and static content preserved

### Styling and UX Parity
- [x] Basic docs styling implemented (typography, colors, layout)
- [ ] Full navigation structure (left sidebar, breadcrumbs, header)
- [ ] Search functionality (Algolia integration if applicable)
- [ ] Responsive design matching original docs
- [ ] Syntax highlighting for code blocks
- [ ] Complete visual parity with original docs theme

### Performance and Quality
- [ ] No functionality loss from either original app
- [ ] Build performance maintained or improved
- [ ] SEO metadata and search indexing preserved
- [ ] Accessibility standards maintained
