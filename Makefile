
.PHONY: publish
publish: prep build
publish:
	mkdir -p public
	cp -r marketing/public/* public

	mkdir -p public/docs
	cp -r docs/public/* public/docs
	rm -rf public/docs/social-cards

	cp -r static/* public

.PHONY: build
build:  make-generate-specs build-marketing build-docs

.PHONY: make-generate-specs
make-generate-specs:
	make generate-specs


.PHONY: build-marketing
build-marketing:
	cp package-marketing.json package.json
	yarn install
	yarn workspace marketing build --prefix-paths

.PHONY: build-docs
build-docs:
	cp package-docs.json package.json
	yarn install
	yarn workspace docs build --prefix-paths

.PHONY: deps
deps:
	yarn

.PHONY: prep
prep:
	rm -rf public
	rm -rf package.json
	rm -rf yarn.lock

.PHONY: clean
clean: clean-public clean-marketing clean-docs

.PHONY: clean-public
clean-public:
	rm -rf public

.PHONY: clean-marketing
clean-marketing:
	cp package-marketing.json package.json
	yarn workspace marketing clean

.PHONY: clean-docs
clean-docs:
	cp package-docs.json package.json
	yarn workspace docs clean

.PHONY: generate-specs
generate-specs:
	node generate-specs.js

.PHONY: pre-preview
pre-preview:
	cp -r public/*  marketing/public

.PHONY: preview
preview:
	./preview.sh
