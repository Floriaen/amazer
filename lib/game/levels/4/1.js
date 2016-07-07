ig.module(
	'game.levels.4.1'
)
.defines(function(){
	level41 = {
		"entities": [
			{type: "Saw", x: 64, y: 16},
			{type: "Saw", x: 32, y: 80},
			{type: "Trap", x: 48, y: 64},
			{type: "Fire", x: 16, y: 48},
			{
				type: "Button", x: 16, y: 32,
				settings: {
					action: {
						target: "wall_1_1",
						action: ["hide", "show"],
					}
				}
			},
			{type: "AutoWall", x: 32, y: 16, settings: {name: "wall_1_1"}},
			{type: "Man", x: 16, y: 16}
		],
		"layer": [
			{
				"data": [
					[0, 0, 0, 0, 0, 0, 0],
					[0, 1, 1, 1, 1, 1, 0],
					[0, 1, 3, 1, 3, 2, 0],
					[0, 1, 3, 3, 3, 3, 0],
					[0, 2, 3, 1, 3, 2, 0],
					[0, 1, 1, 1, 1, 1, 0],
					[0, 0, 0, 0, 0, 0, 0]
				]
			}
		]
	};
});
