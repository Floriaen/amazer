ig.module(
	'game.entity.death.something'
)
.requires(
	'game.engine.map-entity'
)
.defines(function(){

	Something = MapEntity.extend({
		delay: 0,
		beginTimer: null,
		endTimer: null,
		duration: 1,
		fading: true,

		init: function(x, y, settings) {
			this.parent(x, y, settings);
			if (this.delay > 0) {
				this.beginTimer = new ig.Timer();
				this.beginTimer.set(this.delay);
			} else {
				this.start();
			}
		},

		start: function() {

		},

		kill: function() {
			this.parent();
			ig.game.gameOver();
		},

		update: function() {
			this.parent();

			if (this.beginTimer && this.beginTimer.delta() > 0) {
				this.beginTimer = null;
				this.start();
			} else {
				if (!this.endTimer && this.doesAnimEnd('anim')) {
					this.endTimer = new ig.Timer();
					this.endTimer.set(this.duration);
					this.zPadding--;
				}

				if (this.endTimer) {
					if (this.endTimer.delta() > 0) {
						this.kill();
					} else {
						if (this.fading) {
							this.currentAnim.alpha = this.currentAnim.alpha - ig.system.tick;
							if (this.currentAnim.alpha < 0) this.currentAnim.alpha = 0;	
						}
						
					}
				}
			}
		}
	});
});
