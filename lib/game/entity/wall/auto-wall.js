ig.module(
	'game.entity.wall.auto-wall'
)
.requires(
    'game.entity.tile'
)
.defines(function(){

	AutoWall = Tile.extend({

		collides: ig.Entity.COLLIDES.FIXED,
		lastTile: {x: 0, y: 0},
		solid: true,

		init: function(x, y, settings) {
			this.parent(x, y, settings);
			this.animSheet = new ig.AnimationSheet('media/moveableWall.png', 16, 28);
			this.currentAnim = this.addAnim('sprite', 0.1, [0]);
		},

		goToTile: function(tile) {
			this.tween(
				{
					pos: {
						x: tile.x * ig.global.TILE_SIZE,
						y: tile.y * ig.global.TILE_SIZE
					}
				}, 1 ).start();
		}
/*
		collideWith: function(other, axis) {
			if (other instanceof Man) {
				this.collideByPlayer = true;
				other.vel.x = 0;
				other.vel.y = 0;
			}
		},

		update: function() {
			this.parent();
			//ig.game.collisionMap.data[this.tile.y][this.tile.x] = 0;
			if (this.onMap) {

				// tile far from 1 tile distance from the player are solid to avoid wall collision overlaps
				var mx = ig.game.man.tile.x;
				var my = ig.game.man.tile.y;
				if ((mx >= this.tile.x - 1 && mx <= this.tile.x + 1) && (my >= this.tile.y - 1 && my <= this.tile.y + 1)) {
					ig.game.collisionMap.data[this.tile.y][this.tile.x] = 0;
				} else {
					ig.game.collisionMap.data[this.tile.y][this.tile.x] = 1;
				}

				if (!this.collideByPlayer) {
					//ig.game.collisionMap.data[this.tile.y][this.tile.x] = 1;
					this.snapToGrid('x');
					this.snapToGrid('y');
				}

			}

			this.collideByPlayer = false;
		} */
	});

});
