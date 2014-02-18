
$(document).ready(function(){

	var listOfCircles = [];
	var positionX = [];  //x position of the circles
	var positionY = [];  //y position of the circles
	var massArr = [];  //Mass of each circle
	var G = -0.667; //Gravitational Constant
	var interval = 10;
	function randInt(minVal, maxVal) {
		var rInt = minVal + (Math.random() * (maxVal - minVal));
		return rInt;
	}

	function Sun(className, id) {
		var id = id;
		var mass = 700000;
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
		var mass = 250000;
		if(className == "circle small"){
			mass = 100000;
		} else if(className == "circle medium"){
			mass = 170000;
		}
		massArr.push(mass);  //2Adds the mass to the array for access
		var x = randInt($(window).width()*1/3, $(window).width()*2/3);
		var y = randInt($(window).height()*1/3, $(window).height()*2/3);
		// var x = randInt(0, $(window).width());
		// var y = randInt(0, $(window).height());
		//Tries to get an orbit going with set velocities
		// if(x > $(window).width()/2 && y > $(window).height()/2) {
		// 	var xVel = 0;
		// 	var yVel = -1;
		// } else if (x < $(window).width()/2 && y > $(window).height()/2) {
		// 	var xVel = -1;
		// 	var yVel = 0;
		// } else if (x < $(window).width()/2 && y < $(window).height()/2) {
		// 	var xVel = 0;
		// 	var yVel = 1;
		// } else {
		// 	var xVel = 1;
		// 	var yVel = 0;
		// }
		//Uses random initial velocities
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
					var distBetween = Math.sqrt(Math.pow(xDist,2)+Math.pow(yDist,2));
					var acc = (G*massArr[i])/(Math.pow(distBetween,2));
					var accX = accX + acc*(xDist/distBetween);
					var accY = accY + acc*(yDist/distBetween);
				}
			}
			xVel = xVel + accX*timeInterval/100000;
			yVel = yVel + accY*timeInterval/100000;

		}
	}

	// floatingCircle();
	for (var i = 0; i <= 6; i++) {
		if (i < 2) {
			listOfCircles[i] = new Circle("circle small", i);
		} else if (i >= 2 && i < 4) {
			listOfCircles[i] = new Circle("circle med", i);
		} else if (i >= 4 && i < 6) {
			listOfCircles[i] = new Circle("circle large", i);
		} else
			listOfCircles[i] = new Sun("circle x-large", i);
	}


	var motionInterval = setInterval(function() {

		for (var i = 0; i < listOfCircles.length; i++) {
			listOfCircles[i].updatePosition();
		};
		for (var i = 0; i < listOfCircles.length-1; i++) {
			listOfCircles[i].updateVelocity(interval);
		};
		for (var i = 0; i < listOfCircles.length-1; i++) {
			listOfCircles[i].move();
		};
	}, interval);
});

