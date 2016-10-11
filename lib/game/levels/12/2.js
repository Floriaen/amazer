ig.module(
	'game.levels.12.2'
)
.defines(function(){
	level122 = {
		"name": "End",
		"tilesetName": "media/floor.png",
		"entities": [

			{type: "Gun", x: 48, y: 16, settings: {axis: 'x', direction: 'bottom'}},
			{type: "Gun", x: 32, y: 32, settings: {axis: 'y', direction: 'right'}},
			{type: "Gun", x: 16, y: 48, settings: {axis: 'y', direction: 'right'}},

			{type: "AutoWall", x: 64, y: 16, settings: {name: "wall_12_2_2", v: false}},
			{
				type: "Button", x: 80, y: 64,
				settings: {
					action: {
						target: "wall_12_2_2",
						action: ["showOrHide"]
					}
				}
			},

			{type: "AutoWall", x: 32, y: 48, settings: {name: "wall_12_2_3", v: false}},
			{
				type: "Button", x: 64, y: 32,
				settings: {
					action: {
						target: "wall_12_2_3",
						action: ["showOrHide"]
					}
				}
			},

			{type: "AutoWall", x: 48, y: 32, settings: {name: "wall_12_2_1", v: false}},
			{
				type: "Button", x: 80, y: 16,
				settings: {
					action: {
						target: "wall_12_2_1",
						action: ["showOrHide"]
					}
				}
			},

			{type: "Fire", x: 64, y: 80},
			{type: "Fire", x: 48, y: 64},
			{type: "Fire", x: 16, y: 64}

		],
		"layer": [
			{
				"data": [
					[0, 0, 0, 0, 0, 0, 0],
					[0, 3, 3, 1, 1, 1, 0],
					[0, 3, 1, 1, 1, 1, 0],
					[0, 1, 1, 1, 1, 1, 0],
					[0, 1, 1, 1, 1, 1, 0],
					[0, 3, 1, 3, 1, 2, 0],
					[0, 0, 0, 0, 0, 0, 0]
				]
			}
		]
	};
});