SHELL := /bin/bash -o pipefail

# Only try to run commands in deps directory if present
ifneq ($(wildcard deps/.),)
HUGO := deps/hugo
else
HUGO := hugo
endif

.PHONY: deps
deps: upstream_version = v0.68.3
deps: distname = $(shell dist=$$(echo `uname` | head -c7 | sed 's/Darwin/macOS/g' | sed 's/MSYS_NT/Windows/g'); if [[ "$$dist" = "" ]]; then echo Windows; else echo $$dist; fi)
deps: url = "https://github.com/gohugoio/hugo/releases/download/$(upstream_version)/hugo_extended_$(subst v,,$(upstream_version))_$(distname)-64bit"

deps:
	: Distribution $(distname)
	: Hugo Download Url $(url)
	@echo '-> Downloading Hugo CLI to ./deps '; \
	mkdir -p deps/; \
	if [[ "$(distname)" == "Windows" ]]; then \
	  wget --no-check-certificate -O hugo.zip $(url).zip; \
	  unzip hugo.zip -d deps; \
	else \
	  wget -O hugo.tar.gz $(url).tar.gz; \
	  tar xvzf hugo.tar.gz -C deps; \
	fi

.PHONY: index-site
index-site:
	yarn index-site

.PHONY: index-and-send
index-and-send:
	yarn index-and-send

.PHONY: install
install:
	yarn --pure-lockfile

.PHONY: dev
dev:
	gatsby develop -p 1313
