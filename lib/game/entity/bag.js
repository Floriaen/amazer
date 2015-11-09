ig.module(
	'game.entity.bag'
)
.requires(
	'game.engine.map-entity'
)
.defines(function(){

	Bag = MapEntity.extend({
/*
		type: ig.Entity.TYPE.NONE,
		checkAgainst: ig.Entity.TYPE.NONE,
		collides: ig.Entity.COLLIDES.NEVER,
*/
		init: function(x, y, settings) {
			this.parent(x, y, settings);

			this.animSheet = new ig.AnimationSheet('media/bag.png', 16, 28);
			this.addAnim('falling', 0.16, [0, 1, 0, 1, 0, 1], false);
			this.addAnim('end-falling', 0.04, [2, 3, 4], true);

			this.pos.x += 3;
			y += 1;

			this.size.x = 10;
			this.size.y = 10;

			this.offset.x = 3;
			this.offset.y = 9;

			this.targetY = y;
			this.pos.y = 32;
			this.vel.y = ((this.targetY + 26) - this.pos.y) * 1.8;
			this.maxVel.y = 300;

			this.zPadding = 4;
			this.ignoreCollisionMap = true;
		},

		handleMovementTrace: function( res ) {
			this.pos.x += this.vel.x * ig.system.tick;
			this.pos.y += this.vel.y * ig.system.tick;
		},

		update: function() {
			this.parent();
			//ig.log(this.onMap);
			if (this.vel.y > 0) {

				if (this.isCurrentAnim('falling')) {
					if (this.pos.y >= this.targetY - 16) {
						this.anims['end-falling'].rewind();
						this.setAnim('end-falling');
					}
				} else {
					if (this.pos.y >= this.targetY) {
						this.touchTheGround();
					}
				}

			}
		},

		touchTheGround: function() {
			this.collides = ig.Entity.COLLIDES.FIXED;
		//	this.ignoreCollisionMap = false;

			this.vel.y = 0;
			var dust = ig.game.spawnEntity(
				'Dust',
				this.tile.x * ig.global.TILE_SIZE,
				this.tile.y * ig.global.TILE_SIZE
			);
			dust.setVisible(true);
			dust.zPadding = this.zPadding - 1;
		}
	});

});
