ig.module(
	'game.levels.12.4'
)
.defines(function(){
	level124 = {
		"name": "End",
		"tilesetName": "media/floor.png",
		"entities": [
			{type: "Clouds", x: 0, y: 0, settings: {grayfilter: true}},
			{type: "Rock", x: 64, y: 16},
			{type: "Stairs", x: 16, y: 48, 
				settings: {
					hidden: true,
					zPadding: 40, 
					action: function() {
						ig.game.levelUp()
					}
				}
			}
		],
		"layer": [
			{
				"data": [
					[0, 0, 0, 0, 0, 0, 0],
					[0, 20, 20, 20, 20, 20, 0],
					[0, 20, 20, 20, 20, 20, 0],
					[0, 7, 20, 20, 3, 20, 0],
					[0, 20, 20, 20, 20, 20, 0],
					[0, 20, 20, 20, 20, 20, 0],
					[0, 0, 0, 0, 0, 0, 0]
				]
			}
		]
	};
});
