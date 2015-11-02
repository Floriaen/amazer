ig.module(
	'game.entity.button'
)
.requires(
	'game.engine.map-entity'
)
.defines(function(){

	Button = MapEntity.extend({
		init: function(x, y, settings) {
			this.parent(x, y, settings);
			/*
			this.pos.x -= 4;
			this.pos.y -= 4;
			this.size.x = ig.global.TILE_SIZE;
			this.size.y = ig.global.TILE_SIZE;
			*/
			this.animSheet = new ig.AnimationSheet('media/button.png', 16, 24);
			this.addAnim('pressed', 0.16, [0, 1, 2, 3], true);
		},
		update: function() {
			this.parent();
			if (this.doesAnimEnd('anim')) {
				//this.kill();
			}
		},
		check: function() {
			this.setAnim('pressed');
			// action
		}
	});

});
