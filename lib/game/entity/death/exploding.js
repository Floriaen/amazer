ig.module(
	'game.entity.death.exploding'
)
.requires(
	'game.engine.map-entity'
)
.defines(function(){

	Exploding = MapEntity.extend({
		init: function(x, y, settings) {
			this.parent(x, y, settings);

			this.zPadding = 1;

			this.pos.x -= 4;
			this.pos.y -= 22;

			this.size.x = 16;
			this.size.y = 36;

			this.animSheet = new ig.AnimationSheet('media/death/exploding.png', 16, 36);
			this.addAnim('anim', 0.18, [1, 2, 3, 4, 5, 6, 7, 8, 9], true);
		},

		update: function() {
			this.parent();
			if (this.doesAnimEnd('anim')) {
				ig.game.gameOver();
			}
		}
	});

});
