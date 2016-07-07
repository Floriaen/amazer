ig.module(
	'game.levels.3.3'
)
.defines(function(){
	level33 = {
		"entities": [
			{type: "Spikes", x: 32, y: 64},
			{type: "Trap", x: 48, y: 64},
			{type: "Fire", x: 48, y: 80}
		],
		"layer": [
			{
				"data": [
					[0, 0, 0, 0, 0, 0, 0],
					[0, 3, 3, 3, 1, 2, 0],
					[0, 3, 2, 3, 4, 3, 0],
					[0, 3, 1, 3, 3, 1, 0],
					[0, 3, 1, 1, 1, 1, 0],
					[0, 3, 3, 1, 3, 2, 0],
					[0, 0, 0, 0, 0, 0, 0]
				]
			}
		]
	};
});
