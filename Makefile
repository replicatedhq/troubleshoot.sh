
.PHONY: publish
publish: deps clean build
publish:
	mkdir -p public
	cp -r home/public/* public
	rm -rf home/social-cards

	mkdir -p public/docs
	cp -r docs/public/* public/docs
	rm -rf public/docs/social-cards

	mkdir -p public/collect
	cp -r collect/public/* public/collect
	rm -rf public/collect/social-cards

	mkdir -p public/analyze
	cp -r analyze/public/* public/analyze
	rm -rf public/analyze/social-cards

	mkdir -p public/redact
	cp -r redact/public/* public/redact
	rm -rf public/redact/social-cards

	mkdir -p public/explore
	cp -r explore-categories/public/* public/explore
	rm -rf public/explore/social-card

	mkdir -p public/spec
	cp -r view-spec/public/* public/spec
	rm -rf public/spec/social-card

.PHONY: build
build:
	make generate-specs
	yarn workspace home build --prefix-paths
	yarn workspace docs build --prefix-paths
	yarn workspace collect build --prefix-paths
	yarn workspace analyze build --prefix-paths
	yarn workspace redact build --prefix-paths
	yarn workspace explore-categories build --prefix-paths
	yarn workspace view-spec build --prefix-paths

.PHONY: deps
deps:
	yarn

.PHONY: clean
clean:
	rm -rf public
	yarn workspace home clean
	yarn workspace docs clean
	yarn workspace collect clean
	yarn workspace analyze clean
	yarn workspace redact clean
	yarn workspace explore-categories clean
	yarn workspace view-spec clean

.PHONY: generate-specs
generate-specs:
	node generate-specs.js
