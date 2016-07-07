ig.module(
	'game.entity.stairs-blood'
)
.requires(
	'game.entity.stairs'
)
.defines(function(){

	StairsBlood = Stairs.extend({
		animSheet: new ig.AnimationSheet('media/stairsBlood.png', 12, 16),
	});

});
