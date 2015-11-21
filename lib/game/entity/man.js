ig.module(
	'game.entity.man'
)
.requires(
	'game.engine.map-entity',
	'game.engine.math',

	'game.entity.death.burning',
	'game.entity.death.exploding',
	'game.entity.death.chopping'
)
.defines(function(){

	Man = MapEntity.extend({

		type: ig.Entity.TYPE.A,
		checkAgainst: ig.Entity.TYPE.NONE,
		collides: ig.Entity.COLLIDES.ACTIVE,

		hasKey: false,

		canRunTimer: true,

		//lastTile: {x: 0, y: 0},
		toTile: {x: 0, y: 0},

		death: 'Exploding',

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
/*
			if (this.isWaiting()) {
				this.currentAnim = this.anims['waiting'];
				if (this.canRunTimer) {
					this.canRunTimer = false;
					this.timer.set(0.4); // begin the countdown
				}
			}
			*/
		},

		collideWith: function(other, axis) {
			if (other instanceof MovingWall) {
				this.collideMovingWall = true;
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
				this.timer.set(0.6); // begin the countdown
			}
		},

		isWaiting: function() {
			return this.vel.y == 0 && this.vel.x == 0;// && this.tile.x === this.toTile.x && this.tile.y === this.toTile.y;
		},

		init: function(x, y, settings) {
			this.parent(x, y, settings);

			this.size.x = 6;
			this.size.y = 6;

			this.offset.x = 4;
			this.offset.y = 6;

			this.speed = ig.global.TILE_SIZE * 2;

			this.animSheet = new ig.AnimationSheet('media/man.png', 12, 12);
			this.addAnim('rising', 0.16, [10, 11, 12, 13, 0], true);

			this.addAnim('waiting', 0.4, [0, 3]);
			this.addAnim('walking_up', 0.2, [4, 5, 6, 5]);
			this.addAnim('walking_down', 0.2, [0, 1, 2, 1]);

			this.timer = new ig.Timer();
			//this.countDown = null;

			this.action = true;
			this.zPadding = 1;
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
		},

		reset: function(x, y, settings) {
			this.parent(x, y, settings);
		},

		collideWith: function(other, axis) {
			if (other instanceof MovingWall) {
				//this.vel[axis] = 0;
				//this.snapToTile();
			}
		},

		kill: function() {
			var death = ig.game.spawnEntity(this.death, this.pos.x, this.pos.y);
			death.setVisible(true);
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

			if (this.isCurrentAnim('rising')) {
				if (this.doesAnimEnd('rising')) {
					this.setAnim('waiting');
				}
			} else {
				if (this.isWaiting()) {
					var willMove = false;
					if (ig.input.state('RIGHT')) {
						willMove = this.goByTile(1, 0);
					} else if (ig.input.state('LEFT')) {
						willMove = this.goByTile(-1, 0);
					} else if (ig.input.state('DOWN')) {
						willMove = this.goByTile(0, 1);
					} else if (ig.input.state('UP')) {
						willMove = this.goByTile(0, -1);
					}

					if (willMove) {
						// reset the action countdown:
						this.canRunTimer = true;
						this.timer.reset();

					} else {

						if (this.timer.tick() > 0 && this.timer.delta() > 0) {
							this.timer.pause();

							if (ig.game.map.isExit(this.tile)) {
								ig.game.map.goDown();
							} else if (ig.game.map.isAnExitAbove(this.tile)) {
								ig.game.map.goUp();
							} else if (ig.game.map.isLevelEnd(this.tile)) {
								if (this.hasKey) {
									this.hasKey = false;
									ig.game.levelUp();
								}
							} else {
								ig.game.map.tryMovingFloor(this.tile);
							}
						}
					}
				}
			}
			this.collideMovingWall = false;
		}
	});

	Man.CHOPPING = 'Chopping';
	Man.BURNING = 'Burning';
	Man.EXPLODING = 'Exploding';
});
