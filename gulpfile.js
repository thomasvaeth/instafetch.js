'use strict';

var gulp = require('gulp');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');

gulp.task('concatScripts', function() {
  return gulp.src([
    'node_modules/fetch-jsonp/build/fetch-jsonp.js',
    'src/instafetch.js'
  ])
  .pipe(concat('instafetch.js'))
  .pipe(gulp.dest('./dist'));
});

gulp.task('minifyScripts', ['concatScripts'], function() {
  return gulp.src('./dist/instafetch.js')
  .pipe(uglify())
  .pipe(rename('instafetch.min.js'))
  .pipe(gulp.dest('./dist'));
});

gulp.task('build', ['minifyScripts']);

gulp.task('watch', function() {
  gulp.watch('./src/**/*.js', ['minifyScripts']);
});

gulp.task('default', ['build', 'watch']);
