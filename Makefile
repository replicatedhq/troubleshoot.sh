
.PHONY: publish
publish: deps prep build
publish:
	mkdir -p public
	cp -r marketing/public/* public

	mkdir -p public/docs
	cp -r docs/public/* public/docs
	rm -rf public/docs/social-cards

	cp -r static/* public

.PHONY: build
build:
	make generate-specs
	echo "ALGOLIA_API_KEY =====> " $(ALGOLIA_API_KEY)
	echo "GA_TRACKING_ID =====> " $(GA_TRACKING_ID)
	yarn workspace marketing build --prefix-paths
	yarn workspace docs build --prefix-paths

.PHONY: deps
deps:
	yarn

.PHONY: prep
prep:
	rm -rf public

.PHONY: clean
clean:
	rm -rf public
	yarn workspace marketing clean
	yarn workspace docs clean

.PHONY: generate-specs
generate-specs:
	node generate-specs.js

