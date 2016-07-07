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
		if (ig.music.currentTrack) {
			if (!ig.Game._enableMainTheme) {
				ig.music.currentTrack.pause();
			} else {
				ig.music.currentTrack.play();
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
			name: 'Main theme',
			object: ig.Game,
			property: '_enableMainTheme'
		}
	]
});


});