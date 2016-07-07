var gulp = require('gulp');
var exec = require('child_process').exec;

gulp.task('default', ['build']);
gulp.task('deploy', ['deploy:website']);

gulp.task('build', function(cb) {
	exec('cd build && ./../tools/bake.sh && cd ../', function (err, stdout, stderr) {
		//console.log(stdout);
		console.log(stderr);
		cb(err);
	});
});

gulp.task('deploy:website', ['build'], function(cb) {
	exec('rsync -avz ./build/ root@178.32.221.125:/home/floriaen/www/amazer', function (err, stdout, stderr) {
		console.log(stdout);
		console.log(stderr);
		cb(err);
	});
});

gulp.task('deploy:itchio', ['build'], function(cb) {
	exec('~/Dropbox/game/tools/itch.io.sh build upgradeyourskull/amazer:html5', function (err, stdout, stderr) {
		console.log(stdout);
		console.log(stderr);
		cb(err);
	});
});