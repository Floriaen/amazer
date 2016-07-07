ig.module(
	'game.entity.blood-attack'
)
.requires(
	'game.engine.map-entity'
)
.defines(function(){

	BloodAttack = MapEntity.extend({

		animSheet: new ig.AnimationSheet('media/bloodAttack.png', 16, 16),

		direction: 1,

		init: function(x, y, settings) {
			this.parent(x, y, settings);

			this.vel.x = this.direction * 0.00002;

			this.zPadding = 1;

			this.addAnim('current', 0.1, [0, 1, 2, 3, 4, 5, 6]);
		},

		update: function() {
			this.parent();
			this.vel.x = this.direction * 36;
		}
	});

});
