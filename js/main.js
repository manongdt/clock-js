$(document).ready(function(){
	displayCurrentTime();
});


//Display the current time of the user in a div
function displayCurrentTime(){
	var userTime = new Date();

	var hour = userTime.getHours();
	var minutes = userTime.getMinutes();
	var secondes = userTime.getSeconds();
	$("#time-display").html("<p>Current time: "+hour+":"+minutes+":"+secondes+"</p>")

	setTimeout("displayCurrentTime()", 1000);
}