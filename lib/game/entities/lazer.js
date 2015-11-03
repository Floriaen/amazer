ig.module(
	'game.entities.lazer'
)
.requires(
	'game.engine.map-entity'
)
.defines(function(){

	Lazer = MapEntity.extend({

		type: ig.Entity.TYPE.B,
		checkAgainst: ig.Entity.TYPE.A,

		init: function(x, y, settings) {
			this.parent(x, y, settings);
			this.axis = settings.axis || 'x';
			this.direction = settings.direction || 'right'; // or up / down
			this.onKilled = settings.onKilled;

			//this.pos.x -= 1;
			//this.pos.y -= 1;

			this.originalPos = {
				x: this.pos.x,
			 	y: this.pos.y
			};

			this.size.x = 1;
			this.size.y = 1;

			this.maxDistance = 4 * ig.global.TILE_SIZE + ig.global.TILE_SIZE / 2;

			this.zPadding = 1;
			this.timer = new ig.Timer();
			this.timer.set(0.5);
		},

		kill: function() {
			this.parent();
			this.onKilled()
		},

		update: function() {
			this.parent();
			if (this.timer.delta() > 0) {
				this.kill();
			}

			this.size[this.axis] += ig.system.tick * 300;
			if (this.size[this.axis] >= this.maxDistance) {
				this.size[this.axis] = this.maxDistance;// end
			}

			if (this.direction === 'left'){
				this.pos[this.axis] = this.originalPos[this.axis] - this.size[this.axis];
			}

		},

		draw: function() {
			ig.system.context.save();
			ig.system.context.scale(ig.system.scale, ig.system.scale);

			var x = this.pos.x - this.offset.x - ig.game._rscreen.x;
			var y = this.pos.y - this.offset.y - ig.game._rscreen.y;

			ig.system.context.globalAlpha = 0.3;
			ig.system.context.fillStyle = 'black';
			ig.system.context.rect(x, y, this.size.x, this.size.y);
			ig.system.context.fill();
			ig.system.context.globalAlpha = 1;

			ig.system.context.beginPath();
			ig.system.context.fillStyle = 'red';
			ig.system.context.rect(x, y - 4, this.size.x, this.size.y);
			ig.system.context.fill();

			ig.system.context.restore();
			this.parent();
		},

		check: function(other) {
			// other is the player
			other.death = Man.EXPLODING;
			other.kill();
		}
	});

});
