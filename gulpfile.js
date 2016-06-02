var gulp = require('gulp');
var concat = require('gulp-concat');

gulp.task('js', function () {
    gulp.src(['app/app.js', 'app/!(lib)**/!(app)*.js'])
        .pipe(concat('app-min.js'))
        .pipe(gulp.dest('./app'))
});

gulp.watch('app/**/*.js', ['js']);