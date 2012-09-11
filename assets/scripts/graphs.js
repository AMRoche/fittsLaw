//graphRender(String (type of graph: logGraph, dotPattern),new Array(arrays containing results to graph),String (title of graph),String (id of div do render graph to));
//graphRender(String (type of graph: logGraph, dotPattern),String (arrays containing results to graph),String (title of graph),String (id of div do render graph to));
//ues first method for logGraph and second for dotPattern graph
//logGraph = logarithmic time graph
//dotPattern = graph comparing average time for each
var frameToDrawTo = "canvas";

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
	var undrawn = true;

$(document).ready(function() {
	graphRender('logGraph',new Array(logResults[0],logResults[1]),'Distance versus time for two inputs',frameToDrawTo)
	//reRender();
});

$(window).focus(function() {
	if(document.getElementById(frameToDrawTo).getAttribute("type") == 'logGraph'){
		//reRender();
	}
	
	if(undrawn == true){
		if(document.getElementById(frameToDrawTo).getAttribute("type") == 'logGraph'){
			graphRender('logGraph',new Array(logResults[0],logResults[1]),'Distance versus time for two inputs',frameToDrawTo);
		}
		undrawn == false;
	}

//    logChart.redraw();
})

.blur(function() {
        undrawn = true;
   });

function reRender() {
	logChart.redraw();
	console.log("lol");
        setTimeout(reRender, 1000);
}   
    


//-----------------------------------------GRAPH CODE-------------------------------------------------
function barChart(title, array, nameArray, drawDestination){
var drawer = drawDestination;
if(drawDestination == null || drawDestination == ""){
	drawer = frameToDrawTo;
}
var arr = eval(array);
var namen = eval(nameArray);
var titleString = title;
//equiVari diffDist equaLong
var nameOfArray;
var resultsArr;
arr = getAverage(arr); //getAverage takes an array argument with x subarrays containing numbers, and returns an array with x numbers
//console.log(array);
if(nameArray == null || nameArray.length == 0){
	if(array == "equiVariArr"){
	nameOfArray = ['Big Blue' , 'Medium Green' , 'Big Red', 'Small Yellow' ];
	}	
	
	if(array == "diffDistArr"){
	nameOfArray = ['Medium Blue' , 'Medium Green' , 'Medium Red'];
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
                renderTo: drawer,
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
function logGraph(drawDestination){
	var reDraw = drawDestination;
	$(function () {
    $(document).ready(function() {
        logChart = new Highcharts.Chart({
            chart: {
                renderTo: drawDestination,
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
                },
                max : 2000 
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
                	animation : false,
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
                color: '#0000FF',
                data: logResults[0]
            }, {
                name: 'Input device 2',
                color: '#FF0000',
                data: logResults[1]
            }]
        });
    });
    
});
//setInterval(function(){logGraph(drawDestination)},1000);
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



function graphRender(type, arrayName, title, drawDestination){
	var drawer = drawDestination;
	if(drawDestination == "" || drawDestination == null){
	drawer = frameToDrawTo;
	}
	document.getElementById(drawer).setAttribute("type", type);
	document.getElementById(drawer).setAttribute("array", arrayName);
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
			logGraph(drawer);
	}
	
	if(type=="dotPattern"){
		barChart(title, arrayName,null, drawer);
	}
//window.setTimeout("graphRender(document.getElementById('canvas').getAttribute('type'),document.getElementById('canvas').getAttribute('array'))", 1000);
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
graphRender('logGraph',new Array(logResults[0],logResults[1]),'Distance versus time for two inputs',frameToDrawTo);

//		logChart.redraw();
//	console.log(logChart.series[0]);
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
	graphRender('logGraph',new Array(logResults[0],logResults[1]),'Distance versus time for two inputs',frameToDrawTo);
	//logChart.series[1].addPoint(new Array(x,y));
//graphRender('logGraph',new Array(logResults[0],logResults[1]),'Distance versus time for two inputs',frameToDrawTo)
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
