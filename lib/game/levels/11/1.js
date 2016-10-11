ig.module(
	'game.levels.11.1'
)
.defines(function(){
	level111 = {
		"name": "Into the hell",
		"tilesetName": "media/floor2.png",
		"entities": [
			{type: "Man", x: 16, y: 16},
			{type: "StairsBlood", x: 48, y: 48, 
				settings: {
					action: function() {
						ig.game.map.goDown()
					}
				}
			}
		],
		"layer": [
			{
				"data": [
					[0, 0, 0, 0, 0, 0, 0],
					[0, 9, 7, 1, 2, 3, 0],
					[0, 6, 7, 6, 7, 8, 0],
					[0, 6, 7, 5, 7, 8, 0],
					[0, 6, 7, 7, 7, 8, 0],
					[0, 11, 12, 12, 12, 13, 0],
					[0, 0, 0, 0, 0, 0, 0]
				]
			}
		]
	};
});
