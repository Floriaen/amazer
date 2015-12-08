ig.module(
	'game.levels.2.4'
)
.defines(function(){
	level24 = {
		"entities": [
			{type: "Spikes", x: 64, y: 16},
			{type: "Spikes", x: 48, y: 80}
		],
		"layer": [
			{
				"data": [
					[0, 0, 0, 0, 0, 0, 0],
					[0, 1, 1, 1, 1, 3, 0],
					[0, 1, 3, 3, 1, 3, 0],
					[0, 1, 1, 3, 1, 3, 0],
					[0, 3, 3, 3, 3, 3, 0],
					[0, 1, 1, 1, 1, 1, 0],
					[0, 0, 0, 0, 0, 0, 0]
				]
			}
		]
	};
});
