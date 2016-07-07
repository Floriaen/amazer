ig.module(
	'game.levels.8.3'
)
.defines(function(){
	level83 = {
		"entities": [
			{type: "Spikes", x: 48, y: 32},
			{type: "Exit", x: 48, y: 48},
			{type: "Saw", x: 32, y: 80}
		],
		"layer": [
			{
				"data": [
					[0, 0, 0, 0, 0, 0, 0],
					[0, 2, 1, 3, 4, 2, 0],
					[0, 13, 3, 1, 3, 1, 0],
					[0, 13, 5, 1, 5, 3, 0],
					[0, 2, 3, 1, 3, 2, 0],
					[0, 3, 1, 1, 1, 1, 0],
					[0, 0, 0, 0, 0, 0, 0]
				]
			}
		]
	};
});
