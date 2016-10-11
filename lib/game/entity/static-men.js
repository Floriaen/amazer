ig.module(
	'game.entity.static-men'
)
.requires(
	'game.entity.static-men'
)
.defines(function(){

	StaticMan = Entity.extend({
		
		init: function(x, y, settings) {
			this.parent(x, y, settings);
			
		},

		draw: function() {
			// nothing to draw
		}
	});
});
