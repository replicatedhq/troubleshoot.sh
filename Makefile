
.PHONY: publish
publish: deps cleanpublic build
publish:
	mkdir -p public
	cp -r marketing/public/* public
	rm -rf marketing/social-cards

	mkdir -p public/docs
	cp -r docs/public/* public/docs
	rm -rf public/docs/social-cards

	cp -r static/* public

	mkdir -p .cache/marketing
	mkdir -p .cache/docs
	cp -r marketing/.cache/ .cache/marketing
	cp -r docs/.cache/ .cache/docs

.PHONY: build
build:
	make generate-specs
	yarn workspace marketing build --prefix-paths
	yarn workspace docs build --prefix-paths

.PHONY: deps
deps:
	yarn

.PHONY: cleanpublic
cleanpublic:
	rm -rf public
	mkdir -p marketing/.cache
	mkdir -p docs/.cache
	cp -r .cache/marketing/ marketing/.cache || :
	cp -r .cache/docs/ docs/.cache || :

.PHONY: clean
clean:
	rm -rf public
	yarn workspace marketing clean
	yarn workspace docs clean

.PHONY: generate-specs
generate-specs:
	node generate-specs.js
