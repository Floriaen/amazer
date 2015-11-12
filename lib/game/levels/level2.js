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
    'game.levels.level2'
)
.requires(
	'game.levels.2.1',
	'game.levels.2.2',
	'game.levels.2.3',
	'game.levels.2.4'
)
.defines(function(){
	level2 = [
		level21,
		level22,
		level23,
		level24
	];
});
