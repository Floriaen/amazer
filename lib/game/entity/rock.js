ig.module(
	'game.entity.rock'
)
.requires(
	'game.engine.map-entity'
)
.defines(function(){

	Rock = MapEntity.extend({
		
		stressed: 0,
		animSheet: new ig.AnimationSheet('media/rock.png', 16, 28),

		init: function(x, y, settings) {
			this.parent(x, y, settings);

			var animation = this.addAnim('sprite', 0.1, [2]);//Math.round(Math.random())]);
			animation.flip.x = Math.random() > 0.5;

			this.offset.y = 12;

			this.size.x = ig.global.TILE_SIZE;
			this.size.y = ig.global.TILE_SIZE;

			this.zPadding = 10;

			this.solid = true;
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
