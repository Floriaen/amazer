ig.module(
	'game.levels.level1'
)
.requires(
	'game.levels.1.1',
	'game.levels.1.2',
	'game.levels.1.3',
	'game.levels.1.4'
)
.defines(function(){
	level1 = {
		floors: [
			level11,
			level12,
			level13,
			level14
		]
	};
});
