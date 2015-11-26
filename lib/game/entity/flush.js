ig.module(
	'game.entity.flush'
)
.requires(
    'game.engine.map-entity'
)
.defines(function(){

	Flush = MapEntity.extend({

		init: function(x, y, settings) {
			this.parent(x, y, settings);
			this.size.x = 16;
			this.size.y = 28;
			this.animSheet = new ig.AnimationSheet('media/flush.png', 16, 28);
			this.addAnim('anim', 0.06, [0, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6], true);

			this.zPadding = 2;
		},

		update: function() {
			this.parent();
			if (this.isCurrentAnim('anim') && this.doesAnimEnd('anim')) {
				this.kill();
			}

		}
	});

});
