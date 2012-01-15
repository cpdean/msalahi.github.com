function helloWorld(message){
	this.message = message;
	
	function doIt(){
		alert(message);
	}
}

function initialize(){
	var msg = "GYOHHH";
	var thing = helloWorld(msg);
	thing.doIt();
}
