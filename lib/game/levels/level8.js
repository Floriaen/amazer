ig.module(
	'game.levels.level8'
)
.requires(
	'game.levels.8.1',
	'game.levels.8.2',
	'game.levels.8.3',
	'game.levels.8.4'
)
.defines(function(){
	level8 = {
		floors: [
			level81,
			level82,
			level83,
			level84
		]
	};
});
