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
