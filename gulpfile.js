'use strict'

var gulp = require('gulp'),
    sass = require('gulp-ruby-sass'),
    filter = require('gulp-filter'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    mainBowerFiles = require('main-bower-files'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    cache = require('gulp-cache'),
    del = require('del'),
    replace = require('gulp-replace'),
    browserSync = require('browser-sync').create();

//Init
gulp.task('default', ['clean', 'copy:bower', 'static: styles', 'images', 'fonts', 'scripts', 'replace:bower', 'watch'], function() {
// gulp.task('default', ['clean', 'static: styles', 'images', 'fonts', 'scripts', 'watch'], function() {
  browserSync.init({
    proxy: "localhost:8000"
  });
  gulp.watch('**/*.html').on('change', browserSync.reload);
  gulp.watch(['static/**']).on('change', browserSync.reload);
});

//build SCSS styles
gulp.task('styles', function() {
  return sass('assets/sass/main.scss', { style: 'expanded' })
    .pipe(autoprefixer('last 2 version'))
    .pipe(gulp.dest('static/css'))
    .pipe(rename({suffix: '.min'}))
    .pipe(minifycss())
    .pipe(gulp.dest('static/css'))
});

//build JS
gulp.task('scripts', function() {
  return gulp.src('assets/js/**/*.js')
    .pipe(jshint.reporter('default'))
    .pipe(concat('main.js'))
    .pipe(gulp.dest('static/js'))
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify())
    .pipe(gulp.dest('static/js'))
    .pipe(notify({ message: 'Scripts task complete' }));
});

//move static CSS
gulp.task('static: styles', function() {
  return gulp.src('assets/css/**/*')
    .pipe(autoprefixer('last 2 version'))
    .pipe(gulp.dest('static/css'))
    .pipe(rename({suffix: '.min'}))
    .pipe(minifycss())
    .pipe(gulp.dest('static/css'))
});

//Transfer images
gulp.task('images', function() {
  return gulp.src('assets/img/**/*')
    .pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
    .pipe(gulp.dest('static/img'))
});

//Transfer fonts
gulp.task('fonts', function() {
   return gulp.src('assets/fonts/**/*')
   .pipe(gulp.dest('static/fonts'));
});

gulp.task('copy:bower', function () {
    return gulp.src(mainBowerFiles(['**/*.js', '!**/*.min.js']))
        .pipe(gulp.dest('static/js/libs'))
        .pipe(uglify())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('static/js/libs'));
});

gulp.task('replace:bower', function(){
    return gulp.src([
        'static/**/*.js'
    ], {base: './'})
    .pipe(replace(/bower_components+.+(\/[a-z0-9][^/]*\.[a-z0-9]+(\'|\"))/ig, 'js/libs$1'))
    .pipe(gulp.dest('static'));
});

//Clean previous files
gulp.task('clean', function() {
    return del(['static/css', 'static/js', 'static/img', 'static/fonts']);
});

//Watch the changes
gulp.task('watch', function() {
  gulp.watch('assets/sass/**/*.scss', ['styles']);
  gulp.watch('assets/js/**/*.js', ['scripts']);
  gulp.watch('assets/img/**/*', ['images']);
  gulp.watch('assets/fonts/**/*', ['fonts']);
  gulp.watch('assets/css/**/*', ['static_styles']);
});