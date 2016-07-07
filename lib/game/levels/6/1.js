ig.module(
	'game.levels.6.1'
)
.defines(function(){
	level61 = {
		"entities": [
			{type: "Trap", x: 32, y: 16},
			{type: "Trap", x: 48, y: 64},
			{type: "MovingWall", x: 48, y: 64},
			{type: "Stairs", x: 48, y: 80},
			{type: "Man", x: 16, y: 16}
		],
		"layer": [
			{
				"data": [
					[0, 0, 0, 0, 0, 0, 0],
					[0, 1, 1, 1, 1, 15, 0],
					[0, 3, 13, 3, 1, 1, 0],
					[0, 11, 1, 1, 1, 3, 0],
					[0, 3, 1, 1, 1, 3, 0],
					[0, 1, 1, 2, 1, 15, 0],
					[0, 0, 0, 0, 0, 0, 0]
				]
			}
		]
	};
});
