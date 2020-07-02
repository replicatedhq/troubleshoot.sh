
.PHONY: publish
publish: deps clean build
publish:
	mkdir -p public
	cp -r marketing/public/* public
	rm -rf marketing/social-cards

	mkdir -p public/docs
	cp -r docs/public/* public/docs
	rm -rf public/docs/social-cards

	cp -r static/* public

.PHONY: build
build:
	make generate-specs
	yarn workspace marketing build --prefix-paths
	yarn workspace docs build --prefix-paths

.PHONY: deps
deps:
	yarn

.PHONY: clean
clean:
	rm -rf public
	yarn workspace marketing clean
	yarn workspace docs clean

.PHONY: generate-specs
generate-specs:
	node generate-specs.js
