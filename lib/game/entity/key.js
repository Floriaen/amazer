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

		check: function(other) {
			// other is the player
			other.hasKey = true;
			this.kill();
		}
	});

});
