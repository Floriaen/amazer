const gulp = require('gulp');
const { exec } = require('child_process');
require('dotenv').config();

// Build task - minifies and bundles the game
function build(cb) {
	exec('cd build && ./../tools/bake.sh && cd ../', function (err, stdout, stderr) {
		if (stdout) console.log(stdout);
		if (stderr) console.log(stderr);
		cb(err);
	});
}

// Deploy to website - uses environment variables for security
function deployWebsite(cb) {
	const deployUser = process.env.DEPLOY_USER || 'deploy';
	const deployHost = process.env.DEPLOY_HOST;
	const deployPath = process.env.DEPLOY_PATH;

	if (!deployHost || !deployPath) {
		console.error('ERROR: DEPLOY_HOST and DEPLOY_PATH must be set in .env file');
		console.error('Example: DEPLOY_HOST=example.com DEPLOY_PATH=/var/www/amazer');
		return cb(new Error('Missing deployment configuration'));
	}

	const deployCommand = `rsync -avz ./build/ ${deployUser}@${deployHost}:${deployPath}`;
	console.log(`Deploying to: ${deployUser}@${deployHost}:${deployPath}`);

	exec(deployCommand, function (err, stdout, stderr) {
		if (stdout) console.log(stdout);
		if (stderr) console.log(stderr);
		cb(err);
	});
}

// Deploy to itch.io
function deployItchio(cb) {
	const itchioPath = process.env.ITCHIO_TOOL_PATH || '~/Dropbox/game/tools/itch.io.sh';
	const itchioTarget = process.env.ITCHIO_TARGET || 'upgradeyourskull/amazer:html5';

	const deployCommand = `${itchioPath} build ${itchioTarget}`;
	console.log(`Deploying to itch.io: ${itchioTarget}`);

	exec(deployCommand, function (err, stdout, stderr) {
		if (stdout) console.log(stdout);
		if (stderr) console.log(stderr);
		cb(err);
	});
}

// Task definitions
gulp.task('build', build);
gulp.task('deploy:website', gulp.series(build, deployWebsite));
gulp.task('deploy:itchio', gulp.series(build, deployItchio));
gulp.task('deploy', gulp.series('deploy:website'));
gulp.task('default', gulp.series('build'));