ig.module(
	'game.entity.death.grinding'
)
.requires(
	'game.entity.death.something'
)
.defines(function(){

	Grinding = Something.extend({

		animSheet: new ig.AnimationSheet('media/death/grinding.png', 16, 36),
		
		sfx :{
			falling: new ig.Sound('media/sfx/FALL_1.*', false),
			grinding: new ig.Sound('media/sfx/HOLE_DEATH_2.*', false)
		},
		
		init: function(x, y, settings) {
			this.delay = 1.4;
			this.duration = 2;
			this.fading = false;

			this.parent(x, y, settings);

			this.pos.x = this.tile.x * ig.global.TILE_SIZE;
			this.pos.y = this.tile.y * ig.global.TILE_SIZE;

			this.pos.y -= 22;

			this.size.x = 16;
			this.size.y = 36;

			this.sfx.falling.play();
		},

		start: function() {
			this.addAnim('anim', 0.13, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23], true);
			this.sfx.grinding.play();
		},

		update: function() {
			this.parent();
			if (this.doesAnimEnd('anim')) {
				this.kill();
			}
		}
	});

});
