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
	npm run test --watch

publish:
	npm publish --dry-run

test-coverage:
	  npm test -- --coverage

test-plain:
	gendiff --format plain __tests__/__fixtures__/before.json __tests__/__fixtures__/after.json
