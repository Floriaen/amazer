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

			this.size.x = 16;
			this.size.y = 16;

			this.animSheet = new ig.AnimationSheet('media/exit.png', 16, 16);
			this.addAnim('deactivate', 0.1, [0]);
			this.addAnim('activate', 0.1, [1, 2], true);
		//	this.addAnim('burning', 0.2, [2, 3, 4, 3]);
		},

		update: function() {
			this.parent();
			if (this.isCurrentAnim('deactivate') && ig.game.hasKey) {
				this.setAnim('activate');
			}
/*
			if (this.isCurrentAnim('activate') && this.doesAnimEnd('activate')) {
				this.anims['burning'].rewind();
				this.setAnim('burning');
			}
			*/
		},

		check: function(other) {
			if (ig.game.hasKey && other instanceof Man) {
				ig.game.hasKey = false;
				ig.game.levelUp();
			}
		}

	});

});
