const gulp = require('gulp');
const istanbul = require('gulp-istanbul');
const mocha = require('gulp-mocha');
const fs = require('fs');
const glob = require('glob');
const _ = require('lodash');
const path = require('path');
const rename = require('gulp-rename');
const replace = require('gulp-replace');
const apidoc = require('gulp-apidoc');

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

gulp.task('copy-apidoc-ref', function () {
  gulp.src('./app/config/apidoc/apidoc-ref.js')
    .pipe(rename('apidoc.js'))
    .pipe(gulp.dest('./app/config/apidoc'));
});

gulp.task('apidoc-error-codes', function(done) {
  const apidocPath = path.resolve('./app/config/apidoc/apidoc.js');

  let codeFileContent = '';
  _.each(glob.sync('app/modules/*/errors/*.js'), (routeFile) => {
    const errors = require(path.resolve(routeFile)).default;
    _.each(errors, (error) => {
      codeFileContent += '\n/**\n * @apiDefine ' + error.code + '\n * @apiError (Error Codes) {String} ' + error.code + ' ' + error.message + '\n**/\n';
    })
  });

  const buffer = new Buffer(codeFileContent);
  fs.open(apidocPath, 'a', function(err, fd) {
    if (err) {
      console.log('error opening file: ' + err);
      done(err);
    }

    fs.write(fd, buffer, 0, buffer.length, null, function(err) {
      if (err) {
        console.log('error writing file: ' + err);
        done(err);
      }

      fs.close(fd, function() {
        console.log('file written');
        done();
      })
    });
  });
});

gulp.task('copy-apidoc-dest', function () {
  gulp.src('./app/config/apidoc/apidoc.js')
    .pipe(gulp.dest('./app/modules'))
});

gulp.task('apidoc', ['copy-apidoc-ref', 'apidoc-error-codes', 'copy-apidoc-dest'], function(done) {
  return apidoc({
    config  : './app/config/apidoc',
    src: glob.sync('app/modules/*/routes').concat(['app/modules']),
    dest: 'apidoc',
    debug: true,
  }, done);
});