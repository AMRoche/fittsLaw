var canvasWidth = document.getElementById("canvas").offsetWidth - 50;
var canvasHeight = document.getElementById("canvas").offsetHeight - 50;
var pushx = 0;
var	pushy = 0;
var x = Math.floor(Math.random()*canvasWidth);
var y = Math.floor(Math.random()*canvasHeight);
var length = 200;
var start;
var end;
var clickWhite = false;
var currentMode;
var counter = -1;

if(window.WebSocket){
	webSocketsOn();
}
else {
	webSocketsOff();
}

//bigLongBlue(200);  //call for which experiment you want to run.
//bigLongRed(200);
//equiVariSize(200);
//equidistantSize(200);
//diffDistance(200);

function bigLongBlue(speccedLength){
	currentMode = "logGraphB";
	length = speccedLength;
	renderballs(canvasWidth, canvasHeight, speccedLength, currentMode);	
}

function bigLongRed(speccedLength){
	currentMode = "logGraphR";
	length = speccedLength;
	renderballs(canvasWidth, canvasHeight, speccedLength, currentMode);	
}

function equiVariSize(speccedLength){
	currentMode = "equiVari";
	length = speccedLength;
	renderballs(canvasWidth, canvasHeight, speccedLength, currentMode)
}

function equidistantSize(speccedLength){
	currentMode = "equiSize";
	length = speccedLength;
	renderballs(canvasWidth, canvasHeight, speccedLength, currentMode)
}

function diffDistance(speccedLength){
	currentMode="diffDist";
	length = speccedLength;
	renderballs(canvasWidth, canvasHeight, speccedLength, currentMode);	
}

function equalLength(speccedLength){
	currentMode = "equaLong";
	length = speccedLength;
	renderballs(canvasWidth, canvasHeight, speccedLength, currentMode);	
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

//renders the two balls which move around the screen.
function renderballs(wide, high,speclength, mode){
	//length = speclength;
	x = wide/2;
	y = high/2;
	degrees = Math.floor(Math.random()*360);
	
	if(x  < 50){
		x += 50;
	}
	
	if(y  < 50){
		y += 50;
	}
	
	var divOne = '<div id="one" style="top:'+y+'px; left:'+x+'px;"><img src="assets/images/whiteMed.png"></div>';
	document.getElementById("canvas").innerHTML = divOne;
	
	if(mode != "equiVari"){
		var color = Math.floor(Math.random()*3);
	}
	
	if(mode == "equiVari"){
		var color = Math.floor(Math.random()*4);
	}
	
	var image = "";
	
	length = speclength;
	
	if (color == 0){
		
		if(mode=="diffDist"){
			length = length/3;
		}
		image = "assets/images/blueMed.png";
		
		if(mode=="equiSize"){
			image = "assets/images/blueSmall.png";
		}
		
		if(mode=="equiVari"){
			image = "assets/images/blueBig.png";
			length = length/4;		
		}
		if(mode == "logGraphR" || mode == "logGraphB"){
			length = Math.floor(Math.random()*length) + 26;
		}
		if(mode == "logGraphR"){
			image = "assets/images/redSmall.png"
		}
		if(mode == "logGraphB"){
			image = "assets/images/blueSmall.png"
		}
	}
	
	if (color == 1){
		
		if(mode=="diffDist"){
			length = (length/3) * 2;
		}
		image = "assets/images/greenMed.png";
		
		if(mode=="equiSize"){
			image = "assets/images/greenMed.png";
		}
		
		if(mode=="equiVari"){
			image = "assets/images/greenMed.png";
			length = length/3;		
		}
		
		if(mode == "logGraphR" || mode == "logGraphB"){
			length = Math.floor(Math.random()*length) + 26;
		}
		
		if(mode == "logGraphR"){
			image = "assets/images/redMed.png"
		}
		
		if(mode == "logGraphB"){
			image = "assets/images/blueMed.png"
		}

	}
	
	if (color == 2){
		if(mode=="diffDist"){
			length = length;
		}
		image = "assets/images/redMed.png";
		
		if(mode=="equiSize"){
			image = "assets/images/redBig.png";
		}
		
		if(mode=="equiVari"){
			image = "assets/images/redBig.png";
			length = (length/3) *2;		
		}
		
		if(mode == "logGraphR" || mode == "logGraphB"){
			length = Math.floor(Math.random()*length) + 26;
		}
		if(mode == "logGraphR"){
			image = "assets/images/redBig.png"
		}
		if(mode == "logGraphB"){
			image = "assets/images/blueBig.png"
		}
		
	}
	if (color == 3){
		if(mode=="equiVari"){
			image = "assets/images/yellowSmall.png";
			length = length;		
		}
	}
	
	pushx = Math.floor(x + length*Math.cos(degrees));
	pushy = Math.floor(y + length*Math.sin(degrees));
	
	if(pushx  < 50){
		pushx += 50;
	}
	
	if(pushy  < 50){
		pushy += 50;
	}
	
		if(mode == "logGraphR" || mode == "logGraphB"){
			var divTwo = '<div id = "two" color="'+color+'" length ="'+length+'" style = "top:'+pushy+'px; left: '+pushx+'px;"><img src = "'+image+'"></div>';
		}
		else{	
			var divTwo = '<div id = "two" color="'+color+'" style = "top:'+pushy+'px; left: '+pushx+'px;"><img src = "'+image+'"></div>';
		}
	length = speclength;
	document.getElementById("canvas").innerHTML += divTwo;
}

//click handlers ahead.

$('#one').live("click", function(){
	clickWhite = true;
	start = new Date();
});

$('#two').live("click", function(){
		if(clickWhite === true && start != null){	
			counter++;
			end = new Date();
			var catClick = document.getElementById("two").getAttribute("color");
			var timeDiff = end.getTime()-start.getTime()
			console.log(counter+" : "+ catClick+" : "+ timeDiff+" ms");
			if(document.getElementById("two").getAttribute("length")!= null){
				var quickLong = document.getElementById("two").getAttribute("length");
				PUBNUB.publish({             // SEND A MESSAGE.
                channel : currentMode,
                message :catClick+":"+ timeDiff+":"+quickLong
            	})
			}
			else{
	            PUBNUB.publish({             // SEND A MESSAGE.
	                channel : currentMode,
	                message : catClick+":"+ timeDiff
	            })
 			}
			renderballs(canvasWidth, canvasHeight, length, currentMode);	
		}
	clickWhite = false;
});

(function(){
 
    // LISTEN FOR MESSAGES
    PUBNUB.subscribe({
        channel    : currentMode,      // CONNECT TO THIS CHANNEL.
 
        restore    : false,              // STAY CONNECTED, EVEN WHEN BROWSER IS CLOSED
                                         // OR WHEN PAGE CHANGES.
 
        callback   : function(message) { // RECEIVED A MESSAGE.
        },
 
        disconnect : function() {        // LOST CONNECTION.
         console.log("You have been disconnected. Reconnecting ASAP.");
        },
 
        reconnect  : function() {        // CONNECTION RESTORED.
   			 console.log("You have been Reconnected.");
        },
 
        connect    : function() {        // CONNECTION ESTABLISHED.
 
          /*  PUBNUB.publish({             // SEND A MESSAGE.
                channel : currentMode,
                message : "0 : 0 : 0"
            })*/
 
        }
    })
 
})();
