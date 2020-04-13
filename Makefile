SHELL := /bin/bash -o pipefail

.PHONY: build-production
build-production:
	gatsby build

.PHONY: install
install:
	npm i

.PHONY: run
run:
	gatsby develop -p 1313
