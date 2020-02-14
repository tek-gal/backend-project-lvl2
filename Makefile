install:
	npm install

link:
	npm run build
	npm link

lint:
	npx eslint .

publish:
	npm publish --dry-run

build:
	npm run build
