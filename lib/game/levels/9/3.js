ig.module(
	'game.levels.9.3'
)
.defines(function(){
	level93 = {
		"entities": [
			{type: "CrushWall", x: 32, y: 32},
			{type: "CrushWall", x: 64, y: 32},
			{
				type: "Button", x: 16, y: 64,
				settings: {
					action: {
						target: "wall_3_1",
						action: ["hide", "show"]
					}
				}
			},
			{
				type: "Button", x: 48, y: 80,
				settings: {
					action: {
						target: "wall_3_2",
						action: ["hide", "show"]
					}
				}
			},
			{type: "AutoWall", x: 32, y: 16, settings: {name: "wall_3_1"}},
			{type: "AutoWall", x: 64, y: 48, settings: {name: "wall_3_2"}},
			{type: "Fire", x: 48, y: 48},
			{type: "Fire", x: 16, y: 48},
			{type: "Key", x: 64, y: 64},
			{type: "Trap", x: 32, y: 80},
			{type: "Trap", x: 64, y: 80}
		],
		"layer": [
			{
				"data": [
					[0, 0, 0, 0, 0, 0, 0],
					[0, 3, 1, 3, 3, 2, 0],
					[0, 3, 1, 3, 1, 1, 0],
					[0, 1, 1, 1, 1, 1, 0],
					[0, 1, 1, 3, 1, 1, 0],
					[0, 1, 1, 1, 1, 3, 0],
					[0, 0, 0, 0, 0, 0, 0]
				]
			}
		]
	};
});
