var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var ngAnnotate = require('gulp-ng-annotate');

gulp.task('scripts', function() {
  gulp.src('app/assets/javascripts/main/*.js')
    .pipe(concat('eartraining.min.js'))
    .pipe(ngAnnotate())
    .pipe(uglify({mangle: false}))
    .pipe(gulp.dest('app/assets/javascripts/'))
});

gulp.task('watch', function () {
  gulp.watch('app/assets/javascripts/main/*.js', ['scripts']);
});
