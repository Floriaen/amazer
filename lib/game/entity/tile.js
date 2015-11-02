ig.module(
	'game.entity.tile'
)
.requires(
	'game.engine.map-entity'
)
.defines(function(){

	Tile = MapEntity.extend({

		init: function(x, y, settings) {
			this.parent(x, y, settings);
			//this.sprite = new ig.Image("media/wall.png");
/*
			if (Math.random() > 0.3) {
				this.animSheet = new ig.AnimationSheet('media/cage.png', 16, 28);
			} else {
				this.animSheet = new ig.AnimationSheet('media/cage1.png', 16, 28);
			}
*/
			//this.animSheet = new ig.AnimationSheet('media/wall.png', 16, 28);
			this.animSheet = new ig.AnimationSheet('media/cage.png', 16, 28);


			this.addAnim('sprite', 0.1, [0]);

			this.offset.y = 12;

			this.size.x = ig.global.TILE_SIZE;
			this.size.y = ig.global.TILE_SIZE;

			this.zPadding = 1;
			// TODO this.flipX = true;
		}
	});
});
