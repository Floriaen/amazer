ig.module(
	'game.entity.skull'
)
.requires(
	'game.engine.map-entity'
)
.defines(function(){

	Skull = MapEntity.extend({
		init: function(x, y, settings) {
			this.parent(x, y, settings);
/*
			this.pos.x -= 3;
			this.pos.y -= 12;

			this.size.x = 12;
			this.size.y = 15;
*/
			this.zPadding = 1;

			/*
			this.animSheet = new ig.AnimationSheet('media/skull.png', 12, 20);
			this.addAnim('animate', 0.17, [0, 1, 2, 3, 4]);
			*/

			this.pos.x -= 4;
			this.pos.y -= 22;

			this.size.x = 16;
			this.size.y = 36;

			this.animSheet = new ig.AnimationSheet('media/explode.png', 16, 36);
			this.addAnim('explode', 0.18, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], true);
		},
		update: function() {
			this.parent();
			//this.pos.y -= ig.system.tick * 10;
			if (this.doesAnimEnd('explode')) {
				//this.kill();
			}
		}
	});

});
