ig.module(
	'game.entity.death.skull'
)
.requires(
	'game.engine.map-entity'
)
.defines(function(){

	Skull = MapEntity.extend({

		animSheet: new ig.AnimationSheet('media/skull.png', 12, 20),

		init: function(x, y, settings) {
			this.parent(x, y, settings);

			this.pos.x -= 3;
			this.pos.y -= 12;

			this.size.x = 12;
			this.size.y = 15;

			this.addAnim('anim', 0.17, [0, 1, 2, 3, 4], true);
		},

		update: function() {
			this.parent();
			//this.pos.y -= ig.system.tick * 10;
			if (this.doesAnimEnd('anim')) {
			//	ig.game.gameOver();
			}
		}
	});

});
