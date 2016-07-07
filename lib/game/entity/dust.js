ig.module(
	'game.entity.dust'
)
.requires(
	'game.engine.map-entity'
)
.defines(function(){

	Dust = MapEntity.extend({
		
		animSheet: new ig.AnimationSheet('media/dust.png', 24, 24),

		init: function(x, y, settings) {
			this.parent(x, y, settings);
			this.pos.x -= 4;
			this.pos.y -= 4;
			this.size.x = ig.global.TILE_SIZE;
			this.size.y = ig.global.TILE_SIZE;
			
			this.addAnim('anim', 0.16, [0, 1, 2, 3, 4, 5], true);
		},
		update: function() {
			this.parent();
			if (this.doesAnimEnd('anim')) {
				this.kill();
			}
		}
	});

});
