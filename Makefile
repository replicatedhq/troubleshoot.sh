
.PHONY: publish
publish: deps clean build
publish:
	mkdir -p public
	cp -r marketing/public/* public
	rm -rf marketing/social-cards

	mkdir -p public/learn
	cp -r learn/public/* public/learn
	rm -rf public/learn/social-cards

	mkdir -p public/collect
	cp -r collect/public/* public/collect
	rm -rf public/collect/social-cards

	mkdir -p public/analyze
	cp -r analyze/public/* public/analyze
	rm -rf public/analyze/social-cards

	mkdir -p public/redact
	cp -r redact/public/* public/redact
	rm -rf public/redact/social-cards

	mkdir -p public/api-reference
	cp -r api-reference/public/* public/api-reference
	rm -rf public/api-reference/social-cards

	cp -r static/* public

.PHONY: build
build:
	make generate-specs
	yarn workspace marketing build --prefix-paths
	yarn workspace learn build --prefix-paths
	yarn workspace collect build --prefix-paths
	yarn workspace analyze build --prefix-paths
	yarn workspace redact build --prefix-paths
	yarn workspace api-reference build --prefix-paths

.PHONY: deps
deps:
	yarn

.PHONY: clean
clean:
	rm -rf public
	yarn workspace marketing clean
	yarn workspace learn clean
	yarn workspace collect clean
	yarn workspace analyze clean
	yarn workspace redact clean
	yarn workspace api-reference clean

.PHONY: generate-specs
generate-specs:
	node generate-specs.js
