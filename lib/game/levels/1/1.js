ig.module(
	'game.levels.1.1'
)
.defines(function(){
	level11 = {
		"tilesetName": "media/floor.png",
		"entities": [
			{type: "Exit", x: 32, y: 64},
			{type: "Fire", x: 32, y: 32},
			{type: "Key", x: 64, y: 48},
			{type: "Man", x: 16, y: 48}
		],
		"layer": [
			{
				"data": [
					[0, 0, 0, 0, 0, 0, 0],
					[0, 3, 3, 3, 3, 3, 0],
					[0, 3, 1, 3, 2, 3, 0],
					[0, 1, 3, 3, 1, 3, 0],
					[0, 1, 1, 3, 1, 3, 0],
					[0, 1, 2, 1, 3, 1, 0],
					[0, 0, 0, 0, 0, 0, 0]
				]
			}
		]
	};
});
