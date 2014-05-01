var gulp = require('gulp'),
    nodemon = require('gulp-nodemon'),
    livereload = require('gulp-livereload');

gulp.task('watch', function (test, test2, test32) {
  var server = livereload();

  var lastFile;

  var hapi = nodemon({
    script: 'index.js'
  })
    .on('restart', function () {
      setTimeout(function () {
        server.changed(lastFile.path || null);
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
});

gulp.task('default', [ 'watch' ]);
