ig.module(
	'game.levels.11.3'
)
.defines(function(){
	level113 = {
		"name": "Into the hell",
		"tilesetName": "media/floor2.png",
		"entities": [
			{type: "StairsBlood", x: 16, y: 16, 
				settings: {
					action: function() {
						ig.game.map.goDown() // go to floor 1
					}
				}
			}
		],
		"layer": [
			{
				"data": [
					[0, 0, 0, 0, 0, 0, 0],
					[0, 1, 7, 1, 2, 3, 0],
					[0, 6, 7, 6, 7, 6, 0],
					[0, 11, 12, 13, 7, 6, 0],
					[0, 7, 7, 7, 7, 6, 0],
					[0, 7, 7, 7, 7, 14, 0],
					[0, 0, 0, 0, 0, 0, 0]
				]
			}
		]
	};
});