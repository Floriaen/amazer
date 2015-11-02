ig.module(
	'game.entity.moving-wall-backup'
)
.requires(
    'game.entity.tile'
)
.defines(function(){

	PADDING = 0.1; // TODO padding has no effect ?

	MovingWallBackup = Tile.extend({
		collides: ig.Entity.COLLIDES.LITE,
		lastTile: {x: 0, y: 0},
		collideByPlayer: true,

		handleMovementTrace: function(res) {
			this.parent(res);
			return;


			/*
			if (!this.collideByPlayer && this.vel.x === 0 && this.vel.y === 0) {
				ig.log('FIXED');
				//this.collides = ig.Entity.COLLIDES.FIXED;
				this.collides = ig.Entity.COLLIDES.LITE
			}

			this.collideByPlayer = false;
			return;
			*/
			/*
				if (ig.game.man.isWaiting()) {
					this.snapToTile();
				} else {
					this.vel.x = ig.game.man.vel.x;
					this.vel.y = ig.game.man.vel.y;
				}
			} else {
				this.parent(res);
			}
			*/
		//	return;

/*
			if (this.collideByPlayer) {
				if (res.collision.x || res.collision.y) {
					this.snapToTile();
				} else {
					if (!ig.game.man.isWaiting()) {
						this.vel.x = ig.game.man.vel.x;
						this.vel.y = ig.game.man.vel.y;
					}

					if (this.vel.x > 0) {
						//ig.log(this.padding.x);
						if (this.tile.x == this.lastTile.x + 1 && this.padding.x < PADDING) {
							this.snapToTile();
						}
					} else if (this.vel.x < 0) {
						//ig.log(this.padding.x);
						if (this.tile.x == this.lastTile.x - 1 && this.padding.x < PADDING) {
							this.snapToTile();
						}
					}

					if (this.vel.y > 0) {
						//ig.log(this.padding.x);
						if (this.tile.y == this.lastTile.y + 1 && this.padding.y < PADDING) {
							this.snapToTile();
						}
					} else if (this.vel.y < 0) {
						//ig.log(this.padding.x);
						if (this.tile.y == this.lastTile.y - 1 && this.padding.y < PADDING) {
							this.snapToTile();
						}
					}
				}
			} else {
				this.parent(res);
			}
			*/


		},

		collideWith: function(other, axis) {
			if (other instanceof MovingWall) {
				this.snapToTile();
			} else if (other instanceof Man) {
				ig.log('LITE');
				this.collides = ig.Entity.COLLIDES.LITE,
				this.collideByPlayer = true;
			}
		},

		snapToTileX: function() {

		},

		snapToTileY: function() {

		},

		snapToTile: function() {
			this.vel.x = 0;
			this.vel.y = 0;
			this.pos.x = this.tile.x * ig.global.TILE_SIZE;
			this.pos.y = this.tile.y * ig.global.TILE_SIZE;
			this.lastTile.x = this.tile.x;
			this.lastTile.y = this.tile.y;
		},

		init: function(x, y, settings) {
			this.parent(x, y, settings);
			this.animSheet = new ig.AnimationSheet('media/moveableWall.png', 16, 28);
			this.currentAnim = this.addAnim('sprite', 0.1, [0]);
			this.snapToTile();

			this.friction.x = 10;
			this.friction.y = 10;
		},

		update: function() {
			this.parent();
			//ig.log(this.collideByPlayer);
			if (this.onMap) { // workaround
				// tile far from 1 tile distance from the player are solid to avoid wall collision overlaps
				var mx = ig.game.man.tile.x;
				var my = ig.game.man.tile.y;
				if ((mx >= this.tile.x - 1 && mx <= this.tile.x + 1) && (my >= this.tile.y - 1 && my <= this.tile.y + 1)) {
				//	ig.game.collisionMap.data[this.tile.y][this.tile.x] = 0;
				} else {
				//	ig.game.collisionMap.data[this.tile.y][this.tile.x] = 1;
				}

				if (this.collideByPlayer) {
					// get all the moving wall
					var movingWalls = ig.game.getEntitiesByType('MovingWall');
					var l = movingWalls.length;
					while (l--) {
						movingWalls[l].vel.x = this.vel.x;
						movingWalls[l].vel.y = this.vel.y;
					}
				}

			}
		}
	});

});
