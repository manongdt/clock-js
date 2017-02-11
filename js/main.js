$(document).ready(function(){
	displayCurrentTime();

	var c = new fabric.StaticCanvas('canvas-clock');
	drawClock(c);
});


//Display the current time of the user in a div
function displayCurrentTime(){
	var time = getCurrentTime();

	var hour = time.getHours();
	var minutes = time.getMinutes();
	var secondes = time.getSeconds();
	$("#time-display").html("<p>"+hour+":"+minutes+":"+secondes+"</p>")

	setTimeout("displayCurrentTime()", 900);
}

//Draw a clock with current time in a canvas
function drawClock(canvas){
	var cWidth = canvas.getWidth();
	var cHeight = canvas.getHeight();
	var rad;
	//move the arms center regarding the clock center
	var ratioCenter = 0.2;

	//determine the clock size
	if(cHeight >= cWidth){
		rad = cWidth/2;
	}else{
		rad = cHeight/2;
	}

	drawClockFace(canvas, rad);
	var clockArms = drawClockArms(canvas, rad, ratioCenter);
	updateState(canvas, clockArms, rad, ratioCenter);
	setInterval(updateState, 900, canvas, clockArms, rad, ratioCenter);
}

//Draw a clock face
function drawClockFace(canvas, radius){
	drawClockContour(canvas, radius);
	drawTimeMarkers(canvas, radius);
}

//Update the arms' state depending on the time
function updateState(canvas, arms, radius, ratioCenter){
	var time = getCurrentTime();
	var hour = time.getHours();
	var minutes = time.getMinutes();
	var seconds = time.getSeconds();

	var hAngle = ( hour % 12 ) * 30 + ( minutes * 0.5 );
	var mAngle = minutes * 6;
	var sAngle = seconds * 6;

	setArmPosition(arms.hourArm, radius, hAngle, ratioCenter);
	setArmPosition(arms.minArm, radius, mAngle, ratioCenter);
	setArmPosition(arms.secArm, radius, sAngle, ratioCenter);
	canvas.renderAll();

	//setTimeout(function(){ updateState(canvas, arms, radius, ratioCenter); }, 200);
}

//Draw the clock contour in a canvas
function drawClockContour(canvas, radius){
	var contour = new fabric.Circle({
		radius: radius
	});

	contour.setGradient('fill', {
	  x1: 0,
	  y1: -radius,
	  x2: 0,
	  y2: radius,
	  colorStops: {
	    0: '#fff',
	    1: '#aaa'
	  }
	});
	canvas.add(contour);
}

//Draw the time markers of the clock face - big for hours and small for minutes
function drawTimeMarkers(canvas, radius){
	drawHourMarkers(canvas, radius);
	drawMinuteMarkers(canvas, radius);
}

//Draw hour's time markers
function drawHourMarkers(canvas, radius){
	var angle = 0;
	var x = radius;
	var y = 0;
	for(var i = 0; i < 12; i++){
		drawRectangle(canvas, radius/15, radius/7, x, y, angle, 'rgb(3,3,3)', "top");
		angle = angle+30;
		x = radius + Math.sin(angle/180*Math.PI)*radius;
		y = radius - Math.cos(angle/180*Math.PI)*radius;
	}
}

//Draw minute's time markers
function drawMinuteMarkers(canvas, radius){
	var angle = 0;
	var x = radius;
	var y = 0;
	for(var i = 0; i < 60; i++){
		drawRectangle(canvas, radius/30, radius/15, x, y, angle, 'rgb(3,3,3)', "top");
		angle = angle+6;
		x = radius + Math.sin(angle/180*Math.PI)*radius;
		y = radius - Math.cos(angle/180*Math.PI)*radius;
	}
}

//Draw the clock arms
function drawClockArms(canvas, radius, ratioCenter){
	var hArm = drawHourArm(canvas, radius, ratioCenter);
	var mArm = drawMinutesArm(canvas, radius, ratioCenter);
	var sArm = drawSecondsArm(canvas, radius, ratioCenter);
	return {
		hourArm: hArm, 
		minArm: mArm,
		secArm: sArm
	};
}

//Draw the hour's arm of the clock
function drawHourArm(canvas, radius, ratioCenter){
	var armHeight = 0.7 * radius;
	var armWidth = 0.09 * radius;
	return 	drawRectangle(canvas, armWidth, armHeight, radius, (radius + ratioCenter * radius), 0, 'rgb(102, 153, 255)', "bottom");
}

//Draw the minutes' arm of the clock
function drawMinutesArm(canvas, radius, ratioCenter){
	var armHeight = 0.9 * radius;
	var armWidth = 0.05 * radius;
	return 	drawRectangle(canvas, armWidth, armHeight, radius, (radius + ratioCenter * radius), 0, 'rgb(102, 153, 255)', "bottom");
}

//Draw the seconds' arm of the clock
function drawSecondsArm(canvas, radius, ratioCenter){
	var armHeight = 0.98 * radius;
	var armWidth = 0.01 * radius;
	return 	drawRectangle(canvas, armWidth, armHeight, radius, (radius + ratioCenter * radius), 0, 'rgb(102, 153, 255)', "bottom");
}

//Set arm position in the clock
function setArmPosition(arm, radius, angle, ratioCenter){
	var corrX = -Math.sin(angle/180*Math.PI)*ratioCenter*radius;
	var corrY = Math.cos(angle/180*Math.PI)*ratioCenter*radius;
	arm.set('angle', angle);
	setPosition(arm, radius + corrX, radius + corrY);
}

//Set position of an object in a canvas
function setPosition(obj, x, y){
	obj.set('left', x);
	obj.set('top', y);
}

//Draw rectangle in a canvas
function drawRectangle(canvas, width, height, x, y, angle, color, originY){
	var rect = new fabric.Rect({
		left: x,
		top: y,
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