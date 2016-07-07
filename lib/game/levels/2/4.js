ig.module(
	'game.levels.2.4'
)
.defines(function(){
	level24 = {
		"entities": [
			{type: "Spikes", x: 48, y: 48},
			{type: "Spikes", x: 32, y: 64},
			{type: "MovingWall", x: 32, y: 48}
		],
		"layer": [
			{
				"data": [
					[0, 0, 0, 0, 0, 0, 0],
					[0, 1, 1, 1, 1, 3, 0],
					[0, 3, 1, 3, 1, 3, 0],
					[0, 1, 1, 1, 1, 3, 0],
					[0, 3, 1, 3, 3, 3, 0],
					[0, 3, 1, 1, 1, 1, 0],
					[0, 0, 0, 0, 0, 0, 0]
				]
			}
		]
	};
});
