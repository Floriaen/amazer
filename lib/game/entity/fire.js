ig.module(
	'game.entity.fire'
)
.requires(
	'game.engine.map-entity'
)
.defines(function(){

	Fire = MapEntity.extend({
		type: ig.Entity.TYPE.B,
		checkAgainst: ig.Entity.TYPE.A,

		init: function(x, y, settings) {
			this.parent(x, y, settings);

			this.pos.x += 4;
			this.pos.y += 4;

			this.offset.y = 9;
			this.offset.x = 5;

			this.size.x = 8;
			this.size.y = 8;

			this.animSheet = new ig.AnimationSheet('media/fire.png', 16, 16);
			var animation = this.addAnim('current', 0.2, [0, 1, 2, 3]);
			//animation.flip.x = Math.random() > 0.5;

			this.currentAnim.gotoRandomFrame();
			this.zPadding = 1;
		},

		update: function() {
			this.parent();
			if (this.onMap) {
				if (ig.game.map.solidMaps[ig.game.map.z][this.tile.x + '_' + this.tile.y]) {
					ig.game.map.setTileValue(this.tile, 1); // remove the halo
					this.kill();
				}
			}
		},

		check: function(other) {
			if (other instanceof Man) {
				other.death = Man.BURNING;
				other.kill(this);
				//this.kill();
			}
		}
	});

});
