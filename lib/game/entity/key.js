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

			this.pos.x += 4;
			this.pos.y += 2;

			this.offset.y = 4;

			this.size.x = 8;
			this.size.y = 8;

			this.animSheet = new ig.AnimationSheet('media/key.png', 8, 8);
			this.addAnim('current', 0.3, [0, 1]);
		},
/*
		update: function() {
			this.parent();
			// tile far from 1 tile distance from the player are solid to avoid wall collision overlaps
			var mx = ig.game.man.tile.x;
			var my = ig.game.man.tile.y;
			if ((mx >= this.tile.x - 1 && mx <= this.tile.x + 1) && (my >= this.tile.y - 1 && my <= this.tile.y + 1)) {
				ig.game.collisionMap.data[this.tile.y][this.tile.x] = 0;
			} else {
				ig.game.collisionMap.data[this.tile.y][this.tile.x] = 1;
			}
		},
*/
		check: function(other) {
			// other is the player
			other.hasKey = true;
			this.kill();
		}
	});

});
