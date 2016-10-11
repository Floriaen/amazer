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

		sfxSlide: new ig.Sound('media/sfx/PUSHWALL_2_REVERB.*', false),
		sfxReset: new ig.Sound('media/sfx/CRUSH_WALL_RESET_SLIDE.*', false),
		sfxImpact: new ig.Sound('media/sfx/CRUSH_WALL_RESET_IMPACT.*', false),
		
		animSheet: new ig.AnimationSheet('media/crushWall.png', 16, 28),

		init: function(x, y, settings) {
			this.parent(x, y, settings);

			this.currentAnim = this.addAnim('sprite', 0.1, [0]);
			this.currentAnim.flip.x = Math.random() > 0.5;

			var animation = this.addAnim('sprite1', 0.1, [1]);
			animation.flip.x = this.currentAnim.flip.x;

			this.maxVel.y = 80;
			this.active = true;

			// inherit from MapEntity, used for Man detection:
			this.direction = 'bottom';
			this.axis = 'x';

			this.vel.y = -100; // always try to go above

			// RESET_SLIDE | SLIDE | IMPACT
			this.canPlaySfx = 'SLIDE';
		},

		handleMovementTrace: function(res) {
			this.parent(res);
			if (res.collision.y) {

				this.vel.y = -100; // always try to go above

				if (this.canPlaySfx === 'IMPACT') {
					this.sfxImpact.stop();
					this.sfxImpact.play();
				}

				if (this.last.y >= this.pos.y) {
					this.canPlaySfx = 'SLIDE';
				} else {
					this.canPlaySfx = 'RESET_SLIDE';
				}
			}
		},

		update: function() {
			this.parent();
			if (this.onMap) {
				if (this.detect()) {
					this.vel.y = 200;

					this.canPlaySfx = 'IMPACT';
					if (!this.sfxSlide.currentClip || this.sfxSlide.currentClip.ended) {
						this.sfxSlide.play();
					}
				}

				if (this.canPlaySfx === 'RESET_SLIDE') {
					this.canPlaySfx = 'IMPACT';
					if (!this.sfxReset.currentClip || this.sfxReset.currentClip.ended) {
						this.sfxReset.play();
					}
				}
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
