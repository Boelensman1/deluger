INSTALL_DEPS=node_modules
SRC_FILES=$(shell find src/)

node_modules: package.json
	npm ci

clean:
	rm -rf node_modules

build: $(INSTALL_DEPS) $(SRC_FILES) tsconfig.json tsconfig.build.json
	rm -rf ./build
	npx tsc --project tsconfig.build.json

dev: $(INSTALL_DEPS)
	npx --no-install tsx .

test:
	npx vitest

install: $(INSTALL_DEPS)

lint:
	npx --no-install tsc --noEmit
	npx --no-install eslint .

.PHONY: dev install clean lint test
