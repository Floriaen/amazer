ig.module(
	'game.entity.crypt'
)
.requires(
	'game.engine.map-entity'
)
.defines(function(){

	Crypt = MapEntity.extend({
		
		animSheet: new ig.AnimationSheet('media/crypt.png', 16, 32),

		init: function(x, y, settings) {
			this.parent(x, y, settings);

			this.zPadding = 1;

			this.offset.y = 16;
			this.size.x = ig.global.TILE_SIZE;
			this.size.y = ig.global.TILE_SIZE;

			this.addAnim('current', 0.1, [0]);
		}
	});

});
