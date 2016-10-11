ig.module(
	'game.entity.static-man'
)
.requires(
	'game.engine.map-entity'
)
.defines(function(){

	StaticMan = MapEntity.extend({
		stressed: 0,
		animSheet: new ig.AnimationSheet('media/man.png', 12, 12),
		init: function(x, y, settings) {
			this.parent(x, y, settings);
			
			var animation = this.addAnim('sprite', 0.1, [0]);
			this.zPadding = 1;

			this.size.x = 6;
			this.size.y = 6;

			this.offset.x = 4;
			this.offset.y = 6;

			this.pos.x = x + (ig.global.TILE_SIZE - this.size.x) / 2;
			this.pos.y = y + (ig.global.TILE_SIZE - this.size.y) / 2;

			this.setSolidAsTile(true);
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
