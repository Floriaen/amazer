ig.module(
	'game.levels.7.4'
)
.defines(function(){
	level74 = {
		"entities": [
			{type: "Gun", x: 48, y: 48, settings: {axis: 'x'}},
			{type: "Saw", x: 16, y: 32, settings: {}},
			{type: "Exit", x: 64, y: 16}
		],
		"layer": [
			{
				"data": [
					[0, 0, 0, 0, 0, 0, 0],
					[0, 3, 13, 13, 1, 5, 0],
					[0, 1, 1, 1, 1, 3, 0],
					[0, 1, 3, 1, 3, 1, 0],
					[0, 1, 3, 3, 5, 3, 0],
					[0, 1, 1, 1, 1, 3, 0],
					[0, 0, 0, 0, 0, 0, 0]
				]
			}
		]
	};
});
