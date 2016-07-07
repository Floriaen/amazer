ig.module(
	'game.levels.9.1'
)
.defines(function(){
	level91 = {
		"entities": [
			{type: "CrushWall", x: 32, y: 16},
			{type: "Saw", x: 48, y: 32},
			{
				type: "Button", x: 16, y: 32,
				settings: {
					action: {
						target: "wall_1_1",
						action: ["hide", "show"]
					}
				}
			},
			{
				type: "Button", x: 48, y: 32,
				settings: {
					action: {
						target: "wall_1_2",
						action: ["hide", "show"],
					}
				}
			},
			{
				type: "Button", x: 80, y: 32,
				settings: {
					action: {
						target: "wall_1_3",
						action: ["hide", "show"]
					}
				}
			},
			{type: "AutoWall", x: 32, y: 32, settings: {name: "wall_1_1"}},
			{type: "AutoWall", x: 48, y: 16, settings: {name: "wall_1_2"}},
			{type: "AutoWall", x: 64, y: 80, settings: {name: "wall_1_3"}},
			
			{type: "Spikes", x: 48, y: 48},
			{type: "Fire", x: 80, y: 64},
			{type: "Man", x: 16, y: 16}
		],
		"layer": [
			{
				"data": [
					[0, 0, 0, 0, 0, 0, 0],
					[0, 1, 1, 1, 2, 3, 0],
					[0, 1, 1, 1, 1, 1, 0],
					[0, 2, 1, 1, 3, 1, 0],
					[0, 1, 3, 3, 3, 1, 0],
					[0, 3, 3, 2, 1, 2, 0],
					[0, 0, 0, 0, 0, 0, 0]
				]
			}
		]
	};
});
