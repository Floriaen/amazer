ig.module(
	'game.entity.death.exploding'
)
.requires(
	'game.entity.death.something'
)
.defines(function(){

	Exploding = Something.extend({
		animSheet: new ig.AnimationSheet('media/death/exploding.png', 16, 36),
		sfx: new ig.Sound('media/sfx/EXPLODE_4_1.*', false),
		init: function(x, y, settings) {
			this.parent(x, y, settings);

			this.pos.x -= 4;
			this.pos.y -= 22;

			this.size.x = 16;
			this.size.y = 36;

			
			this.addAnim('anim', 0.12, [1, 2, 3, 4, 5, 6, 7, 8, 9], true);

			this.sfx.volume = 1;
			this.sfx.play();
		}
	});

});
