var logGraphBArr = new Array (3);
	for (i = 0; i < logGraphBArr . length; i++){
	logGraphBArr [i] = new Array ();}
	
var logGraphRArr = new Array(3);
	for (i = 0; i < logGraphRArr . length; i++){
	logGraphRArr [i] = new Array ();}

var equiVariArr = new Array(4);
	for (i = 0; i < equiVariArr . length; i++){
	equiVariArr [i] = new Array ();}
 
var diffDistArr  = new Array(3);
	for (i = 0; i < diffDistArr . length; i++){
	diffDistArr [i] = new Array ();}

var equaLongArr = new Array(3);
	for (i = 0; i < equaLongArr . length; i++){
	equaLongArr [i] = new Array ();}
//"logGraphBArr","logGraphRArr","equiVariArr","diffDistArr","equaLongArr"
//equiVari is a 4 * quantity of input array 
//(or however many different types of ball and distance you're rendering for each experiment)
//rest are 3 * quanity of input

//refresh window every second by re-calling the graph render.
window.setTimeout("graphRender(document.getElementById('canvas').getAttribute('type'),document.getElementById('canvas').getAttribute('array'))", 1000);

//-----------------------------------------GRAPHING---------------------------------------------------
function graphRender(type, arrayName){
	document.getElementById("canvas").setAttribute("type", type);
	document.getElementById("canvas").setAttribute("array", arrayName);
	if(type=="logGraph"){
		if(arrayName instanceof Array){
			logaGraph(arrayName);
		}
		else{
			var string = arrayName.split(",");
			for (var x = 0; x < string.length; x++){
				string[x] = eval(string[x]);
			}
			logaGraph(new Array(string[0],string[1]));	
		}
	}
	
	if(type=="dotPattern"){
		dotAverage(arrayName);
	}
window.setTimeout("graphRender(document.getElementById('canvas').getAttribute('type'),document.getElementById('canvas').getAttribute('array'))", 1000);
}

function logaGraph(arrayCall){
	document.getElementById('canvas').innerHTML="";
	document.getElementById('canvas').innerHTML+='<div id = "two" style = "bottom:-8px; left:-8px;"><img src = "assets/images/whiteSmall.png"></div>';		
	var aOA = eval(arrayCall);
	console.log(arrayCall);
	for(var i = 0; i < aOA.length; i++){
		aOA[i] = eval(aOA[i]);
	}
		//get width of circle and hardcode
		console.log("logGraph ready");
	var timeArray = new Array();
	for(var x = 0; x < aOA.length; x++){
		for(var y = 0; y < aOA[x].length; y++){
			for(var z = 0; z < aOA[x][y].length; z++){
					var image = "";
					var crossPush = 0;
					var height = 0;
					var timeLength = String(aOA[x][y][z]).split(":"); //time is timeLength[0] and length is timeLength[1]
					//console.log(timeLength[0]);
					//console.log(timeLength[1]);
					var widthOfBall;
					if(x == 0){
						image = "assets/images/blueSmall.png";
							if(y == 0){widthOfBall = 15;}
							if(y == 1){widthOfBall = 25;}
							if(y == 2){widthOfBall = 45;}
					}
					if(x == 1){
						image = "assets/images/redSmall.png";
							if(y == 0){widthOfBall = 15;}
							if(y == 1){widthOfBall = 25;}
							if(y == 2){widthOfBall = 45;}
					}
					
					//timeArray.push(parseInt(timeLength[0]));
					//timeLength = null;
					var shoveY = Math.floor((parseInt(timeLength[0])-300) / 3);
					var shoveX = Math.floor(parseInt(timeLength[1])/widthOfBall) * 40;
					document.getElementById('canvas').innerHTML+='<div id = "two" style = "bottom:'+shoveY+'px; left: '+shoveX+'px;"><img src = "'+image+'"></div>';
						
					//2 big, 1 med, 0 small					
				
			}
		}
	}
}

function dotAverage(arrayCall){
	console.log(arrayCall);
	document.getElementById('canvas').innerHTML="";
	var images = new Array();
	if(arrayCall==="equiVariArr"){
		images = new Array("blueBig.png","greenMed.png","redBig.png","yellowSmall.png");
	}
	if(arrayCall==="diffDistArr"){
		images = new Array("blueMed.png","greenMed.png","redMed.png");	
	}
	if(arrayCall==="equaLongArr"){
		images = new Array("blueSmall.png","greenMed.png","redBig.png");
	}	
				
	var tempArr = eval(arrayCall);
	var resultsArr = new Array(tempArr.length);
		console.log("dotPointAverage ready");
		
	for (var i = 0; i < tempArr.length; i++){
		var average = 0;
			for(var j = 0; j < tempArr[i].length; j++)
				{
					average += parseInt(tempArr[i][j]);
				}
		resultsArr[i] = Math.floor(average / tempArr[i].length);
		}
		
	console.log(resultsArr);
	for(var x = 0; x < resultsArr.length; x++){
		if(String(resultsArr[x]) == null || String(resultsArr[x]) == "NaN"){
			var replace = '<div class = "resultsWrapper"><div class="imageWrapper"><img src="assets/images/'+String(images[x])+'"></div><div class="resultWrapper"><p>Undefined</p></div></div>';		
		}
		else {
			var replace = '<div class = "resultsWrapper"><div class="imageWrapper"><img src="assets/images/'+String(images[x])+'"></div><div class="resultWrapper"><p>'+String(resultsArr[x])+' ms</p></div></div>';
		}
		document.getElementById('canvas').innerHTML += replace;
	}
}
//-----------------------------------------FUNCTIONS THAT WRITE MESSAGE INPUT TO ARRAYS------------------------------
function logGraphB(message){
	var arrayInfo = message.split(":"); //splits message based on colon seperators
	logGraphBArr[arrayInfo[0]].push(arrayInfo[1]+":"+arrayInfo[2]); //writes to array from array message was seperated in to, writes variable as "time:length"
	//graphRender("logGraph", "logGraphBArr"); //type of graph to draw and name of array to pull from	
}

function logGraphR(message){
	var arrayInfo = message.split(":");
	logGraphRArr[arrayInfo[0]].push(arrayInfo[1]+":"+arrayInfo[2]);
	//graphRender("logGraph", "logGraphRArr");	
}
function equiVari(message){
	var arrayInfo = message.split(":");
	equiVariArr[arrayInfo[0]].push(arrayInfo[1]);
	//graphRender("dotPattern", "equiVariArr");
}

function diffDist(message){
	var arrayInfo = message.split(":");
	diffDistArr[arrayInfo[0]].push(arrayInfo[1]);
	//graphRender("dotPattern", "diffDistArr");
}

function equaLong(message){
	var arrayInfo = message.split(":");
	equaLongArr[arrayInfo[0]].push(arrayInfo[1]);
	//graphRender("dotPattern", "equaLongArr");
}

//-----------------------------------------WEBSOCKETS AND PUBNUB ENABLING------------------------------

if(window.WebSocket){
	webSocketsOn();
}
else {
	webSocketsOff();
}

function webSocketsOn() {
	if (window.MozWebSocket) {
		window.WebSocket = window.MozWebSocket;
	}
	console.log("Websockets enabled. Connecting.");
}

function webSocketsOff() {
	console.log("These are not the websockets you are looking for.");
}

(function(){
 
    // LISTEN FOR MESSAGES
    PUBNUB.subscribe({
        channel    : "logGraphB",  
        restore    : false,        
        callback   : function(message) {logGraphB(message);},
        disconnect : function() {console.log("Connection to logGraphB lost. Reconnecting.");},
        reconnect  : function() {console.log("Reconnected to logGraphB");},
    });
	PUBNUB.subscribe({
        channel    : "logGraphR",  
        restore    : false,        
        callback   : function(message) {logGraphR(message);},
        disconnect : function() {console.log("Connection to logGraphR lost. Reconnecting.");},
        reconnect  : function() {console.log("Reconnected to logGraphR");},
   }) ;
	PUBNUB.subscribe({
        channel    : "equiVari",  
        restore    : false,        
        callback   : function(message) {equiVari(message);},
        disconnect : function() {console.log("Connection to equiVari lost. Reconnecting.");},
        reconnect  : function() {console.log("Reconnected to equiVari");},
   });
	PUBNUB.subscribe({
        channel    : "diffDist",  
        restore    : false,        
        callback   : function(message) {diffDist(message);},
        disconnect : function() {console.log("Connection to diffDist lost. Reconnecting.");},
        reconnect  : function() {console.log("Reconnected to diffDist");},
   });
	PUBNUB.subscribe({
        channel    : "equiSize",  
        restore    : false,        
        callback   : function(message) {equaLong(message);},
        disconnect : function() {console.log("Connection to equaLong lost. Reconnecting.");},
        reconnect  : function() {console.log("Reconnected to equaLong");},
   });


})();
