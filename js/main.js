$(document).ready(function(){
	displayCurrentTime();

	var c = new fabric.StaticCanvas('canvas-clock', {
		backgroundColor: 'rgb(100,100,200)',
	});
	drawClock(c);
});


//Display the current time of the user in a div
function displayCurrentTime(){
	var time = getCurrentTime();

	var hour = time.getHours();
	var minutes = time.getMinutes();
	var secondes = time.getSeconds();
	$("#time-display").html("<p>"+hour+":"+minutes+":"+secondes+"</p>")

	setTimeout("displayCurrentTime()", 1000);
}

//Draw a clock with current time centered in a canvas
function drawClock(canvas){
	var cWidth = canvas.getWidth();
	var cHeight = canvas.getHeight();
	var rad;

	//determine the clock size
	if(cHeight >= cWidth){
		rad = cWidth/2;
	}else{
		rad = cHeight/2;
	}

	drawClockFace(canvas, rad);
	updateState(canvas, rad);
}

//Draw a clock face
function drawClockFace(canvas, radius){
	drawClockContour(canvas, radius);
	drawTimeMarkers(canvas, radius);
}

//Update the arms' state depending on the time
function updateState(canvas, radius){
	var time = getCurrentTime();
	drawClockArms(canvas, radius, time.getHours(), time.getMinutes(), time.getSeconds());
	setTimeout(function(){ updateState(canvas, radius); }, 1000);
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
function drawClockArms(canvas, radius, hour, minutes, seconds){
	drawHourArm(canvas, radius, hour, minutes);
	drawMinutesArm(canvas, radius, minutes);
	drawSecondsArm(canvas, radius, seconds);
}

//Draw the hour's arm of the clock
function drawHourArm(canvas, radius, hour, minutes){
	var angle = ( hour % 12 ) * 30 + ( minutes * 0.5 );
	var armHeight = 0.7 * radius;
	var armWidth = 0.09 * radius;
	//Calcul to center the rotation point at the 
	var ratioCenter = 0.2;
	var corrX = -Math.sin(angle/180*Math.PI)*ratioCenter*armHeight;
	var corrY = Math.cos(angle/180*Math.PI)*ratioCenter*armHeight;
	drawRectangle(canvas, armWidth, armHeight, radius + corrX, radius + corrY, angle, 'rgb(3,3,3)', "bottom");
}

//Draw the minutes' arm of the clock
function drawMinutesArm(canvas, radius, minutes){
	var angle = minutes * 6;
	var armHeight = 0.9 * radius;
	var armWidth = 0.05 * radius;
	//Calcul to center the rotation point at the 
	var ratioCenter = 0.2;
	var corrX = -Math.sin(angle/180*Math.PI)*ratioCenter*armHeight;
	var corrY = Math.cos(angle/180*Math.PI)*ratioCenter*armHeight;
	drawRectangle(canvas, armWidth, armHeight, radius + corrX, radius + corrY, angle, 'rgb(3,3,3)', "bottom");
}

//Draw the seconds' arm of the clock
function drawSecondsArm(canvas, radius, seconds){
	var angle = seconds * 6;
	var armHeight = 0.98 * radius;
	var armWidth = 0.01 * radius;
	//Calcul to center the rotation point at the 
	var ratioCenter = 0.2;
	var corrX = -Math.sin(angle/180*Math.PI)*ratioCenter*armHeight;
	var corrY = Math.cos(angle/180*Math.PI)*ratioCenter*armHeight;
	drawRectangle(canvas, armWidth, armHeight, radius + corrX, radius + corrY, angle, 'rgb(3,f,3)', "bottom");
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
}

//Get the current time
function getCurrentTime(){
	return new Date();
}