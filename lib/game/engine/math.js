ig.module(
	'game.engine.math'
)
.defines(function(){
    ig.math = {
        lerp: function(a, b, t) {
            return (1 - t) * a + t * b;
        }
    }
});
