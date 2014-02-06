
$(document).ready(function(){

	var listOfCircles = [];
	function randInt(minVal, maxVal) {
		var rInt = minVal + (Math.random() * (maxVal - minVal));
		return rInt;
	}

	function Circle(className, id) {
		var id = id;
		var x = randInt(0, $(window).width());
		var y = randInt(0, $(window).height());
		var radius = 0;
		var xVel = randInt(-1,1);
		var yVel = randInt(-1,1);
		var color = "";
		var className = className;	
		var oneCircle = document.createElement("div");
		oneCircle.className = className;
		oneCircle.id = id;
		document.body.appendChild(oneCircle);
		var el = $("#" + id);
		el.css( "left", x + "px" );
		el.css( "top", y + "px" );

		this.move = function(){
			x += xVel;
			y += yVel;
			if (x >= $(window).width() || x <= -100){
				xVel = -xVel
				x += 2 * xVel
			}
			if (y >= $(window).height() || y <= -100){
				yVel = -yVel
				y += 2 * yVel
			}

			el.css( "left", x + "px" );
			el.css( "top", y + "px" );
		}
	}


	// floatingCircle();
	for (var i = 0; i <= 30; i++) {
		if (i < 10) {
			listOfCircles[i] = new Circle("circle small", i);
		} else if (i >= 10 && i < 20) {
			listOfCircles[i] = new Circle("circle med", i);
		} else if (i >= 20) {
			listOfCircles[i] = new Circle("circle large", i);
		}
	}	

	var motionInterval = setInterval(function() {
		for (var i = 0; i < listOfCircles.length; i++) {
			listOfCircles[i].move();
		}
	}, 20); 
});

