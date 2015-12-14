ig.module(
	'game.entity.death.chopping'
)
.requires(
	'game.engine.map-entity'
)
.defines(function(){

	Chopping = MapEntity.extend({
		init: function(x, y, settings) {
			this.parent(x, y, settings);

			this.pos.x -= 4;
			this.pos.y -= 22;

			this.size.x = 16;
			this.size.y = 36;

			this.animSheet = new ig.AnimationSheet('media/death/chopping.png', 16, 36);
			this.addAnim('anim', 0.08, [0, 1, 2, 3, 4, 5, 6], true);
			this.timer = null;
			this.active = true;
		},

		update: function() {
			if (!this.active) return;

			this.parent();
			if (this.timer) {
				if (this.timer.delta() > 0) {
					ig.game.gameOver();
					this.zPadding--;
					this.active = false;
					//this.kill();
				}
			} else {
				if (this.doesAnimEnd('anim')) {
					this.timer = new ig.Timer();
					this.timer.set(1);
				}
			}
		}
	});

});
