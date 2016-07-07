ig.module(
	'game.levels.2.3'
)
.defines(function(){
	level23 = {
		"entities": [
			{type: "Spikes", x: 64, y: 16},
			{type: "Spikes", x: 16, y: 32},
			{type: "Spikes", x: 16, y: 80},
			{type: "Fire", x: 48, y: 32},
			{type: "Fire", x: 16, y: 48},
			{type: "Key", x: 32, y: 48},
			{type: "MovingWall", x: 16, y: 64}
		],
		"layer": [
			{
				"data": [
					[0, 0, 0, 0, 0, 0, 0],
					[0, 2, 3, 3, 1, 1, 0],
					[0, 1, 3, 1, 1, 3, 0],
					[0, 1, 3, 3, 2, 3, 0],
					[0, 1, 3, 3, 3, 3, 0],
					[0, 1, 2, 3, 1, 2, 0],
					[0, 0, 0, 0, 0, 0, 0]
				]
			}
		]
	};
});
