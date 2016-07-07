ig.module(
	'game.levels.10.1'
)
.defines(function(){
	level101 = {
		"entities": [
			{type: "Spike", x: 80, y: 48, settings: {delay: 0}},
			{type: "Spike", x: 64, y: 48, settings: {delay: 0.30}},
			{type: "Spike", x: 48, y: 48, settings: {delay: 0.30 * 2}},
			{type: "Spike", x: 32, y: 48, settings: {delay: 0.30 * 3}},
			{type: "Spike", x: 16, y: 48, settings: {delay: 0.30 * 4}},

			{type: "Trap", x: 80, y: 32, settings: {delay: 0.88}},
			{type: "Trap", x: 32, y: 64, settings: {delay: 0.88}},

			{
				type: "Button", x: 80, y: 16,
				settings: {
					action: {
						target: "wall_10_1_1",
						action: ["showOrHide"]
					}
				}
			},
			{
				type: "Button", x: 32, y: 80,
				settings: {
					action: {
						target: "wall_10_1_1",
						action: ["showOrHide"]
					}
				}
			},
			{type: "AutoWall", x: 48, y: 80, settings: {name: "wall_10_1_1", v: false}},
			{type: "Gun", x: 80, y: 80, settings: {axis: 'y'}},
			{type: "Man", x: 16, y: 16}
		],
		"layer": [
			{
				"data": [
					[0, 0, 0, 0, 0, 0, 0],
					[0, 1, 1, 1, 1, 1, 0],
					[0, 3, 3, 3, 3, 1, 0],
					[0, 1, 1, 1, 1, 1, 0],
					[0, 3, 1, 3, 3, 3, 0],
					[0, 2, 1, 1, 1, 1, 0],
					[0, 0, 0, 0, 0, 0, 0]
				]
			}
		]
	};
});
