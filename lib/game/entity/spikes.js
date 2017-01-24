ig.module(
	'game.entity.spikes'
)
.requires(
	'game.engine.map-entity',
	'game.entity.flush'
)
.defines(function(){

	Spikes = MapEntity.extend({
		type: ig.Entity.TYPE.B,
		checkAgainst: ig.Entity.TYPE.A,

		animSheet: new ig.AnimationSheet('media/spikes.png', 16, 28),

		init: function(x, y, settings) {
			this.parent(x, y, settings);

			this.zPadding = 1;

			this.pos.x += 2;
			this.pos.y += 2;

			this.offset.y = 14;
			this.offset.x = 2;

			this.size.x = 12;
			this.size.y = 12;

			this.addAnim('get-up', 0.08, [0, 1, 2, 3, 4, 5, 6, 7], true);
			this.addAnim('get-down', 0.05, [7, 6, 5, 4, 3, 2, 1, 0], true);

			this.timer = new ig.Timer();

			var delay = settings.delay || 0;
			this.timer.set(delay);
			this.currentAnim = null;
			this.reinitAnim = true;
			//this.checkAgainst = ig.Entity.TYPE.NONE;

			this.canKillMan = false;
		},

		update: function() {
			this.parent();
			if (this.onMap) {
				if (!this.reinitAnim && this.isCurrentAnim('get-up') && this.doesAnimEnd('get-up')) {
					this.reinitAnim = false;

					this.anims['get-down'].rewind();
					this.setAnim('get-down');

				} else if (!this.reinitAnim && this.isCurrentAnim('get-down')) {

					if (this.doesAnimEnd('get-down')) {
						this.reinitAnim = true;
						this.timer.set(1.6);
						//this.checkAgainst = ig.Entity.TYPE.NONE;
						this.canKillMan = false;
					} else if (this.flush === null && this.currentAnim.frame === 5) {
						this.flush = ig.game.map.spawnEntity('Flush', this.pos.x, this.pos.y - ig.global.TILE_SIZE);
						this.flush.zPadding = this.zPadding + 1;
					}

				}

				if (this.reinitAnim && this.timer.delta() > 0) {

					this.reinitAnim = false;
					this.currentAnim = null;

					this.checkAgainst = ig.Entity.TYPE.A;
					this.canKillMan = true;

					this.anims['get-up'].rewind();
					this.setAnim('get-up');

					this.flush = null;
				}

				if (this.isCurrentAnim('get-up') && this.currentAnim.frame === 2) {
					if (!Spikes.sfx.currentClip || Spikes.sfx.currentClip.ended) {
						Spikes.sfx.play();
					}
				}
			}
		},

		check: function(other) {
			// Spikes must block MovingWall
			if (other instanceof MovingWall) {
				this.collides = ig.Entity.COLLIDES.FIXED;
				other.collides = ig.Entity.COLLIDES.LITE;
			} else {
				this.collides = ig.Entity.COLLIDES.NEVER;
			}

			if (this.canKillMan && other instanceof Man) {
				other.death = Man.EXPLODING;
				other.kill();
			}
		}
	});

	Spikes.sfx = new ig.Sound('media/sfx/SPIKE TRAP_3.*', false);
	Spikes.sfx.volume = 0.2;

});
