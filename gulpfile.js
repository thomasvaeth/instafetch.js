'use strict';

var gulp = require('gulp');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');

gulp.task('minifyScripts', function() {
  return gulp.src('./src/instafetch.js')
  .pipe(uglify())
  .pipe(rename('instafetch.min.js'))
  .pipe(gulp.dest('./dist'));
});

gulp.task('build', ['minifyScripts']);

gulp.task('watch', function() {
  gulp.watch('./src/**/*.js', ['minifyScripts']);
});

gulp.task('default', ['build', 'watch']);
