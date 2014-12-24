var gulp = require("gulp"),
	gulputil = require("gulp-util"),
	coffeescript = require("gulp-coffee"),
	plumber = require("gulp-plumber");

gulp.task("default", ["assertions", "commands"]);

gulp.task("assertions", function() {
	return gulp.src("coffee/assertions/*.coffee")
		.pipe(plumber(function(error) {
			gulputil.log(gulputil.colors.red(error.message));
			if (error.message != "write after end")
				gulputil.log(error.stack);
			this.emit("end");
		}))
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
		.pipe(coffeescript({bare: true}))
		.pipe(gulp.dest("js/commands/"));
});

gulp.task("watch", function() {
	gulp.watch('coffee/assertions/**', ['assertions']);
	gulp.watch('coffee/commands/**', ['commands']);
});