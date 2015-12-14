ig.module(
	'game.levels.2.1'
)
.defines(function(){
	level21 = {
		"entities": [
			{type: "Spikes", x: 16, y: 32},
			{type: "Spikes", x: 80, y: 32},
			{type: "Spikes", x: 48, y: 80},
			{type: "Exit", x: 48, y: 48}
		],
		"layer": [
			{
				"data": [
					[0, 0, 0, 0, 0, 0, 0],
					[0, 14, 3, 3, 3, 1, 0],
					[0, 1, 3, 5, 3, 1, 0],
					[0, 2, 3, 1, 3, 1, 0],
					[0, 3, 3, 2, 3, 3, 0],
					[0, 3, 1, 1, 1, 3, 0],
					[0, 0, 0, 0, 0, 0, 0]
				]
			}
		]
	};
});
