var gulp = require('gulp');
var mocha = require('gulp-mocha');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify-es').default;

var jsFiles = 'ngSrc/**/*.js';
var jsDest = '../www/scripts';

gulp.task('scripts', function () {
    return gulp.src(jsFiles)
        .pipe(concat('app.js'))
        .pipe(gulp.dest(jsDest))
        .pipe(rename('app.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(jsDest));
});

gulp.task('html', function () {
    gulp.src('ngSrc/index.html').pipe(gulp.dest('../www/'));
    gulp.src('ngSrc/views/*.html').pipe(gulp.dest('../www/views/'));
});

gulp.task('test', function () {
    return gulp.src(['tests/*.js'])
        .pipe(mocha({
            compilers: [
                'js:babel-core/register',
            ]
        }));
});

gulp.task('watch', function () {
    return gulp.watch(['ngSrc/*.html', 'ngSrc/**/*.html','ngSrc/*.js', 'ngSrc/**/*.js', 'models/*.js', 'routes/*.js', 'tests/*.js'], ['test', 'html', 'scripts']);
})

gulp.task('install', function () {
    gulp.start('test');
    gulp.start('html');
    gulp.start('scripts');
})

