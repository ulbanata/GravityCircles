
$(document).ready(function(){

	var listOfCircles = [];
	var positionX = [];  //x position of the circles
	var positionY = [];  //y position of the circles
	var massArr = [];  //Mass of each circle
	var G = -0.667; //Gravitational Constant
	var interval = 1;
	function randInt(minVal, maxVal) {
		var rInt = minVal + (Math.random() * (maxVal - minVal));
		return rInt;
	}

	function Sun(className, id) {
		var id = id;
		var mass = 1000000;
		massArr.push(mass);
		var x = $(window).width()/2;
		var y = $(window).height()/2;

		var color = "";
		var className = className;
		var oneCircle = document.createElement("div");
		oneCircle.className = className;
		oneCircle.id = id;
		document.body.appendChild(oneCircle);
		var el = $("#" + id);
		el.css( "left", x + "px" );
		el.css( "top", y + "px" );

		this.updatePosition = function() {
			positionX[id] = x;
			positionY[id] = y;
		}
	}

	function Circle(className, id) {
		var id = id;
		var mass = 25000;
		if(className == "circle small"){
			mass = 10000;
		} else if(className == "circle medium"){
			mass = 17000;
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
			x = x + Math.round(xVel);
			y = y + Math.round(yVel);
			console.log("x: " + x);
			console.log("y: " + y);

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
				if(listOfCircles[i] != listOfCircles[id]){
					console.log("x" + x);
					console.log("y" + y);
					var xDist = (x - positionX[i]);
					var yDist = (y - positionY[i]);
					// console.log("xDist" + xDist);
					// console.log("yDist" + yDist);
					var distBetween = Math.sqrt(Math.pow(xDist,2)+Math.pow(yDist,2));
					var acc = (G*massArr[i])/(Math.pow(distBetween,2));
					// console.log(acc)
					var accX = accX + acc*(xDist/distBetween);
					var accY = accY + acc*(yDist/distBetween);
					// console.log("accX " + accX);
					// console.log("accY " + accY);
				}
			}
			xVel = xVel + accX*timeInterval/1000;
			yVel = yVel + accY*timeInterval/1000;
			// console.log("timeInt: " + timeInterval)
			// console.log("xVel: " + xVel);
			// console.log("yVel: " + yVel);

		}
	}

	// floatingCircle();
	for (var i = 0; i <= 9; i++) {
		if (i < 3) {
			listOfCircles[i] = new Circle("circle small", i);
		} else if (i >= 3 && i < 6) {
			listOfCircles[i] = new Circle("circle med", i);
		} else if (i >= 6 && i < 9) {
			listOfCircles[i] = new Circle("circle large", i);
		} else
			listOfCircles[i] = new Sun("circle x-large", i);
	}


	var motionInterval = setInterval(function() {

		for (var i = 0; i < listOfCircles.length; i++) {
			listOfCircles[i].updatePosition();
		}
		for (var i = 0; i < listOfCircles.length-1; i++) {
			listOfCircles[i].updateVelocity(interval);
		}
		for (var i = 0; i < listOfCircles.length-1; i++) {
			listOfCircles[i].move();
		}
	}, interval);
});

