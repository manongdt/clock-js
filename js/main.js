$(document).ready(function(){
	displayCurrentTime();

	var canvas = new fabric.StaticCanvas('canvas-clock');
});


//Display the current time of the user in a div
function displayCurrentTime(){
	var time = getCurrentTime();

	var hour = time.getHours();
	var minutes = time.getMinutes();
	var secondes = time.getSeconds();
	$("#time-display").html("<p>"+hour+":"+minutes+":"+secondes+"</p>")

	setTimeout("getCurrentTime()", 1000);
}

//Draw a clock with current time centered in a canvas
function drawClock(canvas){

}

//Draw a clock face
function drawClockFace(canvas, radius){

}

//Update the arms' state depending on the time
function updateState(canvas){

}

//Draw the clock contour in a canvas
function drawClockContour(canvas, radius){

}

//Draw the time markers of the clock face - big for hours and small for minutes
function drawTimeMarkers(canvas){

}

//Draw hour's time markers
function drawHourMarkers(canvas){

}

//Draw minute's time markers
function drawMinuteMarkers(canvas){

}

//Draw the clock arms
function drawArms(canvas, hour, minutes, seconds){

}

//Draw the hour's arm of the clock
function drawHourArm(canvas, hour, minutes){

}

//Draw the minutes' arm of the clock
function drawMinutesArm(minutes){

}

//Draw the seconds' arm of the clock
function drawSecondsArm(seconds){

}

//Draw rectangle in a canvas
function drawRectangle(canvas, width, height, x, y, angle, color){

}

//Get the current time
function getCurrentTime(){
	return new Date();
}