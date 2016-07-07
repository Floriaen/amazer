ig.module(
	'game.levels.3.2'
)
.defines(function(){
	level32 = {
		"entities": [
			{type: "Spikes", x: 32, y: 32},
			{type: "Spikes", x: 80, y: 64},
			{type: "Fire", x: 80, y: 80},
			{type: "Fire", x: 32, y: 64}
		],
		"layer": [
			{
				"data": [
					[0, 0, 0, 0, 0, 0, 0],
					[0, 3, 3, 3, 3, 3, 0],
					[0, 3, 1, 1, 1, 1, 0],
					[0, 3, 1, 3, 3, 2, 0],
					[0, 3, 1, 3, 1, 1, 0],
					[0, 3, 3, 3, 1, 1, 0],
					[0, 0, 0, 0, 0, 0, 0]
				]
			}
		]
	};
});
