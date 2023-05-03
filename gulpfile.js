'use strict';
const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const concat = require('gulp-concat');
// sass.compiler = require('node-sass');
gulp.task('sass', function () {
	return gulp
		.src('./stylesheet/**/*.scss')
		.pipe(
			concat('style.scss')
		) /* Use this command to all .scss files to get concatenated to one single .scss file (custom.scss) */
		.pipe(sass().on('error', sass.logError))
		.pipe(gulp.dest('./stylesheet/'));
});

gulp.task('watch', function () {
	gulp.watch('./stylesheet/*.scss', gulp.series('sass'));
});
