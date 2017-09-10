const gulp = require('gulp');
const istanbul = require('gulp-istanbul');
const mocha = require('gulp-mocha');
const fs = require('fs');
const glob = require('glob');
const _ = require('lodash');
const path = require('path');
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

gulp.task('apidoc-config', function() {

  return new Promise((resolve) => {
    gulp.src('./app/config/apidoc/apidoc.js')
      .pipe(gulp.dest('./app/modules'))
      .on('end', resolve)
  })
    .then(() => {
      return new Promise((resolve, reject) => {
        const apidocPath = path.resolve('./app/modules/apidoc.js');

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
            reject(err);
          }

          fs.write(fd, buffer, 0, buffer.length, null, function(err) {
            if (err) {
              console.log('error writing file: ' + err);
              reject(err);
            }

            fs.close(fd, function() {
              console.log('file written');
              resolve();
            })
          });
        });
      })
    })
    .catch((err) => {
      console.error('error generating api config', err)
    })
});

gulp.task('apidoc', ['apidoc-config'], function(done) {
  return apidoc({
    config  : './app/config/apidoc',
    src: glob.sync('app/modules/*/routes').concat(['app/modules']),
    dest: 'apidoc',
    debug: true,
  }, done);
});