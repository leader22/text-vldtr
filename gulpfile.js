'use strict';

var gulp    = require('gulp');
var uglify  = require('gulp-uglify');
var rename  = require('gulp-rename');
var header  = require('gulp-header');
var espower = require('gulp-espower');
var mocha   = require('gulp-mocha');
var pkg     = require('./package.json');

var BANNER = '/*! <%= name %> / @version:<%= version %> @author:<%= author %> @license:<%= license %> */ \n';

gulp.task('dist', function() {
    gulp.src(['src/text-vldtr.js'])
        .pipe(uglify({
            mangle: true,
            compress: {
                drop_console: true,
                drop_debugger: true,
            }
        }))
        .pipe(header(BANNER, pkg))
        .pipe(rename({ extname: '.min.js' }))
        .pipe(gulp.dest('dist/'));
});

gulp.task('test:make', function () {
    gulp.src(['test/*.js'])
        .pipe(espower())
        .pipe(gulp.dest('test/espowered'));
});
gulp.task('test:exec', function () {
    gulp.src(['test/espowered/*.js'])
        .pipe(mocha());
});


gulp.task('default', function() {
    console.log();
    console.log('Available tasks:');
    console.log();
    console.log('  gulp dist');
    console.log('  gulp test:make');
    console.log('  gulp test:exec');
    console.log();
});
