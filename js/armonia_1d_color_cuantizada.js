const armonia_1d_color_cuantizada = function (p) {
	const parameters = {
	  S: 10,
	  FASE_R: 0,
	  K_M_R: 1,
	  V_PHI_M_R: 0,
	  FASE_G: 5,
	  K_M_G: 10,
	  V_PHI_M_G: 20,
	  FASE_B: 50,
	  K_M_B: 1,
	  V_PHI_M_B: 0,
	  T: 5,
	};

	p.setup = function() {
	  p.pixelDensity(1);
	  p.width = 500;
	  p.height = 500;
	  let cnv = p.createCanvas(p.width, p.height);
	  console.log("setup  w: " + p.width + " h: " + p.height);
	 
	  p.background(180);
	  p.loadPixels();
	  console.log("setup");
	  preprocess();
	}

	function preprocess() {}

	p.preload = function () {}

	p.draw = function() {
	  var widthHalf = p.width / 2;
	  var heightHalf = p.height / 2;

	  for (var x = -widthHalf; x < widthHalf; x++) {
		var factor1 = (parameters.S * x * p.TAU) / p.height;
		var factor2 = p.TAU / 360;
		var stripe_R = Math.cos(
		  parameters.K_M_R * factor1 * Math.cos(factor2) +
			parameters.FASE_R * Math.PI
		);
		var stripe_G = Math.cos(
		  parameters.K_M_G * factor1 * Math.cos(factor2) +
			parameters.FASE_G * Math.PI
		);
		var stripe_B = Math.cos(
		  parameters.K_M_B * factor1 * Math.cos(factor2) +
			parameters.FASE_B * Math.PI
		);

		for (var y = -heightHalf; y < heightHalf; y++) {
		  var idx = 4 * (x + widthHalf + (y + widthHalf) * p.width);
		  p.pixels[idx] = ((stripe_R + 1) * 255) / 2;
		  p.pixels[idx + 1] = ((stripe_G + 1) * 255) / 2;
		  p.pixels[idx + 2] = ((stripe_B + 1) * 255) / 2;
		}
	  }

	  var updateFactor = -0.04 * parameters.T;
	  parameters.FASE_R += parameters.V_PHI_M_R * updateFactor;
	  parameters.FASE_G += parameters.V_PHI_M_G * updateFactor;
	  parameters.FASE_B += parameters.V_PHI_M_B * updateFactor;
	  p.updatePixels();
	}
}
