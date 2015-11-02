ig.module(
	'game.entity.hatch'
)
.requires(
    'game.entity.tile',
	'game.entity.dust'
)
.defines(function(){

	Hatch = MapEntity.extend({

		collides: ig.Entity.COLLIDES.NONE,

		init: function(x, y, settings) {
			this.parent(x, y, settings);
			this.animSheet = new ig.AnimationSheet('media/hole.png', 16, 16);
			this.addAnim('sprite', 0.1, [0]);
			this.offset.y = 0;
		},

		draw: function() {
			return;
		}
	});

});
