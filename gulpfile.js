'use strict';

const gulp = require('gulp');
const less = require('gulp-less');
const sourcemaps = require('gulp-sourcemaps');
const del = require('del');
const uglify = require('gulp-uglify');
const pump = require('pump');
const cleanCSS = require('gulp-clean-css');
const rename = require('gulp-rename');


/* Dev
==================== */

/* Style */
gulp.task('dev:styles', function() {

  return gulp.src('./src/less/styles.less')
    .pipe(sourcemaps.init())
    .pipe(less())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./public/css'))
});

/* js */
gulp.task('dev:js', function(cb) {
  return gulp.src('./src/js/*.js')
    .pipe(gulp.dest('./public/js'));
});

/* Images */
gulp.task('dev:images', function() {
  
  return gulp.src('./src/images/*')
    .pipe(gulp.dest('./public/images'));
});

/* Entry */
gulp.task('dev:entry', function() {

  return gulp.src('./src/index.html')
    .pipe(gulp.dest('./public'));
});


/* Prod
======================== */

/* Style */
gulp.task('prod:styles', function() {
  
  return gulp.src('./src/less/*.less')
    .pipe(less())
    .pipe(gulp.dest('./dist/css'))
    .pipe(cleanCSS())
    .pipe(rename({
      basename: 'styles',
      suffix: '.min',
    }))
    .pipe(gulp.dest('./dist/css'));
});


/* js */
gulp.task('prod:jsCp', function(cb) {
  return  gulp.src('./src/js/*.js')
    .pipe(gulp.dest('./dist/js'));
});


gulp.task('prod:min', function(cb) {
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

gulp.task('prod:js', gulp.series(
  'prod:jsCp',
  'prod:min'
));


/* Images */
gulp.task('prod:images', function() {

  return gulp.src('./src/images/*')
    .pipe(gulp.dest('./dist/images'));
});


/* Clean directories 
============================*/

/* Dev */
gulp.task('dev:clean', function() {

  return del('./public');
});

/* Prod */
gulp.task('prod:clean', function() {
  
  return del('./dist');
});


/*  Build
========================== */

/* Watch */
gulp.task('watch', function() {
  gulp.watch('./src/less/**/*.less', gulp.series('dev:styles')); // watch styles
  gulp.watch('./src/js/**/*.js', gulp.series('dev:js')); // watch js files
  gulp.watch('./src/images/**/*.*', gulp.series('dev:images')); // watch imgs
});

/* Dev build*/
gulp.task('dev:build', gulp.series(
  'dev:clean', 
  gulp.parallel('dev:styles', 'dev:images', 'dev:js', 'dev:entry')
));

/* Dev  build + watch */
gulp.task('dev', gulp.series(
  'dev:build',
  'watch'
));


/* Prod */
gulp.task('build', gulp.series(
  'prod:clean', 
  gulp.parallel('prod:styles', 'prod:images', 'prod:js')
));
