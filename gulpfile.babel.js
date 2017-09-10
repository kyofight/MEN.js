const gulp = require('gulp');
const istanbul = require('gulp-istanbul');
const mocha = require('gulp-mocha');
const fs = require('fs');
const glob = require('glob');
const _ = require('lodash');
const path = require('path');
const replace = require('gulp-replace');
const apidoc = require('gulp-apidoc');
const eslint = require('gulp-eslint');

gulp.task('test', function () {
	return gulp.src('./test.js')
		.pipe(mocha({
			compilers: ['js:babel-core/register'],
			timeout: 30000,
		}))
		.pipe(istanbul.writeReports())
		.once('error', () => {
			process.exit(1);
		})
		.once('end', function () {
			process.exit(0);
		});
});

gulp.task('lint', function () {
	// ESLint ignores files with "node_modules" paths.
	// So, it's best to have gulp ignore the directory as well.
	// Also, Be sure to return the stream from the task;
	// Otherwise, the task may end before the stream has finished.
	return gulp.src(['app/bootstrap/*.js', 'app/modules/**/*.js', 'server.js', 'test.js', 'seed.js'], {base: 'app'})
	// eslint() attaches the lint output to the "eslint" property
	// of the file object so it can be used by other modules.
		.pipe(eslint({quiet: true}))
		// eslint.format() outputs the lint results to the console.
		// Alternatively use eslint.formatEach() (see Docs).
		.pipe(eslint.format())
		// To have the process exit with an error code (1) on
		// lint error, return the stream and pipe to failAfterError last.
		.pipe(eslint.failAfterError());
});


gulp.task('apidoc-config', function () {
	return new Promise((resolve, reject) => {
		const apidocPath = path.resolve('./app/config/apidoc/apidoc.js');

		let codeFileContent = '';
		_.each(glob.sync('app/modules/*/errors/*.js'), (routeFile) => {
			const errors = require(path.resolve(routeFile)).default;
			_.each(errors, (error) => {
				codeFileContent += '\n/**\n * @apiDefine ' + error.code + '\n * @apiError (Error Codes) {String} ' + error.code + ' ' + error.message + '\n**/\n';
			})
		});

		const buffer = new Buffer(codeFileContent);
		fs.open(apidocPath, 'a', function (err, fd) {
			if (err) {
				console.log('error opening file: ' + err);
				reject(err);
			}

			fs.write(fd, buffer, 0, buffer.length, null, function (err) {
				if (err) {
					console.log('error writing file: ' + err);
					reject(err);
				}

				fs.close(fd, function () {
					console.log('file written');
					resolve();
				})
			});
		});
	})
		.catch((err) => {
			console.error('error generating api config', err)
		})
});

gulp.task('apidoc', ['apidoc-config'], function (done) {
	return apidoc({
		config: './app/config/apidoc',
		src: glob.sync('app/modules/*/routes').concat(['app/config/apidoc']),
		dest: 'apidoc',
		debug: true,
	}, done);
});