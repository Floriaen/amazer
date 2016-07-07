ig.module(
	'game.entity.stairs'
)
.requires(
	'game.engine.map-entity'
)
.defines(function(){

	Stairs = MapEntity.extend({

		type: ig.Entity.TYPE.B,
		checkAgainst: ig.Entity.TYPE.A,
		collides: ig.Entity.COLLIDES.NEVER,

		animSheet: new ig.AnimationSheet('media/stairs.png', 12, 16),

		init: function(x, y, settings) {
			this.parent(x, y, settings);
			this.offset.y = 0;
			this.offset.x = -2;
			this.addAnim('current', 0.1, [0]);
		},

		check: function(other) {
			if (this.action) {
				if (other instanceof Man) {
					if (other.canChangeFloor) {
						this.action();
					}
				}
			}
			// Stairs must block MovingWall
			if (other instanceof MovingWall) {
				this.collides = ig.Entity.COLLIDES.FIXED;
				other.collides = ig.Entity.COLLIDES.LITE;
			} else {
				this.collides = ig.Entity.COLLIDES.NEVER;
			}
		}
	});

});
