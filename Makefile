# Troubleshoot Documentation Makefile

.PHONY: help install start build serve test clean

# Default target
help: ## Show available commands
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "%-15s %s\n", $$1, $$2}'

install: ## Install dependencies
	npm ci

start: ## Start development server
	npm start

build: ## Build for production
	npm run build

serve: ## Serve built site locally
	npm run serve:build

test: ## Run all tests
	./tests/run-all-tests.sh

clean: ## Clear cache
	npm run clear