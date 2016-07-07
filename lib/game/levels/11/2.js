ig.module(
	'game.levels.11.2'
)
.defines(function(){
	level112 = {
		"name": "Into the hell",
		"tilesetName": "media/floor2.png",
		"entities": [
			{type: "StairsBlood", x: 80, y: 80, 
				settings: {
					action: function() {
						ig.game.map.goDown()
					}
				}
			},
			{type: "BloodBubbles", x: 32, y: 16}
		],
		"layer": [
			{
				"data": [
					[0, 0, 0, 0, 0, 0, 0],
					[0, 1, 2, 3, 7, 7, 0],
					[0, 6, 7, 6, 7, 7, 0],
					[0, 6, 7, 14, 7, 7, 0],
					[0, 6, 7, 7, 7, 8, 0],
					[0, 11, 12, 12, 12, 13, 0],
					[0, 0, 0, 0, 0, 0, 0]
				]
			}
		]
	};
});
