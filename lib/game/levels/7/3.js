ig.module(
	'game.levels.7.3'
)
.defines(function(){
	level73 = {
		"entities": [
			{type: "Gun", x: 16, y: 32, settings: {axis: 'y'}},
			{type: "Gun", x: 16, y: 64, settings: {axis: 'y'}},
		],
		"layer": [
			{
				"data": [
					[0, 0, 0, 0, 0, 0, 0],
					[0, 3, 3, 3, 1, 1, 0],
					[0, 1, 1, 4, 1, 1, 0],
					[0, 1, 3, 13, 8, 1, 0],
					[0, 1, 1, 1, 1, 1, 0],
					[0, 1, 1, 1, 2, 3, 0],
					[0, 0, 0, 0, 0, 0, 0]
				]
			}
		]
	};
});
