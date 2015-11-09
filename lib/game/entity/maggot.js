ig.module(
	'game.entity.maggot'
)
.requires(
	'game.engine.map-entity'
)
.defines(function(){

	Maggot = MapEntity.extend({

		type: ig.Entity.TYPE.B,
		checkAgainst: ig.Entity.TYPE.A,
		collides: ig.Entity.COLLIDES.NONE,

		init: function(x, y, settings) {
			this.parent(x, y, settings);

			this.pos.x = 16 + 3;
			this.pos.y += 3;

			this.initialPos = {
				x: this.pos.x,
				y: this.pos.y
			};

			this.size.x = 8;
			this.size.y = 6;

			this.offset.x = 3;
			this.offset.y = 3;

			this.animSheet = new ig.AnimationSheet('media/worm2.png', 16, 12);
			this.addAnim('move', 0.18, [0, 1, 2, 3, 4, 5, 6], true);
			this.timer = new ig.Timer();

			var delay = settings.delay;
			this.timer.set(delay);
			this.currentAnim = null;
			//this.checkAgainst = ig.Entity.TYPE.NONE;
			this.visible = false;
		},

		update: function() {
			this.parent();
			if (this.visible) {

				if (this.doesAnimEnd('move')) {
					this.visible = false;
					this.timer.set(0.6);
					this.vel.x = 24;

					var dust = ig.game.spawnEntity(
						'Dust',
						this.tile.x * ig.global.TILE_SIZE,
						this.tile.y * ig.global.TILE_SIZE
					);
					dust.setVisible(true);
					dust.zPadding = this.zPadding - 1;
				}

			} else {

				if (this.timer.delta() > 0) {

					this.visible = true;
					this.vel.x = 0;
					//this.pos.x += 16;
					this.anims['move'].rewind();
					this.setAnim('move');
				}
			}
		},

		handleMovementTrace: function(res) {
			this.parent(res);
			if (res.collision.x && !this.visible) {
				this.pos.x = this.initialPos.x;
				this.pos.y = this.initialPos.y;
			}
		},

		check: function(other) {
			if (this.visible) {
				// other is the player
				other.kill();
			}
		}
	});

});
