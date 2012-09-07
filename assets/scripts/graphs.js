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

//equiVari is a 4 * quantity of input array 
//(or however many different types of ball and distance you're rendering for each experiment)
//rest are 3 * quanity of input

//-----------------------------------------GRAPHING---------------------------------------------------
function graphRender(type, arrayName){
	if(type=="logGraph"){
		logaGraph(arrayName);
	}
	
	if(type=="dotPattern"){
		dotAverage(arrayName);
	}
}

function logaGraph(arrayCall){
	//get width of circle by code
}

function dotAverage(arrayCall){
	
}
//-----------------------------------------FUNCTIONS THAT WRITE MESSAGE INPUT TO ARRAYS------------------------------
function logGraphB(message){
	var arrayInfo = message.split(":"); //splits message based on colon seperators
	logGraphBArr[arrayInfo[0]].push(arrayInfo[1]+":"+arrayInfo[2]); //writes to array from array message was seperated in to, writes variable as "time:length"
	console.log("logGraphArr: ");
	console.log(logGraphBArr);
	graphRender("logGraph", "logGraphBArr"); //type of graph to draw and name of array to pull from	
}

function logGraphR(message){
	var arrayInfo = message.split(":");
	logGraphRArr[arrayInfo[0]].push(arrayInfo[1]+":"+arrayInfo[2]);
	console.log("logGraphRArr: ");
	console.log(logGraphRArr);
	graphRender("logGraph", "logGraphRArr");	
}
function equiVari(message){
	var arrayInfo = message.split(":");
	equiVariArr[arrayInfo[0]].push(arrayInfo[1]);
	console.log("equiVari: ");
	console.log(equiVariArr);
	graphRender("dotPattern", "equiVariArr");
}

function diffDist(message){
	var arrayInfo = message.split(":");
	diffDistArr[arrayInfo[0]].push(arrayInfo[1]);
	console.log("diffDist: ");
	console.log(diffDistArr);
	graphRender("dotPattern", "diffDistArr");
}

function equaLong(message){
	var arrayInfo = message.split(":");
	equaLongArr[arrayInfo[0]].push(arrayInfo[1]);
	console.log("equaLong: ");
	console.log(equaLongArr);
	graphRender("dotPattern", "equaLongArr");
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
