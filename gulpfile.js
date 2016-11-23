'use strict';

const autoprefixer = require('autoprefixer');
const browser = require('browser-sync');
const clean = require('gulp-clean');
const concat = require('gulp-concat');
const gulp = require('gulp');
const mq4HoverShim = require('mq4-hover-shim');
const panini = require('panini');
const postcss = require('gulp-postcss');
const rimraf = require('rimraf').sync;
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');

var port = process.env.SERVER_PORT || 8080;
var nodepath = process.env.NODE_PATH || 'node_modules/';

// Starts BrowerSync
gulp.task('server', ['build'], function(){
  browser.init({server: './_site', port: port});
});

// Watches files for changes
gulp.task('watch', function() {
  gulp.watch('scss/**/*', ['compile-sass', browser.reload]);
  gulp.watch('html/pages/**/*', ['compile-html']);
  gulp.watch(['html/{layouts,includes,helpers,data}/**/*'], ['compile-html:reset','compile-html']);
});

// Erases the dist folder
gulp.task('clean', function() {
  rimraf('_site');
});

// Copies assets
gulp.task('copy', function() {
  gulp.src(['assets/**/*']).pipe(gulp.dest('_site'));
});

var sassOptions = {
  errLogToConsole: true,
  outputStyle: 'expanded',
  includePaths: nodepath
};

gulp.task('compile-sass', function () {
    var processors = [
        mq4HoverShim.postprocessorFor({ hoverSelectorPrefix: '.bs-true-hover ' }),
        autoprefixer({
            browsers: [
              //
              // Official browser support policy:
              // http://v4-alpha.getbootstrap.com/getting-started/browsers-devices/#supported-browsers
              //
              'Chrome >= 35', // Exact version number here is kinda arbitrary
              // Rather than using Autoprefixer's native "Firefox ESR" version specifier string,
              // we deliberately hardcode the number. This is to avoid unwittingly severely breaking the previous ESR in the event that:
              // (a) we happen to ship a new Bootstrap release soon after the release of a new ESR,
              //     such that folks haven't yet had a reasonable amount of time to upgrade; and
              // (b) the new ESR has unprefixed CSS properties/values whose absence would severely break webpages
              //     (e.g. `box-sizing`, as opposed to `background: linear-gradient(...)`).
              //     Since they've been unprefixed, Autoprefixer will stop prefixing them,
              //     thus causing them to not work in the previous ESR (where the prefixes were required).
              'Firefox >= 31', // Current Firefox Extended Support Release (ESR)
              // Note: Edge versions in Autoprefixer & Can I Use refer to the EdgeHTML rendering engine version,
              // NOT the Edge app version shown in Edge's "About" screen.
              // For example, at the time of writing, Edge 20 on an up-to-date system uses EdgeHTML 12.
              // See also https://github.com/Fyrd/caniuse/issues/1928
              'Edge >= 12',
              'Explorer >= 9',
              // Out of leniency, we prefix these 1 version further back than the official policy.
              'iOS >= 8',
              'Safari >= 8',
              // The following remain NOT officially supported, but we're lenient and include their prefixes to avoid severely breaking in them.
              'Android 2.3',
              'Android >= 4',
              'Opera >= 12'
            ]
          })//,
        //cssnano(),
    ];
    return gulp.src('./scss/app.scss')
        .pipe(sourcemaps.init())
        .pipe(sass(sassOptions).on('error', sass.logError))
        .pipe(postcss(processors))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./_site/css/'));
});

gulp.task('compile-html', function() {
  gulp.src('html/pages/**/*.html')
    .pipe(panini({
      root: 'html/pages/',
      layouts: 'html/layouts/',
      partials: 'html/includes/',
      helpers: 'html/helpers/',
      data: 'html/data/'
    }))
    .pipe(gulp.dest('_site'))
    .on('finish', browser.reload);
});

gulp.task('compile-html:reset', function(done) {
  panini.refresh();
  done();
});

gulp.task('compile-js', function() {
  return gulp.src([nodepath+ 'jquery/dist/jquery.min.js', nodepath+ 'tether/dist/js/tether.min.js', nodepath+ 'bootstrap/dist/js/bootstrap.min.js'])
    .pipe(concat('app.js'))
    .pipe(gulp.dest('./_site/js/'));
});


gulp.task('build', ['clean','copy','compile-js','compile-sass','compile-html']);
gulp.task('default', ['server', 'watch']);
