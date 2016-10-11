ig.module(
	'game.levels.7.3'
)
.defines(function(){
	level73 = {
		"entities": [
			{type: "Gun", x: 16, y: 32, settings: {axis: 'y', direction: 'right'}},
			{type: "Gun", x: 16, y: 64, settings: {axis: 'y', direction: 'right'}},
			{type: "MovingWall", x: 64, y: 48},
			{type: "Key", x: 48, y: 32},
			{type: "Stairs", x: 64, y: 80}
		],
		"layer": [
			{
				"data": [
					[0, 0, 0, 0, 0, 0, 0],
					[0, 3, 3, 3, 1, 1, 0],
					[0, 1, 1, 1, 1, 1, 0],
					[0, 1, 3, 13, 1, 1, 0],
					[0, 1, 1, 1, 1, 1, 0],
					[0, 1, 1, 1, 2, 3, 0],
					[0, 0, 0, 0, 0, 0, 0]
				]
			}
		]
	};
});
