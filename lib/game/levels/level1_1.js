ig.module( 'game.levels.level1_1' )
.requires( 'impact.image','game.entities.tile' )
.defines(function(){
LevelLevel1_1=/*JSON[*/{
	"entities": [
		{
			"type": "EntityTile",
			"x": 32,
			"y": 0
		},
		{
			"type": "EntityTile",
			"x": 48,
			"y": 0
		},
		{
			"type": "EntityTile",
			"x": 64,
			"y": 0
		},
		{
			"type": "EntityTile",
			"x": 32,
			"y": 16
		},
		{
			"type": "EntityTile",
			"x": 64,
			"y": 16
		},
		{
			"type": "EntityTile",
			"x": 32,
			"y": 32
		},
		{
			"type": "EntityTile",
			"x": 64,
			"y": 32
		},
		{
			"type": "EntityTile",
			"x": 32,
			"y": 48
		},
		{
			"type": "EntityTile",
			"x": 48,
			"y": 48
		},
		{
			"type": "EntityTile",
			"x": 64,
			"y": 48
		},
		{
			"type": "EntityTile",
			"x": 48,
			"y": 64
		}
	],
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
				[2,1,1,1,1]
			]
		},
		{
			"name": "collision",
			"width": 5,
			"height": 5,
			"linkWithCollision": false,
			"visible": 1,
			"tilesetName": "",
			"repeat": false,
			"preRender": false,
			"distance": 1,
			"tilesize": 16,
			"foreground": false,
			"data": [
				[0,0,46,46,46],
				[0,0,46,0,46],
				[0,0,46,0,46],
				[0,0,46,46,46],
				[0,0,0,46,0]
			]
		}
	]
}/*]JSON*/;
LevelLevel1_1Resources=[new ig.Image('media/floor.png')];
});
