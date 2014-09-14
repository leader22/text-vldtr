'use strict';

var exec   = require('child_process').exec;
var gulp   = require('gulp');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var concat = require('gulp-concat');
var header = require('gulp-header');
var pkg    = require('./package.json');

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

// 個別のテストファイルを1つにまとめる
gulp.task('make_test', function() {
    gulp.src('test/fixtures/*.js')
        .pipe(concat('test.js'))
        .pipe(gulp.dest('test/'));
});

gulp.task('test', ['make_test'], function() {
    exec('node test/test.js', function(err, stdout, stderr) {
        console.log(stdout);
    });
});

gulp.task('default', ['test', 'dist']);
