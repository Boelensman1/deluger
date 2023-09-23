SRC_FILES=$(shell find src/)

node_modules: package.json package-lock.json
	npm ci

clean:
	npx rimraf lib

lib: node_modules $(SRC_FILES)
	npx tsc --project ./tsconfig.prod.json

test: node_modules
	npx jest

test-watch: node_modules
	npx jest --watch

lint:
	true