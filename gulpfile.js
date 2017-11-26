'use strict';

const gulp = require('gulp');
const less = require('gulp-less');
const sourcemaps = require('gulp-sourcemaps');
const del = require('del');
const uglify = require('gulp-uglify');
const pump = require('pump');
const cleanCSS = require('gulp-clean-css');
const rename = require('gulp-rename');


/* Styles
==================== */
gulp.task('styles:less', function() {

  return gulp.src('./src/less/styles.less')
    .pipe(sourcemaps.init())
    .pipe(less())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./dist/css'))
});


gulp.task('styles:min', function() {
  
  return gulp.src('./dist/css/styles.css')
    .pipe(cleanCSS())
    .pipe(rename({
      basename: 'styles',
      suffix: '.min',
    }))
    .pipe(gulp.dest('./dist/css'));
});


gulp.task('build:styles', gulp.series(
  'styles:less',
  'styles:min'
));


/* JS
========================= */
gulp.task('js:js', function(cb) {
  return  gulp.src('./src/js/*.js')
    .pipe(gulp.dest('./dist/js'));
});


gulp.task('js:min', function(cb) {
  pump([
      gulp.src('./src/js/*.js'),
      uglify(),
      rename({
        suffix: '.min',
      }),
      gulp.dest('./dist/js')
    ],
    cb
  );
});


gulp.task('build:js', gulp.series(
  'js:js',
  'js:min'
));


/* Images
================================== */
gulp.task('build:images', function() {

  return gulp.src('./src/images/*')
    .pipe(gulp.dest('./dist/images'));
});


// Clean dist directory
gulp.task('build:clean', function() {

  return del('./dist');
});


// Build
gulp.task('build', gulp.series(
  'build:clean', 
  gulp.parallel('build:styles', 'build:images', 'build:js')
));