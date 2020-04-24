SHELL := /bin/bash -o pipefail

.PHONY: deps-proofer
deps-proofer: 
	gem install --user-install html-proofer -v 3.15.0

.PHONY: deps
deps: upstream_version = "v0.68.3"
deps: dist = $(shell echo `uname` | tr '[:upper:]' '[:lower:]')
deps: cli_version = ""
deps: cli_version = $(shell [[ -x deps/hugo ]] && deps/hugo version | sed 's/\-/ /g' | sed 's/\// /g' | awk '{print $$5}' )

deps:
	: CLI Local Version $(cli_version)
	: CLI Upstream Version $(upstream_version)
	: Dist $(dist)
	@if [[ "$(cli_version)" == "$(upstream_version)" ]]; then \
	   echo "Hugo version $(upstream_version) already present"; \
	 else \
	   echo '-> Downloading Hugo CLI to ./deps '; \
	   mkdir -p deps/; \
	   if [[ "$(dist)" == "darwin" ]]; then \
	     wget -O hugo.tar.gz https://github.com/gohugoio/hugo/releases/download/$(upstream_version)/hugo_0.68.3_macOS-64bit.tar.gz; \
	   else \
	     wget -O hugo.tar.gz https://github.com/gohugoio/hugo/releases/download/$(upstream_version)/hugo_0.68.3_Linux-64bit.tar.gz; \
	   fi; \
	   tar xvzf hugo.tar.gz -C deps; \
	 fi;

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
dev: deps
	deps/hugo serve --theme hugo-whisper-theme

.PHONY: test
test: deps deps-proofer
	rm -rf public
	deps/hugo -v -s .
	htmlproofer --allow-hash-href --check-html --empty-alt-ignore --url-ignore /kots.io/css/ "./public"