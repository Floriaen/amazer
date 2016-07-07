ig.module(
	'game.levels.9.2'
)
.defines(function(){
	level92 = {
		"entities": [
			//{type: "Spikes", x: 48, y: 48},
			{
				type: "Button", x: 48, y: 64,
				settings: {
					action: {
						target: "wall_2_1",
						action: ["hide", "show"]
					}
				}
			},
			{type: "AutoWall", x: 16, y: 64, settings: {name: "wall_2_1"}},
			
			{type: "Fire", x: 32, y: 48},
			{type: "Fire", x: 64, y: 48},

			{type: "Trap", x: 16, y: 32},
			{type: "Trap", x: 64, y: 32},
			{type: "Trap", x: 80, y: 32},
			{type: "Trap", x: 80, y: 48},
			{type: "Trap", x: 80, y: 64}
		],
		"layer": [
			{
				"data": [
					[0, 0, 0, 0, 0, 0, 0],
					[0, 3, 3, 3, 1, 3, 0],
					[0, 1, 3, 3, 1, 1, 0],
					[0, 1, 1, 3, 1, 1, 0],
					[0, 1, 3, 1, 3, 1, 0],
					[0, 2, 3, 1, 3, 1, 0],
					[0, 0, 0, 0, 0, 0, 0]
				]
			}
		]
	};
});
