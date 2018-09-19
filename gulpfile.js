/* globals require */

const del = require('del');
const gulp = require('gulp');
const $ = require('gulp-load-plugins')();
const webpack = require('webpack-stream');
const Webpack = require('webpack');

const webpackConfig = require('./webpack.config.js');

// set variable via $ gulp --type production
const environment = $.util.env.type || 'development';
const isProduction = environment === 'production';
const port = $.util.env.port || 1342;
const app = 'app/';
const dist = 'dist/';

// https://github.com/ai/autoprefixer
const autoprefixerBrowsers = [
  'ie >= 9',
  'ie_mob >= 10',
  'ff >= 30',
  'chrome >= 34',
  'safari >= 6',
  'opera >= 23',
  'ios >= 6',
  'android >= 4.4',
  'bb >= 10',
];

const processScripts = function processScripts() {
  return gulp.src('./app/scripts/main.js')
    .pipe(webpack(webpackConfig, Webpack))
    .pipe(gulp.dest(`${dist}js/`))
    .pipe($.size({ title: 'js' }))
    .pipe($.connect.reload());
};
const processHTML = function processHTML() {
  return gulp.src(`${app}index.html`)
    .pipe(gulp.dest(dist))
    .pipe($.size({ title: 'html' }))
    .pipe($.connect.reload());
};
const processRobotsTXT = function processRobotsTXT() {
  return gulp.src(`${app}robots.txt`)
    .pipe(gulp.dest(dist));
};
const processStyles = function processStyles() {
  return gulp.src(`${app}stylus/main.styl`)
    .pipe($.sourcemaps.init())
    .pipe($.stylus({
      compress: isProduction,
      'include css': true,
    }))
    .pipe($.autoprefixer({ browsers: autoprefixerBrowsers }))
    .pipe($.sourcemaps.write('.'))
    .pipe(gulp.dest(`${dist}css/`))
    .pipe($.size({ title: 'css' }))
    .pipe($.connect.reload());
};
const processAssets = function processAssets() {
  return gulp.src(`${app}assets/**/*.*`)
    .pipe($.size({ title: 'assets' }))
    .pipe(gulp.dest(`${dist}assets/`));
};
const doLint = function doLint() {
  return gulp.src([`${app}scripts/**/*.js`, `${app}scripts/**/*.jsx`])
    .pipe($.eslint())
    .pipe($.eslint.format());
};
const serve = function serve() {
  $.connect.server({
    root: dist,
    port,
    livereload: {
      port: 35730,
    },
  });
};
const watch = function watch() {
  gulp.watch(`${app}stylus/**/*.styl`, ['styles-watch', 'html-watch-styles']);
  gulp.watch(`${app}stylus/**/*.css`, ['styles-watch', 'html-watch-styles']);
  gulp.watch(`${app}index.html`, ['html-watch']);
  gulp.watch(`${app}scripts/**/*.js`, ['scripts-watch', 'html-watch-scripts']);
  gulp.watch(`${app}scripts/**/*.jsx`, ['scripts-watch', 'html-watch-scripts']);
};
const clean = function clean(cb) {
  return del([dist], cb);
};

// *****************
// Gulp commands
// *****************

gulp.task('default', ['watch']);

gulp.task('clean', clean);
gulp.task('lint', doLint);

gulp.task('scripts', ['clean'], processScripts);
gulp.task('scripts-watch', [], processScripts);

gulp.task('html', ['clean', 'scripts', 'styles'], processHTML);
gulp.task('robots', ['clean'], processRobotsTXT);
gulp.task('html-watch', ['scripts', 'styles'], processHTML);
gulp.task('html-watch-scripts', ['scripts-watch'], processHTML);
gulp.task('html-watch-styles', ['styles-watch'], processHTML);

gulp.task('styles', ['clean'], processStyles);
gulp.task('styles-watch', [], processStyles);

gulp.task('assets', ['clean'], processAssets);

gulp.task('build', ['clean', 'assets', 'scripts', 'html', 'styles', 'robots']);
gulp.task('serve', ['build'], serve);
gulp.task('watch', ['serve'], watch);
