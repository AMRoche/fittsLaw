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

var logResults = new Array(2);
	for(i = 0; i < logResults.length; i++){
		logResults[i] = new Array();
	}
	
//"logGraphBArr","logGraphRArr","equiVariArr","diffDistArr","equaLongArr"
//equiVari is a 4 * quantity of input array 
//(or however many different types of ball and distance you're rendering for each experiment)
//rest are 3 * quanity of input
//refresh window every second by re-calling the graph render.

//window.setTimeout("graphRender(document.getElementById('canvas').getAttribute('type'),document.getElementById('canvas').getAttribute('array'))", 1000);

//methods to run on loading
    var logChart;
    var verticalChart;
    
    $(document).ready(
    	graphRender('dotPattern','equiVariArr','Average time taken to click varidistant, different size buttons')
    );
var logData = new Miso.Dataset({
	  data : logResults
	});

function output(){
		console.log(logResults);
		console.log(JSON.stringify(logResults));
}

function miso(){	
logData = new Miso.Dataset({
	  data : logResults
	});
	logData.fetch({ 
	  success : function() {
	    console.log("Columns: ", this.columnNames());
	    console.log("Row Count ", this.length);
	    console.log(this.rows()); 
	  }
	});	
console.log(logResults);
}

//-----------------------------------------GRAPH CODE-------------------------------------------------
function barChart(title, array, nameArray){
var arr = eval(array);
var namen = eval(nameArray);
var titleString = title;
//equiVari diffDist equaLong
var nameOfArray;
var resultsArr;
arr = getAverage(arr); //getAverage takes an array argument with x subarrays containing numbers, and returns an array with x numbers
//console.log(array);
if(nameArray == null){
	if(array == "equiVariArr"){
	nameOfArray = ['Big Blue' , 'Medium Green' , 'Big Red', 'Small Yellow' ];
	}	
	
	if(array == "diffDistArr"){
	nameOfArray = ['Medium Green' , 'Medium Red' , 'Medium Blue'];
	}		
	
	if(array == "equaLongArr"){
	nameOfArray = ['Small Blue' , 'Medium Green' , 'Big Red'];
	}		
}
else{
nameOfArray = namen;
}
//console.log(arr);
$(function () {
    $(document).ready(function() {
    	
        verticalChart = new Highcharts.Chart({
            chart: {
                renderTo: 'canvas',
                type: 'bar'
            },
            title: {
                text: titleString
            },

            xAxis: {
                categories: nameOfArray,
                title: {
                    text: null
                }
            },
            legend: {
          		  enabled: false
        	},
            yAxis: {
                min: 0,
                title: {
                    text: 'average Time taken to press button (ms)',
                    align: 'high'
                },
                labels: {
                    overflow: 'justify'
                }
            },
            tooltip: {
                formatter: function() {
                    return ''+ this.y +' ms';
                }
            },
            plotOptions: {
                bar: {
                    dataLabels: {
                        enabled: true
                    }
                }
            },
            credits: {
                enabled: false
            },
            series: [{
                data: arr
            }]
        });
    });
    
});
}
//----LOG GRAPHING----
function logGraph(){
	$(function () {
    $(document).ready(function() {
        logChart = new Highcharts.Chart({
            chart: {
                renderTo: 'canvas',
                type: 'scatter',
                zoomType: 'xy'
            },
            title: {
                text: 'Speed versus distance/size of circle'
            },
            subtitle: {
                text: ''
            },
            xAxis: {
                title: {
                    enabled: true,
                    text: 'Distance from point / width of circle (px)'
                },
                startOnTick: true,
                endOnTick: true,
                showLastLabel: true
            },
            yAxis: {
                title: {
                    text: 'Time taken to click (ms)'
                }
            },
            tooltip: {
                formatter: function() {
                        return ''+
                        this.x +' px, '+ this.y +' ms';
                }
            },
            legend: {
                layout: 'vertical',
                align: 'left',
                verticalAlign: 'top',
                x: 100,
                y: 70,
                floating: true,
                backgroundColor: '#FFFFFF',
                borderWidth: 1
            },
            plotOptions: {
                scatter: {
                    marker: {
                        radius: 5,
                        states: {
                            hover: {
                                enabled: true,
                                lineColor: 'rgb(100,100,100)'
                            }
                        }
                    },
                    states: {
                        hover: {
                            marker: {
                                enabled: false
                            }
                        }
                    }
                }
            },
            series: [{
                name: 'Input device 1',
                color: 'rgba(0,0,255,1)',
                data: logResults[0]
            }, {
                name: 'Input device 2',
                color: 'rgba(255,0,0,1)',
                data: logResults[1]
            }]
        });
    });
    
});
}

//-----------------------------------------GRAPHING---------------------------------------------------
function getAverage(array){
	var tempArr = eval(array);
	var resultsArr = new Array(tempArr.length);
		
	for (var i = 0; i < tempArr.length; i++){
		var average = 0;
			for(var j = 0; j < tempArr[i].length; j++)
				{
					average += parseInt(tempArr[i][j]);
				}
		if(isNaN(parseFloat(Math.floor(average / tempArr[i].length)))){
			resultsArr[i] = 0;
		}
		else{
			resultsArr[i] = Math.floor(average / tempArr[i].length);
		}
	}
	return(resultsArr);
}



function graphRender(type, arrayName, title){
	document.getElementById("canvas").setAttribute("type", type);
	document.getElementById("canvas").setAttribute("array", arrayName);
	if(type=="logGraph"){
		if(arrayName instanceof Array){
			//logaGraph(arrayName);
			//logChart();
		}
		else{
			var string = arrayName.split(",");
			for (var x = 0; x < string.length; x++){
				string[x] = eval(string[x]);
			}
		
			//logaGraph(new Array(string[0],string[1]));	//perfectly fine for when two arrays are being used, but in this case we're fine with logResults.
		}
			logGraph();
	}
	
	if(type=="dotPattern"){
		barChart(title, arrayName);
	}
//window.setTimeout("graphRender(document.getElementById('canvas').getAttribute('type'),document.getElementById('canvas').getAttribute('array'))", 1000);
}

$(document).one('click',function() {
setInterval(function() { $('body').append('has focus? ' + window_focus + '<br>'); }, 1000);
});​
 // make graph re-draw every time it regains focus.
 
function logaGraph(arrayCall){
	document.getElementById('canvas').innerHTML="";
	document.getElementById('canvas').innerHTML+='<div id = "two" style = "bottom:-5px; left:0px;"><img src = "assets/images/whiteSmall.png"></div>';		
	var aOA = eval(arrayCall);
	//console.log(arrayCall);
	for(var i = 0; i < aOA.length; i++){
		aOA[i] = eval(aOA[i]);
	}
		//get width of circle and hardcode
	var timeArray = new Array();
	for(var x = 0; x < aOA.length; x++){
		for(var y = 0; y < aOA[x].length; y++){
			for(var z = 0; z < aOA[x][y].length; z++){
				//console.log("X:"+x+"Y:"+y+"Z:"+z);
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
					var shoveY = Math.floor((parseInt(timeLength[0])));
					var shoveX = Math.floor(parseInt(timeLength[1])/widthOfBall);
			//		logResults[x][y].push(shoveX+":"+shoveY);
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
			var replace = '<div class = "resultsWrapper"><div class="imageWrapper"><img src="assets/images/'+String(images[x])+'"></div><div class="resultWrapper"><p>Nobody\'s clicked one of these yet!</p></div></div>';		
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
//	logGraphBArr[arrayInfo[1]].push(arrayInfo[1]+":"+arrayInfo[2]); //writes to array from array message was seperated in to, writes variable as "time:length"
	//graphRender("logGraph", "logGraphBArr"); //type of graph to draw and name of array to pull from	
	if(arrayInfo[0] == 0){var widthOfBall = 15;}
	if(arrayInfo[0] == 1){var widthOfBall = 25;}
	if(arrayInfo[0] == 2){var widthOfBall = 45;}
//x co-ordinate calculated by dividing length from point to ball over the width. Y is straight up time.

var x = Math.round(parseFloat(arrayInfo[2])/widthOfBall*Math.pow(10,2))/Math.pow(10,2);
var y = Math.floor(parseInt(arrayInfo[1]));

logResults[0].push(new Array(x,y));

if(document.getElementById("canvas").getAttribute("type") == 'logGraph'){
	logChart.series[0].addPoint(new Array(x,y));
		logChart.redraw();
	console.log("POINT ADDED");
}

//	logData.rowByPosition(0).addColumn({
//		data: (parseFloat(arrayInfo[2])/widthOfBall)+","+Math.floor((parseInt(arrayInfo[1])))
//	}); 
}

function logGraphR(message){
	var arrayInfo = message.split(":");
//	logGraphRArr[arrayInfo[0]].push(arrayInfo[1]+":"+arrayInfo[2]);
	//graphRender("logGraph", "logGraphRArr");	
	if(arrayInfo[0] == 0){var widthOfBall = 15;}
	if(arrayInfo[0] == 1){var widthOfBall = 25;}
	if(arrayInfo[0] == 2){var widthOfBall = 45;}

var x = Math.round(parseFloat(arrayInfo[2])/widthOfBall*Math.pow(10,2))/Math.pow(10,2);
var y = Math.floor(parseInt(arrayInfo[1]));
logResults[1].push(new Array(x,y));

if(document.getElementById("canvas").getAttribute("type") == 'logGraph'){
	logChart.series[1].addPoint(new Array(x,y));
	logChart.redraw();
	console.log("POINT ADDED");
}


//	var ten = logData.rowByPosition(1).data;

//	ten.addColumn({
//		data: (parseInt(arrayInfo[2])/widthOfBall)+","+Math.floor((parseInt(arrayInfo[1])))
//	});
}

function equiVari(message){
	var arrayInfo = message.split(":");
	equiVariArr[arrayInfo[0]].push(arrayInfo[1]);
	//graphRender("dotPattern", "equiVariArr");
	if(document.getElementById('canvas').getAttribute('array')=="equiVariArr"){
		var AverageArr = getAverage(equiVariArr);
		verticalChart.series[0].setData(AverageArr, true);
	}
}

function diffDist(message){
	var arrayInfo = message.split(":");
	diffDistArr[arrayInfo[0]].push(arrayInfo[1]);
	//graphRender("dotPattern", "diffDistArr");
	if(document.getElementById('canvas').getAttribute('array')=="diffDistArr"){
		var AverageArr = getAverage(diffDistArr);
		verticalChart.series[0].setData(AverageArr, true);
	}
}

function equaLong(message){
	var arrayInfo = message.split(":");
	equaLongArr[arrayInfo[0]].push(arrayInfo[1]);
	//graphRender("dotPattern", "equaLongArr");

	if(document.getElementById('canvas').getAttribute('array')=="equaLongArr"){
		var AverageArr = getAverage(equaLongArr);
		verticalChart.series[0].setData(AverageArr, true);
	}
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
