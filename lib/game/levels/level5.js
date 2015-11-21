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
    'game.levels.level5'
)
.requires(
	'game.levels.5.1',
	'game.levels.5.2',
	'game.levels.5.3',
	'game.levels.5.4'
)
.defines(function(){
    level5 = [
		level51,
		level52,
		level53,
		level54
    ];
});
