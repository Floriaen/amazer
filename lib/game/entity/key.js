ig.module(
	'game.entity.key'
)
.requires(
	'game.engine.map-entity'
)
.defines(function(){

	Key = MapEntity.extend({

		type: ig.Entity.TYPE.B,
		checkAgainst: ig.Entity.TYPE.A,
		collides: ig.Entity.COLLIDES.NONE,

		init: function(x, y, settings) {
			this.parent(x, y, settings);

			this.sfx = Key.sfxs[Math.floor(Math.random() * 4)];
			this.sfx.volume = 0.4;

			this.pos.x += 4;
			this.pos.y += 2;

			this.offset.y = 4;

			this.size.x = 8;
			this.size.y = 12;

			this.zPadding = 1.4;

			//this.animSheet = new ig.AnimationSheet('media/key.png', 8, 8);
			this.animSheet = new ig.AnimationSheet('media/key.png', 8, 12);
			this.addAnim('current', 0.3, [0, 1]);
		},

		check: function(other) {
			if (other instanceof Man) {
				ig.game.key = this;
				if (!this.sfx.currentClip || this.sfx.currentClip.ended) {
					this.sfx.play();
				}
			}
		}
	});

	Key.sfxs = [
		new ig.Sound('media/sfx/KEY_1.*', false),
		new ig.Sound('media/sfx/KEY_2.*', false),
		new ig.Sound('media/sfx/KEY_3.*', false),
		new ig.Sound('media/sfx/KEY_4.*', false)
	];

});
