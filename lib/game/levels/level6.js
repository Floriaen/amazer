ig.module(
	'game.levels.level6'
)
.requires(
	'game.levels.6.1',
	'game.levels.6.2',
	'game.levels.6.3',
	'game.levels.6.4'
)
.defines(function(){
	level6 = {
		floors: [
			level61,
			level62,
			level63,
			level64
		]
	};
});
