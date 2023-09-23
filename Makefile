SRC_FILES=$(shell find src/)

node_modules: package.json package-lock.json
	npm ci

clean:
	npx rimraf lib

lib: node_modules $(SRC_FILES)
	npx tsc --project ./tsconfig.prod.json

test: node_modules
	NODE_OPTIONS=--experimental-vm-modules npx jest

test-watch: node_modules
	NODE_OPTIONS=--experimental-vm-modules npx jest --watch

lint:
	npx tsc --project ./tsconfig.json --noEmit

.PHONY: lint test test-watch
