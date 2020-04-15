SHELL := /bin/bash -o pipefail

.PHONY: deps
deps: 
	gem install --user-install html-proofer -v 3.15.0

	echo '-> Downloading Hugo to ./deps '; \
	mkdir -p deps/; \
	cd deps/; \
	wget -O hugo_maxOs-64bit.tar.gz https://github.com/gohugoio/hugo/releases/download/v0.68.3/hugo_0.68.3_macOS-64bit.tar.gz; \
	tar -xvzf hugo_maxOs-64bit.tar.gz; 

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
	deps/hugo serve --theme hugo-whisper-theme

.PHONY: test deps
test:
	rm -rf public
	deps/hugo -v -s .
	htmlproofer --allow-hash-href --check-html --empty-alt-ignore --url-ignore /kots.io/css/ "./public"