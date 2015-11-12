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
    'game.levels.level3'
)
.requires(
	'game.levels.3.1',
	'game.levels.3.2',
	'game.levels.3.3',
	'game.levels.3.4'
)
.defines(function(){
	level3 = [
		level31,
		level32,
		level33,
		level34
	];
});
