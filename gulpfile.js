var gulp = require("gulp"),
	gulputil = require("gulp-util"),
	babel = require("gulp-babel"),
	plumber = require("gulp-plumber"),
	markdox = require("gulp-markdox"),
	rename = require("gulp-rename"),
	include = require("gulp-include"),
	flatten = require('gulp-flatten');

gulp.task("default", ["assertions", "commands", "docs"]);

gulp.task("assertions", function() {
	return gulp.src("es6/assertions/*.js")
		.pipe(plumber(function(error) {
			gulputil.log(gulputil.colors.red(error.message));
			if (error.message != "write after end")
				gulputil.log(error.stack);
			this.emit("end");
		}))
		.pipe(include())
		.pipe(babel({
			presets: ['es2015'],
			plugins: ["add-module-exports"]
		}))
		.pipe(gulp.dest("js/assertions/"));
});

gulp.task("commands", function() {
	return gulp.src("es6/commands/*.js")
		.pipe(plumber(function(error) {
			gulputil.log(gulputil.colors.red(error.message));
			if (error.message != "write after end")
				gulputil.log(error.stack);
			this.emit("end");
		}))
		.pipe(include())
		.pipe(babel({
			presets: ['es2015'],
			plugins: ["add-module-exports"]
		}))
		.pipe(gulp.dest("js/commands/"));
});

gulp.task("docs", function() {
	return gulp.src([
			"es6/commands/*.js",
			"es6/assertions/*.js"
		])
		.pipe(plumber(function(error) {
			gulputil.log(gulputil.colors.red(error.message));
			this.emit("end");
		}))
		.pipe(markdox())
		.pipe(flatten())
		.pipe(rename({
			extname: ".md"
		}))
    	.pipe(gulp.dest("docs"));
});

gulp.task("watch", function() {
	gulp.watch('es6/*.js', ['assertions', 'commands']);
	gulp.watch('es6/assertions/**', ['assertions']);
	gulp.watch('es6/commands/**', ['commands']);

	gulp.watch([
		"es6/commands/*.js",
		"es6/assertions/*.js"
	], ['docs']);

});