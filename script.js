
$(document).ready(function(){

	var listOfCircles = [];
	var positionX = [];  //x position of the circles
	var positionY = [];  //y position of the circles
	var massArr = [];  //Mass of each circle
	var G = -667; //Gravitational Constant
	var interval = 10000;
	function randInt(minVal, maxVal) {
		var rInt = minVal + (Math.random() * (maxVal - minVal));
		return rInt;
	}

	function Circle(className, id) {
		var id = id;
		var mass = 250;
		if(className == "circle small"){
			mass = 100;
		} else if(className == "circle medium"){
			mass = 170;
		}
		massArr.push(mass);  //2Adds the mass to the array for access
		var x = randInt(0, $(window).width());
		var y = randInt(0, $(window).height());
		console.log(x)
		// var radius = 0;
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

		this.move = function() {//velocity){
			x += xVel;
			y += yVel;


			el.css( "left", x + "px" );
			el.css( "top", y + "px" );
		}

		this.updatePosition = function() {
			positionX[id] = x;
			positionY[id] = y;
		}

		this.updateVelocity = function(timeInterval) {
			var accX = 0;
			var accY = 0;
			for (var i = 0; i < listOfCircles.length; i++) {
				console.log("x" + x);
				console.log("y" + y);
				var xDist = x - positionX[i];
				var yDist = y - positionY[i];
				console.log("xDist" + xDist);
				console.log("yDist" + yDist);
				var distBetween = Math.sqrt(Math.pow(xDist,2)+Math.pow(yDist,2));
				var acc = (G*massArr[i])/(Math.pow(distBetween,2));
				console.log(acc)
				var accX = acc*(xDist/distBetween);
				var accY = acc*(yDist/distBetween);
				console.log("accX " + accX);
				console.log("accY " + accY)
			}
			xVel += accX*timeInterval/1000;
			yVel += accY*timeInterval/1000;

		}
	}

	// floatingCircle();
	for (var i = 0; i <= 15; i++) {
		if (i < 5) {
			listOfCircles[i] = new Circle("circle small", i);
		} else if (i >= 5 && i < 10) {
			listOfCircles[i] = new Circle("circle med", i);
		} else if (i >= 10) {
			listOfCircles[i] = new Circle("circle large", i);
		}
	}


	var motionInterval = setInterval(function() {

		for (var i = 0; i < listOfCircles.length; i++) {
			listOfCircles[i].updatePosition();
		}
		for (var i = 0; i < listOfCircles.length; i++) {
			listOfCircles[i].updateVelocity();
		}
		for (var i = 0; i < listOfCircles.length; i++) {
			listOfCircles[i].move();
		}
	}, interval);
});

