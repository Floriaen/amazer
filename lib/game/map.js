ig.module(
	'game.map'
)
.requires(
	'impact.entity',
	'impact.image',
	'game.entity.tile',
	'game.entity.hatch',
	'game.entity.fire',
	'game.entity.key',
	'game.entity.stairs',
	'game.entity.moving-wall',
	'game.entity.fire-ball',
	'game.entity.saw',
	'game.entity.gun',
	'game.entity.spikes',
	'game.entity.button',
	'game.entity.wall.auto-wall',
	'game.entity.wall.crush-wall',
	'game.entity.exit',
	'game.entity.grass',
	'game.entity.rock',
	'game.entity.trap',
	'game.engine.map-floor',
	'game.entity.spike',
	'game.entity.stairs-blood'
)
.defines(function(){
	var EXIT = 2;
	var TILE = 3;
	var KEY = 4;
	var FIRE = 5;
	var STAIRS = 7;
	var MOVEABLE_WALL = 8;
	var EXIT_2 = 9;
	var STAIRS_2 = 10;
	//
	var SAW = 11;
	var WORM = 12;
	var FIRE_BALL = 13;

	var GUN = 15;
	var FALLING_BAG = 170;
	var GRASS = 20;
	var TREE = 21;
	var ROCK = 22;

	var TILESET_MAZE = 'media/floor.png';
	var TILESET_HELL = 'media/floor2.png';

	Map = ig.Entity.extend({

		z: 0,
		floor: {
			z: 0,
			start: {
				x: 16,
				y: 16
			}
		},

		mapEntities: null,
		solidMaps: null,

		floors: [],

		preloadTileset1: new ig.Image(TILESET_MAZE),
		preloadTileset2: new ig.Image(TILESET_HELL),

		init: function(x, y, settings) {
			this.parent(x, y, settings);
			this.originalPos = {x: x, y: y};
			this.zIndex = 0;

			//ig.System.SCALE.SMOOTH(this.canvas, this.context);
			ig.System.SCALE.SMOOTH(ig.system.canvas, ig.system.context);
		},

		getWidth: function() {
			if (this.floors.length === 0) {
				return 0;
			}
			return this.floors[0].width * this.floors[0].tilesize;
		},

		getHeight: function() {
			if (this.floors.length === 0) {
				return 0;
			}
			return this.floors[0].height * this.floors[0].tilesize;
		},

		loadLevel: function(level) {
			this.resetLevel();
			
			this.z = level.startAtFloor || 0;
			for (var i = 0; i < level.floors.length; i++) {
				if (level.floors[i]['entities']) {
					this.mapEntities.push(level.floors[i]['entities']);
				} else {
					this.mapEntities.push([]);
				}

				this.solidMaps.push({});

				var tileset = level.floors[i].tilesetName || TILESET_MAZE;

				var floor = new MapFloor(
					ig.global.TILE_SIZE,
					level.floors[i]['layer'][0]['data'],
					tileset
				);
				// Set some default values:
				floor.typeOfFloor = level.floors[i].typeOfFloor || "rock";
				floor.name =  level.floors[i].name || 'Level ';
				floor.preRender = true;
				this.floors.push(floor);
			}

			this.currentFloor = this.floors[this.z];

			// set the Element size:
			var gridSize = this.currentFloor.data.length;
			this.size.x = gridSize * ig.global.TILE_SIZE;
			this.size.y = gridSize * ig.global.TILE_SIZE;

			this.loadCurrentFloor();
		},

		getCurrentMap: function() {
			return this.floors[this.z];
		},

		resetLevel: function() {
			for (var idx in this.floors) {
				this.floors[idx].removeEntities();
			}
			this.floors = [];

			this.z = 0;

			this.mapEntities = [];
			this.solidMaps = [];

			ig.game.collisionMap = ig.CollisionMap.staticNoCollision; // default
		},

		spawnEntity: function(type, x, y, settings) {
			var e = ig.game.spawnEntity(type, x, y, settings);
			this.currentFloor.entities.push(e);
			e.setVisible(true);
			return e;
		},

		// load current floor of level, this our map
		loadCurrentFloor: function() {
			this.currentFloor = this.floors[this.z];

			// build and set the collision map
			var collisionMap = []; // TODO have a static array somewhere
			for (var i = 0; i < this.currentFloor.data.length; i++) {
				collisionMap[i] = [];
				for (var j = 0; j < this.currentFloor.data[i].length; j++) {
					var value = this.currentFloor.data[i][j];
					if (this.currentFloor.tilesetName === TILESET_MAZE) {

						collisionMap[i][j] = (
							value === TILE || 
							value === GUN ||
							value === TREE ||
							value === ROCK ||
							value === 0
						) ? 1: 0;

					} else if (this.currentFloor.tilesetName === TILESET_HELL) {

						collisionMap[i][j] = (
							value === 7 || 
							value === 0
						) ? 1: 0;

					}
				}
			}
			ig.game.collisionMap = new ig.CollisionMap(ig.global.TILE_SIZE, collisionMap);

			// the first time we load the floor of this level
			if (this.currentFloor.entities.length === 0) {
				this.spawnEntities();
			} else {
				this.currentFloor.setEntitiesVisible(true);
			}

			// set the position 
			if (ig.game.man) {
				Man.respawnAt.x = ig.game.man.tile.x * ig.global.TILE_SIZE;
				Man.respawnAt.y = ig.game.man.tile.y * ig.global.TILE_SIZE;
				ig.game.man.setVisible(true);
			}

			ig.game.sortEntitiesDeferred();
		},

		spawnEntities: function() {
			// default Player position:
			var i = 0;
			var mapEntities = this.mapEntities[this.z];
			if (mapEntities) {
				for (i = 0; i < mapEntities.length; i++) {
					var mapEntity = mapEntities[i];
					if (mapEntity.type === 'Man') {

						// because Man is already instantiate:
						if (!ig.game.man || ig.game.man._killed) {
							ig.game.man = this.spawnEntity('Man', mapEntity.x, mapEntity.y);
							ig.game.man.canPlaySpawnSfx = false;
						} else {
							ig.game.man.setPosition(mapEntity.x, mapEntity.y);
						}
						ig.game.man.setVisible(true);

					} else {
						var entity = ig.game.spawnEntity(mapEntity.type, mapEntity.x, mapEntity.y, mapEntity.settings);
						entity.mapDepth = this.z;
						entity.updateZIndex();
						entity.setVisible(true);

						this.currentFloor.entities.push(entity);
						if (mapEntity.type === 'Spikes') {
							this.currentFloor.data[entity.tile.y][entity.tile.x] = 17; // empty tile
						} else if (mapEntity.type === 'Fire') {
							this.currentFloor.data[entity.tile.y][entity.tile.x] = FIRE;
						} else if (mapEntity.type === 'FireBall') {
							this.currentFloor.data[entity.tile.y][entity.tile.x] = FIRE_BALL;
						} else if (mapEntity.type === 'Key') {
							this.currentFloor.data[entity.tile.y][entity.tile.x] = KEY;
						}
					}
				}
			}

			if (ig.game.map.currentFloor.tilesetName !== "media/floor.png") return;

			// create Entities depending on the defined tile value. 
			// That's is not good at all!
			// TODO: this should be changed
			var mapAbove = (this.z - 1) >= 0 ? this.floors[this.z - 1]: null;
			var fireBallDelay = 0;
			for (i = 0; i < this.currentFloor.data.length; i++) {
				for (var j = 0; j < this.currentFloor.data[i].length; j++) {
					var value = this.currentFloor.data[i][j];
					var entityClassName = undefined;
					var settings = {};
					if (value === TILE) {
						entityClassName = 'Tile';
					} else if (value === GRASS) {
						entityClassName = 'Grass';
					} else if (value === ROCK) {
						entityClassName = 'Rock';
					} else if (value === KEY) {
						entityClassName = 'Key';
					} else if (value === FIRE) {
						entityClassName = 'Fire';
					} else if (value === MOVEABLE_WALL) {
						entityClassName = 'MovingWall';
						this.currentFloor.data[i][j] = 1;
					} else if (value === STAIRS_2) {
						entityClassName = 'Stairs';
					} else if (value === SAW) {
						entityClassName = 'Saw'; // Worm
						this.currentFloor.data[i][j] = 1;
					} else if (value === FIRE_BALL) {
						entityClassName = 'FireBall';
						if (fireBallDelay === 0) {
							fireBallDelay = i + j;
						}

						settings.delay = (i + j) - fireBallDelay;
					} else if (value === GUN) {
						entityClassName = 'Gun';
						this.currentFloor.data[i][j] = 1;
					} else {
						if (mapAbove && (mapAbove.data[i][j] === EXIT || mapAbove.data[i][j] === 7)) {
							entityClassName = 'Stairs';
							this.currentFloor.data[i][j] = 1;
						}
					}

					if (entityClassName) {
						var tx = (this.pos.x + j * ig.global.TILE_SIZE).floor();
						var ty = (this.pos.y + i * ig.global.TILE_SIZE).floor();
						var entity = ig.game.spawnEntity(entityClassName, tx, ty, settings);
						entity.mapDepth = this.z;
						entity.updateZIndex();
						entity.setVisible(true);

						this.currentFloor.entities.push(entity);
					}
				}
			}
		},

		isExit: function(tile) {
			var tile = this.getTileValue(tile);
			return this.currentFloor.tilesetName === TILESET_MAZE && tile === EXIT;
		},

		isAnExitAbove: function(tile) {
			if (this.z <= 0) return false;
			var tile = this.floors[this.z - 1].data[tile.y][tile.x];
			return this.currentFloor.tilesetName === TILESET_MAZE && tile === EXIT;
		},

		getTileValue: function(tile) {
			var map = this.currentFloor.data;
			if (map && tile.x >= 0 && tile.y >= 0 && tile.y < map.length && tile.x < map[tile.y].length) {
				return this.currentFloor.data[tile.y][tile.x];
			}
			return undefined;
		},

		setTileValue: function(tile, value) {
			var map = this.currentFloor.data;
			if (map && tile.x >= 0 && tile.y >= 0 && tile.y < map.length && tile.x < map[tile.y].length) {
				this.currentFloor.data[tile.y][tile.x] = value;
			}
			this.currentFloor.preRenderedChunks = null; // force the redraw
		},

		reset: function(x, y, settings) {
			this.parent(x, y, settings);
		},

		update: function() {
			this.parent();
			this.currentFloor.setScreenPos(-this.pos.x, -this.pos.y);

			this.solidMaps[this.z] = {}

			var entities = this.currentFloor.entities;
			var l = entities.length;
			while (l--) {
				var e = entities[l];
				if (e.solid) {
					this.solidMaps[this.z][e.tile.x + '_' + e.tile.y] = 1;
				}
			}
		},

		goDown: function() {
			if (this.z < this.floors.length) {
				ig.game.overlayDelay = 0.8;
				// remove entities from the previous level:
				this.currentFloor.setEntitiesVisible(false);
				this.z++;
				this.loadCurrentFloor();
			}
		},

		goUp: function() {
			if (this.z > 0) {
				ig.game.overlayDelay = 0.8;
				// remove entities from the previous level:
				this.currentFloor.setEntitiesVisible(false);
				this.z--;
				this.loadCurrentFloor();
			}
		},

		draw: function() {
			var mapAbove = (this.z - 1) >= 0 ? this.floors[this.z - 1]: null;

			this.currentFloor.setScreenPos(this.offset.x + ig.game._rscreen.x, this.offset.y + ig.game._rscreen.y);
			this.currentFloor.draw();
			this.drawCurrent();

			this.currentFloor.drawGround(this.pos, this.offset);
		},

		drawCurrent: function() {
			var gtx = this.currentFloor.ground.context;
			// draw the grid and shadow:
			gtx.clearRect(0, 0, this.currentFloor.ground.canvas.width, this.currentFloor.ground.canvas.height);
			gtx.beginPath();
			for (var i = 0; i < this.currentFloor.data.length; i++) {
				for (var j = 0; j < this.currentFloor.data[i].length; j++) {

					var tx = j * ig.global.TILE_SIZE;
					var ty = i * ig.global.TILE_SIZE;

					var value = this.currentFloor.data[i][j];
					if (value === TILE) {
						// shadow
						gtx.fillStyle = 'rgba(0, 0, 0, 0.1)';
						gtx.fillRect(tx, ty + 10, ig.global.TILE_SIZE, ig.global.TILE_SIZE);
						gtx.fillStyle = 'rgba(0, 0, 0, 0.2)';
						gtx.fillRect(tx, ty + 14, ig.global.TILE_SIZE, 10);
						gtx.fillStyle = 'rgba(0, 0, 0, 0.3)';
						gtx.fillRect(tx, ty + 10, ig.global.TILE_SIZE, 6);
					}
				}
			}
		}
	});
});
