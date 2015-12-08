ig.module(
	'game.entity.saw'
)
.requires(
	'game.engine.map-entity'
)
.defines(function(){

	Saw = MapEntity.extend({

		type: ig.Entity.TYPE.B,
		checkAgainst: ig.Entity.TYPE.A,
		collides: ig.Entity.COLLIDES.NONE,

		init: function(x, y, settings) {
			this.parent(x, y, settings);

			this.pos.y += 6;

			this.size.x = 10;
			this.size.y = 4;

			this.offset.x = 3;
			this.offset.y = 12

			this.zPadding = 1;
			this.animSheet = new ig.AnimationSheet('media/saw.png', 16, 20);
			this.addAnim('turn',0.3, [4, 5]);
			this.addAnim('jump', 0.1, [0, 1, 2, 3, 2, 1, 0, 4, 5], true);

			this.vel.x = 36;//64;

			this.direction = 1;

		},

		check: function(other) {
			if (other instanceof Man) {
				other.death = Man.CHOPPING;
				other.kill();
			}
		},

		handleMovementTrace: function(res) {
			this.parent(res);
			if (res.collision.x) {
				this.direction *= -1;
				this.vel.x = this.direction * 36;
				this.currentAnim = this.anims['jump'].rewind();
			}
		},

		update: function() {
			this.parent();
			if (this.onMap) {
				this.angle += 2 * ig.system.tick;
				//this.dust.pos.x = this.pos.x - 8;
				if (this.isCurrentAnim('jump') && this.doesAnimEnd('jump')) {
					this.setAnim('turn');
				}
			}
		}
	});

});
