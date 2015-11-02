ig.module( 'game.levels.level1' )
.requires( 'impact.image' )
.defines(function(){
LevelLevel1=/*JSON[*/{
	"entities": [],
	"layer": [
		{
			"name": "map",
			"width": 5,
			"height": 5,
			"linkWithCollision": false,
			"visible": 1,
			"tilesetName": "media/floor.png",
			"repeat": false,
			"preRender": true,
			"distance": "1",
			"tilesize": 16,
			"foreground": false,
			"data": [
				[6,1,1,1,1],
				[1,1,1,2,1],
				[1,1,1,4,1],
				[1,1,1,1,1],
				[1,1,1,1,1]
			]
		}
	]
}/*]JSON*/;
LevelLevel1Resources=[new ig.Image('media/floor.png')];
});