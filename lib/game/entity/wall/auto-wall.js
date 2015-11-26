ig.module(
	'game.entity.wall.auto-wall'
)
.requires(
    'game.entity.tile'
)
.defines(function(){

	AutoWall = Tile.extend({

		collides: ig.Entity.COLLIDES.FIXED,
		lastTile: {x: 0, y: 0},
		solid: true,

		init: function(x, y, settings) {
			this.parent(x, y, settings);
			this.animSheet = new ig.AnimationSheet('media/autoWall.png', 16, 28);
			this.currentAnim = this.addAnim('auto_show', 0.1, [0], true);
			this.addAnim('auto_hide', 0.12, [0, 1, 2, 3], true);
			this.currentAnim.gotoFrame(0);
		},

		update: function() {
			this.parent();
			if (this.isCurrentAnim('auto_hide') && this.doesAnimEnd('auto_hide')) {
				//this.collides = ig.Entity.NONE;
				this.kill();
			}
		},

		hide: function() {
			this.anims['auto_hide'].rewind();
			this.setAnim('auto_hide');

			/*
			this.tween(
				{
					pos: {
						x: tile.x * ig.global.TILE_SIZE,
						y: tile.y * ig.global.TILE_SIZE
					}
				}, 1 ).start();
				*/
		}
	});
});
