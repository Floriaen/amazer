ig.module(
	'game.entity.clouds'
)
.requires(
	'impact.entity'
)
.defines(function(){

	function createPattern(img) {
		var c = ig.$new('canvas');
		var ctx = c.getContext("2d");

		var pattern = ctx.createPattern(img, "repeat");
		ctx.rect(0, 0, ig.system.width * ig.system.scale, ig.system.height * ig.system.scale);
		ctx.fillStyle = pattern;
		ctx.fill();

		return c;
	}

	function createClouds() {

		var width = ig.system.width;// / 2;
		var height = ig.system.height;// / 2;

		var c = ig.$new('canvas');
		c.width = width * ig.system.scale;
		c.height = height * ig.system.scale;
		var ctx = c.getContext("2d");

		var originalContext = ig.system.context;
		ig.system.context = ctx;
/*
		ig.system.context.strokeStyle = "#FF0000";
		ig.system.context.rect(0, 0, width * ig.system.scale, height * ig.system.scale);
		ig.system.context.stroke();
*/
		for (var i = 0; i < 20; i++) {
			// place randomly a cloud
			//ig.system.context.globalAlpha = Math.random() * 0.5 + 0.5;
			var image = Clouds.samples[Math.round(Math.random() * (Clouds.samples.length - 1))];

			var x = Math.floor(Math.random() * width);
			var y = Math.floor(Math.random() * height);
			image.draw(x, y);

			// handle clouds on the edge
			var diffX = (x + image.width > width) ? width - x : 0;
			var diffY = (y + image.height > height) ? height - y : 0;
			
			if (diffX > 0) {
				image.draw(- diffX, y);
			}

			if (diffY > 0) {
				image.draw(x, - diffY);
			}

			if (diffX > 0 && diffY > 0) {
				image.draw(- diffX, - diffY);
			}
		}

		ig.system.context.globalAlpha = 1;
		ig.system.context = originalContext;

		return c;
	}

	function grayscale(pixels, args) {
		var d = pixels.data;
		for (var i = 0; i < d.length; i += 4) {
			/*
			var r = d[i];
			var g = d[i + 1];
			var b = d[i + 2];
			d[i] = d[i + 1] = d[i + 2] = (r+g+b)/3;
			*/

			d[i] = d[i + 1] = d[i + 2] = 103;

		}
		return pixels;
	};

	Clouds = MapEntity.extend({

		ignoreCollisionMap: false,
		zIndex: 100,
		xx: 0,
		yy: 0,
		updateDelay: 0.04,

		init: function(x, y, settings) {
			ig.merge(this, settings);
			this.parent(x, y, settings);

			this.backgroundCanvas = ig.$new('canvas');
			this.backgroundCanvas.width = ig.system.width * ig.system.scale;
			this.backgroundCanvas.height = ig.system.height * ig.system.scale;
			this.backgroundContext = this.backgroundCanvas.getContext('2d');

			if (!Clouds.pixels) {
				Clouds.pixels = createClouds();
			}

			if (this.grayfilter) {
				var c = Clouds.pixels.getContext('2d');
				var imageData = c.getImageData(0, 0, Clouds.pixels.width, Clouds.pixels.height);
				grayscale(imageData);
				c.putImageData(imageData, 0, 0);
			}
			this.pattern = this.backgroundContext.createPattern(Clouds.pixels, "repeat");
		},

		update: function() {
			this.parent();
			this.yy += ig.system.tick * 20;
			this.xx += ig.system.tick * 20;

			this.updateDelay -= ig.system.tick;
			//if (this.updateDelay < 0) {
				this.updateDelay = 0.04;
				this.backgroundContext.save();
				this.backgroundContext.clearRect(0, 0, this.backgroundCanvas.width, this.backgroundCanvas.height);
				this.backgroundContext.translate(this.xx, this.yy);
				this.backgroundContext.rect(0, 0, ig.system.width * ig.system.scale, ig.system.height * ig.system.scale);
				this.backgroundContext.fillStyle = this.pattern;
				this.backgroundContext.fill();
				this.backgroundContext.restore();
			//}
		},

		draw: function() {
			if (this.onMap) {
				if (this.grayfilter) {
					ig.system.context.globalCompositeOperation = "darken";
				}
				ig.system.context.drawImage(this.backgroundCanvas, 0, 0);
				if (this.grayfilter) {
					ig.system.context.globalCompositeOperation = "source-over";
				}
			}
		}
	});

	Clouds.samples = [
		new ig.Image('media/cloud/cloud1.png'),
		new ig.Image('media/cloud/cloud2.png'),
		new ig.Image('media/cloud/cloud3.png')
	];
});