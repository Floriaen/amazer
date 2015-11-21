ig.module(
	'game.main'
)
.requires(
	'impact.game',
	'impact.font',
	'impact.debug.menu',
	'impact.map',

	'impact.debug.entities-panel',
	'impact.debug.graph-panel',
	'game.map',
	'game.entity.man',
	'plugins.tween',
	'impact.debug.entities-panel',

	'game.engine.preloader',

	'game.levels.level1',
	'game.levels.level2',
	'game.levels.level3',
	'game.levels.level4',
	'game.levels.level5',
	'game.levels.level6',
	'game.levels.level7'
)
.defines(function(){
	// Globals:
	ig.global.TILE_SIZE = 16;
	ig.global.LEVEL_COUNT = 7;
	ig.global.DEFAULT_FONT = new ig.Font('media/04b03.font.png');

	ig.global.currentLevel = 1;

	var RESTART_COUNTDOWN = 0.6;

	Cube = ig.Game.extend({
		// Load a font
		font: new ig.Font( 'media/04b03.font.png' ),

		transform: [1, 0, 0, 1, 0, 0],

		preRender: null,
		preContext: null,

		_initLevel: false,

		init: function() {
			//ig.Entity._debugShowBoxes = true;

			this.restarting = false;

			var test = new ig.Image('media/test.jpg');

			// Initialize your game here; bind keys etc.
			ig.input.bind(ig.KEY.UP_ARROW, 'UP');
			ig.input.bind(ig.KEY.DOWN_ARROW, 'DOWN');
			ig.input.bind(ig.KEY.LEFT_ARROW, 'LEFT');
			ig.input.bind(ig.KEY.RIGHT_ARROW, 'RIGHT');

			ig.input.bind(ig.KEY.Z, 'UP');
			ig.input.bind(ig.KEY.S, 'DOWN');
			ig.input.bind(ig.KEY.Q, 'LEFT');
			ig.input.bind(ig.KEY.D, 'RIGHT');

			ig.input.bind(ig.KEY.A, 'LEFT');
			ig.input.bind(ig.KEY.W, 'UP');

			ig.input.bindTouch( '#buttonLeft', 'LEFT' );
			ig.input.bindTouch( '#buttonRight', 'RIGHT' );
			ig.input.bindTouch( '#buttonUp', 'UP' );
			ig.input.bindTouch( '#buttonDown', 'DOWN' );

			ig.input.bind(ig.KEY.SPACE, 'ACTION');

			ig.input.bind(ig.KEY.T, 'RELOAD');

			this.map = this.spawnEntity('Map', 0, 0);

			this.man = this.spawnEntity('Man', ig.global.TILE_SIZE, ig.global.TILE_SIZE);

			this.preRender = ig.$new('canvas');
			this.preRender.width = ig.system.canvas.width;
			this.preRender.height = ig.system.canvas.height;
			this.preContext = this.preRender.getContext('2d');
/*
			this.sortBy = function( a, b ) {
				if (a instanceof Map) {
					return -1;
				} else if (a instanceof Hatch) {
					return -1;
				}
				// (b.pos.x - a.pos.x) +
				return (a.pos.y + a.size.y - a.offset.y) - (b.pos.y + b.size.y - b.offset.y);

				//return a.tile.y - b.tile.y;
				//return a.pos.y - b.pos.y
			};
			*/
			this.restartCoutDown = new ig.Timer();
			//this.levelUp();
			this._initLevel = true;
		},

		levelUp: function() {
			if (ig.global.currentLevel > ig.global.LEVEL_COUNT - 1) ig.global.currentLevel = 0; // TODO for debug purpose
			ig.global.currentLevel += 1;
			this.loadLevel();
		},

		loadLevel: function() {
			this.map.loadLevel(ig.copy(window['level' + ig.global.currentLevel]));
		},

		restart: function() {
			ig.system.setGame(Cube);
		},

		update: function() {
			if (this._initLevel) {
				this._initLevel = false;
				this.loadLevel();
			}

			// Update all entities and backgroundMaps
			this.parent();
			this.sortEntitiesDeferred();

			if (this.restarting && this.restartCoutDown.delta() > 0) {
				this.restart();
			}

			if (ig.input.pressed('RELOAD')) {
				this.restart();
			}

		},

		gameOver: function() {
			if (!this.restarting) {
				this.restarting = true;
				this.restartCoutDown.set(RESTART_COUNTDOWN);
			}
		},

		draw: function() {
			var originalContext = ig.system.context;
			ig.system.context = this.preContext;

			// fake perspective movement:
			this.transform[1] = (ig.game.man.pos.x / ig.game.map.size.x - 0.5) * 0.04;
			this.transform[5] = - this.transform[1] * 200;

			// Draw all entities and backgroundMaps
			this.parent();

			ig.system.context = originalContext;
			ig.system.context.save();

			ig.system.context.transform(
				this.transform[0], this.transform[1], this.transform[2],
				this.transform[3], this.transform[4], this.transform[5]
			);
			ig.system.context.drawImage(this.preRender, 0, 0);
			ig.system.context.restore();
		}
	});

	var width = window.innerWidth;
	var height = window.innerHeight;

	if( ig.ua.mobile ) {

		// All other mobile devices
	 	ig.main( '#canvas', Cube, 60, width / 3, height / 3, 3);
	}
	else {
	   // Desktop browsers
	   // Start the Game with 60fps, a resolution of 320x240, scaled
	   // up by a factor of 2

		ig.main('#canvas', Cube, 60, width / 4, height / 4, 4);
	}
});
