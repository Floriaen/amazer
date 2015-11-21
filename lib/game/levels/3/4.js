ig.module(
	'game.levels.3.4'
)
.defines(function(){
	level34 = {
		"entities": [
			{
				type: "Button", x: 32, y: 48,
				settings: {
					action: {
						target: 'wall',
						//property: "vel.y", TODO
						value: {x: 4, y: 2},
						action: "goToTile"
					}
				}
			},
			{
				type: "AutoWall", x: 80, y: 32, settings: {name: "wall"}
			}
		],
		"layer": [
			{
				"data": [
					[0, 0, 0, 0, 0, 0, 0],
					[0, 3, 3, 3, 3, 1, 0],
					[0, 1, 1, 1, 1, 1, 0],
					[0, 3, 1, 5, 3, 1, 0],
					[0, 3, 1, 3, 3, 1, 0],
					[0, 3, 3, 3, 3, 3, 0],
					[0, 0, 0, 0, 0, 0, 0]
				]
			}
		]
	};
});
