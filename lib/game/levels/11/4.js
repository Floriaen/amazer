ig.module(
	'game.levels.11.4'
)
.defines(function(){
	level114 = {
		"name": "Into the hell",
		"tilesetName": "media/floor2.png",
		"entities": [
			{type: "Man", x: 16, y: 16},
			//{type: "BloodDoor", x: 40, y: 32}
			{type: "StairsBlood", x: 48, y: 48, 
				settings: {
					action: function() {
						ig.game.levelUp();
					}
				}
			}
		],
		"layer": [
			{
				"data": [
					[0, 0, 0, 0, 0, 0, 0],
					[0, 9, 7, 7, 7, 7, 0],
					[0, 6, 7, 7, 7, 7, 0],
					[0, 6, 7, 10, 7, 7, 0],
					[0, 6, 7, 6, 7, 7, 0],
					[0, 11, 12, 13, 7, 7, 0],
					[0, 0, 0, 0, 0, 0, 0]
				]
			}
		]
	};
});
