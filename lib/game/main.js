ig.module(
	'game.main'
)
.requires(

//	'impact.debug.menu',
//	'impact.debug.entities-panel',
//	'impact.debug.graph-panel',
//	'impact.debug.entities-panel',

	'impact.game',
	'impact.font',
	'impact.map',

	'plugins.tween',

	'game.map',
	'game.entity.man',
	'game.engine.preloader',

	// levels:
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
	ig.global.DEFAULT_FONT_16 = new ig.Font('media/04b03_16.font.png');
	ig.global.DEFAULT_FONT_32 = new ig.Font('media/04b03_32.font.png');

	ig.global.currentLevel = 1;
	ig.global.showMenu = true;

	var RESTART_COUNTDOWN = 0.6;

	AmazerGame = ig.Game.extend({


		// Load a font
		//font: new ig.Font( 'media/04b03.font.png' ),

		transform: [1, 0, 0, 1, 0, 0],

		preRender: null,
		preContext: null,

		_initLevel: false,

		paused: false,
		showMenu: true,

		init: function() {

			this.showMenu = ig.global.showMenu;
			ig.global.showMenu = false;

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

			ig.input.bind(ig.KEY.SPACE, 'PAUSE');
			ig.input.bind(ig.KEY.MOUSE1, "CANVAS_TOUCH");

			ig.input.bind(ig.KEY.T, 'RELOAD');

			this.map = this.spawnEntity('Map', 0, 0);

			this.man = this.spawnEntity('Man', ig.global.TILE_SIZE, ig.global.TILE_SIZE);

			this.preRender = ig.$new('canvas');
			this.preRender.width = ig.system.canvas.width;
			this.preRender.height = ig.system.canvas.height;
			this.preContext = this.preRender.getContext('2d');

			this.restartCoutDown = new ig.Timer();

			this.overlay = 1.3;
			this._initLevel = true;
		},

		levelUp: function() {
			if (ig.global.currentLevel > ig.global.LEVEL_COUNT - 1) ig.global.currentLevel = 0; // TODO for debug purpose
			ig.global.currentLevel += 1;
			this.overlay = 1.2;
			this.loadLevel();
		},

		loadLevel: function() {
			this.map.loadLevel(ig.copy(window['level' + ig.global.currentLevel]));
		},

		restart: function() {
			ig.system.setGame(AmazerGame);
		},

		update: function() {
			if (this._initLevel) {
				this._initLevel = false;
				this.loadLevel();
			}

			this.overlay -= ig.system.tick;
			if (this.overlay < 0) this.overlay = 0;

			if (this.showMenu) {
				if (this.overlay < 0.3 || ig.game.man && ig.game.man.vel.x > 0 || ig.game.man.vel.y > 0) {
					this.showMenu = false;
				}
			} else {
				if (ig.input.pressed("PAUSE")) {//} || ig.input.pressed("CANVAS_TOUCH")) {
					this.paused = !this.paused;
				}
				if (this.paused) return;
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
			this.transform[1] = ig.math.lerp(
				this.transform[1],
				(ig.game.man.pos.x / ig.game.map.size.x - 0.5) * 0.04,
				ig.system.tick * 6
			);
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

			if (this.overlay > 0) {
				ig.system.context.fillStyle = "rgba(0, 0, 0, " + this.overlay + ")";
				ig.system.context.fillRect(
					0, 0, ig.system.width * ig.system.scale, ig.system.height * ig.system.scale
				);
			}

			if (this.showMenu) {
				_showMenu();
			} else if (this.paused) {
				_showPause();
			}
		}
	});

	function _showMenu() {
		ig.global.DEFAULT_FONT_32.draw(
			'AMAZER',
			ig.system.width * 0.5,
			(7 * ig.global.TILE_SIZE / 2) - 12,
			ig.Font.ALIGN.CENTER
		);
/*
		if (ig.game.overlay < 0.6) {
			ig.global.DEFAULT_FONT_16.draw(
				'Move\nto start',
				ig.system.width * 0.5,
				(7 * ig.global.TILE_SIZE / 2) - 8,
				ig.Font.ALIGN.CENTER
			);
		}
		*/
	}

	function _showPause() {
		ig.system.context.fillStyle = "rgba(0, 0, 0, 0.4)";
		ig.system.context.fillRect(
			0, 0, ig.system.width * ig.system.scale, ig.system.height * ig.system.scale
		);

		ig.global.DEFAULT_FONT_16.draw(
			'[PAUSE]',
			ig.system.width * 0.5,
			(7 * ig.global.TILE_SIZE / 2) - 8	,
			ig.Font.ALIGN.CENTER
		);
	}

	var size = 7 * ig.global.TILE_SIZE * 4;
	if( ig.ua.mobile ) {
		// All other mobile devices
		ig.main( '#canvas', AmazerGame, 60, 320 / 3, window.innerHeight / 3, 3);
		//ig.$('#pad').style.display = "block";
	} else {
		// Desktop browsers
		ig.main('#canvas', AmazerGame, 60, size / 4, size / 4, 4);
	}

	window.scrollTo(0, 1);
});
