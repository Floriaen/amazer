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
			this.animSheet = new ig.AnimationSheet('media/button.png', 16, 16);
			this.addAnim('unpressed', 0.1, [0], true);
			this.addAnim('pressed', 0.1, [1], true);
			this.action = settings.action;
		},
		update: function() {
			this.parent();
			if (!this.stop && this.pressed) {
				this.stop = true;
				this.setAnim('pressed');
				//this.action.target[this.action.property] = this.action.value;
				var targetElement = ig.game.getEntityByName(this.action.target);
				if (targetElement) {
					var fn = targetElement[this.action.action];
					fn.apply(targetElement, [this.action.value]);
					//targetElement.vel.x = this.action.value;
					//[this.action.property] = this.action.value;
				}
			}
		},
		check: function() {
			this.pressed = true;
		}
	});

});
