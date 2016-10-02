'use strict';

var gulp = require('gulp');
var browserify = require('gulp-browserify');
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

gulp.task('npmPackage', function() {
  return gulp.src('./src/instafetch-npm.js')
    .pipe(browserify())
    .pipe(strip())
    .pipe(gulp.dest('./'));
});

gulp.task('bundleScripts', function() {
  return gulp.src('./src/instafetch.js')
    .pipe(browserify())
    .pipe(strip())
    .pipe(gulp.dest('./dist'));
});

gulp.task('minifyBundle', ['bundleScripts'], function() {
  return gulp.src('./dist/instafetch.js')
  .pipe(uglify())
  .pipe(rename('instafetch.min.js'))
  .pipe(gulp.dest('./dist'));
});

gulp.task('build', ['lint', 'npmPackage', 'minifyBundle']);

gulp.task('watch', function() {
  gulp.watch('./src/**/*.js', ['lint', 'npmPackage', 'minifyBundle']);
});

gulp.task('default', ['build', 'watch']);
