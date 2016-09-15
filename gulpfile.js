var gulp = require('gulp'); //import the gulp node package
var sass = require('gulp-sass'); //import the sass package
var jshint = require('gulp-jshint'); //import jshint to lint JavaScript
const babel = require('gulp-babel'); //import babel module
var browsersync = require('browser-sync').create(); //import browsersync create() method
var reload = browsersync.reload; //save browsersync reload to a variable

//default task runs when 'gulp' is typed.
//gulp.task takes 2 parameters, a name (string) and a callback, describing what the task should do.
gulp.task('test', function() {
  console.log('Sanity check');
});

//default task
gulp.task('default',['lint','babelify','styles','watch']);

gulp.task('server', function() {
  browsersync.init({
    server: './build'
  })
})


//lint javascript for errors
gulp.task('lint',function() {
  return gulp.src('build/js/*.js')
  .pipe(jshint())
  .pipe(jshint.reporter('default'));
})

//run JavaScript through Babel to allow use of es-2015 features
gulp.task('babelify', () => {
    return gulp.src('js/*.js')
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(gulp.dest('build/js'));
});


// Styles task
// magically turns css into sass
gulp.task('styles', function() {
  return gulp.src('scss/*.scss')
  .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
  .pipe(gulp.dest('build/css'))
  .pipe(browsersync.stream())
});

// WATCH task
// watches SCSS, HTML and JS
gulp.task('watch', ['server'], function() {
  gulp.watch('js/*.js', ['scripts']);
  gulp.watch('scss/*.scss', ['styles']);
  gulp.watch('./build/index.html').on('change', reload);
});
