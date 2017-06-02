/**
 * @file gulpfile
 * @author denglingbo
 *
 */

const gulp = require('gulp');
const clean = require('gulp-clean');
const babel = require('gulp-babel');

gulp.task('clean', () =>
    gulp.src(['./lib'], {read: false})
        .pipe(clean())
)

gulp.task('babel', ['clean'], () =>
    gulp.src(['./src/**/*.jsx',
        './src/**/*.js'])
        .pipe(babel({
            presets: ['react', 'es2015', 'stage-0'],
            plugins: ['transform-runtime', 'transform-decorators-legacy']
        }))
        .pipe(gulp.dest('./lib'))
)

gulp.task('move', ['clean'], () =>
    gulp.src(['./src/**/*.scss',
        './src/**/*.css',
        './src/**/*.png',
        './src/**/*.eot',
        './src/**/*.svg',
        './src/**/*.ttf',
        './src/**/*.woff',
        './src/**/*.json'])
        .pipe(gulp.dest('./lib'))
)

gulp.task('default', ['babel', 'move']);
