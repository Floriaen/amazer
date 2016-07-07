ig.module(
	'game.levels.10.2'
)
.defines(function(){
	level102 = {
		"entities": [
			//{type: "Exit", x: 16, y: 16},

			{type: "Spike", x: 16, y: 48, settings: {delay: 0}},
			{type: "Spike", x: 32, y: 48, settings: {delay: 0.30}},
			{type: "Spike", x: 48, y: 48, settings: {delay: 0.30 * 2}},
			{type: "Spike", x: 64, y: 48, settings: {delay: 0.30 * 3}},
			{type: "Spike", x: 80, y: 48, settings: {delay: 0.30 * 4}},

			{
				type: "Button", x: 32, y: 32,
				settings: {
					action: {
						target: "wall_10_2_1",
						action: ["showOrHide"]
					}
				}
			},
			{type: "AutoWall", x: 48, y: 64, settings: {name: "wall_10_2_1"}},

			{
				type: "Button", x: 64, y: 32,
				settings: {
					action: {
						target: "wall_10_2_2",
						action: ["showOrHide"]
					}
				}
			},
			{type: "AutoWall", x: 80, y: 64, settings: {name: "wall_10_2_2"}},

			{
				type: "Button", x: 80, y: 80,
				settings: {
					action: {
						target: "wall_10_2_3",
						action: ["showOrHide"]
					}
				}
			},
			{type: "AutoWall", x: 32, y: 16, settings: {name: "wall_10_2_3", v: false}},
			{type: "Saw", x: 48, y: 16},
			{type: "Fire", x: 16, y: 32},

			{
				type: "Button", x: 16, y: 64,
				settings: {
					action: {
						target: "wall_10_2_3",
						action: ["show"]
					}
				}
			},

			{type: "Key", x: 48, y: 80}
		],
		"layer": [
			{
				"data": [
					[0, 0, 0, 0, 0, 0, 0],
					[0, 2, 1, 1, 1, 1, 0],
					[0, 1, 1, 3, 1, 3, 0],
					[0, 1, 1, 1, 1, 1, 0],
					[0, 1, 3, 1, 3, 1, 0],
					[0, 1, 3, 1, 3, 1, 0],
					[0, 0, 0, 0, 0, 0, 0]
				]
			}
		]
	};
});
