SHELL := /bin/bash -o pipefail

.PHONY: build-production
build-production:
	gatsby build

.PHONY: install
install:
	npm i

.PHONY: generate-specs
generate-specs:
	node generate-specs.js

.PHONY: run
run:
	make generate-specs
	gatsby develop -p 1313
