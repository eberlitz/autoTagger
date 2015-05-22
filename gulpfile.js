'use strict';

var gulp = require('gulp'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    header = require('gulp-header');

var pkg = require('./package.json');
var banner = ['/**',
    ' * <%= pkg.name %> - <%= pkg.description %>',
    ' * @version v<%= pkg.version %>',
    ' * @link <%= pkg.homepage %>',
    ' * @license <%= pkg.license %>',
    ' */',
    ''
].join('\n');

gulp.task('default', function(callback) {
    return gulp.src('autotagger.js')
        .pipe(header(banner, {
            pkg: pkg
        }))
        .pipe(gulp.dest('dist'))
        .pipe(uglify())
        .pipe(concat('autotagger.min.js'))
        .pipe(header(banner, {
            pkg: pkg
        }))
        .pipe(gulp.dest('dist'));
});