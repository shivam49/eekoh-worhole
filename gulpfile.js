var gulp = require('gulp'),
    path = require('path'),
    component = require('gulp-component'),
    nodemon = require('gulp-nodemon'),
    livereload = require('gulp-livereload');

gulp.task('component', function () {
  gulp.src(path.join(__dirname, 'app', 'component.json'))
      .pipe(component()).pipe(gulp.dest('public'));
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
    'app/**/*.js',
    'app/view/*.jade'
  ]).on('change', function (file) {
    if (~file.path.indexOf('app/controller')) {
      lastFile = file;
      hapi.restart();
    } else {
      server.changed(file.path);
    }
  });

  gulp.watch([
    'app/component.json',
    'app/component/**/**',
    'app/component/**/**/**'
  ], [ 'component' ]);
});

gulp.task('default', [ 'watch' ]);
