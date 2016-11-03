var gulp = require('gulp');
var browserify = require('browserify');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var source = require('vinyl-source-stream');
var babelify = require('babelify');


gulp.task('scripts', function() {
  //gulp.src('app/assets/javascripts/eartraining/*.js')
    //.pipe(concat('eartraining.min.js'))
    //.pipe(gulp.dest('app/assets/javascripts/'))
});

gulp.task('browserify', function() {
  return browserify('app/assets/javascripts/eartraining/eartraining.js')
    .transform(babelify)
    .bundle()
    .pipe(source('bundle.js'))
    //.pipe(uglify({mangle: false}))
    .pipe(gulp.dest('app/assets/javascripts/'))
});

gulp.task('default', function () {
  gulp.run('scripts', 'browserify');
});
gulp.task('watch', function () {
  gulp.watch('app/assets/javascripts/eartraining/*.js', ['browserify']);
});
