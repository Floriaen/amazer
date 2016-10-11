ig.module(
	'game.levels.level11',
	'game.levels.level12',
	'game.levels.level13'
)
.requires(
	'game.levels.11.1',
	'game.levels.11.2',
	'game.levels.11.3',
	'game.levels.11.4'
)
.defines(function(){
	level11 = {
		floors: [
			level111,
			level112,
			level113,
			level114
		]
	};
});
