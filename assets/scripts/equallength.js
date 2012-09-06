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
var counter = 0;

equidistantSize(200);

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
	
	var color = Math.floor(Math.random()*3);
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
	}
	
	if (color == 1){
		if(mode=="diffDist"){
			length = (length/3) * 2;
		}
		image = "assets/images/greenMed.png";
		if(mode=="equiSize"){
			image = "assets/images/greenMed.png";
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
	}
	pushx = Math.floor(x + length*Math.cos(degrees));
	pushy = Math.floor(y + length*Math.sin(degrees));
	length = speclength;
	
	if(pushx  < 50){
		pushx += 50;
	}
	
	if(pushy  < 50){
		pushy += 50;
	}
	
	var divTwo = '<div id = "two" color="'+color+'" style = "top:'+pushy+'px; left: '+pushx+'px;"><img src = "'+image+'"></div>';
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
			renderballs(canvasWidth, canvasHeight, length, currentMode);	
		}
	clickWhite = false;
});
