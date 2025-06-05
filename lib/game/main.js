ig.module(
	'game.main'
)
.requires(
/*
	'impact.debug.menu',
	'impact.debug.entities-panel',
	'impact.debug.graph-panel',
	'game.debug.sounds-panel',
*/
	'impact.game',
	'impact.font',
	'impact.map',

	'plugins.tween',

	'game.map',
	'game.entity.man',
	'game.engine.preloader',

	// levels:
	'game.levels.level0',
	'game.levels.level1',
	'game.levels.level2',
	'game.levels.level3',
	'game.levels.level4',
	'game.levels.level5',
	'game.levels.level6',
	'game.levels.level7',
	'game.levels.level8',
	'game.levels.level9',
	'game.levels.level10',
	'game.levels.level11',
	'game.levels.level12',

	'game.entity.clouds'
)
.defines(function(){


	//ig.Game.SORT.Z_INDEX =  function( a, b ){ return a.zIndex - b.zIndex; }

	//ig.Sound.use = [ig.Sound.FORMAT.MP3, ig.Sound.FORMAT.OGG];
	// Globals:
	ig.global.TILE_SIZE = 16;
	ig.global.MAX_FLOOR = 10;
	ig.global.LEVEL_COUNT = 12;
	
	ig.global.DEFAULT_FONT_16 = new ig.Font('media/04b03_16.font.png');
	ig.global.DEFAULT_FONT_32 = new ig.Font('media/04b03_32.font.png');

	ig.global.currentLevel = 0;

	ig.global.showMenu = false;

	ig.global.state = 'LOGO';

	var RESTART_COUNTDOWN = 0.6;

	var MAIN_THEME_PATH = 'media/sfx/MAZERITUAL_12.*';
	var NATURE_THEME_1_PATH = 'media/sfx/NATURE_LOOP_1_LONG.*';
	var NATURE_THEME_2_PATH = 'media/sfx/NATURE_LOOP_2_SHORT.*';

	AmazerGame = ig.Game.extend({

		transform: [1, 0, 0, 1, 0, 0],

		preRender: null,
		preContext: null,

		_initLevel: false,

		paused: false,
		toBeContinued: false,
		showMenu: false,

		key: null,

		overlayText: null,

		gameLogoImage: new ig.Image("media/amazer-logo.png"),

		mainThemeSfx: new ig.Sound(MAIN_THEME_PATH, false),
		
		// setup for preload only
		natureTheme1Sfx: new ig.Sound(NATURE_THEME_1_PATH, false),
		natureTheme2Sfx: new ig.Sound(NATURE_THEME_2_PATH, false),

		init: function() {
			
			ig.global.showMenu = ig.global.currentLevel === 0;
			this.showMenu = ig.global.showMenu;

			this.restarting = false;

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
			this.map.z = 3;

			this.preRender = ig.$new('canvas');
			this.preRender.width = ig.system.canvas.width;
			this.preRender.height = ig.system.canvas.height;
			this.preContext = this.preRender.getContext('2d');

                        this.restartCountdown = new ig.Timer();

			this.overlayDelay = 2;
			this._initLevel = true;

			this.sortBy = ig.Game.SORT.TOP_DOWN;
			//this.sortBy = ig.Game.SORT.Z_INDEX;

			ig.music.add(NATURE_THEME_1_PATH);
			ig.music.add(NATURE_THEME_2_PATH);
			ig.music.random = true;
		},

		levelUp: function() {
			this.key = null;
			if (ig.global.currentLevel > ig.global.LEVEL_COUNT - 1) {
				this.toBeContinued = true;
				this.paused = true;
			} else {
				ig.global.currentLevel += 1;
				this.loadLevel();
			}
		},

		loadLevel: function() {

			this.overlayDelay = 2;
			this.overlayText = '';

			if (ig.global.currentLevel === 0) {
				ig.music.play();
			} else if (ig.global.currentLevel > 0) {
				this.overlayText = 'Level ' + ig.global.currentLevel;
				if (ig.global.currentLevel === 1) {
					ig.music.stop();
					this.mainThemeSfx.loop = true;
					this.mainThemeSfx.play();
				} else if (ig.global.currentLevel === 11) {
					this.mainThemeSfx.stop();
				} else if (ig.global.currentLevel === 12) {
					this.mainThemeSfx.play();
				}
			}

			this.map.loadLevel(ig.copy(window['level' + ig.global.currentLevel]));
		},

		restart: function() {
			this.restarting = false;
			if (!ig.game.man || ig.game.man._killed) {
				ig.game.man = ig.game.spawnEntity('Man', Man.respawnAt.x, Man.respawnAt.y);
			}
			
			if (this.key) {
				this.key.setVisible(true);
			}
		},

		update: function() {
			if (this._initLevel) {
				this._initLevel = false;
				this.loadLevel();
			}

			if (this.key) {
				this.key.pos.x = ig.global.TILE_SIZE * 5 + 4;
				this.key.pos.y = ig.global.TILE_SIZE * 6 + 6;
				this.key.setVisible(true);
			}

			this.overlayDelay -= ig.system.tick;
			if (this.overlayDelay < 0.8) this.overlayText = null; // text disappear before the overlayDelay disappear totaly

			if (this.showMenu) {
				if (this.overlayDelay < 0.5) this.overlayDelay = 0.5;
				if (ig.input.pressed("PAUSE") || ig.input.pressed("CANVAS_TOUCH")) {
					this.showMenu = false;
					this.map.goDown();
				}
			} else {
				if (ig.input.pressed("PAUSE") || (this.paused && ig.input.pressed("CANVAS_TOUCH"))) {
					this.paused = !this.paused;
				}
				if (this.paused) {
					return;
				}
			}

			// Update all entities and backgroundMaps
			this.parent();
			this.sortEntitiesDeferred();

                        if (this.restarting && this.restartCountdown.delta() > 0) {
				this.restart();
			} else {
				if (!this.paused && this.toBeContinued) {
					// begin of game
					ig.game.man.kill();
					this.toBeContinued = false;
					ig.global.currentLevel = 1;
					this._initLevel = true;
					this.restart();
				}
			}

			if (ig.input.pressed('RELOAD')) {
				//this.levelUp();
			}
		},

		gameOver: function() {
			if (!this.restarting) {
				this.restarting = true;
                                this.restartCountdown.set(RESTART_COUNTDOWN);
			}
		},

		draw: function() {
			var originalContext = ig.system.context;
			ig.system.context = this.preContext;
			if (ig.game.man) {
				// fake perspective movement:
				this.transform[1] = ig.math.lerp(
					this.transform[1],
					(ig.game.man.pos.x / ig.game.map.size.x - 0.5) * 0.04,
					ig.system.tick * 6
				);
				this.transform[5] = - this.transform[1] * 200;
			}

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

			if (this.overlayDelay > 0) {
				ig.system.context.fillStyle = "rgba(0, 0, 0, " + this.overlayDelay + ")";
				ig.system.context.fillRect(
					0, 0, ig.system.width * ig.system.scale, ig.system.height * ig.system.scale
				);

				if (this.overlayText) {
					ig.global.DEFAULT_FONT_32.draw(
						this.overlayText,
						ig.system.width / 2, ig.system.height / 2 - 10, ig.Font.ALIGN.CENTER
					);
				}
			}

			if (this.showMenu) {
				_showMenu();
			} else if (this.paused) {

				if (this.toBeContinued) {
					_showToBeContinued();
				} else {
					_showPause();
				}

			} else {
				if (this.overlayDelay < 0.8) {
					_drawLevelBar();
				}
			}
		}
	});

	function _drawLevelBar() {
		var bar = {
			x: ig.global.TILE_SIZE,
			y: ig.game.map.getHeight() - ig.global.TILE_SIZE + 2, // bar.margin
			width: 2,
			height: 2,
			margin: 2
		};

		var floorCount = ig.game.map.floors.length;

		for (var i = 0; i < floorCount; i++) {
			if (i === ig.game.map.z) {
				ig.system.context.fillStyle = "rgba(200, 200, 200, 255)";
			} else {
				ig.system.context.fillStyle = "rgba(30, 30, 30, 255)";
			}
			
			ig.system.context.fillRect(
				bar.x * ig.system.scale, bar.y * ig.system.scale, bar.width * ig.system.scale, bar.height * ig.system.scale
			);
			bar.x += bar.margin * 2;
		}
	}

	function _showMenu() {
		
		ig.global.DEFAULT_FONT_32.draw(
			'AMAZER',
			ig.system.width * 0.5,
			38,
			ig.Font.ALIGN.CENTER
		);

		ig.global.DEFAULT_FONT_16.draw(
			'Click to play',
			ig.system.width * 0.5,
			52,
			ig.Font.ALIGN.CENTER
		);

		ig.global.DEFAULT_FONT_16.alpha = 0.6;
		ig.global.DEFAULT_FONT_16.draw(
			'Sounds and music\n by David Young',
			ig.system.width * 0.5,
			90,
			ig.Font.ALIGN.CENTER
		);
		ig.global.DEFAULT_FONT_16.alpha = 1;
	}

	function _showToBeContinued() {
		ig.system.context.fillStyle = "rgba(0, 0, 0, 0.4)";
		ig.system.context.fillRect(
			0, 0, ig.system.width * ig.system.scale, ig.system.height * ig.system.scale
		);

		ig.global.DEFAULT_FONT_16.draw(
			'Thank you\nfor playing!',
			ig.system.width * 0.5,
			38,
			ig.Font.ALIGN.CENTER
		);
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

	// advanced sort
	ig.Game.SORT.TOP_DOWN = function(a, b) {
		if (a instanceof Clouds) {
			return 1;
		}
		if (b instanceof Clouds) {
			return 0;
		}
		var orderIndex = ig.Game.SORT.Z_INDEX(a, b);
		if (orderIndex === 0) {
			return ig.Game.SORT.POS_Y(a, b);
		}
		return orderIndex;
	};

	setTimeout(function() {

		ig.$('#logo').style.display = "none";
		ig.$('#game').style.display = "block";

		var size = 7 * ig.global.TILE_SIZE * 4;
		if( ig.ua.mobile ) {
			// All other mobile devices
			ig.main( '#canvas', AmazerGame, 60, 320 / 3, window.innerHeight / 3, 3);
			//ig.$('#pad').style.display = "block";
		} else {
			// Desktop browsers
			ig.main('#canvas', AmazerGame, 60, size / 4, size / 4, 4);
		}

	}, 1300);


	//window.scrollTo(0, 1);
});
