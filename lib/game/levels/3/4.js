ig.module(
	'game.levels.3.4'
)
.defines(function(){
	level34 = {
		"entities": [
			{
				type: "Button", x: 32, y: 80,
				settings: {
					action: {
						target: "wall",
						action: "hide",
						//property: "vel.y",
						//value: {x: 4, y: 2},
					}
				}
			},
			{
				type: "AutoWall", x: 80, y: 32, settings: {name: "wall"}
			},
			{
				type: "MovingWall", x: 48, y: 48
			},
			{
				type: "Spikes", x: 64, y: 48
			}
		],
		"layer": [
			{
				"data": [
					[0, 0, 0, 0, 0, 0, 0],
					[0, 3, 3, 3, 3, 1, 0],
					[0, 1, 1, 3, 5, 1, 0],
					[0, 3, 5, 1, 1, 1, 0],
					[0, 3, 1, 3, 1, 1, 0],
					[0, 3, 1, 3, 3, 1, 0],
					[0, 0, 0, 0, 0, 0, 0]
				]
			}
		]
	};
});
