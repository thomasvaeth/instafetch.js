'use strict';

var gulp = require('gulp');
var concat = require('gulp-concat');
var eslint = require('gulp-eslint');
var rename = require('gulp-rename');
var strip = require('gulp-strip-comments');
var uglify = require('gulp-uglify');

gulp.task('lint', function() {
  return gulp.src('./src/**/*.js')
  .pipe(eslint())
  .pipe(eslint.format())
  .pipe(eslint.failAfterError());
});

gulp.task('concatScripts', function() {
  return gulp.src([
    'node_modules/fetch-jsonp/build/fetch-jsonp.js',
    'src/instafetch.js'
  ])
  .pipe(concat('instafetch.js'))
  .pipe(strip())
  .pipe(gulp.dest('./dist'));
});

gulp.task('minifyScripts', ['concatScripts'], function() {
  return gulp.src('./dist/instafetch.js')
  .pipe(uglify())
  .pipe(rename('instafetch.min.js'))
  .pipe(gulp.dest('./dist'));
});

gulp.task('build', ['lint', 'minifyScripts']);

gulp.task('watch', function() {
  gulp.watch('./src/**/*.js', ['lint', 'minifyScripts']);
});

gulp.task('default', ['build', 'watch']);
