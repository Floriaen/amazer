ig.module(
	'game.entity.exit'
)
.requires(
	'game.engine.map-entity'
)
.defines(function(){

	Exit = MapEntity.extend({

		type: ig.Entity.TYPE.B,
		checkAgainst: ig.Entity.TYPE.A,

		init: function(x, y, settings) {
			this.parent(x, y, settings);

			this.pos.x += 7;
			this.pos.y += 7;

			this.offset.x = 7;
			this.offset.y = 7;

			this.size.x = 2;
			this.size.y = 2;

			this.animSheet = new ig.AnimationSheet('media/exit.png', 16, 16);
			this.addAnim('deactivate', 0.1, [0]);
			this.addAnim('activate', 0.1, [1, 2], true);
			this.addAnim('burning', 0.2, [2, 4], true);

			if (this.activated) {
				this.anims['burning'].rewind();
				this.setAnim('burning');
			}
		},

		update: function() {
			this.parent();
			if (this.isCurrentAnim('deactivate') && ig.game.key) {
				this.setAnim('activate');
			}

			if (this.isCurrentAnim('activate') && this.doesAnimEnd('activate')) {
				this.anims['burning'].rewind();
				this.setAnim('burning');
			}
		},

		check: function(other) {
			if (ig.game.key && other instanceof Man) {
				ig.game.key = null;
				ig.game.levelUp();
			}
		}

	});

});
