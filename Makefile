install:
	npm install

build:
	npm run build

link:
	npm run build
	npm link

lint:
	npx eslint .

test:
	npm test

publish:
	npm publish --dry-run
