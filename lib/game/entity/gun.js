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
			this.addAnim('hiding', 0.1, [3, 4, 5, 0], true);
			this.addAnim('showing', 0.14, [0, 1, 2], true);
			this.currentAnim.gotoFrame(3);

			this.offset.y = 14;

			this.size.x = ig.global.TILE_SIZE;
			this.size.y = ig.global.TILE_SIZE;

			this.zPadding = 1;
			this.timer = new ig.Timer();

			this.axis = 'y';
		},

		update: function() {
			this.parent();

			if (this.detect()) {
				if (this._canShoot) {
					this.show();
				}
			} else {
				this._canShoot = true;
				this.hide();
			}

			if (this._canShoot && this.isCurrentAnim('showing') && this.doesAnimEnd('showing')) {
				this.shoot();
				this._canShoot = false;
			}
		},

		detect: function() {
			if (ig.game.man.tile[this.axis] === this.tile[this.axis]) {
				var DISTANCE = 3;
				var distance = ig.game.man.tile['x'] - this.tile['x'];
				if (Math.abs(distance) <= DISTANCE) {
					var increment = distance > 0 ? 1: -1;
					for (var i = 0; i < distance; i += increment) {
						if (ig.game.map.solidMaps[ig.game.map.z][(this.tile.x + i) + '_' + this.tile.y] === 1) {
							return false
						}
					}
					return true;
				}

			}
			return false;
			/*
			return ig.game.man.tile[this.axis] === this.tile[this.axis] &&
				ig.game.man.tile['x'] >= this.tile['x'] - 3 &&
				ig.game.man.tile['x'] <= this.tile['x'] + 3;
				*/
		},

		show: function() {
			if (!this.isCurrentAnim('showing')) {
				this.anims['showing'].rewind();
				this.setAnim('showing');
			}
		},

		hide: function() {
			if (!this.isCurrentAnim('hiding')){
				this.anims['hiding'].rewind();
				this.setAnim('hiding');
			}
		},

		shoot: function() {
			var self = this;

			var direction = (ig.game.man.tile['x'] > this.tile['x']) ? 'right': 'left';

			ig.game.spawnEntity('Lazer',
				this.tile.x * ig.global.TILE_SIZE + ig.global.TILE_SIZE / 2,
				this.tile.y * ig.global.TILE_SIZE + ig.global.TILE_SIZE / 2,
				{
					axis: (this.axis === 'y') ? 'x': 'y',
					direction: direction,
					onKilled: function() {
						if (self.isCurrentAnim('showing')) {
							self.hide();
						}
					}
				}
			);
		}
	});

});
