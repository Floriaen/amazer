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
	'game.entity.worm',
	'game.entity.saw',
	'game.entity.gun'
)
.defines(function(){
	var EXIT = 2;
	var TILE = 3;
	var KEY = 4;
	var FIRE = 5;
	var END = 6;
	var STAIRS = 7;
	var MOVEABLE_WALL = 8;
	var EXIT_2 = 9;
	var STAIRS_2 = 10;
	//
	var SAW = 11;
	var WORM = 12;
	var FIRE_BALL = 13;
	var GUN = 15;

    Map = ig.Entity.extend({

		z: 0,
		maps: null,
		solidMaps: null,
		entities: {},

		init: function(x, y, settings) {
			this.parent(x, y, settings);
			this.originalPos = {x: x, y: y};
			this.zIndex = 0;

			this.canvas = ig.$new('canvas');
			this.context = this.canvas.getContext('2d');

			this.previousMapCanvas = ig.$new('canvas');
			this.previousMapCanvas.width = ig.system.width;
			this.previousMapCanvas.height = ig.system.height;
			this.previousMapContext = this.previousMapCanvas.getContext('2d');

			ig.System.SCALE.SMOOTH(this.canvas, this.context);
			ig.System.SCALE.SMOOTH(ig.system.canvas, ig.system.context);
		},

		loadLevel: function(level) {
			this.resetLevel();

			for (var i = 0; i < level.length; i++) {
				var backgroundMap = new ig.BackgroundMap(
					ig.global.TILE_SIZE,
					level[i],
					'media/floor.png'
				);
				backgroundMap.preRender = true;
				this.maps.push(backgroundMap);

				//var solidMap = this._getEmptySolidMap(backgroundMap.data.length);
				//this.solidMaps.push(solidMap)
				this.solidMaps.push({});
			}

			// set the Element size:
			var gridSize = this.maps[this.z].data.length;
			this.size.x = gridSize * ig.global.TILE_SIZE;
			this.size.y = gridSize * ig.global.TILE_SIZE;

			// load the first map:
			this.z = 0;
			this.loadCurrentMap();

			if (ig.game.man) {
				ig.game.man.setPosition(ig.global.TILE_SIZE, ig.global.TILE_SIZE);
			}
		},

		_getEmptySolidMap: function(size) {
			var solidMap = [];
			for (var i = 0; i < size; i++) {
				solidMap[i] = [];
				for (var i = 0; i < size; i++) {
					solidMap[i] = 0;
				}
			}
			return solidMap;
		},

		resetLevel: function() {
			for (var idx in this.entities) {
				var l = this.entities[idx].length;
				while (l--) {
					ig.game.removeEntity(this.entities[idx][l]);
				}
			}
			this.entities = {};
			this.z = 0;
			this.maps = [];
			this.solidMaps = [];
			ig.game.collisionMap = ig.CollisionMap.staticNoCollision; // default
		},

		loadCurrentMap: function(z) {

			//ig.log('Load current map', this.z);

			var map = this.maps[this.z];
			var collisionMap = []; // TODO have a static array somewhere
			for (var i = 0; i < map.data.length; i++) {
				collisionMap[i] = [];
				for (var j = 0; j < map.data[i].length; j++) {
					var value = map.data[i][j];
					collisionMap[i][j] = (value === TILE || value === 0 || value === GUN) ? 1: 0;
				}
			}
			ig.game.collisionMap = new ig.CollisionMap(ig.global.TILE_SIZE, collisionMap);

			if (!this.entities[this.z]) {

				this.entities[this.z] = [];
				var mapAbove = (this.z - 1) >= 0 ? this.maps[this.z - 1]: null;
				var mapAbove2 = (this.z - 2) >= 0 ? this.maps[this.z - 2]: null;

				var fireBallDelay = 0;
				for (var i = 0; i < map.data.length; i++) {
					for (var j = 0; j < map.data[i].length; j++) {
						var value = map.data[i][j];
						var entityClassName = undefined;
						var settings = {};
						if (value === TILE) {
							entityClassName = 'Tile';
						} else if (value === KEY) {
							entityClassName = 'Key';
						} else if (value === EXIT) {
							entityClassName = 'Hatch';
						} else if (value === EXIT_2) {
							entityClassName = 'Hatch'; // TODO another color?
						} else if (value === FIRE) {
							entityClassName = 'Fire';
						} else if (value === MOVEABLE_WALL) {
							entityClassName = 'MovingWall';
							map.data[i][j] = 1;
						} else if (value === STAIRS_2) {
							entityClassName = 'Stairs';
						} else if (value === SAW) {
							entityClassName = 'Saw'; // Worm
							map.data[i][j] = 1;
						} else if (value === FIRE_BALL) {
							entityClassName = 'FireBall';
							if (fireBallDelay === 0) {
								fireBallDelay = i + j;
							}

							settings.delay = (i + j) - fireBallDelay;
							//ig.log(settings.delay, i, j, fireBallDelay);
							//map.data[i][j] = 1;
						} else if (value === GUN) {
							entityClassName = 'Gun';
							//map.data[i][j] = 1;
						} else {
							if (mapAbove && mapAbove.data[i][j] === EXIT) {
								entityClassName = 'Stairs';
								map.data[i][j] = STAIRS;
							}
						}

						if (entityClassName) {
							var tx = (this.pos.x + j * ig.global.TILE_SIZE).floor();
							var ty = (this.pos.y + i * ig.global.TILE_SIZE).floor();
							//ig.log('spawnEntity', entityClassName);
							var entity = ig.game.spawnEntity(entityClassName, tx, ty, settings);
							entity.mapDepth = this.z;
							entity.updateZIndex();
							entity.setVisible(true);
							this.entities[this.z].push(entity);
						}
					}
				}
			} else {

				var l = this.entities[this.z].length;
				while (l--) {
					var e = this.entities[this.z][l];
					e.setVisible(true);
				}
			}

			ig.game.sortEntitiesDeferred();
		},

		isSolid: function(tile) {
			var value = this.getTileValue(tile);
			//return value === TILE || value === undefined;
			return false;
		},

		isExit: function(tile) {
			return this.getTileValue(tile) === EXIT;
		},

		tryMovingFloor: function(tile) {
			var tileValue = this.getTileValue(tile);
			switch (tileValue) {
				case STAIRS_2:
					this.goFloor(-2); // 2 floors above
				break;
				case EXIT_2:
					this.goFloor(2); // 2 floor down
				break;
			}
		},

		isAnExitAbove: function(tile) {
			if (this.z <= 0) return false;
			return this.maps[this.z - 1].data[tile.y][tile.x] === EXIT;
		},

		isLevelEnd: function(tile) {
			return this.getTileValue(tile) === END;
		},

		getTileValue: function(tile) {
			var map = this.maps[this.z].data;
			if (map && tile.x >= 0 && tile.y >= 0 && tile.y < map.length && tile.x < map[tile.y].length) {
				return this.maps[this.z].data[tile.y][tile.x];
			}
			return undefined;
		},

		reset: function(x, y, settings) {
			this.parent(x, y, settings);
		},

		update: function() {
			this.parent();
			var map = this.maps[this.z];
			if (map) {
				map.setScreenPos(-this.pos.x, -this.pos.y);
			}

			this.solidMaps[this.z] = {}
			var l = this.entities[this.z].length;
			while (l--) {
				var e = this.entities[this.z][l];
				if (e.solid) {
					this.solidMaps[this.z][e.tile.x + '_' + e.tile.y] = 1;
				}
			}
		},

		goFloor: function(level) {
			if (this.z + level > 0 && this.z + level < this.maps.length) {
				// remove entities from the previous level:
				var l = this.entities[this.z].length;
				while (l--) {
					var e = this.entities[this.z][l];
					e.setVisible(false);
				}

				this.z += level;
				this.loadCurrentMap();
			}
		},

		goDown: function() {
			if (this.z < this.maps.length) {
				// remove entities from the previous level:
				var l = this.entities[this.z].length;
				while (l--) {
					var e = this.entities[this.z][l];
					e.setVisible(false);
				}

				this.z++;
				this.loadCurrentMap();
			}
		},

		goUp: function() {
			if (this.z > 0) {

				// remove entities from the previous level:
				var l = this.entities[this.z].length;
				while (l--) {
					var e = this.entities[this.z][l];
					e.setVisible(false);
				}
				this.z--;
				this.loadCurrentMap();
			}
		},

		draw: function() {
			/*
			ig.system.context.globalAlpha = 0.5
			ig.system.context.drawImage(
				this.previousMapCanvas, 0, 100);

				//(this.pos.x * ig.system.scale),
				//(this.pos.y * ig.system.scale) + 100,
				//(this.canvas.width * ig.system.scale),
				//(this.canvas.height * ig.system.scale)
			);
			ig.system.context.globalAlpha = 1
			*/

			this.drawCurrent();
		},

        drawCurrent: function() {
			var mapAbove = (this.z - 1) >= 0 ? this.maps[this.z - 1]: null;
			var map = this.maps[this.z];
			map.setScreenPos(this.offset.x + ig.game._rscreen.x, this.offset.y + ig.game._rscreen.y);
			map.draw();

			this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

			// draw the grid and shadow:
			this.context.beginPath();
			for (var i = 0; i < map.data.length; i++) {
				for (var j = 0; j < map.data[i].length; j++) {

					var tx = j * ig.global.TILE_SIZE;
					var ty = i * ig.global.TILE_SIZE;

					var value = map.data[i][j];
					if (value === TILE || value === STAIRS || value === STAIRS_2) {
						// shadow
						this.context.fillStyle = 'rgba(0, 0, 0, 0.6)';
						this.context.fillRect(tx, ty + 10, ig.global.TILE_SIZE, ig.global.TILE_SIZE);
						this.context.fillStyle = 'rgba(0, 0, 0, 0.7)';
						this.context.fillRect(tx, ty + 16, ig.global.TILE_SIZE, 8);
						this.context.fillStyle = 'rgba(0, 0, 0, 0.9)';
						this.context.fillRect(tx, ty + 16, ig.global.TILE_SIZE, 4);
					}
				}
			}

			ig.system.context.globalAlpha = 0.5;
			ig.system.context.drawImage(
				this.canvas,
				(this.pos.x - this.offset.x - ig.game._rscreen.x) * ig.system.scale,
				(this.pos.y - this.offset.y - ig.game._rscreen.y) * ig.system.scale,
				(this.canvas.width * ig.system.scale),
				(this.canvas.height * ig.system.scale)
			);
			ig.system.context.globalAlpha = 1;
		}

	});
});
