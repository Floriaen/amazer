ig.module(
	'game.entity.wall.auto-wall'
)
.requires(
	'game.entity.tile'
)
.defines(function(){

	AutoWall = Tile.extend({
		type: ig.Entity.TYPE.B,
		checkAgainst: ig.Entity.TYPE.A,
		//collides: ig.Entity.COLLIDES.FIXED,
		lastTile: {x: 0, y: 0},
		sfx: new ig.Sound('media/sfx/PUSHWALL_2_REVERB.*', false),
		animSheet: new ig.AnimationSheet('media/autoWall.png', 16, 28),
		
		init: function(x, y, settings) {
			this.parent(x, y, settings);
			this.sfx.volume = 0.3;
			this.collides = ig.Entity.COLLIDES.NONE;

			this.currentAnim = this.addAnim('show', 0.1, [3, 2, 1, 0], true);
			this.addAnim('hide', 0.12, [0, 1, 2, 3], true);
			this.currentAnim.gotoFrame(3);

			this.solid = true;
			if (settings.v === false) {
				this.anims['hide'].rewind();

				this.setAnim('hide');
				this.zPadding = 0.9;

				this.solid = false;
			}

			if (this.automate) {
				var delay = this.automate.delay || 0;
				this.timer = new ig.Timer(delay);
			}
		},

		kill: function() {
			this.parent();
			this.solid = false;
			this.setSolidAsMap(false);
		},

		setVisible: function(flag) {
			this.parent(flag);
			this.setSolidAsMap(false);
		},

		update: function() {
			this.parent();
			if (this.onMap) {
				if (this.timer) this.timer.unpause();
				if (this.timer && this.timer.delta() > 0) {
					this.timer.set(2); // remove the delay
					this.showOrHide();
					this.timer.reset();
				 }

				if (this.isCurrentAnim('hide') && this.doesAnimEnd('hide')) {
					this.collides = ig.Entity.COLLIDES.NONE;
					this.solid = false;
				}
			
				//ig.log(this.tile.x, this.tile.y, this.visible, this.solid);
				this.setSolidAsMap(this.solid);
			} else {
				if (this.timer) this.timer.pause();
			}
		},

		check: function(other) {
			if (this.solid && other instanceof Man) {
				other.death = Man.EXPLODING;
				other.kill();
			}
		},

		showOrHide: function() {
			if (this.solid) {
				this.hide();
			} else {
				this.show();
			}
		},

		show: function() {
			if (this.isCurrentAnim('hide') && this.doesAnimEnd('hide')) {
				this.sfx.play();

				this.anims['show'].rewind();
				this.setAnim('show');

				this.solid = true;
				this.zPadding = 1.1;
			}
		},

		hide: function() {
			if (this.isCurrentAnim('show') && this.doesAnimEnd('show')) {
				this.sfx.play();

				this.anims['hide'].rewind();
				this.setAnim('hide');

				//this.solid = false;
				this.zPadding = 0.9;
			}
		}
	});
});
