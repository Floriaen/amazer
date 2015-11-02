ig.module(
	'game.entity.worm'
)
.requires(
	'game.engine.map-entity'
)
.defines(function(){

	Worm = MapEntity.extend({

		type: ig.Entity.TYPE.B,
		checkAgainst: ig.Entity.TYPE.A,
		collides: ig.Entity.COLLIDES.NONE,

		init: function(x, y, settings) {
			this.parent(x, y, settings);
/*
			this.pos.x += 4;
			this.pos.y += 2;

			this.offset.y = 4;
*/
			this.size.x = 8;
			this.size.y = 8;

			this.animSheet = new ig.AnimationSheet('media/worm.png', 8, 8);

			this.addAnim('grow', 0.6, [0, 1, 2, 3], true);
			this.addAnim('move', 0.2, [4, 5, 6, 5, 7]);
		},

		update: function() {
			this.parent();
			if (this.isCurrentAnim('grow') && this.doesAnimEnd('grow')) {
				this.currentAnim = this.anims['move'];
				this.vel.x = 3;
			}

		},

		check: function(other) {
			// other is the player
			//this.kill();
		}
	});

});
