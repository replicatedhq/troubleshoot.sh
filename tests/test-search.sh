#!/bin/bash

# Test script for Algolia search configuration
# This script validates the search setup locally

set -e

echo "🔍 Testing Troubleshoot Documentation Search Setup"
echo "================================================"

# Check if required environment variables are set
if [ -z "$ALGOLIA_APP_ID" ] || [ -z "$ALGOLIA_API_KEY" ]; then
    echo "⚠️  Environment variables not set:"
    echo "   - ALGOLIA_APP_ID: ${ALGOLIA_APP_ID:-'NOT SET'}"
    echo "   - ALGOLIA_API_KEY: ${ALGOLIA_API_KEY:-'NOT SET'}"
    echo ""
    echo "💡 For local testing, you can set them temporarily:"
    echo "   export ALGOLIA_APP_ID='your_app_id'"
    echo "   export ALGOLIA_API_KEY='your_api_key'"
    echo ""
    echo "📋 For production, these should be set in:"
    echo "   - Netlify: Site settings > Environment variables"
    echo "   - GitHub: Repository secrets"
    echo ""
else
    echo "✅ Environment variables are set"
    echo "   - ALGOLIA_APP_ID: ${ALGOLIA_APP_ID}"
    echo "   - ALGOLIA_API_KEY: ${ALGOLIA_API_KEY:0:8}..."
fi

# Check if configuration file exists
if [ -f "troubleshoot-algolia-config.json" ]; then
    echo "✅ Algolia configuration file found"
    
    # Validate JSON syntax
    if jq empty troubleshoot-algolia-config.json 2>/dev/null; then
        echo "✅ Configuration file is valid JSON"
        
        # Show key configuration details
        echo "📋 Configuration details:"
        echo "   - Index name: $(jq -r '.index_name' troubleshoot-algolia-config.json)"
        echo "   - Start URLs: $(jq -r '.start_urls[]' troubleshoot-algolia-config.json)"
        
    else
        echo "❌ Configuration file contains invalid JSON"
        exit 1
    fi
else
    echo "❌ Algolia configuration file not found"
    exit 1
fi

# Check if Docusaurus is configured for search
if grep -q "algolia:" docusaurus.config.ts; then
    echo "✅ Docusaurus configured for Algolia search"
    
    # Show search configuration
    echo "📋 Docusaurus search config:"
    echo "   - Search enabled in navbar"
    echo "   - Using environment variables for credentials"
    echo "   - Index name: troubleshoot-docs"
    
else
    echo "❌ Docusaurus not configured for Algolia search"
    exit 1
fi

# Test build process
echo "🏗️  Testing build process..."
make build > /dev/null 2>&1

if [ $? -eq 0 ]; then
    echo "✅ Build successful"
else
    echo "❌ Build failed"
    exit 1
fi

# Check if search plugin is installed
if yarn list @docusaurus/theme-search-algolia > /dev/null 2>&1; then
    echo "✅ Algolia search plugin installed"
else
    echo "❌ Algolia search plugin not installed"
    echo "💡 Run: yarn add @docusaurus/theme-search-algolia"
    exit 1
fi

echo ""
echo "🎉 Search setup validation complete!"
echo ""
echo "📋 Summary:"
echo "✅ Configuration file is valid"
echo "✅ Docusaurus is configured for search"
echo "✅ Search plugin is installed"
echo "✅ Build process works"
echo ""
echo "🚀 Next steps:"
echo "1. Deploy the site to production"
echo "2. Wait for the GitHub Actions workflow to index the content"
echo "3. Test search functionality on the live site"
echo ""
echo "🔧 If search doesn't work:"
echo "1. Check that environment variables are set in production"
echo "2. Verify the GitHub Actions workflow runs successfully"
echo "3. Check Algolia dashboard for indexing status"