ig.module(
	'game.entity.fire-ball'
)
.requires(
	'game.engine.map-entity'
)
.defines(function(){

	FireBall = MapEntity.extend({

		type: ig.Entity.TYPE.B,
		checkAgainst: ig.Entity.TYPE.A,
		collides: ig.Entity.COLLIDES.NONE,

		sfx: new ig.Sound('media/sfx/JUMPFLAME_1_7.*', true),

		init: function(x, y, settings) {
			this.parent(x, y, settings);

			this.sfx.volume = 0.3;

			this.pos.x += 4;
			this.pos.y += 4;

			this.offset.y = 10;
			this.offset.x = 1;

			this.size.x = 8;
			this.size.y = 8;

			this.zPadding = 1;

			this.animSheet = new ig.AnimationSheet('media/fireball.png', 12, 16);
			this.addAnim('get-up', 0.1, [0, 1, 2, 3, 4, 5, 6], true);
			this.addAnim('get-down', 0.1, [6, 7, 8, 9, 10, 11], true);

			this.timer = new ig.Timer();

			var delay = settings.delay;
			this.timer.set(delay);
			this.currentAnim = null;
			this.checkAgainst = ig.Entity.TYPE.NONE;
		},

		update: function() {
			this.parent();
			if (this.onMap) {
				this.timer.unpause();
				// there is something solid on it:
				if (ig.game.map.solidMaps[ig.game.map.z][this.tile.x + '_' + this.tile.y]) {
					this.currentAnim = null;
				} else {
					if (this.isCurrentAnim('get-up') && this.doesAnimEnd('get-up')) {
						this.anims['get-down'].rewind();
						this.setAnim('get-down');
					} else if (this.isCurrentAnim('get-down') && this.doesAnimEnd('get-down')) {
						this.currentAnim = null;
						this.timer.set(2.2);
						this.checkAgainst = ig.Entity.TYPE.NONE;
					}

					if (!this.currentAnim && this.timer.delta() > 0) {
						this.checkAgainst = ig.Entity.TYPE.A;
						this.anims['get-up'].rewind();
						this.setAnim('get-up');

						this.sfx.stop();
						this.sfx.play();
					}
				}
			} else {
				this.timer.pause();
			}
		},

		check: function(other) {
			// other is the player
			if (other instanceof Man) {
				this.visible = false;
				other.death = Man.BURNING;
				other.kill(this);
			}
		}
	});

});
