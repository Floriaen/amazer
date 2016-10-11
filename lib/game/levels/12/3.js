ig.module(
	'game.levels.12.3'
)
.defines(function(){
	level123 = {
		"name": "End",
		"tilesetName": "media/floor.png",
		"entities": [
			{type: "Man", x: 16, y: 16},

			{type: "Spikes", x: 16, y: 32},
			{type: "Fire", x: 80, y: 64},

			{type: "CrushWall", x: 32, y: 16},
			{type: "CrushWall", x: 48, y: 32},
			{type: "CrushWall", x: 64, y: 48},

			//{type: "AutoWall", x: 32, y: 32, settings: {name: "wall_12_1_3", v: false}},

			{type: "AutoWall", x: 48, y: 48, settings: {name: "wall_12_3_1", v: false}},
			{
				type: "Button", x: 32, y: 80,
				settings: {
					action: {
						target: "wall_12_3_1",
						action: ["showOrHide"]
					}
				}
			},

			{type: "AutoWall", x: 64, y: 32, settings: {name: "wall_12_3_2"}},
			{
				type: "Button", x: 48, y: 64,
				settings: {
					action: {
						target: "wall_12_3_2",
						action: ["showOrHide"]
					}
				}
			},

			{type: "Trap", x: 48, y: 80}
		],
		"layer": [
			{
				"data": [
					[0, 0, 0, 0, 0, 0, 0],
					[0, 1, 1, 3, 1, 3, 0],
					[0, 1, 1, 1, 1, 3, 0],
					[0, 1, 1, 1, 1, 3, 0],
					[0, 1, 1, 1, 1, 1, 0],
					[0, 13, 1, 1, 1, 1, 0],
					[0, 0, 0, 0, 0, 0, 0]
				]
			}
		]
	};
});
