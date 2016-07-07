ig.module(
	'game.entity.blood-bubbles'
)
.requires(
	'game.engine.map-entity'
)
.defines(function(){

	BloodBubbles = MapEntity.extend({
		
		animSheet: new ig.AnimationSheet('media/bloodBubbles.png', 16, 16),

		init: function(x, y, settings) {
			this.parent(x, y, settings);
			this.size.x = ig.global.TILE_SIZE;
			this.size.y = ig.global.TILE_SIZE;
			
			this.addAnim('anim', 0.16, [0, 1, 2, 1], false);
		},
		/*
		update: function() {
			this.parent();
			if (this.doesAnimEnd('anim')) {
				this.kill();
			}
		}
		*/
	});

});