test:
	./node_modules/.bin/tape src/*_test.js src/**/*_test.js | ./node_modules/.bin/tap-spec
