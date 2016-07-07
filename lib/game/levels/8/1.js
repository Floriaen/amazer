ig.module(
	'game.levels.8.1'
)
.defines(function(){
	level81 = {
		"entities": [
			{type: "Saw", x: 48, y: 64},
			{type: "Spikes", x: 16, y: 32},
			{type: "Gun", x: 80, y: 80, settings: {axis: 'y'}},
			{type: "Man", x: 16, y: 16}
		],
		"layer": [
			{
				"data": [
					[0, 0, 0, 0, 0, 0, 0],
					[0, 1, 3, 3, 3, 3, 0],
					[0, 1, 3, 2, 5, 3, 0],
					[0, 1, 3, 13, 1, 3, 0],
					[0, 1, 1, 1, 3, 3, 0],
					[0, 3, 1, 1, 1, 1, 0],
					[0, 0, 0, 0, 0, 0, 0]
				]
			}
		]
	};
});
