ig.module(
	'game.entity.death.chopping'
)
.requires(
	'game.entity.death.something'
)
.defines(function(){

	Chopping = Something.extend({

		animSheet: new ig.AnimationSheet('media/death/chopping.png', 16, 36),
		sfx: new ig.Sound('media/sfx/SAW DEATH_1.*', false),

		init: function(x, y, settings) {
			this.parent(x, y, settings);

			this.pos.x -= 4;
			this.pos.y -= 22;

			this.size.x = 16;
			this.size.y = 36;

			this.addAnim('anim', 0.08, [0, 1, 2, 3, 4, 5, 6], true);

			this.active = true;
			this.sfx.play();
		}
	});

});
