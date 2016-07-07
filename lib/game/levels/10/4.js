ig.module(
	'game.levels.10.4'
)
.defines(function(){
	level104 = {
		"entities": [
			{type: "Spike", x: 32, y: 80, settings: {delay: 0}},
			{type: "Spike", x: 48, y: 80, settings: {delay: 0.30}},
			{type: "Spike", x: 48, y: 64, settings: {delay: 0.30 * 2}},
			{type: "Spike", x: 48, y: 48, settings: {delay: 0.30 * 3}},
			{type: "Spike", x: 48, y: 32, settings: {delay: 0.30 * 4}},

			{type: "Spike", x: 80, y: 32, settings: {delay: 0.30 * 6}},
			{type: "Spike", x: 80, y: 48, settings: {delay: 0.30 * 7}},
			{type: "Spike", x: 80, y: 64, settings: {delay: 0.30 * 8}}

			/*
			{type: "Spike", x: 16, y: 48, settings: {delay: 0}},
			{type: "Spike", x: 32, y: 32, settings: {delay: 0.30}},
			//{type: "Spike", x: 48, y: 48, settings: {delay: 0.30 * 2}},
			{type: "Spike", x: 64, y: 32, settings: {delay: 0.30 * 3}},
			{type: "Spike", x: 80, y: 48, settings: {delay: 0.30 * 4}},

			{type: "CrushWall", x: 48, y: 32, settings: {delay: 0.30 * 4}},

			{
				type: "Button", x: 80, y: 80,
				settings: {
					action: {
						target: "wall_10_3_1",
						action: ["showOrHide"]
					}
				}
			},
			{type: "AutoWall", x: 48, y: 48, settings: {name: "wall_10_3_1", v: false}},
			*/
		],
		"layer": [
			{
				"data": [
					[0, 0, 0, 0, 0, 0, 0],
					[0, 1, 3, 3, 3, 3, 0],
					[0, 1, 3, 1, 1, 1, 0],
					[0, 3, 3, 1, 3, 1, 0],
					[0, 1, 3, 1, 3, 1, 0],
					[0, 1, 1, 1, 3, 1, 0],
					[0, 0, 0, 0, 0, 0, 0]
				]
			}
		]
	};
});
