const armonia_angular_cuadricula = function (p) {
	const parameters = {
	  N: 2400,
	  N_MICRO: 0,
	  V_R: -0.1,
	  BRIGHT: 1,
	  phi_1: -1.5707963267948966,
	  d_phi: 1,
	};

	p.setup = function() {
	  p.pixelDensity(1);
	  p.width = 500;
	  p.height = 500;
	  p.createCanvas(p.width, p.height);
	  
	  p.background(180);
	  p.loadPixels();

	  preprocess();
	}

	function preprocess() {
	  preprocessed = [];
	  var widthHalf = p.width / 2;
	  var heightHalf = p.height / 2;

	  for (var y = -heightHalf; y < heightHalf; y++) {
		for (var x = -widthHalf; x < widthHalf; x++) {
		  var v_xy_R = p.createVector(y, x);
		  var ang_R = v_xy_R.heading();
		  var ang_R2 = ang_R * (parameters.N + parameters.N_MICRO);

		  preprocessed.push(ang_R2);
		}
	  }
	}

	p.draw = function() {
	  var count = 0;
	  var widthHalf = p.width / 2;
	  var heightHalf = p.height / 2;
	  var indexVH = 0;
	  var phi_1 = parameters.phi_1;

	  for (var x = -widthHalf; x < widthHalf; x++) {
		for (var y = -heightHalf; y < heightHalf; y++) {
		  var pixel =
			((Math.cos(preprocessed[indexVH] + phi_1) + 1) / 2) *
			parameters.BRIGHT *
			255;
		  p.pixels[count] = pixel;
		  p.pixels[count + 1] = pixel;
		  p.pixels[count + 2] = pixel;
		  count += 4;
		  indexVH += 1;
		}
	  }

	  parameters.phi_1 += -parameters.V_R / parameters.d_phi;
	  p.updatePixels();
	}
}
