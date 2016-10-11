ig.module(
	'game.levels.12.1'
)
.defines(function(){
	level121 = {
		"name": "End",
		"tilesetName": "media/floor.png",
		"entities": [
			//{type: "Gun", x: 32, y: 16, settings: {axis: 'y'}},
			{type: "AutoWall", x: 64, y: 80, settings: {name: "wall_12_1_1"}},
			{
				type: "Button", x: 48, y: 16,
				settings: {
					action: {
						target: "wall_12_1_1",
						action: ["showOrHide"]
					}
				}
			},
			{type: "AutoWall", x: 64, y: 16, settings: {name: "wall_12_1_2"}},//, v: false}},
			{
				type: "Button", x: 80, y: 80,
				settings: {
					action: {
						target: "wall_12_1_2",
						action: ["showOrHide"]
					}
				}
			},
			{type: "Saw", x: 48, y: 32},
			{type: "Saw", x: 80, y: 48},
			{type: "Saw", x: 16, y: 64},

			{type: "Trap", x: 48, y: 80},
			{type: "Fire", x: 80, y: 64}
		],
		"layer": [
			{
				"data": [
					[0, 0, 0, 0, 0, 0, 0],
					[0, 3, 1, 1, 1, 1, 0],
					[0, 1, 1, 1, 1, 3, 0],
					[0, 3, 1, 1, 1, 1, 0],
					[0, 1, 1, 1, 3, 1, 0],
					[0, 3, 2, 1, 1, 1, 0],
					[0, 0, 0, 0, 0, 0, 0]
				]
			}
		]
	};
});