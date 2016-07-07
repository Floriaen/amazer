ig.module(
	'game.levels.9.4'
)
.defines(function(){
	level94 = {
		"entities": [
			{
				type: "Button", x: 80, y: 48,
				settings: {
					action: {
						target: "wall_4_1",
						action: ["hide", "show"],
					}
				}
			},
			{
				type: "Button", x: 48, y: 80,
				settings: {
					action: {
						target: "wall_4_2",
						action: ["show", "hide"],
					}
				}
			},
			{type: "Exit", x: 16, y: 16},
			{type: "CrushWall", x: 48, y: 16},
			{type: "AutoWall", x: 48, y: 32, settings: {name: "wall_4_1"}},
			{type: "AutoWall", x: 64, y: 80, settings: {name: "wall_4_2", v: false}},
			{type: "Spikes", x: 32, y: 48},
			{type: "FireBall", x: 32, y: 80}
		],
		"layer": [
			{
				"data": [
					[0, 0, 0, 0, 0, 0, 0],
					[0, 1, 3, 1, 1, 1, 0],
					[0, 1, 3, 1, 3, 1, 0],
					[0, 1, 1, 5, 1, 1, 0],
					[0, 3, 3, 1, 3, 1, 0],
					[0, 3, 1, 1, 1, 1, 0],
					[0, 0, 0, 0, 0, 0, 0]
				]
			}
		]
	};
});
