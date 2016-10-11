ig.module(
	'game.entity.spike'
)
.requires(
	'game.engine.map-entity',
	'game.entity.flush'
)
.defines(function(){

	Spike = MapEntity.extend({
		type: ig.Entity.TYPE.B,
		checkAgainst: ig.Entity.TYPE.A,

		sfx: new ig.Sound('media/sfx/TERROR_SPIKE_2.*', false),
		animSheet: new ig.AnimationSheet('media/spike.png', 16, 32),

		init: function(x, y, settings) {
			this.parent(x, y, settings);

			this.zPadding = 1;
			this.offset.y = 20;

			this.addAnim('get-up', 0.03, [0, 1, 2, 3, 4, 5, 6], true);
			this.addAnim('get-down', 0.03, [5, 4, 3, 2, 1, 0], true);

			this.pauseDelay = this.pauseDelay || 1.6;

			this.timer = new ig.Timer();

			this.delay = this.delay || 0;
			this.timer.set(this.delay);
			this.currentAnim = null;
			this.reinitAnim = true;
			this.checkAgainst = ig.Entity.TYPE.NONE;
		},

		update: function() {
			this.parent();
			if (this.onMap) {
				this.timer.unpause();
				if (!this.reinitAnim && this.isCurrentAnim('get-up') && this.doesAnimEnd('get-up')) {
					this.reinitAnim = false;
					this.anims['get-down'].rewind();
					this.setAnim('get-down');

				} else if (!this.reinitAnim && this.isCurrentAnim('get-down')) {
					if (this.doesAnimEnd('get-down')) {
						this.reinitAnim = true;
						this.timer.set(this.pauseDelay);
						this.checkAgainst = ig.Entity.TYPE.NONE;
					} else if (this.flush === null && this.currentAnim.frame === 4) {
						this.flush = ig.game.map.spawnEntity('Flush', this.pos.x, this.pos.y - ig.global.TILE_SIZE - 2);
						this.flush.zPadding = this.zPadding + 3;
					}
				}

				if (this.reinitAnim && this.timer.delta() > 0) {
					this.reinitAnim = false;
					this.currentAnim = null;

					this.checkAgainst = ig.Entity.TYPE.A;
					this.anims['get-up'].rewind();
					this.setAnim('get-up');

					this.sfx.play();

					this.flush = null;
				}
			} else {
				this.timer.pause();
			}
		},

		check: function(other) {
			if (other instanceof Man) {
				other.death = Man.EXPLODING;
				other.kill();
			}
		}
	});

});
