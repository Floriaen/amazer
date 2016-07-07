ig.module(
	'game.entity.button'
)
.requires(
	'game.engine.map-entity'
)
.defines(function(){

	Button = MapEntity.extend({

		pressed: false,
		stop: false,

		type: ig.Entity.TYPE.B,
		checkAgainst: ig.Entity.TYPE.A,
		collides: ig.Entity.COLLIDES.NONE,

		init: function(x, y, settings) {
			this.parent(x, y, settings);

			this.pos.x += 7;
			this.pos.y += 7;

			this.offset.x = 7;
			this.offset.y = 7;

			this.size.x = 2;
			this.size.y = 2;
			
			this.animSheet = new ig.AnimationSheet('media/button.png', 16, 16);
			this.addAnim('unpressed', 0.1, [0], true);
			this.addAnim('pressed', 0.1, [1], true);
			this.action = settings.action;
			this.actionValueIndex = 0;
		},

		update: function() {
			this.parent();
			if (this.isCurrentAnim('unpressed')) {
				if (this.pressed) {
					this.setAnim('pressed');
					var targetElement = ig.game.getEntityByName(this.action.target);
					if (targetElement) {
						var fn = targetElement[this.action.action[this.actionValueIndex]];
						fn.apply(targetElement);
						if (this.action.action.length > 1) {
							this.actionValueIndex = (this.actionValueIndex === 0) ? 1: 0;
						}
					}
				}
			} else {
				if (!this.pressed) {
					this.setAnim('unpressed');
				}
			}
			this.pressed = false;
		},

		check: function() {
			this.pressed = true;
		}
	});

});
