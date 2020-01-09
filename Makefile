SHELL := /bin/bash -o pipefail

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
	hugo serve --theme hugo-whisper-theme

.PHONY: test
test:
	hugo -v -s .
	htmlproofer --allow-hash-href --check-html --empty-alt-ignore --url-ignore /troubleshoot.sh/css/ "./public"
