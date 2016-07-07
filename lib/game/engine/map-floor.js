ig.module(
	'game.engine.map-floor'
)
.requires(
	'impact.entity'
)
.defines(function(){

	MapFloor = ig.BackgroundMap.extend({
		//collisionMap: null,
		entities: [],
		map: null,
		solidMap: null,

		ground: {
			canvas: null,
			context: null,
		},

		init: function(tilesize, data, tileset) {
			this.parent(tilesize, data, tileset);
			
			this.ground.canvas = ig.$new('canvas');
			this.ground.canvas.width = ig.system.width;
			this.ground.canvas.height = ig.system.height;
			this.ground.context = this.ground.canvas.getContext('2d');
			ig.System.SCALE.SMOOTH(this.ground.canvas, this.ground.context);
		},

		drawGround: function(pos, offset) {
			ig.system.context.drawImage(
				this.ground.canvas,
				(pos.x - offset.x - ig.game._rscreen.x) * ig.system.scale,
				(pos.y - offset.y - ig.game._rscreen.y) * ig.system.scale,
				(this.ground.canvas.width * ig.system.scale),
				(this.ground.canvas.height * ig.system.scale)
			);
		},

		setEntitiesVisible: function(visible) {
			var l = this.entities.length;
			while (l--) {
				var e = this.entities[l];
				e.setVisible(visible);
			}
		},

		removeEntities: function() {
			if (!ig.game) return;
			var l = this.entities.length;
			while (l--) {
				ig.game.removeEntity(this.entities[l]);
			}
		}
 	});
});
