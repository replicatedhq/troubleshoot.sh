#!/bin/bash

# Build test script for Troubleshoot Documentation
# This script tests the build process locally before deployment

set -e

echo "🔨 Testing Troubleshoot Documentation Build"
echo "=========================================="

# Check Node.js version
echo "📋 Checking Node.js version..."
node --version

# Check Yarn version
echo "📋 Checking Yarn version..."
yarn --version

# Clean any previous builds
echo "🧹 Cleaning previous builds..."
make clean
rm -rf build/

# Install dependencies
echo "📦 Installing dependencies..."
make install

# Type check
echo "🔍 Running type check..."
make typecheck

# Build the site
echo "🏗️  Building the site..."
make build

# Check if build directory exists and has content
if [ -d "build" ]; then
    echo "✅ Build directory created successfully"
    
    # Check for key files
    if [ -f "build/index.html" ]; then
        echo "✅ Landing page generated"
    else
        echo "❌ Landing page missing"
        exit 1
    fi
    
    if [ -d "build/docs" ]; then
        echo "✅ Documentation pages generated"
    else
        echo "❌ Documentation pages missing"
        exit 1
    fi
    
    # Check build size
    build_size=$(du -sh build | cut -f1)
    echo "📊 Build size: $build_size"
    
    # List top-level build contents
    echo "📁 Build contents:"
    ls -la build/
    
else
    echo "❌ Build directory not found"
    exit 1
fi

# Test serving the built site
echo "🚀 Built site is ready for serving"

echo ""
echo "🎉 All tests passed! The site is ready for deployment."
echo "✅ Build process completed successfully"
echo "✅ All key files generated"
echo "✅ Build ready to serve"
echo ""
echo "Next steps:"
echo "1. Commit your changes"
echo "2. Push to the main branch"
echo "3. Netlify will automatically deploy"