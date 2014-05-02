'use strict';

var gulp = require('gulp'),
    path = require('path'),
    sass = require('component-sass'),
    component = require('gulp-component'),
    nodemon = require('gulp-nodemon'),
    livereload = require('gulp-livereload');

sass.loadPath(path.join(__dirname, 'lib', 'sass'));

gulp.task('component', function () {
  gulp.src(path.join(__dirname, 'app', 'component.json'))
      .pipe(component({
        configure: function (builder) {
          builder.use(sass);
        }
      })).pipe(gulp.dest('public'));
});

gulp.task('watch', function (test, test2, test32) {
  var server = livereload();

  var lastFile;

  var hapi = nodemon({
    script: 'index.js',
    run: false
  })
    .on('restart', function () {
      setTimeout(function () {
        if (lastFile && lastFile.path) {
          server.changed(lastFile.path || null);
        } else {
          server.changed();
        }
      }, 1000);
    });

  gulp.watch([
    'index.js',
    'app/controller/*.js',
    'app/component/**/**/*.js'
  ]).on('change', function (file) {
    lastFile = file;
    hapi.restart();
  });

  gulp.watch([
    'app/component.json',
    'app/component/**/**/*.json',
    'app/component/**/**/*.sass',
    'app/view/*.jade'
  ], [ 'component' ]).on('change', function (file) {
    server.changed(file.path);
  });
});

gulp.task('default', [ 'watch' ]);
