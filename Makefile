NPM ?= npm
NODE ?= node

.PHONY: install doctor-build doctor-test doctor-health test check verify

install:
	$(NPM) ci

doctor-build:
	$(NPM) run build

doctor-test:
	$(NPM) run check

doctor-health:
	$(NODE) --check dist/urirun.min.js

test: doctor-test

check: doctor-build doctor-test doctor-health

verify: check
