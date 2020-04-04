SHELL := /bin/bash -o pipefail

.PHONY: build-production
build-production:
	gatsby build

.PHONY: install
install:
	yarn --pure-lockfile

.PHONY: dev
dev:
	gatsby develop -p 1313
