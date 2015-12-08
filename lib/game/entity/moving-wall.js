ig.module(
	'game.entity.moving-wall'
)
.requires(
    'game.entity.tile'
)
.defines(function(){

	MovingWall = Tile.extend({
		type: ig.Entity.TYPE.A,
		collides: ig.Entity.COLLIDES.PASSIVE,
		lastTile: {x: 0, y: 0},
		collideByPlayer: true,
		solid: true,

		init: function(x, y, settings) {
			this.parent(x, y, settings);
			this.animSheet = new ig.AnimationSheet('media/moveableWall.png', 16, 28);
			this.currentAnim = this.addAnim('sprite', 0.1, [0]);

			this.friction.x = 1;
			this.friction.y = 1;
			this.collideByPlayerCountDown = 0;
		},

		handleMovementTrace: function(res) {
			this.parent(res);

			var pushVelocity = 40;
			if (this.vel.y > 0) {
				this.vel.y = pushVelocity;
			} else if (this.vel.y < 0) {
				this.vel.y = - pushVelocity;
			}

			if (this.vel.x > 0) {
				this.vel.x = pushVelocity;
			} else if (this.vel.x < 0) {
				this.vel.x = - pushVelocity;
			}
			
		},

		collideWith: function(other, axis) {
			if (other instanceof Man) {
				this.collideByPlayer = true;
				if (this.collideByPlayerCountDown === 0) {
					this.collideByPlayerCountDown = 1;
				}

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
					//ig.game.collisionMap.data[this.tile.y][this.tile.x] = 0;
				} else {
					//ig.game.collisionMap.data[this.tile.y][this.tile.x] = 1;
				}

				if (!this.collideByPlayer) {
					//ig.game.collisionMap.data[this.tile.y][this.tile.x] = 1;
					this.snapToGrid('x');
					this.snapToGrid('y');
				}
			}

			this.collideByPlayer = false;

			this.collideByPlayerCountDown = this.collideByPlayerCountDown - ig.system.tick;
			//console.log(this.collideByPlayerCountDown);
			if (this.collideByPlayerCountDown <= 0) {
				this.collideByPlayerCountDown = 0;
				this.collideByPlayer = false;
			}

		}
	});

});
