ig.module(
	'game.debug.sounds-panel'
)
.requires(
	'impact.debug.menu',
	'impact.game'
)
.defines(function(){ "use strict";


ig.Game.inject({
	
	update: function() {
		this.parent();
		if (ig.global.currentLevel > 0 && ig.game.mainThemeSfx && ig.game.mainThemeSfx.currentClip) {
			if (!ig.Game._enableMainTheme) {
				ig.game.mainThemeSfx.stop();
			} else {
				if (ig.game.mainThemeSfx.currentClip.paused || ig.game.mainThemeSfx.currentClip.ended) {
					ig.game.mainThemeSfx.play();
				}
			}
		}
	}
});

ig.DebugSoundsPanel = ig.DebugPanel.extend({
	init: function( name, label ) {
		this.parent( name, label );
		ig.sounds = this;
	}
});

ig.Game._enableMainTheme = true;

ig.debug.addPanel({
	type: ig.DebugSoundsPanel,
	name: 'sounds',
	label: 'Sounds',
	options: [
		{
			name: 'SFX',
			object: ig.Sound,
			property: 'enabled'
		},
		{
			name: 'Main theme only',
			object: ig.Game,
			property: '_enableMainTheme'
		},
	]
});


});