ig.module(
	'game.entity.man'
)
.requires(
	'game.engine.map-entity',
	'game.engine.math',
	'game.entity.dust',

	'game.entity.death.burning',
	'game.entity.death.exploding',
	'game.entity.death.chopping',
	'game.entity.death.grinding'
)
.defines(function(){

	Man = MapEntity.extend({

		type: ig.Entity.TYPE.A,
		checkAgainst: ig.Entity.TYPE.NONE,
		collides: ig.Entity.COLLIDES.ACTIVE,

		canRunTimer: true,

		toTile: {x: 0, y: 0},

		hasMoved: false,

		death: 'Exploding',

		spawnSfxs: [
			new ig.Sound('media/sfx/RESPAWN_1.*', false),
			new ig.Sound('media/sfx/RESPAWN_2.*', false),
			new ig.Sound('media/sfx/RESPAWN_2_SHIFT.*', false)
		],

		canPlaySpawnSfx: true,

		canChangeFloor: false,

		animSheet: new ig.AnimationSheet('media/man.png', 12, 12),

		handleMovementTrace: function(res) {
			this.parent(res);
			if (this.isCurrentAnim('rising')) return;

			if (res.collision.x || res.collision.y) {
				this.snapToTile();
			} else if (!this.collideMovingWall) {
				// snap to tile when we reached the destination:
				if (this.tile.x === this.toTile.x) {
					this.snapToGrid('x');
				}

				if (this.tile.y === this.toTile.y) {
					this.snapToGrid('y');
				}

				// animations:
				if (this.vel.x > 0 || this.vel.x < 0 || this.vel.y > 0) {
					this.currentAnim = this.anims['walking_down'];
				} else if (this.vel.y < 0) {
					this.currentAnim = this.anims['walking_up'];
				} else {
					this.currentAnim = this.anims['waiting'];
				}
			}
		},

		collideWith: function(other, axis) {
			if (other instanceof MovingWall) {
				this.collideMovingWall = true;
			} else if (other instanceof Stairs) {
				this.canChangeFloor = true;
			}
		},

		snapToTile: function() {
			if (!this.isCurrentAnim('rising')) {
				this.currentAnim = this.anims['waiting'];
			}

			this.vel.x = 0;
			this.vel.y = 0;

			this.pos.x = this.tile.x * ig.global.TILE_SIZE;
			this.pos.y = this.tile.y * ig.global.TILE_SIZE;
			// for refactor
			this.setPosition(this.pos.x, this.pos.y);

			if (this.canRunTimer) {
				this.canRunTimer = false;
				this.timer.set(0.8); // begin the countdown
			}
		},

		isWaiting: function() {
			return this.vel.y == 0 && this.vel.x == 0;
		},

		init: function(x, y, settings) {
			this.parent(x, y, settings);

			this.size.x = 6;
			this.size.y = 6;

			this.offset.x = 4;
			this.offset.y = 6;

			this.speed = ig.global.TILE_SIZE * 2;

			this.addAnim('rising', 0.16, [10, 11, 12, 13, 0], true);

			this.addAnim('waiting', 0.4, [0]);
			this.addAnim('walking_up', 0.2, [4, 5, 6, 5]);
			this.addAnim('walking_down', 0.2, [0, 1, 2, 1]);

			this.timer = new ig.Timer();

			this.action = true;
			this.zPadding = 1.5;
			this.onMap = true;

			this.snapToTile();

			var dust = ig.game.spawnEntity('Dust', this.tile.x * ig.global.TILE_SIZE, this.tile.y * ig.global.TILE_SIZE);
			dust.setVisible(true);
		},

		setPosition: function(x, y) {
			this.pos.x = x;
			this.pos.y = y;

			this.pos.x = x + (ig.global.TILE_SIZE - this.size.x) / 2;
			this.pos.y = y + (ig.global.TILE_SIZE - this.size.y) / 2;

			this.updateTilePosition();
		},

		reset: function(x, y, settings) {
			this.parent(x, y, settings);
		},

		kill: function(by) {
			var x = this.pos.x;
			var y = this.pos.y;
			if (this.death === Man.BURNING && by) {
				x = by.tile.x * ig.global.TILE_SIZE + 4;
				y = by.tile.y * ig.global.TILE_SIZE - 2;
			}

			var death = ig.game.map.spawnEntity(this.death, x, y);
			death.zPadding = this.zPadding;
			death.onComplete = function() {
				by.visible = true;
			};

			this.canPlaySpawnSfx = true;
			this.parent();
		},

		goByTile: function(x, y) {
			var tx = this.tile.x + x;
			var ty = this.tile.y + y;
			if (ig.game.collisionMap.data[ty][tx] === 0) {
				this.vel.x = x * this.speed;
				this.vel.y = y * this.speed;

				this.toTile.x = tx;
				this.toTile.y = ty;
				
				return true;
			}
			return false;
		},

		update: function() {
			this.mapDepth = ig.game.map.z; // workaround, player is always visible (TODO move to Map instance)
			this.parent();

			this.canChangeFloor = false

			if (this.isCurrentAnim('rising')) {
				if (this.canPlaySpawnSfx) {
					this.canPlaySpawnSfx = false;
					var randomIndex = Math.floor(Math.random() * this.spawnSfxs.length);
					this.spawnSfxs[randomIndex].volume = 0.4;
					this.spawnSfxs[randomIndex].play();
				}

				if (this.doesAnimEnd('rising')) {
					this.setAnim('waiting');
				}
			} else {
				if (this.isWaiting()) {
					var willMove = false;

					if (ig.input.state('CANVAS_TOUCH')) {

						var mx = ((ig.input.mouse.x + this.size.x / 2) / ig.global.TILE_SIZE).floor();
						var my = ((ig.input.mouse.y + this.size.y / 2) / ig.global.TILE_SIZE).floor();

						var a = Math.atan2(my - this.tile.y, mx - this.tile.x);

						var PI = Math.PI;

						if ((a >= -PI / 4 && a < 0) || (a > 0 && a < PI / 4)) {
							willMove = this.goByTile(1, 0);
						} else if (a >= PI / 4 && a < (3 / 4) * PI) {
							willMove = this.goByTile(0, 1);
						} else if ((a >= (3 / 4) * PI && a < PI) || (a > -PI && a < -(3 / 4) * PI)) {
							willMove = this.goByTile(-1, 0);
						} else if (a >= -(3 / 4) * PI && a < -PI / 4) {
							willMove = this.goByTile(0, -1);
						} else if (a === PI) {
							willMove = this.goByTile(-1, 0);
						} else if (a === 0) {
							willMove = this.goByTile(1, 0);
						}

					} else {

						if (ig.input.state('RIGHT')) {
							willMove = this.goByTile(1, 0);
							this.nextMove = (this.nextMove === 'RIGHT') ? null: this.nextMove;
						} else if (ig.input.state('LEFT')) {
							willMove = this.goByTile(-1, 0);
							this.nextMove = (this.nextMove === 'LEFT') ? null: this.nextMove;
						} else if (ig.input.state('DOWN')) {
							willMove = this.goByTile(0, 1);
							this.nextMove = (this.nextMove === 'DOWN') ? null: this.nextMove;
						} else if (ig.input.state('UP')) {
							willMove = this.goByTile(0, -1);
							this.nextMove = (this.nextMove === 'UP') ? null: this.nextMove;
						}
					}

					if (willMove) {
						this.hasMoved = true;
						this.canRunTimer = true; // reset the action countdown:
						this.timer.reset();

						

					} else {
						// this.hasMoved prevent to switch to previous floor when restarting
						if (this.hasMoved && this.timer.tick() > 0 && this.timer.delta() > 0) {
							this.timer.pause();
							this.canChangeFloor = true;
						}

						if (this.canChangeFloor ) {
							if (ig.game.map.isExit(this.tile)) {
								ig.game.map.goDown();
							} else if (ig.game.map.isAnExitAbove(this.tile)) {
								ig.game.map.goUp();
							}
						}

						if (this.nextMove) {
							if (this.nextMove === 'RIGHT') {
								willMove = this.goByTile(1, 0);
							} else if (this.nextMove === 'LEFT') {
								willMove = this.goByTile(-1, 0);
							} else if (this.nextMove === 'DOWN') {
								willMove = this.goByTile(0, 1);
							} else if (this.nextMove === 'UP') {
								willMove = this.goByTile(0, -1);
							}
							this.nextMove = null;
						}
						
					}
				} else {
					var sfx = Man.walkSfxs[ig.game.map.currentFloor.typeOfFloor];
					sfx.volume = 0.6;
					if (!sfx.currentClip || sfx.currentClip.ended) {
						sfx.play();
					}
					// take in account the next move:
					if (ig.input.pressed('RIGHT')) {
						this.nextMove = (this.nextMove === '1RIGHT') ? null: 'RIGHT';
					} else if (ig.input.pressed('LEFT')) {
						this.nextMove = (this.nextMove === '1LEFT') ? null: 'LEFT';
					} else if (ig.input.pressed('DOWN')) {
						this.nextMove = (this.nextMove === '1DOWN') ? null: 'DOWN';
					} else if (ig.input.pressed('UP')) {
						this.nextMove = (this.nextMove === '1UP') ? null: 'UP';
					}
				}
			}
			this.collideMovingWall = false;
		}
	});

	Man.walkSfxs = {
		"grass": new ig.Sound('media/sfx/WALK_GRASS_ONESTEP.*', false),
		"rock": new ig.Sound('media/sfx/WALK_DUNGEON_ONESTEP.*', false)
	};

	// Used to know where to respawn, this is setup by the Map controller (map.js)
	Man.respawnAt = {x: 0, y: 0};

	Man.CHOPPING = 'Chopping';
	Man.BURNING = 'Burning';
	Man.EXPLODING = 'Exploding';
	Man.GRINDING = 'Grinding';
});
