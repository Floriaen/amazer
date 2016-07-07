ig.module(
	'game.entity.wall.crush-wall'
)
.requires(
	'game.entity.tile'
)
.defines(function(){

	CrushWall = Tile.extend({

		collides: ig.Entity.COLLIDES.FIXED,
		type: ig.Entity.TYPE.B,
		checkAgainst: ig.Entity.TYPE.BOTH,

		lastTile: {x: 0, y: 0},
		solid: true,
		vision: 4,

		sfx: new ig.Sound('media/sfx/PUSHWALL_2_REVERB.*', false),
		
		animSheet: new ig.AnimationSheet('media/crushWall.png', 16, 28),

		init: function(x, y, settings) {
			this.parent(x, y, settings);

			
			this.currentAnim = this.addAnim('sprite', 0.1, [0]);
			this.currentAnim.flip.x = Math.random() > 0.5;

			var animation = this.addAnim('sprite1', 0.1, [1]);
			animation.flip.x = this.currentAnim.flip.x;

			this.maxVel.y = 80;
			this.active = true;

			this.direction = 'bottom';
			this.axis = 'x';

			this.canCrush = true;
			this.vel.y = -100;
		},

		handleMovementTrace: function(res) {
			this.parent(res);
			if (res.collision.y) {
				this.canCrush = this.vel.y <= 0;
				this.vel.y = -100;
			}
		},

		update: function() {
			this.parent();
			if (this.canCrush && this.detect()) {
				if (!this.sfx.currentClip || this.sfx.currentClip.ended) {
					this.sfx.play();
				}
				this.vel.y = 200;
			}
		},

		check: function(other) {
			if (this.vel.y != 0 && other instanceof Man) {
				this.setAnim('sprite1');
				other.death = Man.EXPLODING;
				other.kill(this);
			}
		}
	});
});
