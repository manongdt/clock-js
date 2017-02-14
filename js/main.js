$(document).ready(function(){
	//displayCurrentTime();

	var c = new fabric.StaticCanvas('canvas-clock');

	drawClock(c);
});


//Display the current time of the user in a div to check the result
function displayCurrentTime(){
	var time = getCurrentTime();

	var hour = time.getHours();
	var minutes = time.getMinutes();
	var secondes = time.getSeconds();
	$("#time-display").html("<p>"+hour+":"+minutes+":"+secondes+"</p>")

	setTimeout("displayCurrentTime()", 900);
}


// 		**** CLOCK FUNCTIONS ****

//Draw a clock with current time in a canvas
function drawClock(canvas){
	var cWidth = canvas.getWidth();
	var cHeight = canvas.getHeight();
	//move arms rotation center regarding to the clock center
	var ratioCenter = 0.15;

	//Clock radius determined by canvas' size
	var rad;
	if(cHeight >= cWidth){
		rad = 0.7 * cWidth/2;
	}else{
		rad = 0.7 * cHeight/2;
	}
	drawClockFace(canvas, rad);
	var clockArms = drawClockArms(canvas, rad, ratioCenter);
	//Update the time displayed when page loaded
	updateState(canvas, clockArms, rad, ratioCenter);
	//Update the time displayed every 900ms
	setInterval(updateState, 900, canvas, clockArms, rad, ratioCenter);
}

//Draw the clock face
function drawClockFace(canvas, radius){
	drawClockContour(canvas, radius);
	//Draw minute time markers
	drawTimeMarkers(canvas, radius, 60, radius/40, radius/15);
	//Draw hour time markers
	drawTimeMarkers(canvas, radius, 12, radius/20, radius/7);
}

//Draw the clock circle background
function drawClockContour(canvas, radius){
	var contour = new fabric.Circle({
		radius: radius
	});
	contour.setGradient('fill', {
	  type: 'radial',
	    r1: radius,
	    r2: 12,
	    x1: radius,
	    y1: radius,
	    x2: radius,
	    y2: radius,
	    colorStops: {
	        0: '#0000b3',
	        0.2: '#8080ff',
	        0.25: '#ccccff',
	        0.95: '#ccccff',
	        1: '#0000b3'
	    }
	});
	canvas.add(contour);
}

//Draw time markers of the clock face
function drawTimeMarkers(canvas, radius, number, width, height){
	var angle = 0;
	var x = radius;
	var y = 0;
	for(var i = 0; i < number; i++){
		drawRectangle(canvas, width, height, x, y, angle, '#ffffff', "top");
		angle = angle + (360 / number);
		x = radius + Math.sin(angle/180*Math.PI)*radius;
		y = radius - Math.cos(angle/180*Math.PI)*radius;
	}
}

//Draw clock arms and return an object to manipulate the arms
function drawClockArms(canvas, radius, ratioCenter){
	var hArm = drawArm(canvas, radius, ratioCenter, 0.6 * radius, 0.06 * radius, '#0000b3');
	var mArm = drawArm(canvas, radius, ratioCenter, 0.8 * radius, 0.04 * radius, '#0000b3');
	var sArm = drawArm(canvas, radius, ratioCenter, 0.95 * radius, 0.02 * radius, '#ffffff');
	return {
		hourArm: hArm, 
		minArm: mArm,
		secArm: sArm
	};
}

//Draw a clock arm
function drawArm(canvas, radius, ratioCenter, armHeight, armWidth, color){
	return 	drawRectangle(canvas, armWidth, armHeight, radius, (radius + ratioCenter * radius), 0, color, "bottom");
}

//Update the arms' state depending on the time
function updateState(canvas, arms, radius, ratioCenter){
	//get the current time
	var time = getCurrentTime();
	var hour = time.getHours();
	var minutes = time.getMinutes();
	var seconds = time.getSeconds();

	//convert the time with the corresponding angle
	var hAngle = ( hour % 12 ) * 30 + ( minutes * 0.5 );
	var mAngle = minutes * 6;
	var sAngle = seconds * 6;

	//update the arm position to the new time
	setArmPosition(arms.hourArm, radius, hAngle, ratioCenter);
	setArmPosition(arms.minArm, radius, mAngle, ratioCenter);
	setArmPosition(arms.secArm, radius, sAngle, ratioCenter);
	canvas.renderAll();
}

//Set arm position in the clock
function setArmPosition(arm, radius, angle, ratioCenter){
	//correction of the arm position in order to have its rotating center more realistic
	var corrX = -Math.sin(angle/180*Math.PI)*ratioCenter*radius;
	var corrY = Math.cos(angle/180*Math.PI)*ratioCenter*radius;
	//set the angle of the arm (center is bottom center)
	arm.set('angle', angle);
	//set the new position
	setPosition(arm, radius + corrX, radius + corrY);
}

//Set position of an object in a canvas
function setPosition(obj, x, y){
	obj.set('left', x);
	obj.set('top', y);
}

//Draw a rectangle in a canvas
function drawRectangle(canvas, width, height, x, y, angle, color, originY){
	var rect = new fabric.Rect({
		left: x,
		top: y,
		rx: 8, 
		ry: 8,
		stroke: "#ffffff",
		strokeWidth: 0.5,
  		width: width, 
  		height: height, 
  		fill: color,
  		angle: angle,
  		originX: "center",
  		originY: originY
  	});
  	canvas.add(rect);
  	return rect;
}

//Get the current time
function getCurrentTime(){
	return new Date();
}