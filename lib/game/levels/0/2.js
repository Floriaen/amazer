ig.module(
	'game.levels.0.2'
)
.defines(function(){
	level02 = {
		"typeOfFloor": "grass",
		"entities": [
			{type: "Clouds", x: 0, y: 0, settings: {grayfilter: true}},
			{type: "Stairs", x: 16, y: 48, 
				settings: {
					hidden: true,
					zPadding: 40, 
					action: function() {
						ig.game.levelUp()
					}
				}
			},
			{type: "Man", x: 16, y: 16},
			{type: "Rock", x: 64, y: 16}
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
