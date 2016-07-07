ig.module(
	'game.levels.2.1'
)
.defines(function(){
	level21 = {
		"entities": [
			{type: "Spikes", x: 16, y: 32},
			//{type: "Spikes", x: 80, y: 32},
			//{type: "Spikes", x: 48, y: 80},
			{type: "Fire", x: 48, y: 48},
			{type: "Man", x: 16, y: 16}
		],
		"layer": [
			{
				"data": [
					[0, 0, 0, 0, 0, 0, 0],
					[0, 1, 3, 2, 1, 3, 0],
					[0, 1, 3, 3, 1, 2, 0],
					[0, 2, 3, 1, 1, 1, 0],
					[0, 3, 3, 1, 3, 1, 0],
					[0, 3, 1, 1, 1, 3, 0],
					[0, 0, 0, 0, 0, 0, 0]
				]
			}
		]
	};
});
