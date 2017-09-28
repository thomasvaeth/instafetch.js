'use strict';

const gulp = require('gulp');
const babelify = require('babelify');
const browserify = require('browserify');
const buffer = require('vinyl-buffer');
const eslint = require('gulp-eslint');
const rename = require('gulp-rename');
const source = require('vinyl-source-stream');
const strip = require('gulp-strip-comments');
const uglify = require('gulp-uglify');

gulp.task('lint', () => {
  return gulp.src('./src/instafetch.js')
  .pipe(eslint())
  .pipe(eslint.format())
  .pipe(eslint.failAfterError());
});

gulp.task('browserify', () => {
  return browserify('./src/instafetch.js')
  .transform('babelify', {presets: ['env']})
  .bundle()
  .pipe(source('instafetch.js'))
  .pipe(buffer())
  .pipe(strip())
  .pipe(gulp.dest('./dist'));
});

gulp.task('minifyScript', ['browserify'], () => {
  return gulp.src('./dist/instafetch.js')
  .pipe(uglify())
  .pipe(rename({suffix: '.min'}))
  .pipe(gulp.dest('./dist'));
});

gulp.task('build', ['lint', 'minifyScript']);

gulp.task('watch', () => {
  gulp.watch('./src/**/*.js', ['lint', 'minifyScript']);
});

gulp.task('default', ['build', 'watch']);
