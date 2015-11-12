/*
[
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0]
]
*/
ig.module(
    'game.levels.level4'
)
.requires(
	'game.levels.4.1',
	'game.levels.4.2',
	'game.levels.4.3',
	'game.levels.4.4'
)
.defines(function(){
	level4 = [
		level41,
		level42,
		level43,
		level44
	];
});
