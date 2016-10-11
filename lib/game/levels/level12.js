ig.module(
	'game.levels.level12'
)
.requires(
	'game.levels.12.1',
	'game.levels.12.2',
	'game.levels.12.3',
	'game.levels.12.4'
)
.defines(function(){
	level12 = {
		startAtFloor: 3,
		floors: [
			level124,
			level121,
			level122,
			level123
		]
	};
});
