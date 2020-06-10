
.PHONY: publish
publish: deps clean build
publish:
	mkdir -p public
	# cp -r landing/public * public
	# rm -rf public/social-cards

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

.PHONY: build
build:
	make generate-specs
	# yarn workspace landing build --prefix-paths
	yarn workspace docs build --prefix-paths
	yarn workspace collect build --prefix-paths
	yarn workspace analyze build --prefix-paths
	yarn workspace redact build --prefix-paths

.PHONY: deps
deps:
	yarn

.PHONY: clean
clean:
	rm -rf public
	# yarn workspace landing clean
	yarn workspace docs clean
	yarn workspace collect clean
	yarn workspace analyze clean
	yarn workspace redact clean

.PHONY: generate-specs
generate-specs:
	node generate-specs.js
