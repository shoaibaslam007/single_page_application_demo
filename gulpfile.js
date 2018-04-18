var gulp = require('gulp');
var sass = require('gulp-sass');
var imagemin = require('gulp-imagemin');
var minifyCSS = require('gulp-minify-css');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var browserSync = require('browser-sync').create();

gulp.task('sass', function(){
    return gulp.src('src/scss/**/*.scss')
      .pipe(sass().on('errors', sass.logError))
      .pipe(gulp.dest('src/css'))
      .pipe(browserSync.reload({
        stream: true
      }))
});

gulp.task('styles', function(){
    return gulp.src(['node_modules/bootstrap/dist/css/bootstrap.min.css', 'src/libs/css/owl.carousel.min.css', 'src/libs/css/owl.theme.default.min.css', 'src/libs/css/animate.min.css', 'src/css/style.css'])
      .pipe(concat('main.css'))
      .pipe(minifyCSS())
      .pipe(gulp.dest('build/css'))
      .pipe(browserSync.reload({
        stream: true
      }))
});

gulp.task('pages', function(){
    return gulp.src('src/*.html')
      .pipe(gulp.dest('build'))
      .pipe(browserSync.reload({
        stream: true
      }))
});

gulp.task('imageMin', function(){
    return gulp.src('src/images/*')
      .pipe(imagemin())
      .pipe(gulp.dest('build/images'))
      .pipe(browserSync.reload({
        stream: true
      }))
});

gulp.task('scripts', function(){
    return gulp.src(['src/js/jquery.min.js','node_modules/bootstrap/dist/js/bootstrap.min.js' ,'src/js/jquery.easing.min.js', 'src/js/owl.carousel.min.js', 'src/js/scrolling-nav.js', 'src/js/wow.min.js',  'src/js/script.js'])
      .pipe(concat('main.js'))
      .pipe(uglify())
      .pipe(gulp.dest('build/js'))
      .pipe(browserSync.reload({
        stream: true
      }))
});

gulp.task('browserSync', function() {
    browserSync.init({
      server: {
        baseDir: 'build'
      },
    })
})

gulp.task('default', ['browserSync', 'scripts', 'imageMin', 'pages', 'sass', 'styles']);

gulp.task('watch',['browserSync'], function(){
    gulp.watch('src/js/*.js', ['scripts']);
    gulp.watch('src/images/*', ['imageMin']);
    gulp.watch('src/scss/**/*.scss', ['sass']);
    gulp.watch('src/css/*.css', ['styles']);
    gulp.watch('src/*.html', ['pages']);
})