ig.module(
	'game.entity.blood-door'
)
.requires(
	'game.engine.map-entity'
)
.defines(function(){

	BloodDoor = MapEntity.extend({

		//collides: ig.Entity.COLLIDES.NONE,
		
		animSheet: new ig.AnimationSheet('media/bloodDoor.png', 32, 56),

		init: function(x, y, settings) {
			this.parent(x, y, settings);

			this.zPadding = 1;
			
			this.offset.y = 16;
			this.size.x = ig.global.TILE_SIZE;
			this.size.y = ig.global.TILE_SIZE;
			
			this.addAnim('anim', 0.1, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
		}
	});

});