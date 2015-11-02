ig.module(
	'game.entity.stairs'
)
.requires(
	'game.engine.map-entity'
)
.defines(function(){

	Stairs = MapEntity.extend({
		//type: ig.Entity.TYPE.A,
		//collides: ig.Entity.COLLIDES.PASSIVE,
		init: function(x, y, settings) {
			this.parent(x, y, settings);
			this.offset.y = 0;//2;
			this.offset.x = -2;

			this.animSheet = new ig.AnimationSheet('media/stairs.png', 12, 16);
			this.addAnim('current', 0.1, [0]);
		}
	});

});
