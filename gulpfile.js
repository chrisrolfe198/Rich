var gulp = require('gulp'),
	jshint = require('gulp-jshint'),
	uglify = require('gulp-uglify'),
	rename = require('gulp-rename'),
	clean = require('gulp-clean'),
	concat = require('gulp-concat'),
	browserify = require('gulp-browserify'),
	notify = require('gulp-notify');

	gulp.task('scripts', function() {
		return gulp.src(['src/main.js'])
			.pipe(browserify())
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
		gulp.watch('src/**/*.js', ['scripts']);
	});

