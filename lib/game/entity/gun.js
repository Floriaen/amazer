ig.module(
	'game.entity.gun'
)
.requires(
	'game.engine.map-entity',
	'game.entity.lazer'
)
.defines(function(){

	Gun = MapEntity.extend({
		_canShoot: true,

		init: function(x, y, settings) {
			this.parent(x, y, settings);

			this.animSheet = new ig.AnimationSheet('media/gun2.png', 16, 28);
			this.addAnim('hide', 0.1, [3, 4, 5, 0], true);
			this.addAnim('show', 0.14, [0, 1, 2], true);
			this.currentAnim.gotoFrame(3);

			this.offset.y = 14;

			this.size.x = ig.global.TILE_SIZE;
			this.size.y = ig.global.TILE_SIZE;

			this.zPadding = 1.1;
			this.timer = new ig.Timer();

			this.axis = settings.axis || 'y';
			this.direction = settings.direction || 'left';
			this.gunPos = {x: 0, y: 0};
		},

		update: function() {
			this.parent();

			//this.direction = (ig.game.man.tile['x'] > this.tile['x']) ? 'right': 'left';
			//this.direction = (ig.game.man.tile[this.axis] > this.tile[this.axis]) ? 'left': 'right';

			this.gunPos.x = this.tile.x * ig.global.TILE_SIZE + ig.global.TILE_SIZE / 2;
			this.gunPos.y = this.tile.y * ig.global.TILE_SIZE + ig.global.TILE_SIZE / 2;

			if (this.detect()) {
				if (this._canShoot) {
					this.show();
				}
			} else {
				this._canShoot = true;
				this.hide();
			}

			if (this._canShoot && this.isCurrentAnim('show') && this.doesAnimEnd('show')) {
				this.shoot();
				this._canShoot = false;
			}
		},

		show: function() {
			if (!this.isCurrentAnim('show')) {
				this.anims['show'].rewind();
				this.setAnim('show');
			}
		},

		hide: function() {
			if (!this.isCurrentAnim('hide')){
				this.anims['hide'].rewind();
				this.setAnim('hide');
			}
		},

		shoot: function() {
			var self = this;

			var lazer = ig.game.map.spawnEntity('Lazer', this.gunPos.x, this.gunPos.y,
				{
					axis: (this.axis === 'y') ? 'x': 'y',
					direction: this.direction,
					onKilled: function() {
						if (self.isCurrentAnim('show')) {
							self.hide();
						}
					}
				}
			);
			lazer.zPadding = this.zPadding - 0.3;
		}
	});

});
