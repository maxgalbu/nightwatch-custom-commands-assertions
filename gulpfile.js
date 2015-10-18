var gulp = require("gulp"),
	gulputil = require("gulp-util"),
	coffeescript = require("gulp-coffee"),
	plumber = require("gulp-plumber"),
	markdox = require("gulp-markdox"),
	rename = require("gulp-rename"),
	include = require("gulp-include");

gulp.task("default", ["assertions", "commands"]);

gulp.task("assertions", function() {
	return gulp.src("coffee/assertions/*.coffee")
		.pipe(plumber(function(error) {
			gulputil.log(gulputil.colors.red(error.message));
			if (error.message != "write after end")
				gulputil.log(error.stack);
			this.emit("end");
		}))
		.pipe(include())
		.pipe(coffeescript({bare: true}))
		.pipe(gulp.dest("js/assertions/"));
});

gulp.task("commands", function() {
	return gulp.src("coffee/commands/*.coffee")
		.pipe(plumber(function(error) {
			gulputil.log(gulputil.colors.red(error.message));
			if (error.message != "write after end")
				gulputil.log(error.stack);
			this.emit("end");
		}))
		.pipe(include())
		.pipe(coffeescript({bare: true}))
		.pipe(gulp.dest("js/commands/"));
});

gulp.task("docs", function() {
	return gulp.src([
			"coffee/commands/*.coffee",
			"coffee/assertions/*.coffee"
		])
		.pipe(plumber(function(error) {
			gulputil.log(gulputil.colors.red(error.message));
			this.emit("end");
		}))
		.pipe(markdox())
		.pipe(rename({
			extname: ".md"
		}))
    	.pipe(gulp.dest("docs"));
});

gulp.task("watch", function() {
	gulp.watch('coffee/*.coffee', ['assertions', 'commands']);
	gulp.watch('coffee/assertions/**', ['assertions']);
	gulp.watch('coffee/commands/**', ['commands']);

	gulp.watch([
		"coffee/commands/*.coffee",
		"coffee/assertions/*.coffee"
	], ['docs']);

});