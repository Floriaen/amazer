ig.module(
	'game.levels.6.3'
)
.defines(function(){
	level63 = {
		"entities": [
			{type: "Trap", x: 32, y: 64},
			{type: "MovingWall", x: 80, y: 48},
			{type: "Saw", x: 16, y: 16},
			{type: "Saw", x: 48, y: 48},
		],
		"layer": [
			{
				"data": [
					[0, 0, 0, 0, 0, 0, 0],
					[0, 1, 1, 3, 1, 1, 0],
					[0, 1, 1, 3, 1, 1, 0],
					[0, 5, 3, 1, 1, 1, 0],
					[0, 1, 1, 8, 1, 1, 0],
					[0, 3, 2, 1, 1, 15, 0],
					[0, 0, 0, 0, 0, 0, 0]
				]
			}
		]
	};
});
