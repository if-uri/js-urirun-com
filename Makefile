NPM ?= npm
NODE ?= node

.PHONY: install doctor-build doctor-test doctor-health doctor-env test check verify

install:
	$(NPM) ci

doctor-build:
	$(NPM) run build

doctor-test:
	$(NPM) run check

doctor-health:
	$(NODE) --check dist/urirun.min.js

doctor-env: doctor-test doctor-health
	test -f package.json
	test -f package-lock.json
	$(NODE) --version
	$(NPM) --version

test: doctor-test

check: doctor-build doctor-test doctor-health

verify: check
