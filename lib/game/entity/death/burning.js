ig.module(
	'game.entity.death.burning',
	'game.entity.fire'
)
.requires(
	'game.engine.map-entity'
)
.defines(function(){

	Burning = MapEntity.extend({
		init: function(x, y, settings) {
			this.parent(x, y, settings);

			this.pos.x -= 4;
			this.pos.y -= 22;

			this.size.x = 16;
			this.size.y = 36;

			this.animSheet = new ig.AnimationSheet('media/death/burning.png', 16, 36);
			this.addAnim('burning', 0.2, [0, 1, 2, 3, 1, 2, 3, 1, 2, 3, 1, 2, 3], true);
			this.addAnim('ghostApparition', 0.2, [4, 5, 6, 7, 8, 9], true);
		},

		update: function() {
			this.parent();
			if (this.isCurrentAnim('burning') && this.doesAnimEnd('burning')) {
				this.setAnim('ghostApparition');
				this.currentAnim.rewind();
			}
			if (this.isCurrentAnim('ghostApparition') && this.doesAnimEnd('ghostApparition')) {
				ig.game.spawnEntity('Fire', this.tile.x * ig.global.TILE_SIZE, this.tile.y * ig.global.TILE_SIZE);
				ig.game.gameOver();
				this.kill();
			}
		}
	});

});
