ig.module(
	'game.entity.altar'
)
.requires(
	'game.engine.map-entity'
)
.defines(function(){

	Altar = MapEntity.extend({
		stressed: 0,
		init: function(x, y, settings) {
			this.parent(x, y, settings);
			
			this.animSheet = new ig.AnimationSheet('media/altar.png', 16, 28);
			var animation = this.addAnim('sprite', 0.1, [0]);
			animation.flip.x = Math.random() > 0.5;

			this.offset.y = 12;

			this.size.x = ig.global.TILE_SIZE;
			this.size.y = ig.global.TILE_SIZE;

			this.zPadding = 1;
		},

		draw: function() {
			if (this.stressed > 0) {
				var r = this.stressed - Math.random() * (this.stressed * 2);
				var scale = ig.system.scale;
				ig.system.scale += r;
			}

			this.parent();

			if (this.stressed > 0) {
				ig.system.scale = scale;
			}
		}
	});
});
