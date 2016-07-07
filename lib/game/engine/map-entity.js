ig.module(
	'game.engine.map-entity'
)
.requires(
	'impact.entity'
)
.defines(function(){

	MapEntity = ig.Entity.extend({

		mapDepth: undefined,
		onMap: false,
		tile: {x: 0, y: 0},
		padding: {x: 0, y: 0},
		zPadding: 0,
		ignoreCollisionMap: false,
		visible: true,
		vision: 3,
		solid: false,

		init: function(x, y, settings) {
			ig.merge(this, settings);
			this.parent(x, y, settings);
			
			this.updateTilePosition();
			this.zPadding = 0;
			this.size.x = ig.global.TILE_SIZE;
			this.size.y = ig.global.TILE_SIZE;
		},

		detect: function() {
			if (ig.game.man._killed) return false;
			if (ig.game.man.tile[this.axis] === this.tile[this.axis]) {
				// check the direction (?)
				var oppositeAxis = this.axis === 'x' ? 'y': 'x';
				if (this.direction === 'right' || this.direction === 'bottom') {
					check = ig.game.man.tile[oppositeAxis] > this.tile[oppositeAxis];
				} else {
					check = ig.game.man.tile[oppositeAxis] < this.tile[oppositeAxis];
				}

				if (check) {

					var distance = Math.abs(ig.game.man.tile[oppositeAxis] - this.tile[oppositeAxis]);
					var increment = (ig.game.man.tile[oppositeAxis] - this.tile[oppositeAxis]) > 0 ? 1: -1;

					if (distance <= this.vision) {
						// begin at 1 for excluding this
						for (var i = 1; i < distance; i++) {
							if (oppositeAxis === 'x') {
								if (ig.game.map.solidMaps[ig.game.map.z][(this.tile.x + i * increment) + '_' + this.tile.y] === 1) {
									return false
								}
							} else {
								if (ig.game.map.solidMaps[ig.game.map.z][this.tile.x + '_' + (this.tile.y + i * increment)] === 1) {
									return false
								}
							}
						}
						return true;
					}
				}
			}
			return false;
		},

		setSolidAsMap: function(flag) {
			ig.game.collisionMap.setTile(this.pos.x, this.pos.y, !!flag ? 1: 0);
		},

		snapToTile: function(tile) {
			//tile = tile || this.tile;
			this.pos.x = tile.x * ig.global.TILE_SIZE;
			this.pos.y = tile.y * ig.global.TILE_SIZE;
		},

		snapToGrid: function(axis) {
			var tiledCoordonate = Math.floor(this.tile[axis] * ig.global.TILE_SIZE + (ig.global.TILE_SIZE - this.size[axis]) / 2);
			var padding = Math.abs(this.pos[axis] - tiledCoordonate);
			if (padding < MapEntity.SNAP_TO_TILE_PAD) {
				this.vel[axis] = 0;
				if (padding > ig.system.ZERO) {
					this.pos[axis] = ig.math.lerp(this.pos[axis], tiledCoordonate, ig.system.tick * MapEntity.SNAP_TO_TILE_SPEED);
				} else {
					this.pos[axis] = tiledCoordonate;
				}
			}
		},

		setVisible: function(visible) {
			this.onMap = visible;
			if (!visible) {
				// backup collision states:
				this._backup = {
					type: this.type | ig.Entity.TYPE.NONE,
					checkAgainst: this.checkAgainst | ig.Entity.TYPE.NONE,
					collides: this.collides | ig.Entity.COLLIDES.NEVER
				};

				// reset collision states:
				this.type = ig.Entity.TYPE.NONE;
				this.checkAgainst = ig.Entity.TYPE.NONE;
				this.collides = ig.Entity.COLLIDES.NEVER;
			} else {
				if (this._backup) {
					// get back collision states:
					this.type = this._backup.type;
					this.checkAgainst = this._backup.checkAgainst;
					this.collides = this._backup.collides;
				}
			}
		},

		updateZIndex: function() {
			this.zIndex = this.tile.y + this.zPadding + 20; // TODO move 10 to constant if necessary
		},

		updateTilePosition: function() {
			this.tile.x = ((this.pos.x + this.size.x / 2) / ig.global.TILE_SIZE).floor();
			this.tile.y = ((this.pos.y + this.size.y / 2) / ig.global.TILE_SIZE).floor();
			// center to center
			this.padding.x = Math.abs((this.pos.x + this.size.x / 2) - (this.tile.x * ig.global.TILE_SIZE) - ig.global.TILE_SIZE / 2);
			this.padding.y = Math.abs((this.pos.y + this.size.y / 2) - (this.tile.y * ig.global.TILE_SIZE) - ig.global.TILE_SIZE / 2);
		},

		update: function() {
			//this.onMap = this.mapDepth === ig.game.map.z;
			if (this.onMap) {
				// compute the tile where the entity is each frame:
				this.updateTilePosition();
				// order depending on the location:
				this.updateZIndex();
				this.parent();
			}
		},

		draw: function() {
			if (this.onMap && this.visible) {
				this.parent();
			}
		},

		doesAnimEnd: function(name) {
			if (this.anims[name] && this.currentAnim == this.anims[name]) {
				return (this.currentAnim.frame == this.currentAnim.sequence.length - 1);
			}
			return false;
		},

		isCurrentAnim: function(name) {
			return this.anims[name] && this.currentAnim == this.anims[name];
		},

		setAnim: function(name) {
			if (this.anims[name]) {
				this.currentAnim = this.anims[name];
				return this.currentAnim;
			}
			return null;
		}
	});
	MapEntity.SNAP_TO_TILE_PAD = 0.3;
	MapEntity.SNAP_TO_TILE_SPEED = 10;
});
