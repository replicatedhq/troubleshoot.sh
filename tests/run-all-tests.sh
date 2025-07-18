#!/bin/bash

# Central test runner for Troubleshoot Documentation
# This script runs all available tests for the documentation site

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"

echo "🧪 Running All Tests for Troubleshoot Documentation"
echo "=================================================="
echo "Project root: $PROJECT_ROOT"
echo "Tests directory: $SCRIPT_DIR"
echo ""

# Change to project root
cd "$PROJECT_ROOT"

# Track test results
TESTS_PASSED=0
TESTS_FAILED=0
FAILED_TESTS=()

# Function to run a test and track results
run_test() {
    local test_name="$1"
    local test_script="$2"
    
    echo "🏃 Running: $test_name"
    echo "----------------------------------------"
    
    if [ -f "$test_script" ] && [ -x "$test_script" ]; then
        if "$test_script"; then
            echo "✅ PASSED: $test_name"
            ((TESTS_PASSED++))
        else
            echo "❌ FAILED: $test_name"
            ((TESTS_FAILED++))
            FAILED_TESTS+=("$test_name")
        fi
    else
        echo "⚠️  SKIPPED: $test_name (script not found or not executable)"
    fi
    
    echo ""
}

# Run individual tests
echo "📋 Available Tests:"
echo "1. Build Test - Validates build process and output"
echo "2. Search Test - Validates search configuration"
echo ""

# 1. Build Test
run_test "Build Test" "$SCRIPT_DIR/build-test.sh"

# 2. Search Test
run_test "Search Test" "$SCRIPT_DIR/test-search.sh"

# Future tests can be added here:
# run_test "Link Test" "$SCRIPT_DIR/test-links.sh"
# run_test "Performance Test" "$SCRIPT_DIR/test-performance.sh"
# run_test "Accessibility Test" "$SCRIPT_DIR/test-a11y.sh"

# Summary
echo "📊 Test Results Summary"
echo "======================"
echo "✅ Tests Passed: $TESTS_PASSED"
echo "❌ Tests Failed: $TESTS_FAILED"
echo "📊 Total Tests: $((TESTS_PASSED + TESTS_FAILED))"

if [ $TESTS_FAILED -gt 0 ]; then
    echo ""
    echo "❌ Failed Tests:"
    for test in "${FAILED_TESTS[@]}"; do
        echo "   - $test"
    done
    echo ""
    echo "🔧 Please fix the failing tests before deploying."
    exit 1
else
    echo ""
    echo "🎉 All tests passed! The site is ready for deployment."
    exit 0
fi