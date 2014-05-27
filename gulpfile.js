var gulp = require('gulp'),
	gulpif = require('gulp-if'),
	sass = require('gulp-compass'),
	coffee = require('gulp-coffee'),
	coffeelint = require('gulp-coffeelint'),
	autoprefixer = require('gulp-autoprefixer'),
	minifycss = require('gulp-minify-css'),
	jshint = require('gulp-jshint'),
	uglify = require('gulp-uglify'),
	imagemin = require('gulp-imagemin'),
	rename = require('gulp-rename'),
	clean = require('gulp-clean'),
	concat = require('gulp-concat'),
	notify = require('gulp-notify'),
	cache = require('gulp-cache')

	gulp.task('scripts', function() {
		return gulp.src(['src/toolbar.coffee','src/rich.coffee'])
			.pipe(gulpif(/[.]coffee$/, coffee({ bare: true }).on('error', function(err) { console.log(err); })))
			.pipe(concat('main.js'))
			.pipe(gulp.dest('dist'))
			.pipe(rename({suffix: '.min'}))
			.pipe(uglify())
			.pipe(gulp.dest('dist'))
			.pipe(notify({ message: 'Scripts task complete' }));
	});

	gulp.task('clean', function() {
		return gulp.src('dist/*')
	    	.pipe(clean());
	});

	gulp.task('default', ['clean'], function() {
	    gulp.start('scripts');
	});

	gulp.task('watch', function() {
		// Watch .js files
		gulp.watch('src/**/*.coffee', ['scripts']);
	});

