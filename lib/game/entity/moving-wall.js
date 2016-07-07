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
		
		sfx: new ig.Sound('media/sfx/PUSHWALL_2_REVERB.*', false),

		animSheet: new ig.AnimationSheet('media/moveableWall.png', 16, 28),

		init: function(x, y, settings) {
			this.parent(x, y, settings);

			this.sfx.volume = 0.3;

			var animation = this.currentAnim = this.addAnim('sprite', 0.1, [0]);
			animation.flip.x = Math.random() > 0.5;

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

			if (this.vel.x != 0 || this.vel.y != 0) {
				if (!this.sfx.currentClip || this.sfx.currentClip.ended) {
					this.sfx.play();
				}
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
			if (this.onMap) {
				// restore the default collides in case it was overrided
				// @see Spikes::check
				this.collides = ig.Entity.COLLIDES.PASSIVE;
				if (!this.collideByPlayer) {
					this.snapToGrid('x');
					this.snapToGrid('y');
				}
			}

			this.collideByPlayer = false;
			this.collideByPlayerCountDown = this.collideByPlayerCountDown - ig.system.tick;
			if (this.collideByPlayerCountDown <= 0) {
				this.collideByPlayerCountDown = 0;
				this.collideByPlayer = false;
			}

		}
	});

});
