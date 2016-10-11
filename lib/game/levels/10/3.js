ig.module(
	'game.levels.10.3'
)
.defines(function(){
	level103 = {
		"entities": [
			{type: "Exit", x: 32, y: 80},
			{type: "CrushWall", x: 48, y: 32, settings: {delay: 0.30 * 4}},
			{
				type: "Button", x: 80, y: 64,
				settings: {
					action: {
						target: "wall_10_3_1",
						action: ["showOrHide"]
					}
				}
			},
			{
				type: "Button", x: 48, y: 80,
				settings: {
					action: {
						target: "wall_10_3_1",
						action: ["hide"]
					}
				}
			},
			{type: "AutoWall", x: 48, y: 48, settings: {name: "wall_10_3_1", v: false}},

			{
				type: "Button", x: 64, y: 16,
				settings: {
					action: {
						target: "wall_10_3_2",
						action: ["showOrHide"]
					}
				}
			},
			{type: "AutoWall", x: 64, y: 64, settings: {name: "wall_10_3_2"}},

		],
		"layer": [
			{
				"data": [
					[0, 0, 0, 0, 0, 0, 0],
					[0, 1, 3, 3, 1, 1, 0],
					[0, 1, 1, 1, 1, 3, 0],
					[0, 1, 1, 1, 1, 1, 0],
					[0, 2, 3, 1, 1, 1, 0],
					[0, 3, 1, 1, 3, 2, 0],
					[0, 0, 0, 0, 0, 0, 0]
				]
			}
		]
	};
});
