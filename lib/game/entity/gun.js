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

			this.zPadding = 1.1;
			this.timer = new ig.Timer();

			this.axis = settings.axis || 'y';
			this.direction = 'right';
			this.gunPos = {x: 0, y: 0};
		},

		update: function() {
			this.parent();

			this.direction = (ig.game.man.tile['x'] > this.tile['x']) ? 'right': 'left';

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

			if (this._canShoot && this.isCurrentAnim('showing') && this.doesAnimEnd('showing')) {
				this.shoot();
				this._canShoot = false;
			}
		},

		detect: function() {

			var DISTANCE = 3;

			if (ig.game.man.tile[this.axis] === this.tile[this.axis]) {
				// check the direction (?)
				var oppositeAxis = this.axis === 'x' ? 'y': 'x';
				if (this.direction === 'right') {
					check = ig.game.man.tile[oppositeAxis] > this.tile[oppositeAxis];
				} else {
					check = ig.game.man.tile[oppositeAxis] < this.tile[oppositeAxis];
				}

				if (check) {
					/*
					var vx = (this.axis === 'x') ? 0: DISTANCE * ig.global.TILE_SIZE;
					var vy = (this.axis === 'y') ? 0: DISTANCE * ig.global.TILE_SIZE;

					var res = ig.game.collisionMap.trace(
						this.gunPos.x, this.gunPos.y, vx, vy, 2, 2
					);
					ig.log('res.collision', this.gunPos.x, this.gunPos.y, -vx, -vy, res.collision);
*/

					var distance = Math.abs(ig.game.man.tile['x'] - this.tile['x']);
					var increment = (ig.game.man.tile['x'] - this.tile['x']) > 0 ? 1: -1;

					if (distance <= DISTANCE) {
						for (var i = 0; i < distance; i++) {
							//ig.log('test', this.tile.x + i * increment, this.tile.y);
							if (ig.game.map.solidMaps[ig.game.map.z][(this.tile.x + i * increment) + '_' + this.tile.y] === 1) {
								return false
							}
						}
						return true;
					}
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

			ig.game.map.spawnEntity('Lazer', this.gunPos.x, this.gunPos.y,
				{
					axis: (this.axis === 'y') ? 'x': 'y',
					direction: this.direction,
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
