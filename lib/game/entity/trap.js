/**

	lorsqu'on passe dessus ouvrir
	lorsqu'on quitte on ferme
	si on est dessus et que c'est complètement ouvert:
	- on tue le player death = GRINDING
	- GRINDING: ajouter animation d'avalement du player
**/

ig.module(
	'game.entity.trap'
)
.requires(
	'game.engine.map-entity'
)
.defines(function(){

	Trap = MapEntity.extend({
		type: ig.Entity.TYPE.B,
		checkAgainst: ig.Entity.TYPE.BOTH,
		open: false,

		init: function(x, y, settings) {
			this.parent(x, y, settings);

			this.pos.x += 7;
			this.pos.y += 7;

			this.offset.x = 7;
			this.offset.y = 7;

			this.size.x = 2;
			this.size.y = 2;

			this.animSheet = new ig.AnimationSheet('media/trap.png', 16, 16);
			this.addAnim('open', 0.2, [0, 1, 2, 3, 4], true);
			this.addAnim('close', 0.2, [4, 3, 2, 1, 0], true);
			this.addAnim('kill', 0.06, [5, 6, 7, 4, 3, 2, 1, 0], true);
			this.currentAnim.stop = true;
		},

		update: function() {
			this.parent();
			this.open = this.onMap && this.currentAnim.frame === 2;
			if (this.doesAnimEnd('open')) {
				this.anims['close'].rewind();
				this.setAnim('close');
			}
		},

		check: function(other) {
			if (other instanceof Man) {
				// if trap is close open it
				if (this.doesAnimEnd('close') || this.doesAnimEnd('kill')) {
					this.anims['open'].rewind();
					this.setAnim('open');
				} else {
					if (this.open) {
						this.anims['kill'].rewind();
						this.setAnim('kill');
						// kill the player
						other.snapToTile(this.tile);
						other.death = Man.GRINDING;
						other.kill();	
					}
				}
			}
		}
	});

});
